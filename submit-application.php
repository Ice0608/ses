<?php

declare(strict_types=1);

use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;

header('Content-Type: application/json; charset=utf-8');

function respond(int $status, bool $success, string $message): never
{
    http_response_code($status);
    echo json_encode([
        'success' => $success,
        'message' => $message
    ]);
    exit;
}

function loadEnv(string $path): array
{
    if (!is_readable($path)) {
        return [];
    }

    $values = [];

    foreach (file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $line) {
        $line = trim($line);

        if (
            $line === '' ||
            str_starts_with($line, '#') ||
            !str_contains($line, '=')
        ) {
            continue;
        }

        [$key, $value] = explode('=', $line, 2);

        $values[trim($key)] = trim(
            $value,
            " \t\n\r\0\x0B\"'"
        );
    }

    return $values;
}

function configValue(
    array $config,
    string $key,
    ?string $default = null
): ?string {
    $environmentValue = getenv($key);

    return ($environmentValue !== false && $environmentValue !== '')
        ? $environmentValue
        : ($config[$key] ?? $default);
}

function cleanValue(string $value): string
{
    return trim(str_replace(["\r", "\n"], ' ', $value));
}

function fieldLabel(string $key): string
{
    return ucwords(str_replace(['_', '-'], ' ', $key));
}

function uploadErrorMessage(int $error): string
{
    return match ($error) {
        UPLOAD_ERR_INI_SIZE,
        UPLOAD_ERR_FORM_SIZE =>
            'One of the uploaded files is too large.',

        UPLOAD_ERR_PARTIAL =>
            'One of the uploaded files was only partially uploaded.',

        UPLOAD_ERR_NO_FILE =>
            'A required uploaded file is missing.',

        default =>
            'A file upload failed.'
    };
}

/*
|--------------------------------------------------------------------------
| Request Method
|--------------------------------------------------------------------------
*/

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, false, 'Invalid request method.');
}

/*
|--------------------------------------------------------------------------
| Composer
|--------------------------------------------------------------------------
*/

$autoload = __DIR__ . '/vendor/autoload.php';

if (!is_readable($autoload)) {
    error_log('Application submission: Composer dependencies are missing.');
    respond(500, false, 'The application service is not configured yet.');
}

require $autoload;

/*
|--------------------------------------------------------------------------
| Environment
|--------------------------------------------------------------------------
*/

$config = loadEnv(__DIR__ . '/.env');

/*
|--------------------------------------------------------------------------
| Application Type
|--------------------------------------------------------------------------
*/

$type = ($_POST['application_type'] ?? '') === 'internship'
    ? 'internship'
    : 'fulltime';

/*
|--------------------------------------------------------------------------
| Required Fields
|--------------------------------------------------------------------------
*/

$requiredFields = [
    'Nama_Penuh',
    'Email',
    'IC',
    'Jantina',
    'No__Tel',
    'No__Tel_Kecemasan',
    $type === 'internship'
        ? 'Alamat_terkini'
        : 'Address'
];

$requiredFiles = $type === 'internship'
    ? ['Resume', 'Transkrip', 'ReplyForm']
    : ['Resume'];

/*
|--------------------------------------------------------------------------
| Validate Required Fields
|--------------------------------------------------------------------------
*/

foreach ($requiredFields as $field) {
    if (
        !isset($_POST[$field]) ||
        cleanValue((string) $_POST[$field]) === ''
    ) {
        respond(
            422,
            false,
            'Please complete all required fields.'
        );
    }
}

/*
|--------------------------------------------------------------------------
| Email Validation
|--------------------------------------------------------------------------
*/

$emailInput = cleanValue((string) $_POST['Email']);

$email = filter_var(
    $emailInput,
    FILTER_VALIDATE_EMAIL
);

if ($email === false || strlen($emailInput) > 254) {
    respond(
        422,
        false,
        'Please enter a valid email address.'
    );
}

/*
|--------------------------------------------------------------------------
| Phone Validation
|--------------------------------------------------------------------------
*/

$phonePattern = '/^\+?[0-9][0-9 ()-]{7,19}$/';

foreach (['No__Tel', 'No__Tel_Kecemasan'] as $field) {
    $phone = cleanValue((string) $_POST[$field]);

    if (!preg_match($phonePattern, $phone)) {
        respond(
            422,
            false,
            'Please enter valid phone numbers.'
        );
    }
}

/*
|--------------------------------------------------------------------------
| IC Validation
|--------------------------------------------------------------------------
*/

$ic = cleanValue((string) $_POST['IC']);

if (!preg_match('/^[0-9]{6}-?[0-9]{2}-?[0-9]{4}$/', $ic)) {
    respond(
        422,
        false,
        'Please enter a valid IC number.'
    );
}

/*
|--------------------------------------------------------------------------
| File Upload Configuration
|--------------------------------------------------------------------------
*/

$maxBytes = max(
    1024,
    (int) configValue(
        $config,
        'MAX_UPLOAD_BYTES',
        '10485760'
    )
);

$allowedMimeTypes = [
    'pdf' => [
        'application/pdf'
    ],

    'doc' => [
        'application/msword',
        'application/octet-stream'
    ],

    'docx' => [
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/zip'
    ]
];

$finfo = new finfo(FILEINFO_MIME_TYPE);

$attachments = [];

/*
|--------------------------------------------------------------------------
| Validate Uploaded Files
|--------------------------------------------------------------------------
*/

