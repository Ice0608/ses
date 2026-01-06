console.log("script.js loaded successfully");

// ===== Lightbox (click to enlarge) =====
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close");

// Only run if lightbox elements exist on the page
if (lightbox && lightboxImg) {
  document.querySelectorAll(".enlargeable").forEach(img => {
    img.addEventListener("click", () => {
      lightbox.style.display = "flex"; // Changed from "block" to "flex"
      lightboxImg.src = img.src;
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      lightbox.style.display = "none";
    });
  }

  lightbox.addEventListener("click", (e) => {
    // Close if clicking the background (but not the wrapper or image)
    if (e.target === lightbox) {
      lightbox.style.display = "none";
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");

  if (searchForm && searchInput) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const keyword = searchInput.value.trim().toLowerCase();
      if (!keyword) return;

      // Map keywords to pages
      const routes = {
        "pengenalan": "index.html",
        "syarat": "index.html",
        "kelebihan": "index.html",
        "spm": "pembelajaran.html",
        "pembelajaran": "pembelajaran.html",
        "etika": "pembelajaran.html",
        "pengajian": "pembelajaran.html",
        "halatuju": "pembelajaran.html",
        "fasiliti": "fasiliti.html",
        "surau": "fasiliti.html",
        "ruangan pelajar": "fasiliti.html",
        "kelas": "fasiliti.html",
        "pengangkutan": "fasiliti.html",
        "bas": "fasiliti.html",
        "asrama": "fasiliti.html",
        "dewan": "fasiliti.html",
        "kafeteria": "fasiliti.html",
        "atm": "fasiliti.html",
        "parking": "fasiliti.html",
        "pengawal": "fasiliti.html",
        "aktiviti": "fasiliti.html",
        "bangunan": "fasiliti.html",
        "testimoni": "testimoni.html",
        "batch": "testimoni.html",
        "alamat": "hubungi.html",
        "alamat": "hubungi.html",
        "hubungi": "hubungi.html",
        "whatsapp": "hubungi.html",
        "laman web": "hubungi.html",
        "instagram": "hubungi.html",
        "facebook": "hubungi.html",
        "tiktok": "hubungi.html",
      };

      let targetPage = "index.html"; // default
      for (const key in routes) {
        if (keyword.includes(key)) {
          targetPage = routes[key];
          break;
        }
      }

      window.location.href = `${targetPage}?search=${encodeURIComponent(keyword)}`;
    });
  }

  // Highlight function on each page
  const params = new URLSearchParams(window.location.search);
  const searchTerm = params.get("search");
  if (searchTerm) {
    highlightAndScroll(searchTerm);
  }
});

// Highlight + scroll to first match
function highlightAndScroll(term) {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
  const regex = new RegExp(term, "gi");
  let firstMatchElement = null;

  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (regex.test(node.nodeValue)) {
      const span = document.createElement("mark");
      span.innerHTML = node.nodeValue.replace(regex, (match) => `<span class="highlight">${match}</span>`);
      const wrapper = document.createElement("span");
      wrapper.innerHTML = span.innerHTML;
      node.parentNode.replaceChild(wrapper, node);

      if (!firstMatchElement) {
        firstMatchElement = wrapper.querySelector(".highlight");
      }
    }
  }

  if (firstMatchElement) {
    firstMatchElement.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("script.js loaded successfully");

  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  if (!hamburger) {
    console.error("❌ Hamburger element not found in DOM!");
    return;
  }

  if (!navLinks) {
    console.error("❌ navLinks element not found in DOM!");
    return;
  // ```javascript
  }

  console.log("✅ Hamburger and navLinks found!");

  hamburger.addEventListener("click", () => {
    console.log("🍔 Hamburger clicked!");
    navLinks.classList.toggle("show");
  });

  // Dropdown menu toggle (for mobile click functionality)
  const dropdownLinks = document.querySelectorAll('.dropdown > a');
  
  dropdownLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // Only prevent default and toggle on mobile/tablet
      if (window.innerWidth <= 768) {
        e.preventDefault();
        const dropdown = link.parentElement;
        
        // Close other dropdowns
        document.querySelectorAll('.dropdown').forEach(otherDropdown => {
          if (otherDropdown !== dropdown) {
            otherDropdown.classList.remove('active');
          }
        });
        
        // Toggle current dropdown
        dropdown.classList.toggle('active');
      }
      // On desktop, let the link work normally (hover still works)
    });
  });

  // Close dropdown and hamburger menu when clicking on any dropdown content link
  const dropdownContentLinks = document.querySelectorAll('.dropdown-content a');
  dropdownContentLinks.forEach(link => {
    link.addEventListener('click', () => {
      // Close all dropdowns
      document.querySelectorAll('.dropdown').forEach(dropdown => {
        dropdown.classList.remove('active');
      });
      // Close hamburger menu
      navLinks.classList.remove('show');
    });
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown')) {
      document.querySelectorAll('.dropdown').forEach(dropdown => {
        dropdown.classList.remove('active');
      });
    }
  });
});


function openModal(id) {
      document.getElementById(id).style.display = "flex";
    }
    function closeModal(id) {
      document.getElementById(id).style.display = "none";
    }
    window.onclick = function(e) {
      const modals = document.querySelectorAll('.modal');
      modals.forEach(modal => {
        if (e.target === modal) {
          modal.style.display = "none";
        }
      });
    }

// === Lightbox logic ===
document.querySelectorAll('.popup-img').forEach(img => {
  img.addEventListener('click', () => {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = img.src;
    lightbox.style.display = 'block';
  });
});



