// FAQ accordion
document.querySelectorAll('.faq-item').forEach((item) => {
  const question = item.querySelector('.faq-question');
  question.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');

    document.querySelectorAll('.faq-item.open').forEach((openItem) => {
      if (openItem !== item) {
        openItem.classList.remove('open');
        openItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      }
    });

    item.classList.toggle('open', !isOpen);
    question.setAttribute('aria-expanded', String(!isOpen));
  });
});

// Contact form validation + simulated submit
const form = document.getElementById('contact-form');
const feedback = document.getElementById('form-feedback');

function setError(field, message) {
  const wrapper = field.closest('.form-field');
  const errorEl = wrapper ? wrapper.querySelector('.field-error') : null;
  if (wrapper) wrapper.classList.toggle('has-error', Boolean(message));
  if (errorEl) errorEl.textContent = message || '';
}

function validateForm() {
  let isValid = true;

  const firstname = form.firstname;
  const lastname = form.lastname;
  const email = form.email;
  const subject = form.subject;
  const message = form.message;
  const terms = form.terms;

  [firstname, lastname, subject].forEach((field) => {
    if (!field.value.trim()) {
      setError(field, I18N.t('form.required'));
      isValid = false;
    } else {
      setError(field, '');
    }
  });

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.value.trim()) {
    setError(email, I18N.t('form.required'));
    isValid = false;
  } else if (!emailPattern.test(email.value.trim())) {
    setError(email, I18N.t('form.invalid-email'));
    isValid = false;
  } else {
    setError(email, '');
  }

  if (!message.value.trim()) {
    setError(message, I18N.t('form.message-required'));
    isValid = false;
  } else {
    setError(message, '');
  }

  if (!terms.checked) {
    feedback.textContent = I18N.t('form.terms-required');
    feedback.className = 'form-feedback error';
    isValid = false;
  }

  return isValid;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!validateForm()) {
    if (form.terms.checked) {
      feedback.textContent = I18N.t('form.check-fields');
      feedback.className = 'form-feedback error';
    }
    return;
  }

  feedback.textContent = I18N.t('form.sent');
  feedback.className = 'form-feedback success';
  form.reset();
});

// Messages already on screen are cleared when the language changes
document.addEventListener('i18n:change', () => {
  form.querySelectorAll('.form-field').forEach((field) => field.classList.remove('has-error'));
  form.querySelectorAll('.field-error').forEach((error) => { error.textContent = ''; });
  feedback.textContent = '';
  feedback.className = 'form-feedback';
});

// Complaints book: opened from the footer. It is validated here and not sent to a server.
const complaintsDialog = document.getElementById('complaints-dialog');
const complaintsForm = document.getElementById('complaints-form');
const complaintsFeedback = document.getElementById('complaints-feedback');

function clearComplaintsForm() {
  [complaintsForm.fullname, complaintsForm.email, complaintsForm.detail].forEach((field) => setError(field, ''));
  complaintsFeedback.textContent = '';
  complaintsFeedback.className = 'form-feedback';
}

document.addEventListener('click', (event) => {
  if (event.target.closest('[data-open-complaints]')) {
    event.preventDefault();
    clearComplaintsForm();
    complaintsDialog.showModal();
  } else if (event.target.closest('[data-close-complaints]') || event.target === complaintsDialog) {
    complaintsDialog.close();
  }
});

complaintsForm.addEventListener('submit', (event) => {
  event.preventDefault();
  let valid = true;
  [complaintsForm.fullname, complaintsForm.email, complaintsForm.detail].forEach((field) => {
    let message = '';
    if (!field.value.trim()) message = I18N.t('form.required');
    else if (!field.checkValidity()) message = I18N.t('form.invalid-email');
    setError(field, message);
    if (message) valid = false;
  });
  if (!valid) {
    complaintsFeedback.textContent = I18N.t('form.check-fields');
    complaintsFeedback.className = 'form-feedback error';
    return;
  }
  complaintsFeedback.textContent = I18N.t('complaints.success');
  complaintsFeedback.className = 'form-feedback success';
  complaintsForm.reset();
});

// The complaints book can also be opened from the other pages through index.html#complaints
if (location.hash === '#complaints') {
  clearComplaintsForm();
  complaintsDialog.showModal();
}