foreach ($requiredFiles as $field) {

    if (
        !isset($_FILES[$field]) ||
        !is_array($_FILES[$field])
    ) {
        respond(
            422,
            false,
            'Please attach all required documents.'
        );
    }

    $file = $_FILES[$field];

    if ($file['error'] !== UPLOAD_ERR_OK) {
        respond(
            422,
            false,
            uploadErrorMessage((int) $file['error'])
        );
    }

    if (
        (int) $file['size'] <= 0 ||
        (int) $file['size'] > $maxBytes ||
        !is_uploaded_file($file['tmp_name'])
    ) {
        respond(
            422,
            false,
            'Uploaded files must be valid and within the allowed size.'
        );
    }

    $extension = strtolower(
        pathinfo(
            (string) $file['name'],
            PATHINFO_EXTENSION
        )
    );

    $mime = $finfo->file($file['tmp_name']);

    if (
        !isset($allowedMimeTypes[$extension]) ||
        !in_array(
            $mime,
            $allowedMimeTypes[$extension],
            true
        )
    ) {
        respond(
            422,
            false,
            'Only valid PDF, DOC, or DOCX files are allowed.'
        );
    }

    $attachments[] = [
        'path' => $file['tmp_name'],
        'name' => fieldLabel($field) . '.' . $extension
    ];
}

/*
|--------------------------------------------------------------------------
| Rate Limit
|--------------------------------------------------------------------------
*/

$rateKey = hash(
    'sha256',
    ($_SERVER['REMOTE_ADDR'] ?? 'unknown') .
    '|' .
    $email .
    '|' .
    $type
);

$rateFile = sys_get_temp_dir() .
    DIRECTORY_SEPARATOR .
    'ses_application_' .
    $rateKey;

if (
    is_file($rateFile) &&
    (time() - (int) file_get_contents($rateFile)) < 60
) {
    respond(
        429,
        false,
        'Please wait before submitting another application.'
    );
}

/*
|--------------------------------------------------------------------------
| Applicant Name
|--------------------------------------------------------------------------
*/

$name = cleanValue(
    (string) $_POST['Nama_Penuh']
);

if (strlen($name) > 150) {
    respond(
        422,
        false,
        'Please enter a shorter name.'
    );
}

/*
|--------------------------------------------------------------------------
| Email Subject
|--------------------------------------------------------------------------
*/

$subject = (
    $type === 'internship'
        ? 'New Internship Application - '
        : 'New Fulltime Job Application - '
) . $name;

$heading = $type === 'internship'
    ? 'NEW INTERNSHIP APPLICATION'
    : 'NEW FULLTIME JOB APPLICATION';

/*
|--------------------------------------------------------------------------
| Email Body
|--------------------------------------------------------------------------
*/

$rows = '';

foreach ($_POST as $key => $value) {

    if ($key === 'application_type') {
        continue;
    }

    $values = is_array($value)
        ? implode(', ', array_map('strval', $value))
        : (string) $value;

    $rows .=
        '<tr>' .
        '<th style="text-align:left;padding:8px;border-bottom:1px solid #eee">' .
        htmlspecialchars(
            fieldLabel((string) $key),
            ENT_QUOTES,
            'UTF-8'
        ) .
        '</th>' .
        '<td style="padding:8px;border-bottom:1px solid #eee">' .
        nl2br(
            htmlspecialchars(
                cleanValue($values),
                ENT_QUOTES,
                'UTF-8'
            )
        ) .
        '</td>' .
        '</tr>';
}

$body =
    '<h2 style="color:#3d1f5c">' .
    htmlspecialchars(
        $heading,
        ENT_QUOTES,
        'UTF-8'
    ) .
    '</h2>' .

    '<table style="border-collapse:collapse;width:100%;font-family:Arial,sans-serif">' .
    $rows .
    '</table>' .

    '<p>Application submitted: ' .
    date('Y-m-d H:i:s T') .
    '</p>' .

    '<p>Uploaded documents are attached to this email.</p>';

/*
|--------------------------------------------------------------------------
| PHPMailer
|--------------------------------------------------------------------------
*/

$mail = new PHPMailer(true);

try {

    $mail->isSMTP();

    $mail->Host = (string) configValue(
        $config,
        'MAIL_HOST'
    );

    $mail->SMTPAuth = true;

    $mail->Username = (string) configValue(
        $config,
        'MAIL_USERNAME'
    );

    $mail->Password = (string) configValue(
        $config,
        'MAIL_PASSWORD'
    );

    $mail->SMTPSecure =
        PHPMailer::ENCRYPTION_STARTTLS;

    $mail->Port = (int) configValue(
        $config,
        'MAIL_PORT',
        '587'
    );

    $mail->CharSet = 'UTF-8';

    $mail->setFrom(
        (string) configValue(
            $config,
            'MAIL_FROM',
            configValue(
                $config,
                'MAIL_USERNAME'
            )
        ),
        (string) configValue(
            $config,
            'MAIL_FROM_NAME',
            'Smart Education Society'
        )
    );

    $mail->addAddress(
        (string) configValue(
            $config,
            'MAIL_TO',
            'naztify731@gmail.com'
        )
    );

    $mail->addReplyTo(
        (string) $email,
        $name
    );

    foreach ($attachments as $attachment) {
        $mail->addAttachment(
            $attachment['path'],
            $attachment['name']
        );
    }

    $mail->isHTML(true);

    $mail->Subject = $subject;

    $mail->Body = $body;

    $mail->AltBody = strip_tags(
        str_replace(
            '</tr>',
            "\n",
            $body
        )
    );

    $mail->send();

    file_put_contents(
        $rateFile,
        (string) time(),
        LOCK_EX
    );

} catch (Exception $exception) {

    error_log(
        'Application email failed: ' .
        $exception->getMessage()
    );

    respond(
        500,
        false,
        'Your application could not be submitted at this time. Please try again later.'
    );
}

/*
|--------------------------------------------------------------------------
| Success
|--------------------------------------------------------------------------
*/

respond(
    200,
    true,
    'Application submitted successfully. Thank you for your application. We will review your application and contact you if required.'
);