// === Support Widget Logic ===
document.addEventListener('DOMContentLoaded', () => {
  const supportIcon = document.getElementById('supportIcon');
  const supportFormContainer = document.getElementById('supportFormContainer');
  const supportClose = document.getElementById('supportClose');
  const supportForm = document.getElementById('supportForm');

  // Toggle form visibility
  if (supportIcon) {
    supportIcon.addEventListener('click', () => {
      supportFormContainer.classList.toggle('show');
    });
  }

  // Close form
  if (supportClose) {
    supportClose.addEventListener('click', () => {
      supportFormContainer.classList.remove('show');
    });
  }

  // Handle form submission
  if (supportForm) {
    supportForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('supportName').value.trim();
      const phone = document.getElementById('supportPhone').value.trim();
      const email = document.getElementById('supportEmail').value.trim();
      const question = document.getElementById('supportQuestion').value.trim();

      // Validate phone number (Malaysian format)
      const phoneRegex = /^01\d{8,9}$/;
      if (!phoneRegex.test(phone)) {
        alert('Sila masukkan nombor telefon yang sah (bermula dengan 01 dan 10-11 digit)');
        return;
      }

      // Create WhatsApp message
      const whatsappNumber = '601118558600'; // Your WhatsApp number (without + and spaces)
      let message = `*Pertanyaan Baru dari Website SMTAA*\n\n`;
      message += `👤 *Nama:* ${name}\n`;
      message += `📱 *Telefon:* ${phone}\n`;
      if (email) {
        message += `📧 *Email:* ${email}\n`;
      }
      message += `\n❓ *Soalan:*\n${question}`;

      // Encode message for URL
      const encodedMessage = encodeURIComponent(message);
      
      // Open WhatsApp with pre-filled message
      const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
      window.open(whatsappURL, '_blank');

      // Optional: Save to localStorage for record keeping
      const inquiry = {
        timestamp: new Date().toISOString(),
        name: name,
        phone: phone,
        email: email,
        question: question
      };

      // Get existing inquiries or create new array
      let inquiries = JSON.parse(localStorage.getItem('smtaaInquiries') || '[]');
      inquiries.push(inquiry);
      localStorage.setItem('smtaaInquiries', JSON.stringify(inquiries));

      // Reset form and close
      supportForm.reset();
      supportFormContainer.classList.remove('show');
      
      // Show success message
      alert('Terima kasih! Soalan anda akan dibuka di WhatsApp. Sila hantar mesej tersebut.');
    });
  }

  // Close form when clicking outside
  document.addEventListener('click', (e) => {
    if (supportFormContainer && 
        supportFormContainer.classList.contains('show') &&
        !supportFormContainer.contains(e.target) &&
        !supportIcon.contains(e.target)) {
      supportFormContainer.classList.remove('show');
    }
  });
});

// === Dropdown arrow toggle (Hubungi → FAQs) ===
document.addEventListener('DOMContentLoaded', () => {
  const dropdowns = document.querySelectorAll('.dropdown');

  dropdowns.forEach(dropdown => {
    const arrow = dropdown.querySelector('.dropdown-arrow');
    const link = dropdown.querySelector('a'); // "Hubungi"
    const content = dropdown.querySelector('.dropdown-content');

    if (arrow) {
      arrow.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        content.classList.toggle('active');
      });
    }

    // Ensure Hubungi link works normally on mobile
    link.addEventListener('click', (e) => {
      // Only apply this fix for small screens
      if (window.innerWidth <= 768) {
        // Let the browser navigate normally
        window.location.href = link.getAttribute('href');
      }
    });
  });
});

  const intro = document.getElementById("introScreen");
  const video = document.getElementById("introVideo");
  const startButton = document.getElementById("startButton");

  // Only run intro logic if the intro elements exist (home page)
  if (intro && startButton && video) {
    // Check session
    if (sessionStorage.getItem("introShown")) {
      intro.style.display = "none";
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
      startButton.addEventListener("click", () => {
        startButton.style.display = "none";
        video.style.display = "block";
        video.play().then(() => {
          video.volume = 1.0;
        }).catch(err => {
          console.log("Autoplay blocked:", err);
        });

        video.addEventListener("ended", () => {
          intro.style.transition = "opacity 1s ease";
          intro.style.opacity = "0";
          setTimeout(() => {
            intro.style.display = "none";
            document.body.style.overflow = "auto";
            sessionStorage.setItem("introShown", "true");
          }, 1000);
        });
      });
    }
  } else {
    // If intro elements are not present, ensure body can scroll
    document.body.style.overflow = document.body.style.overflow || 'auto';
  }

// Hide spinner after page load
    window.addEventListener('load', function() {
      setTimeout(function() {
        document.getElementById('spinner').classList.add('hidden');
      }, 1000);
    });

    // Add smooth interaction effects
    const flexSlides = document.querySelectorAll('.flex-slide');
    
    flexSlides.forEach(slide => {
      slide.addEventListener('mouseenter', function() {
        // Add active class for additional effects if needed
        this.classList.add('active');
      });
      
      slide.addEventListener('mouseleave', function() {
        this.classList.remove('active');
      });
    });

    // Mobile touch support
    if ('ontouchstart' in window) {
      flexSlides.forEach(slide => {
        slide.addEventListener('touchstart', function() {
          flexSlides.forEach(s => s.classList.remove('active'));
          this.classList.add('active');
        });
      });
    }

