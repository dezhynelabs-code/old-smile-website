/**
 * The Smile Hub - Authentic 2011 Web Interaction Script
 * Pure Vanilla JavaScript: Form Validations, Nav State, Accordion,
 * Treatment Modals, and Backend Integration Status Reporting.
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // =========================================================================
  // 1. DATA DICTIONARIES (Treatments & Doctor Presets)
  // =========================================================================
  var TREATMENT_DATA = {
    'general-dentistry': {
      title: 'General Dentistry & Preventive Care',
      desc: 'Our general dentistry services focus on early diagnostic screening, cavity prevention, and preserving your natural teeth through minimally invasive restorations.',
      steps: [
        'Comprehensive oral visual inspection & digital X-ray evaluation.',
        'Cavity detection and assessment of existing fillings.',
        'Gentle removal of decay using precision dental handpieces.',
        'Application of high-strength, tooth-colored composite resin.',
        'Bite adjustment and high-gloss polish for natural aesthetics.'
      ],
      benefits: [
        'Halts cavity progression and protects sensitive dental pulp.',
        'Restores natural tooth structure with seamless shade matching.',
        'Recommended checkup frequency: Every 6 months.'
      ],
      duration: '30 to 45 minutes',
      anesthesia: 'Local computer-assisted anesthesia (if required)',
      doctor: 'Dr. Priya Sharma'
    },
    'teeth-cleaning': {
      title: 'Teeth Cleaning & Ultrasonic Scaling',
      desc: 'Professional dental cleaning eliminates bacterial plaque, calculus (tartar), and surface stains that regular tooth brushing cannot reach.',
      steps: [
        'Periodontal probing to measure gingival pocket depths.',
        'Ultrasonic scaler vibrations to break down hard calculus deposits.',
        'Fine manual curette scaling along the subgingival gumline.',
        'Prophylaxis polishing with fluoride-rich paste for smooth enamel.',
        'Oral hygiene and flossing coaching tailored to your gums.'
      ],
      benefits: [
        'Prevents gingivitis and chronic periodontal gum disease.',
        'Eliminates chronic bad breath (halitosis) caused by trapped bacteria.',
        'Removes coffee, tea, and tobacco stains safely.'
      ],
      duration: '40 to 50 minutes',
      anesthesia: 'Usually none required (topical numbing gel on request)',
      doctor: 'Dr. Priya Sharma'
    },
    'dental-implants': {
      title: 'Permanent Titanium Dental Implants',
      desc: 'Dental implants are the gold standard for replacing missing teeth, functioning as synthetic titanium tooth roots anchored securely within the jawbone.',
      steps: [
        '3D OPG diagnostic scan & bone volume evaluation.',
        'Gentle surgical placement of grade-4 titanium fixture into jawbone.',
        'Osseointegration healing period (fixture fuses securely with bone).',
        'Abutment attachment and custom digital impression.',
        'Permanent cementation of custom-milled zirconia crown.'
      ],
      benefits: [
        '100% natural chewing efficiency and speech clarity.',
        'Prevents facial sagging and jawbone deterioration.',
        'Lifetime durability when maintained with routine cleaning.'
      ],
      duration: '60 minutes per fixture (multi-stage treatment)',
      anesthesia: 'Profound local anesthesia (completely painless)',
      doctor: 'Dr. Meera Raj'
    },
    'teeth-whitening': {
      title: 'In-Office Laser Teeth Whitening',
      desc: 'Our clinical power-bleaching procedure removes deep enamel discoloration caused by dietary stains, aging, and medication, brightening teeth up to 8 shades.',
      steps: [
        'Shade guide assessment to document baseline tooth color.',
        'Protective gingival barrier applied over gums to protect tissues.',
        'Professional hydrogen peroxide whitening gel applied to enamel.',
        'Specialized cool-wavelength accelerator light activates the gel.',
        'Post-treatment fluoride desensitizing gel applied.'
      ],
      benefits: [
        'Immediate, noticeable results in just one 45-minute appointment.',
        'Clinically proven safe for enamel and dental restorations.',
        'Includes complimentary touch-up advice and maintenance tips.'
      ],
      duration: '45 to 60 minutes',
      anesthesia: 'None required',
      doctor: 'Dr. Priya Sharma'
    },
    'root-canal': {
      title: 'Painless Rotary Root Canal Treatment',
      desc: 'When tooth decay reaches the interior nerve, a root canal saves the natural tooth by carefully removing infected tissue and sealing the sterile canal.',
      steps: [
        'Digital radiograph to map exact root canal anatomy.',
        'Complete painless local anesthesia administered.',
        'Isolation with hygienic rubber dam barrier.',
        'Nickel-titanium rotary files cleanse and shape internal root canals.',
        'Thermoplastic gutta-percha sealant and protective crown fitted.'
      ],
      benefits: [
        'Permanently relieves excruciating toothache and abscess infection.',
        'Preserves your natural chewing tooth instead of extraction.',
        'High 98% long-term clinical success rate.'
      ],
      duration: '45 to 60 minutes (single sitting in most cases)',
      anesthesia: 'Computerized local anesthesia (guaranteed painless)',
      doctor: 'Dr. Priya Sharma'
    },
    'braces': {
      title: 'Orthodontic Braces & Teeth Straightening',
      desc: 'Comprehensive corrective orthodontics designed to align crowded teeth, close gaps, fix overbites, and create a harmonious facial profile.',
      steps: [
        'Orthodontic diagnostic workup, facial photos, and digital models.',
        'Selection of bracket system (traditional metal, clear ceramic, or aligners).',
        'Precision bonding of orthodontic brackets to tooth surfaces.',
        'Insertion of flexible memory titanium archwires.',
        'Periodic 4-week adjustments and retention phase.'
      ],
      benefits: [
        'Achieves a straight, confident smile and balanced facial symmetry.',
        'Improves chewing mechanics and prevents uneven tooth wear.',
        'Options for aesthetic, nearly invisible ceramic brackets.'
      ],
      duration: '12 to 24 months total (individual visits ~30 mins)',
      anesthesia: 'None required (non-invasive procedure)',
      doctor: 'Dr. Arjun Kumar'
    }
  };

  // =========================================================================
  // 2. MOBILE NAVIGATION TOGGLE
  // =========================================================================
  var mobileToggle = document.getElementById('mobile-nav-toggle');
  var mainMenu = document.getElementById('main-menu');

  if (mobileToggle && mainMenu) {
    mobileToggle.addEventListener('click', function () {
      var isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
      mainMenu.classList.toggle('open');
    });

    // Close menu when a link is clicked on mobile
    var navLinks = mainMenu.querySelectorAll('.nav-link, .dropdown-link');
    for (var i = 0; i < navLinks.length; i++) {
      navLinks[i].addEventListener('click', function () {
        if (window.innerWidth <= 768) {
          mainMenu.classList.remove('open');
          mobileToggle.setAttribute('aria-expanded', 'false');
        }
      });
    }
  }

  // =========================================================================
  // 3. SET MINIMUM DATE RESTRICTION ON DATE PICKERS (No Past Dates)
  // =========================================================================
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();
  var minDateStr = yyyy + '-' + mm + '-' + dd;

  var apptDateInput = document.getElementById('appointment-date');
  if (apptDateInput) {
    apptDateInput.setAttribute('min', minDateStr);
  }

  var sbDateInput = document.getElementById('sb-date');
  if (sbDateInput) {
    sbDateInput.setAttribute('min', minDateStr);
  }

  // =========================================================================
  // 4. URL QUERY PARAMETER PRE-SELECTION FOR APPOINTMENT FORM
  // =========================================================================
  var urlParams = new URLSearchParams(window.location.search);
  var paramTreatment = urlParams.get('treatment');
  var paramDoctor = urlParams.get('doctor');

  if (paramTreatment) {
    var treatmentSelect = document.getElementById('appointment-treatment');
    if (treatmentSelect) {
      for (var p = 0; p < treatmentSelect.options.length; p++) {
        if (treatmentSelect.options[p].value.toLowerCase().indexOf(paramTreatment.toLowerCase()) !== -1) {
          treatmentSelect.selectedIndex = p;
          break;
        }
      }
    }
  }

  if (paramDoctor) {
    var doctorSelect = document.getElementById('appointment-doctor');
    if (doctorSelect) {
      for (var d = 0; d < doctorSelect.options.length; d++) {
        if (doctorSelect.options[d].value.toLowerCase().indexOf(paramDoctor.toLowerCase()) !== -1) {
          doctorSelect.selectedIndex = d;
          break;
        }
      }
    }
  }

  // 4b. ACTIVE NAVIGATION LINK ON MULTI-PAGE
  // =========================================================================
  var currentPath = window.location.pathname.split('/').pop() || 'index.html';
  var navItems = document.querySelectorAll('.nav-menu .nav-item');

  navItems.forEach(function (item) {
    var link = item.querySelector('a.nav-link');
    if (link) {
      var href = link.getAttribute('href');
      if (href === currentPath || (currentPath === '' && href === 'index.html')) {
        navItems.forEach(function (ni) { ni.classList.remove('active'); });
        item.classList.add('active');
      }
    }
  });

  // =========================================================================
  // 5. TREATMENT FILTER BUTTONS
  // =========================================================================
  var filterButtons = document.querySelectorAll('#treatment-filter-bar .filter-btn');
  var treatmentCards = document.querySelectorAll('.treatment-card');

  filterButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterButtons.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      var filter = btn.getAttribute('data-filter');

      treatmentCards.forEach(function (card) {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Global helper for filter triggers
  window.filterServices = function (serviceSlug) {
    var targetCard = document.getElementById('service-' + serviceSlug.replace('dental-', '').replace('teeth-', '').replace('-treatment', ''));
    if (targetCard) {
      filterButtons.forEach(function (b) { b.classList.remove('active'); });
      var allBtn = document.querySelector('#treatment-filter-bar .filter-btn[data-filter="all"]');
      if (allBtn) allBtn.classList.add('active');
      treatmentCards.forEach(function (c) { c.style.display = 'flex'; });
      targetCard.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // =========================================================================
  // 6. TREATMENT DETAILS MODAL POPUP
  // =========================================================================
  var modal = document.getElementById('treatment-modal');
  var modalCloseX = document.getElementById('modal-close-x');
  var modalCloseBtn = document.getElementById('modal-close-btn');
  var modalBookCta = document.getElementById('modal-book-cta');
  var modalTitle = document.getElementById('modal-service-title');
  var modalDesc = document.getElementById('modal-service-description');
  var modalSteps = document.getElementById('modal-steps-list');
  var modalBenefits = document.getElementById('modal-benefits-list');
  var modalDuration = document.getElementById('modal-duration');
  var modalAnesthesia = document.getElementById('modal-anesthesia');
  var modalDoctor = document.getElementById('modal-doctor');

  function openTreatmentModal(slug) {
    var data = TREATMENT_DATA[slug];
    if (!data || !modal) return;

    modalTitle.textContent = data.title;
    modalDesc.textContent = data.desc;
    modalDuration.textContent = data.duration;
    modalAnesthesia.textContent = data.anesthesia;
    modalDoctor.textContent = data.doctor;

    // Steps list
    modalSteps.innerHTML = '';
    data.steps.forEach(function (step) {
      var li = document.createElement('li');
      li.textContent = step;
      modalSteps.appendChild(li);
    });

    // Benefits list
    modalBenefits.innerHTML = '';
    data.benefits.forEach(function (benefit) {
      var li = document.createElement('li');
      li.textContent = benefit;
      modalBenefits.appendChild(li);
    });

    // Setup Book Button in modal
    modalBookCta.onclick = function (e) {
      e.preventDefault();
      closeTreatmentModal();
      var treatmentSelect = document.getElementById('appointment-treatment');
      if (treatmentSelect) {
        // Map slug to option
        for (var i = 0; i < treatmentSelect.options.length; i++) {
          if (treatmentSelect.options[i].text.toLowerCase().indexOf(slug.replace('-', ' ')) !== -1 ||
              treatmentSelect.options[i].value.toLowerCase().indexOf(slug.replace('-', ' ')) !== -1) {
            treatmentSelect.selectedIndex = i;
            break;
          }
        }
      }
      var apptSec = document.getElementById('appointment-section');
      if (apptSec) apptSec.scrollIntoView({ behavior: 'smooth' });
    };

    modal.style.display = 'flex';
  }

  function closeTreatmentModal() {
    if (modal) modal.style.display = 'none';
  }

  // Attach event to detail buttons
  document.querySelectorAll('.btn-detail').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var serviceSlug = btn.getAttribute('data-service');
      openTreatmentModal(serviceSlug);
    });
  });

  // Dropdown service links
  document.querySelectorAll('.dropdown-link').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var serviceSlug = link.getAttribute('data-treatment');
      if (serviceSlug && TREATMENT_DATA[serviceSlug]) {
        e.preventDefault();
        openTreatmentModal(serviceSlug);
      }
    });
  });

  if (modalCloseX) modalCloseX.addEventListener('click', closeTreatmentModal);
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeTreatmentModal);
  var modalBackdrop = modal ? modal.querySelector('.modal-backdrop') : null;
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeTreatmentModal);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal && modal.style.display === 'flex') {
      closeTreatmentModal();
    }
  });

  // =========================================================================
  // 7. PRESET FORM FROM DOCTOR AND SERVICE BUTTONS
  // =========================================================================
  // "Select Doctor" buttons
  document.querySelectorAll('.btn-select-doc').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      var docName = btn.getAttribute('data-doctor');
      var docSelect = document.getElementById('appointment-doctor');
      if (docSelect && docName) {
        for (var i = 0; i < docSelect.options.length; i++) {
          if (docSelect.options[i].value.indexOf(docName) !== -1) {
            docSelect.selectedIndex = i;
            break;
          }
        }
      }
      var apptSec = document.getElementById('appointment-section');
      if (apptSec) {
        apptSec.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // "Book Service" buttons
  document.querySelectorAll('.btn-book-service').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var serviceName = btn.getAttribute('data-service');
      var serviceSelect = document.getElementById('appointment-treatment');
      if (serviceSelect && serviceName) {
        for (var i = 0; i < serviceSelect.options.length; i++) {
          if (serviceSelect.options[i].value.indexOf(serviceName) !== -1) {
            serviceSelect.selectedIndex = i;
            break;
          }
        }
      }
      var apptSec = document.getElementById('appointment-section');
      if (apptSec) {
        apptSec.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // =========================================================================
  // 8. FAQ ACCORDION INTERACTION
  // =========================================================================
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    var question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', function () {
        var isOpen = item.classList.contains('open');

        // Optional: close other items for single-accordion style
        faqItems.forEach(function (other) {
          other.classList.remove('open');
        });

        if (!isOpen) {
          item.classList.add('open');
        }
      });
    }
  });

  // Open first FAQ by default
  if (faqItems.length > 0) {
    faqItems[0].classList.add('open');
  }

  // =========================================================================
  // 9. PRIMARY APPOINTMENT FORM VALIDATION & SUBMISSION
  // =========================================================================
  var appointmentForm = document.getElementById('appointment-form');
  var errorBox = document.getElementById('appointment-error-box');
  var errorList = document.getElementById('appointment-error-list');
  var successBox = document.getElementById('appointment-success-box');
  var successSummary = document.getElementById('appointment-success-summary');
  var demoRefBadge = document.getElementById('demo-ref-id');
  var btnResetAppointment = document.getElementById('btn-reset-appointment');
  var btnSubmitAppointment = document.getElementById('btn-submit-appointment');

  function clearAppointmentErrors() {
    if (errorBox) errorBox.style.display = 'none';
    if (errorList) errorList.innerHTML = '';
    document.querySelectorAll('.field-error-msg').forEach(function (el) {
      el.textContent = '';
    });
    document.querySelectorAll('.form-input, .form-select, .form-textarea').forEach(function (el) {
      el.classList.remove('input-error');
    });
  }

  if (appointmentForm) {
    appointmentForm.addEventListener('submit', function (e) {
      e.preventDefault();
      clearAppointmentErrors();

      var errors = [];
      var firstInvalidInput = null;

      // Validate Patient Name
      var nameInput = document.getElementById('patient-name');
      var nameVal = nameInput ? nameInput.value.trim() : '';
      if (!nameVal || nameVal.length < 2) {
        errors.push('Please enter your full legal name (minimum 2 characters).');
        if (nameInput) {
          nameInput.classList.add('input-error');
          document.getElementById('err-patient-name').textContent = 'Full name is required.';
          if (!firstInvalidInput) firstInvalidInput = nameInput;
        }
      }

      // Validate Phone Number (10 digits)
      var phoneInput = document.getElementById('patient-phone');
      var phoneVal = phoneInput ? phoneInput.value.replace(/[\s\-\(\)]/g, '') : '';
      var phoneRegex = /^[6-9]\d{9}$/; // Standard 10-digit mobile check
      if (!phoneVal || !phoneRegex.test(phoneVal)) {
        errors.push('Please enter a valid 10-digit mobile phone number starting with 6, 7, 8, or 9.');
        if (phoneInput) {
          phoneInput.classList.add('input-error');
          document.getElementById('err-patient-phone').textContent = 'Valid 10-digit phone number is required.';
          if (!firstInvalidInput) firstInvalidInput = phoneInput;
        }
      }

      // Validate Email
      var emailInput = document.getElementById('patient-email');
      var emailVal = emailInput ? emailInput.value.trim() : '';
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailVal || !emailRegex.test(emailVal)) {
        errors.push('Please provide a valid email address (e.g. name@example.com).');
        if (emailInput) {
          emailInput.classList.add('input-error');
          document.getElementById('err-patient-email').textContent = 'Valid email address is required.';
          if (!firstInvalidInput) firstInvalidInput = emailInput;
        }
      }

      // Validate Treatment
      var treatmentSelect = document.getElementById('appointment-treatment');
      var treatmentVal = treatmentSelect ? treatmentSelect.value : '';
      if (!treatmentVal) {
        errors.push('Please select a desired dental treatment.');
        if (treatmentSelect) {
          treatmentSelect.classList.add('input-error');
          document.getElementById('err-appointment-treatment').textContent = 'Please choose a treatment.';
          if (!firstInvalidInput) firstInvalidInput = treatmentSelect;
        }
      }

      // Validate Doctor
      var doctorSelect = document.getElementById('appointment-doctor');
      var doctorVal = doctorSelect ? doctorSelect.value : '';
      if (!doctorVal) {
        errors.push('Please select your preferred dentist or choose any available specialist.');
        if (doctorSelect) {
          doctorSelect.classList.add('input-error');
          document.getElementById('err-appointment-doctor').textContent = 'Please choose a preferred dentist.';
          if (!firstInvalidInput) firstInvalidInput = doctorSelect;
        }
      }

      // Validate Date
      var dateInput = document.getElementById('appointment-date');
      var dateVal = dateInput ? dateInput.value : '';
      if (!dateVal) {
        errors.push('Please choose a preferred appointment date.');
        if (dateInput) {
          dateInput.classList.add('input-error');
          document.getElementById('err-appointment-date').textContent = 'Appointment date is required.';
          if (!firstInvalidInput) firstInvalidInput = dateInput;
        }
      } else {
        var selectedDate = new Date(dateVal);
        var selectedDay = selectedDate.getDay();
        if (selectedDay === 0) { // Sunday
          errors.push('Our regular clinic is closed on Sundays (Emergency on-call only). Please select Monday to Saturday.');
          if (dateInput) {
            dateInput.classList.add('input-error');
            document.getElementById('err-appointment-date').textContent = 'Clinic is closed on Sundays.';
            if (!firstInvalidInput) firstInvalidInput = dateInput;
          }
        }
      }

      // Validate Time
      var timeSelect = document.getElementById('appointment-time');
      var timeVal = timeSelect ? timeSelect.value : '';
      if (!timeVal) {
        errors.push('Please select a preferred appointment time slot.');
        if (timeSelect) {
          timeSelect.classList.add('input-error');
          document.getElementById('err-appointment-time').textContent = 'Preferred time slot is required.';
          if (!firstInvalidInput) firstInvalidInput = timeSelect;
        }
      }

      // If Errors exist, display summary box and focus first invalid input
      if (errors.length > 0) {
        if (errorBox && errorList) {
          errorList.innerHTML = '';
          errors.forEach(function (err) {
            var li = document.createElement('li');
            li.textContent = err;
            errorList.appendChild(li);
          });
          errorBox.style.display = 'block';
          errorBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        if (firstInvalidInput) {
          firstInvalidInput.focus();
        }
        return;
      }

      // If valid, simulate realistic submission with backend integration indicator
      var notesVal = document.getElementById('appointment-notes') ? document.getElementById('appointment-notes').value.trim() : '';
      var refNumber = 'TSH-2011-' + Math.floor(1000 + Math.random() * 9000);

      // Disable submit button temporarily
      if (btnSubmitAppointment) {
        btnSubmitAppointment.disabled = true;
        btnSubmitAppointment.innerHTML = 'Submitting Request to Clinic System...';
      }

      setTimeout(function () {
        if (btnSubmitAppointment) {
          btnSubmitAppointment.disabled = false;
          btnSubmitAppointment.innerHTML = '<span class="btn-icon">&#10003;</span> Confirm &amp; Submit Appointment Request';
        }

        // Hide form and display success box with full details
        appointmentForm.style.display = 'none';

        if (successSummary) {
          successSummary.innerHTML =
            '<strong>Patient:</strong> ' + escapeHTML(nameVal) + '<br>' +
            '<strong>Contact:</strong> ' + escapeHTML(phoneVal) + ' | ' + escapeHTML(emailVal) + '<br>' +
            '<strong>Treatment:</strong> ' + escapeHTML(treatmentVal) + '<br>' +
            '<strong>Doctor:</strong> ' + escapeHTML(doctorVal) + '<br>' +
            '<strong>Scheduled Slot:</strong> ' + escapeHTML(dateVal) + ' at ' + escapeHTML(timeVal) + '<br>' +
            (notesVal ? '<strong>Patient Notes:</strong> ' + escapeHTML(notesVal) + '<br>' : '');
        }

        if (demoRefBadge) {
          demoRefBadge.textContent = refNumber;
        }

        if (successBox) {
          successBox.style.display = 'flex';
          successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        // Save into sessionStorage
        try {
          var bookingRecord = {
            ref: refNumber,
            name: nameVal,
            phone: phoneVal,
            email: emailVal,
            treatment: treatmentVal,
            doctor: doctorVal,
            date: dateVal,
            time: timeVal,
            notes: notesVal,
            createdAt: new Date().toISOString()
          };
          sessionStorage.setItem('smilehub_last_booking', JSON.stringify(bookingRecord));
        } catch (e) {
          // ignore storage quota issues
        }
      }, 700);
    });
  }

  if (btnResetAppointment) {
    btnResetAppointment.addEventListener('click', function () {
      if (appointmentForm) {
        appointmentForm.reset();
        appointmentForm.style.display = 'block';
      }
      if (successBox) successBox.style.display = 'none';
      clearAppointmentErrors();
    });
  }

  // =========================================================================
  // 10. SIDEBAR QUICK BOOKING WIDGET FORM
  // =========================================================================
  var sidebarForm = document.getElementById('sidebar-quick-form');
  var sidebarAlert = document.getElementById('sb-alert');

  if (sidebarForm) {
    sidebarForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = document.getElementById('sb-name').value.trim();
      var phone = document.getElementById('sb-phone').value.trim();
      var treatment = document.getElementById('sb-treatment').value;
      var date = document.getElementById('sb-date').value;

      if (!name || !phone || !treatment || !date) {
        if (sidebarAlert) {
          sidebarAlert.style.display = 'block';
          sidebarAlert.className = 'sidebar-alert alert-error';
          sidebarAlert.textContent = 'Please fill in all quick booking fields.';
        }
        return;
      }

      if (sidebarAlert) {
        sidebarAlert.style.display = 'block';
        sidebarAlert.className = 'sidebar-alert alert-success';
        sidebarAlert.innerHTML =
          '<strong>Callback Requested!</strong><br>' +
          'Ref: <code>SB-' + Math.floor(100 + Math.random() * 900) + '</code>. ' +
          'Our desk will call ' + escapeHTML(phone) + ' shortly to confirm. (Backend endpoint: <code>POST /api/quick-lead</code>)';
      }

      sidebarForm.reset();
    });
  }

  // =========================================================================
  // 11. GENERAL CONTACT / INQUIRY FORM
  // =========================================================================
  var contactForm = document.getElementById('general-contact-form');
  var contactFeedback = document.getElementById('contact-feedback-box');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = document.getElementById('contact-name').value.trim();
      var email = document.getElementById('contact-email').value.trim();
      var phone = document.getElementById('contact-phone').value.trim();
      var msg = document.getElementById('contact-message').value.trim();

      if (!name || !email || !phone || !msg) {
        alert('Please fill out all contact inquiry fields.');
        return;
      }

      if (contactFeedback) {
        contactFeedback.style.display = 'block';
        contactFeedback.innerHTML =
          '<strong>Thank you, ' + escapeHTML(name) + '!</strong> Your inquiry has been logged. ' +
          'Our front desk coordinator will respond to ' + escapeHTML(email) + ' within 2 business hours. ' +
          '(Integration note: In production, this dispatches via <code>POST /api/inquiries</code> or SMTP service.)';
        contactFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      contactForm.reset();
    });
  }

  // =========================================================================
  // 12. BACK TO TOP BUTTON
  // =========================================================================
  var backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', function () {
      var scrolled = window.pageYOffset || document.documentElement.scrollTop;
      if (scrolled > 260) {
        backToTopBtn.style.display = 'block';
      } else {
        backToTopBtn.style.display = 'none';
      }
    });

    backToTopBtn.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Helper escape function
  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, function (tag) {
      return ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag);
    });
  }
});
