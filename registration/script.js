const streetsByCity = {
  london: [
    'Oxford Street',
    'Baker Street',
    'Regent Street',
    'Bond Street',
    'Fleet Street',
    'Piccadilly',
    'Kings Road',
    'Abbey Road',
    'Carnaby Street',
    'Downing Street',
  ],
  poznan: [
    'Święty Marcin',
    'Garbary',
    'Półwiejska',
    'Głogowska',
    'Dąbrowskiego',
    'Fredry',
    'Ratajczaka',
    'Bukowska',
    'Krzywoustego',
    'Hetmańska',
  ],
  madrid: [
    'Gran Vía',
    'Calle Mayor',
    'Calle de Alcalá',
    'Paseo del Prado',
    'Calle de Serrano',
    'Calle de Atocha',
    'Calle de Fuencarral',
    'Calle de Velázquez',
    'Calle de Goya',
    'Calle de Hortaleza',
  ],
};
const form = document.getElementById('register-form');
const button = document.getElementById('reg');

const loginInput = document.getElementById('register-login');
const passwordInput = document.getElementById('register-password');
const password2Input = document.getElementById('register-password2');
const houseInput = document.getElementById('register-number');

const citySelect = document.getElementById('register-city');
const streetSelect = document.getElementById('register-street');

form.addEventListener('input', () => {
  clearErrors();

  const login = loginInput.value.trim();
  const password = passwordInput.value.trim();
  const password2 = password2Input.value.trim();

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
    showError(passwordInput, 'Minimum 6 characters and at least one special character.');
    valid = false;
  }

  if (password !== password2) {
    showError(password2Input, "The passwords don't match.");
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
  data.houseNumber = Number(data.houseNumber);

  try {
      const response = await fetch(
        "https://6kt29kkeub.execute-api.eu-central-1.amazonaws.com/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "accept": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Error: " + response.status);
      }

      const result = await response.json();
      console.log("✅ Successful registration", result);
      localStorage.setItem("accessToken", result.data.access_token);

      showToast('🎉 Registration was successful!', 'success');
    } catch (err) {
      console.error("❌ Send error:", err);
      alert("Error during registration");
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

citySelect.addEventListener('change', function () {
  const selectedCity = this.value;

  streetSelect.innerHTML =
    '<option value="" disabled selected>Select a street</option>';

  if (streetsByCity[selectedCity]) {
    streetsByCity[selectedCity].forEach((street) => {
      const option = document.createElement('option');
      option.value = street.toLowerCase().replace(/\s+/g, '-');
      option.textContent = street;
      streetSelect.appendChild(option);
    });
  }
});