// Team Members Data - UPDATE THIS WITH YOUR ACTUAL TEAM INFO
const teamMembers = [
  { name: "John Doe", role: "Founder & CEO" },
  { name: "Jane Smith", role: "Director of Education" },
  { name: "Ali Khan", role: "Head of Operations" },
  { name: "Mary Lim", role: "Program Coordinator" },
  { name: "Sarah Johnson", role: "Academic Director" },
  { name: "Michael Chen", role: "Technology Lead" },
  { name: "Fatimah Ahmad", role: "Student Affairs" },
  { name: "David Lee", role: "Research Coordinator" },
  { name: "Aisha Rahman", role: "Communications Manager" },
  { name: "Robert Wong", role: "Finance Director" },
  { name: "Nurul Huda", role: "Program Developer" },
  { name: "James Anderson", role: "Quality Assurance" },
  { name: "Siti Aminah", role: "Community Relations" }
];

// Initialize carousel once DOM is ready and only if carousel exists on page
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.card');
  if (!cards || cards.length === 0) return; // nothing to do on pages without the carousel

  const dots = document.querySelectorAll('.dot');
  const memberName = document.querySelector('.member-name');
  const memberRole = document.querySelector('.member-role');
  const leftArrow = document.querySelector('.nav-arrow.left');
  const rightArrow = document.querySelector('.nav-arrow.right');
  let currentIndex = 0;
  let isAnimating = false;

  function updateCarousel(newIndex) {
    if (isAnimating) return;
    isAnimating = true;
    currentIndex = (newIndex + cards.length) % cards.length;

    cards.forEach((card, i) => {
      const offset = (i - currentIndex + cards.length) % cards.length;
      card.classList.remove('center', 'left-1', 'left-2', 'right-1', 'right-2', 'hidden');

      if (offset === 0) {
        card.classList.add('center');
        const v = card.querySelector('video');
        if (v) {
          v.muted = true; // allow autoplay on mobile
          v.loop = true;
          // playsinline attribute is reflected as playsInline property
          try { v.playsInline = true; } catch(_) {}
          try { v.play(); } catch(_) {}
        }
      } else if (offset === 1) {
        card.classList.add('right-1');
        const v = card.querySelector('video');
        if (v) { v.pause(); }
      } else if (offset === 2) {
        card.classList.add('right-2');
        const v = card.querySelector('video');
        if (v) { v.pause(); }
      } else if (offset === cards.length - 1) {
        card.classList.add('left-1');
        const v = card.querySelector('video');
        if (v) { v.pause(); }
      } else if (offset === cards.length - 2) {
        card.classList.add('left-2');
        const v = card.querySelector('video');
        if (v) { v.pause(); }
      } else {
        card.classList.add('hidden');
        const v = card.querySelector('video');
        if (v) { v.pause(); }
      }
    });

    if (dots && dots.length) {
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
    }

    if (memberName) memberName.style.opacity = '0';
    if (memberRole) memberRole.style.opacity = '0';

    setTimeout(() => {
      if (memberName) memberName.textContent = teamMembers[currentIndex].name;
      if (memberRole) memberRole.textContent = teamMembers[currentIndex].role;
      if (memberName) memberName.style.opacity = '1';
      if (memberRole) memberRole.style.opacity = '1';
    }, 300);

    setTimeout(() => {
      isAnimating = false;
    }, 800);
  }

  if (leftArrow) leftArrow.addEventListener('click', () => updateCarousel(currentIndex - 1));
  if (rightArrow) rightArrow.addEventListener('click', () => updateCarousel(currentIndex + 1));

  if (dots && dots.length) {
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => updateCarousel(i));
    });
  }

  cards.forEach((card, i) => {
    card.addEventListener('click', () => updateCarousel(i));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') updateCarousel(currentIndex - 1);
    else if (e.key === 'ArrowRight') updateCarousel(currentIndex + 1);
  });

  let touchStartX = 0;
  let touchEndX = 0;

  document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) updateCarousel(currentIndex + 1);
      else updateCarousel(currentIndex - 1);
    }
  }

  // Initialize
  updateCarousel(0);
});

