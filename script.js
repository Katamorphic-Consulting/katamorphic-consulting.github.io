(function () {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  // Before unload warning only if the contact form has user input
  const form = document.getElementById('contact-form');
  if (!form) return;

  let isDirty = false;
  const inputs = form.querySelectorAll('input, textarea');

  inputs.forEach((el) => {
    const handler = () => {
      if (el.type === 'email' || el.type === 'text' || el.tagName === 'TEXTAREA') {
        if (el.value && el.value.trim().length > 0) {
          isDirty = true;
        }
      }
    };
    el.addEventListener('input', handler);
    el.addEventListener('change', handler);
  });

  window.addEventListener('beforeunload', (e) => {
    if (!isDirty) return;
    e.preventDefault();
    e.returnValue = '';
  });

  // Reset dirty state on submit success path
  form.addEventListener('submit', () => {
    isDirty = false;
  });
})();



