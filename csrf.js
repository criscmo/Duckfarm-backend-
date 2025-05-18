document.addEventListener('DOMContentLoaded', async () => {
  const form = document.getElementById('csrfForm');
  const warning = document.getElementById('csrf-warning');
  
  // Fetch CSRF token and set to form
  const response = await fetch('/api/csrf-token');
  const data = await response.json();
  form.csrf_token.value = data.csrfToken;
  
  form.addEventListener('submit', function(e) {
    const token = form.csrf_token.value;
    if (!token) {
      e.preventDefault();
      warning.style.display = 'block';
    }
  });
});