// === Education Carousel Logic ===
document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.getElementById('education-carousel');
  if (!carousel) return; // Exit if carousel doesn't exist on this page

  const carouselCells = document.querySelectorAll('#education-carousel li');
  const carouselDots = document.querySelectorAll('#carousel-dots li');
  const prevBtn = document.querySelector('#education-carousel-nav .carousel-nav.prev');
  const nextBtn = document.querySelector('#education-carousel-nav .carousel-nav.next');
  let currentIndex = 0;

  // Only run if carousel exists
  if (carouselCells.length === 0) return;

  function updateCarousel() {
    // Remove all item classes from all cards
    carouselCells.forEach(card => {
      card.className = 'education-card'; // Reset to base class
    });

    // Apply positioning based on current index
    carouselCells.forEach((card, index) => {
      let position = index - currentIndex;
      
      // Wrap around for circular behavior
      if (position < -1) position += carouselCells.length;
      if (position > 1) position -= carouselCells.length;

      // Apply item classes based on position
      if (position === 0) {
        card.classList.add('item-1', 'featured'); // Center card gets featured class
      } else if (position === 1) {
        card.classList.add('item-2'); // Right
      } else if (position === -1) {
        card.classList.add('item-3'); // Left
      } else {
        card.classList.add('item-hidden'); // Hidden
      }
    });

    // Update dots
    carouselDots.forEach((dot, index) => {
      if (index === currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });

    console.log('Carousel updated to index:', currentIndex);
  }

  // Next button
  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      currentIndex = (currentIndex + 1) % carouselCells.length;
      updateCarousel();
      console.log('Next clicked, index now:', currentIndex);
    });
  }

  // Previous button
  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      currentIndex = (currentIndex - 1 + carouselCells.length) % carouselCells.length;
      updateCarousel();
      console.log('Prev clicked, index now:', currentIndex);
    });
  }

  // Card clicks
  carouselCells.forEach((cell, index) => {
    cell.addEventListener('click', (e) => {
      // Don't trigger if clicking on button
      if (e.target.classList.contains('card-btn') || e.target.closest('.card-btn')) {
        return;
      }
      currentIndex = index;
      updateCarousel();
    });
  });

  // Prevent button clicks from triggering card click
  const cardButtons = document.querySelectorAll('.education-card .card-btn');
  cardButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      // Add your button action here
      console.log('Button clicked');
    });
  });

  // Pagination dots
  carouselDots.forEach((dot, index) => {
    dot.addEventListener('click', (e) => {
      e.preventDefault();
      currentIndex = index;
      updateCarousel();
    });
  });

  // Left/Right arrow keys
  document.addEventListener('keydown', (e) => {
    if (e.keyCode === 37) { // Left arrow
      currentIndex = (currentIndex - 1 + carouselCells.length) % carouselCells.length;
      updateCarousel();
      e.preventDefault();
    } else if (e.keyCode === 39) { // Right arrow
      currentIndex = (currentIndex + 1) % carouselCells.length;
      updateCarousel();
      e.preventDefault();
    }
  });

  // Initialize
  updateCarousel();
  console.log('Education carousel initialized with', carouselCells.length, 'cards');

  // Sync career cards with carousel selection
  let cardsToShow = 3; // Start with 3 cards
  const cardsPerLoad = 3; // Load 3 more cards each time
  
  function updateCareerCards() {
    const institutions = ['smtaa', 'tvet', 'uitm', 'um', 'utm', 'uic'];
    const selectedInstitution = institutions[currentIndex];
    cardsToShow = 3; // Reset to 3 cards when changing institution
    
    // Add pulse animation to career section
    const careerSection = document.querySelector('.career-salary-section');
    if (careerSection) {
      careerSection.classList.add('updating');
      setTimeout(() => {
        careerSection.classList.remove('updating');
      }, 400);
    }
    
    // Get all career cards
    const allCareerCards = document.querySelectorAll('.career-salary-card');
    
    // Hide all cards first
    allCareerCards.forEach(card => {
      card.style.display = 'none';
      card.classList.remove('hidden-card');
    });
    
    // Show only cards for selected institution
    const selectedCards = document.querySelectorAll(`.career-salary-card[data-institution="${selectedInstitution}"]`);
    
    // Show cards up to cardsToShow, hide the rest
    selectedCards.forEach((card, index) => {
      card.style.display = 'flex';
      if (index >= cardsToShow) {
        card.classList.add('hidden-card');
      }
    });
    
    // Show/hide "Show More" button
    const showMoreContainer = document.getElementById('showMoreContainer');
    const showMoreBtn = document.getElementById('showMoreBtn');
    const showMoreText = document.getElementById('showMoreText');
    
    if (showMoreContainer && showMoreBtn) {
      if (selectedCards.length > 3) {
        showMoreContainer.style.display = 'block';
        showMoreBtn.classList.remove('expanded');
        
        // Check if there are more cards to show
        if (cardsToShow < selectedCards.length) {
          showMoreText.textContent = 'View More Opportunities';
          const icon = showMoreBtn.querySelector('i');
          if (icon) icon.className = 'fas fa-chevron-down';
        } else {
          showMoreText.textContent = 'Show Less';
          const icon = showMoreBtn.querySelector('i');
          if (icon) icon.className = 'fas fa-chevron-up';
          showMoreBtn.classList.add('expanded');
        }
      } else {
        showMoreContainer.style.display = 'none';
      }
    }
    
    console.log('Showing career cards for:', selectedInstitution, '(' + selectedCards.length + ' total)');
  }

  // Update career cards on carousel change
  const originalUpdateCarousel = updateCarousel;
  updateCarousel = function() {
    originalUpdateCarousel();
    updateCareerCards();
  };

  // Initialize career cards
  updateCareerCards();

  // Smooth scroll to career section when clicking indicator
  const scrollIndicator = document.getElementById('scrollIndicator');
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
      const careerSection = document.querySelector('.career-salary-section');
      if (careerSection) {
        careerSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  }

  // Hide scroll indicator when user scrolls past carousel
  window.addEventListener('scroll', () => {
    if (scrollIndicator) {
      const carouselSection = document.querySelector('.education-choices-section');
      if (carouselSection) {
        const carouselBottom = carouselSection.offsetTop + carouselSection.offsetHeight;
        const scrollPosition = window.scrollY + window.innerHeight;
        
        if (scrollPosition > carouselBottom + 100) {
          scrollIndicator.style.opacity = '0';
          scrollIndicator.style.pointerEvents = 'none';
        } else {
          scrollIndicator.style.opacity = '1';
          scrollIndicator.style.pointerEvents = 'auto';
        }
      }
    }
  });

  // Show More / Show Less button functionality
  const showMoreBtn = document.getElementById('showMoreBtn');
  if (showMoreBtn) {
    showMoreBtn.addEventListener('click', () => {
      const institutions = ['smtaa', 'tvet', 'uitm', 'um', 'utm', 'uic'];
      const selectedInstitution = institutions[currentIndex];
      const selectedCards = document.querySelectorAll(`.career-salary-card[data-institution="${selectedInstitution}"]`);
      const showMoreText = document.getElementById('showMoreText');
      const icon = showMoreBtn.querySelector('i');
      
      if (cardsToShow < selectedCards.length) {
        // Show 3 more cards
        cardsToShow += cardsPerLoad;
        
        selectedCards.forEach((card, index) => {
          if (index < cardsToShow) {
            card.classList.remove('hidden-card');
          }
        });
        
        // Check if all cards are now shown
        if (cardsToShow >= selectedCards.length) {
          showMoreBtn.classList.add('expanded');
          if (showMoreText) showMoreText.textContent = 'Show Less';
          if (icon) icon.className = 'fas fa-chevron-up';
        }
      } else {
        // Collapse back to 3 cards
        cardsToShow = 3;
        
        selectedCards.forEach((card, index) => {
          if (index >= cardsToShow) {
            card.classList.add('hidden-card');
          }
        });
        
        showMoreBtn.classList.remove('expanded');
        if (showMoreText) showMoreText.textContent = 'View More Opportunities';
        if (icon) icon.className = 'fas fa-chevron-down';
        
        // Scroll back to career section
        const careerSection = document.querySelector('.career-salary-section');
        if (careerSection) {
          careerSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  }

  // Touch swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;
  const minSwipeDistance = 50;

  if (carousel) {
    carousel.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    carousel.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const swipeDistance = touchEndX - touchStartX;
      
      if (Math.abs(swipeDistance) >= minSwipeDistance) {
        if (swipeDistance > 0) {
          // Swipe right - previous
          currentIndex = (currentIndex - 1 + carouselCells.length) % carouselCells.length;
        } else {
          // Swipe left - next
          currentIndex = (currentIndex + 1) % carouselCells.length;
        }
        updateCarousel();
      }
    }, { passive: true });
  }
});

