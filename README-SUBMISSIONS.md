# Application email setup

This static site now submits both career forms to `submit-application.php`. The endpoint sends all submitted fields and document attachments to `naztify731@gmail.com` using PHPMailer and SMTP.

## Deploy

1. Install dependencies in this directory with `composer install --no-dev`.
2. Copy `.env.example` to `.env` on the server.
3. Set `MAIL_HOST`, `MAIL_PORT`, `MAIL_USERNAME`, `MAIL_PASSWORD`, and `MAIL_FROM`. For Gmail, use an App Password, not the normal account password.
4. Keep `.env` and `vendor/` out of public source control where possible. Configure the web server so `.env` cannot be downloaded.
5. Serve the site through PHP over HTTPS. Opening the HTML directly from a file will not submit to the endpoint.

Uploads accept PDF, DOC, and DOCX files up to `MAX_UPLOAD_BYTES` (10 MB by default). The endpoint validates fields and MIME types server-side, escapes email content, attaches documents, applies a short duplicate-submission throttle, and logs SMTP failures server-side.

## Test

Open `career.html` through the deployed PHP server, submit one complete fulltime application and one complete internship application with test documents, and verify the two subject lines and attachments at `naztify731@gmail.com`. Also test an invalid email, missing fields, and a disallowed file such as `.exe`.
