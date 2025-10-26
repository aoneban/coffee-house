const form = document.getElementById('login-form');
const button = document.getElementById('logIn');

const loginInput = document.getElementById('login-input');
const passwordInput = document.getElementById('login-password');

form.addEventListener('input', () => {
  clearErrors();

  const login = loginInput.value.trim();
  const password = passwordInput.value.trim();

  let valid = true;

  const loginRegex = /^[A-Za-z][A-Za-z0-9]{2,}$/;
  if (!loginRegex.test(login)) {
    showError(
      loginInput,
      'Minimum 3 characters, start with a letter, English letters only.'
    );
    valid = false;
  }

  const passwordRegex = /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{6,}$/;
  if (!passwordRegex.test(password)) {
    showError(
      passwordInput,
      'Minimum 6 characters and at least one special character.'
    );
    valid = false;
  }

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  const allFilled = Object.values(data).every((value) => value.trim() !== '');
  if (!allFilled) valid = false;

  button.disabled = !valid;
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  console.log('✅ Send data:', data);

  try {
    const response = await fetch(
      'https://6kt29kkeub.execute-api.eu-central-1.amazonaws.com/auth/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error('Error: ' + response.status);
    }

    const result = await response.json();
    console.log('✅ Successful login', result);
    localStorage.setItem('accessToken', result.data.access_token);
    setTimeout(() => {
      window.location.href = '../menu/index.html';
    }, 2000);

    showToast('🎉 Login was successful!', 'success');
  } catch (err) {
    console.error('❌ Send error:', err);
    showToast('❌ Login was not successful!', 'error');
  }

  form.reset();
  button.disabled = true;
});

function showError(input, message) {
  const errorEl = input.parentElement.querySelector('.error-message');
  input.classList.add('error');
  if (errorEl) errorEl.textContent = message;
}

function clearErrors() {
  form
    .querySelectorAll('.error-message')
    .forEach((msg) => (msg.textContent = ''));
  form.querySelectorAll('.error').forEach((el) => el.classList.remove('error'));
}

// === Toast messages ===
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.classList.add('toast', `toast-${type}`);
  toast.textContent = message;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('show');
  }, 100);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