// === Career Page Split Screen Logic ===
document.addEventListener('DOMContentLoaded', () => {
  const fulltimeBtn = document.getElementById('fulltimeBtn');
  const internshipBtn = document.getElementById('internshipBtn');
  const fulltimeForm = document.getElementById('fulltimeForm');
  const internshipForm = document.getElementById('internshipForm');
  const closeFulltimeForm = document.getElementById('closeFulltimeForm');
  const closeInternshipForm = document.getElementById('closeInternshipForm');

  // Exit if not on career page
  if (!fulltimeBtn || !internshipBtn) return;

  // Fulltime Apply Now - toggle form on right
  fulltimeBtn.addEventListener('click', () => {
    // Toggle fulltime form
    fulltimeForm.classList.toggle('active');
    // Close internship form if open
    internshipForm.classList.remove('active');
  });

  // Internship Apply Now - toggle form on left
  internshipBtn.addEventListener('click', () => {
    // Toggle internship form
    internshipForm.classList.toggle('active');
    // Close fulltime form if open
    fulltimeForm.classList.remove('active');
  });

  // Close Fulltime Form
  closeFulltimeForm.addEventListener('click', () => {
    fulltimeForm.classList.remove('active');
  });

  // Close Internship Form
  closeInternshipForm.addEventListener('click', () => {
    internshipForm.classList.remove('active');
  });

  // Helper function to convert file to Base64
  function toBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  // Form submissions
  const careerForms = document.querySelectorAll('.career-form');
  careerForms.forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Determine form type
      const isInternship = e.target.closest('#internshipForm');
      const isFulltime = e.target.closest('#fulltimeForm');
      const formType = isInternship ? 'Internship' : 'Fulltime';
      
      // Get current timestamp
      const now = new Date();
      const timestamp = now.toLocaleString('en-MY', { 
        timeZone: 'Asia/Kuala_Lumpur',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
      
      try {
        let data = {
          Timestamp: timestamp
        };
        
        let scriptURL = "";

        // Handle INTERNSHIP form
        if (isInternship) {
          scriptURL = "https://script.google.com/macros/s/AKfycbzqajm45pYtmTg0AqqGj2D7bYe2XR24W5dqL2u7nHCdisPrOATnDao91NLzzvN8VyKp/exec";
          
          data = {
            ...data,
            'Nama Penuh': e.target.querySelector('[name="Nama Penuh"]')?.value || '',
            Email: e.target.querySelector('[name="Email"]')?.value || '',
            IC: e.target.querySelector('[name="IC"]')?.value || '',
            Jantina: e.target.querySelector('[name="Jantina"]')?.value || '',
            'No. Tel': e.target.querySelector('[name="No. Tel"]')?.value || '',
            'No. Tel Kecemasan': e.target.querySelector('[name="No. Tel Kecemasan"]')?.value || '',
            'Alamat terkini': e.target.querySelector('[name="Alamat terkini"]')?.value || '',
            Institusi: e.target.querySelector('[name="Institusi"]')?.value || '',
            Jurusan: e.target.querySelector('[name="Jurusan"]')?.value || '',
            'Tarikh Lapor Diri': e.target.querySelector('[name="Tarikh Lapor Diri"]')?.value || '',
            'Tarikh Akhir': e.target.querySelector('[name="Tarikh Akhir"]')?.value || '',
            'Status Asrama': e.target.querySelector('[name="Status Asrama"]')?.value || ''
          };

          // Handle internship file uploads
          const resumeInput = e.target.querySelector('#int-resume');
          const transcriptInput = e.target.querySelector('#int-transcript');
          const replyInput = e.target.querySelector('#int-reply');

          if (resumeInput && resumeInput.files[0]) {
            const resumeFile = resumeInput.files[0];
            data['Resume'] = await toBase64(resumeFile);
            data['ResumeFileName'] = resumeFile.name;
          }

          if (transcriptInput && transcriptInput.files[0]) {
            const transcriptFile = transcriptInput.files[0];
            data['Transkrip Akademik'] = await toBase64(transcriptFile);
            data['Transkrip AkademikFileName'] = transcriptFile.name;
          }

          if (replyInput && replyInput.files[0]) {
            const replyFile = replyInput.files[0];
            data['Reply Form'] = await toBase64(replyFile);
            data['Reply FormFileName'] = replyFile.name;
          }
        }
        
        // Handle FULLTIME form
        else if (isFulltime) {
          // Replace this with your FULLTIME Google Sheets URL
          scriptURL = "https://script.google.com/macros/s/AKfycbxu9fQfNsOGogd_yDZ-W2aENqn8W-Ii2_TshBX03-RTg5wGwSIRpebIdzgmN2JwZVn2hQ/exec";
          
          data = {
            ...data,
            'Nama Penuh': e.target.querySelector('[name="Nama Penuh"]')?.value || '',
            Email: e.target.querySelector('[name="Email"]')?.value || '',
            IC: e.target.querySelector('[name="IC"]')?.value || '',
            Jantina: e.target.querySelector('[name="Jantina"]')?.value || '',
            'No. Tel': e.target.querySelector('[name="No. Tel"]')?.value || '',
            'No. Tel Kecemasan': e.target.querySelector('[name="No. Tel Kecemasan"]')?.value || '',
            Address: e.target.querySelector('[name="Address"]')?.value || '',
            'Work Experience': e.target.querySelector('[name="Work Experience"]')?.value || '',
            'Highest Qualification': e.target.querySelector('[name="Highest Qualification"]')?.value || '',
            'Hostel Status': e.target.querySelector('[name="Hostel Status"]')?.value || '',
            'Work Experience 1': e.target.querySelector('[name="Work Experience 1"]')?.value || '',
            'Work Experience 2': e.target.querySelector('[name="Work Experience 2"]')?.value || '',
            'Work Experience 3': e.target.querySelector('[name="Work Experience 3"]')?.value || ''
          };

          // Handle fulltime file upload (Resume/CV only)
          const resumeInput = e.target.querySelector('#ft-resume');
          if (resumeInput && resumeInput.files[0]) {
            const resumeFile = resumeInput.files[0];
            data['Resume'] = await toBase64(resumeFile);
            data['ResumeFileName'] = resumeFile.name;
          }
        }

        console.log('Sending data to Google Sheets:', data);

        // Send to Google Sheets and WAIT for response
        const response = await fetch(scriptURL, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'text/plain'
          }
        });

        console.log('Response received:', response);

        const result = await response.json();
        console.log('Result:', result);

        if (result.result === 'success') {
          alert('Thank you! Your application has been received. We will contact you soon.');
          
          // Reset form and close overlay AFTER success
          e.target.reset();
          fulltimeForm.classList.remove('active');
          internshipForm.classList.remove('active');
        } else {
          throw new Error(result.message || 'Submission failed');
        }
        
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('Maaf, terdapat masalah semasa menghantar permohonan. Sila cuba lagi.');
      }
    });
  });

  // Close form when clicking outside
  fulltimeForm.addEventListener('click', (e) => {
    if (e.target === fulltimeForm) {
      fulltimeForm.classList.remove('active');
    }
  });

  internshipForm.addEventListener('click', (e) => {
    if (e.target === internshipForm) {
      internshipForm.classList.remove('active');
    }
  });

  // ESC key to close forms
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      fulltimeForm.classList.remove('active');
      internshipForm.classList.remove('active');
    }
  });
});

// Parallax scroll effects for corporate shapes
    window.addEventListener('scroll', () => {
      const scrollPos = document.documentElement.scrollTop || document.body.scrollTop;
      const navbar = document.querySelector('#navbar');
      const welcomeSection = document.querySelector('#welcome-section');
      const shapes = document.querySelectorAll('.shape');

      // Navbar background on scroll
      if (scrollPos + 100 >= window.innerHeight) {
        navbar.classList.add('bg-active');
      } else {
        navbar.classList.remove('bg-active');
      }

      // Parallax shapes effect
      shapes.forEach((shape, index) => {
        if (scrollPos <= window.innerHeight) {
          const speed = 0.3 + (index * 0.1);
          shape.style.transform = `translateY(${scrollPos * speed}px) ${index === 1 ? 'rotate(45deg)' : ''}`;
        }
      });

      // Hide welcome section when scrolled past
      if (welcomeSection) {
        if (scrollPos - 100 <= window.innerHeight) {
          welcomeSection.style.visibility = 'visible';
        } else {
          welcomeSection.style.visibility = 'hidden';
        }
      }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });

    // Intersection Observer for business items animation
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, observerOptions);

    // Observe all business items
    document.querySelectorAll('.business-item').forEach(item => {
      itemObserver.observe(item);
    });

    // Add hover animation to cards
    const cards = document.querySelectorAll('.experience-card, .business-item');
    cards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 300ms cubic-bezier(0.77, 0, 0.175, 1)';
      });
    });

gsap.registerPlugin(ScrollTrigger);

    const sections = gsap.utils.toArray('.section-panel');
    const indicators = document.querySelectorAll('.indicator-dot');

    // Horizontal scroll animation for all devices - manual scroll control
    const horizontalTween = gsap.to('.horizontal-container', {
      xPercent: -200, // Move left by 200% to show all 3 sections
      ease: 'none',
      scrollTrigger: {
        trigger: '.horizontal-scroll-wrapper',
        pin: true,
        scrub: 1, // Manual scroll control - follows user scroll exactly
        end: () => '+=' + (window.innerHeight * 2), // Distance to reach last section
        onUpdate: (self) => {
          // When we reach 90% progress, freeze at last section
          if (self.progress >= 0.9) {
            horizontalTween.progress(1); // Lock horizontal position at last section
          }
        }
      }
    });

    // Create separate trigger for footer transition after horizontal scroll
    ScrollTrigger.create({
      trigger: '.horizontal-scroll-wrapper',
      start: () => 'bottom+=' + (window.innerHeight * 0.5) + ' bottom',
      end: () => 'bottom+=' + (window.innerHeight * 1.5) + ' bottom',
      pin: false,
      scrub: false,
      onEnter: () => {
        console.log('Ready for footer transition');
        // Keep last section active
        sections.forEach(s => s.classList.remove('active'));
        if (sections[2]) {
          sections[2].classList.add('active');
          updateIndicator(2);
        }
      }
    });

    // Update indicators and section activation with proper timing
    sections.forEach((section, i) => {
      ScrollTrigger.create({
        trigger: '.horizontal-scroll-wrapper',
        start: () => (i * 30) + '% top', // Adjusted timing for 3 sections
        end: () => i === sections.length - 1 ? '100% top' : ((i + 1) * 30 + 5) + '% top', // Last section stays active
        onEnter: () => {
          console.log(`Entering section ${i}`);
          updateIndicator(i);
          // Remove active from all sections first
          sections.forEach(s => s.classList.remove('active'));
          // Then add active to current section
          section.classList.add('active');
        },
        onEnterBack: () => {
          console.log(`Entering back section ${i}`);
          updateIndicator(i);
          sections.forEach(s => s.classList.remove('active'));
          section.classList.add('active');
        }
      });
    });    function updateIndicator(index) {
      indicators.forEach((dot, i) => {
        if (i === index) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }

    // Click indicators to scroll
    indicators.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        const scrollAmount = index * window.innerHeight * 0.8;
        window.scrollTo({
          top: scrollAmount,
          behavior: 'smooth'
        });
      });
    });

    // Ensure first section is active on load
    if (sections.length > 0) {
      sections[0].classList.add('active');
      updateIndicator(0);
    }

    // Handle window resize
    window.addEventListener('resize', () => {
      ScrollTrigger.refresh();
    });

    // Ensure footer appears only after the last section (Pembalakan) is fully shown
    ScrollTrigger.create({
      trigger: '.horizontal-scroll-wrapper',
      start: '95% top', // Very late trigger to ensure all content is seen
      end: 'bottom top',
      onEnter: () => {
        console.log('Showing footer');
        const footer = document.querySelector('footer');
        if (footer) {
          footer.style.display = 'block';
          footer.style.position = 'relative';
          footer.style.zIndex = '1';
        }
      },
      onLeaveBack: () => {
        const footer = document.querySelector('footer');
        if (footer && window.innerWidth > 768) {
          footer.style.position = 'absolute';
          footer.style.zIndex = '-1';
        }
      }
    });

// Portfolio Split Background Animation
if (document.querySelector('.bglinear')) {
  // Resolve brand purple from CSS variable to guarantee a single shade everywhere
  const BRAND_PURPLE = (getComputedStyle(document.documentElement).getPropertyValue('--brand-purple') || '').trim() || '#5a3c83';
  // Transition from page1 to page2 - rotate to 270deg during transition
  gsap.to(".bglinear", {
    scrollTrigger: {
      trigger: ".page2",
      scrub: true,
      start: "10% bottom",
      end: "50% 50%"
    },
    backgroundImage: `linear-gradient(270deg, #fff 50%, ${BRAND_PURPLE} 50%)`,
    duration: 3
  });

  // Page2 settled - back to 90deg but with criss-cross colors (purple left, white right)
  gsap.to(".bglinear", {
    scrollTrigger: {
      trigger: ".page2",
      scrub: true,
      start: "50% 50%",
      end: "80% 80%"
    },
    backgroundImage: `linear-gradient(90deg, ${BRAND_PURPLE} 50%, #fff 50%)`,
    duration: 3
  });

  // Transition from page2 to page3 - rotate to 270deg during transition
  gsap.to(".bglinear", {
    scrollTrigger: {
      trigger: ".page3",
      scrub: true,
      start: "10% bottom", 
      end: "50% 50%"
    },
    backgroundImage: `linear-gradient(270deg, ${BRAND_PURPLE} 50%, #fff 50%)`,
    duration: 3
  });

  // Page3 settled - back to 90deg with same colors as page1 (white left, purple right)
  gsap.to(".bglinear", {
    scrollTrigger: {
      trigger: ".page3",
      scrub: true,
      start: "50% 50%", 
      end: "80% 80%"
    },
    backgroundImage: `linear-gradient(90deg, #fff 50%, ${BRAND_PURPLE} 50%)`,
    duration: 3
  });

  // Footer transition
  gsap.to(".bglinear", {
    scrollTrigger: {
      trigger: "#footer",
      scrub: true,
      start: "10% bottom", 
      end: "50% bottom"
    },
    backgroundImage: `linear-gradient(90deg, #fff 50%, ${BRAND_PURPLE} 50%)`,
    duration: 3
  });

  // Add smooth scroll behavior for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Initialize Lenis smooth scroll
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true,
  gestureDirection: "vertical",
  smoothTouch: true,
  touchMultiplier: 2
});

function raf(time) {
  lenis.raf(time);
  ScrollTrigger.update();
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Set z-index for images
document.querySelectorAll(".arch__right .img-wrapper").forEach((element) => {
  const order = element.getAttribute("data-index");
  if (order !== null) {
    element.style.zIndex = order;
  }
});

// Mobile layout handler (only handle order)
function handleMobileLayout() {
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  const leftItems = gsap.utils.toArray(".arch__left .arch__info");
  const rightItems = gsap.utils.toArray(".arch__right .img-wrapper");

  if (isMobile) {
    // Interleave items using order
    leftItems.forEach((item, i) => {
      item.style.order = i * 2;
    });
    rightItems.forEach((item, i) => {
      item.style.order = i * 2 + 1;
    });
  } else {
    // Clear order for desktop
    leftItems.forEach((item) => {
      item.style.order = "";
    });
    rightItems.forEach((item) => {
      item.style.order = "";
    });
  }
}

// Debounce resize for performance
let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(handleMobileLayout, 100);
});

// Run on initial load
handleMobileLayout();

const imgs = gsap.utils.toArray(".img-wrapper img");
const bgColors = ["#EDF9FF", "#FFECF2", "#FFE8DB"];

// GSAP Animation with Media Query
ScrollTrigger.matchMedia({
  "(min-width: 769px)": function () {
    const mainTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".arch",
        start: "top top",
        end: "bottom-=100vh bottom",
        pin: ".arch__right",
        scrub: true
      }
    });

    // Set initial states for all images
    gsap.set(imgs, {
      clipPath: "inset(0)",
      objectPosition: "0px 0%"
    });

    // Set all images except the first to be completely clipped
    imgs.forEach((img, index) => {
      if (index > 0) {
        gsap.set(img, {
          clipPath: "inset(0px 0px 100%)"
        });
      }
    });

    imgs.forEach((_, index) => {
      const currentImage = imgs[index];
      const nextImage = imgs[index + 1] ? imgs[index + 1] : null;

      const sectionTimeline = gsap.timeline();

      if (nextImage) {
        sectionTimeline
          .to(
            "body",
            {
              backgroundColor: bgColors[index],
              duration: 0.2,
              ease: "power2.inOut"
            },
            0.3
          )
          .to(
            currentImage,
            {
              clipPath: "inset(0px 0px 100%)",
              objectPosition: "0px 60%",
              duration: 0.6,
              ease: "power2.inOut"
            },
            0.6
          )
          .fromTo(
            nextImage,
            {
              clipPath: "inset(0px 0px 100%)"
            },
            {
              clipPath: "inset(0)",
              objectPosition: "0px 40%",
              duration: 0.4,
              ease: "power2.inOut"
            },
            0.6
          );
      }

      mainTimeline.add(sectionTimeline);
    });
  },
  "(max-width: 768px)": function () {
    // Mobile: simpler & more interesting crossfade behavior tied to the left description
    const wrappers = gsap.utils.toArray(".arch__right .img-wrapper");
    const leftItems = gsap.utils.toArray(".arch__left .arch__info");

    // Ensure images are sized correctly for mobile and set initial visibility
    gsap.set(wrappers, { autoAlpha: 0 });
    if (wrappers[0]) gsap.set(wrappers[0], { autoAlpha: 1 });

    // When each description scrolls into center, fade the corresponding image in
    leftItems.forEach((left, i) => {
      const imageWrapper = wrappers[i];
      if (!imageWrapper) return;

      ScrollTrigger.create({
        trigger: left,
        start: "top center",
        end: "bottom center",
        onEnter: () => {
          gsap.to(wrappers, { autoAlpha: 0, duration: 0.25 });
          gsap.to(imageWrapper, { autoAlpha: 1, duration: 0.4, ease: "power2.out" });
          gsap.to("body", { backgroundColor: bgColors[i] || null, duration: 0.6, ease: "power2.inOut" });
        },
        onEnterBack: () => {
          gsap.to(wrappers, { autoAlpha: 0, duration: 0.25 });
          gsap.to(imageWrapper, { autoAlpha: 1, duration: 0.4, ease: "power2.out" });
          gsap.to("body", { backgroundColor: bgColors[i] || null, duration: 0.6, ease: "power2.inOut" });
        }
      });
    });
  }
});


// ===== Index Page Hero + Cards (no zoom) =====
(function initIndexPage() {
  const isIndex = document.body.classList.contains('index-page');
  if (!isIndex) return;

  gsap.registerPlugin(ScrollTrigger);

  // Simple hero entrance animation (non-pinned)
  const hero = document.querySelector('.hero-header');
  if (hero) {
    gsap.from('.hero-title', { y: 30, opacity: 0, duration: 0.6, ease: 'power2.out' });
    gsap.from('.hero-subtitle', { y: 20, opacity: 0, duration: 0.6, delay: 0.1, ease: 'power2.out' });
    gsap.from('.hero-cta a', { y: 10, opacity: 0, duration: 0.5, delay: 0.2, stagger: 0.1, ease: 'power2.out' });
  }

  // Animate in info cards immediately on page load
  const infoCards = document.querySelectorAll('.info-card');
  if (infoCards.length > 0) {
    gsap.from(infoCards, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      delay: 0.3,
      ease: 'power2.out'
    });
  }

  // No scroll indicator on static layout

  // Footer always clickable; no JS opacity/pointer-events changes
})();