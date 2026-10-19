const formState = {
  email: '',
  message: '',
};

const STORAGE_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');

populateForm();

form.addEventListener('input', e => {
  const formData = new FormData(form);

  formState.email = (formData.get('email') || '').trim();
  formState.message = (formData.get('message') || '').trim();

  saveToLS(STORAGE_KEY, formState);
});

form.addEventListener('submit', e => {
  e.preventDefault();

  if (!formState.email || !formState.message) {
    alert('Fill please all fields');
    return;
  }

  console.log(formState);

  localStorage.removeItem(STORAGE_KEY);
  formState.email = '';
  formState.message = '';
  form.reset();
});

function populateForm() {
  const data = loadFromLS(STORAGE_KEY);

  if (data) {
    formState.email = data.email || '';
    formState.message = data.message || '';

    form.elements.email.value = formState.email;
    form.elements.message.value = formState.message;
  }
}

function saveToLS(key, value) {
  const data = JSON.stringify(value);
  localStorage.setItem(key, data);
}

function loadFromLS(key) {
  try {
    const json = localStorage.getItem(key);
    return json ? JSON.parse(json) : null;
  } catch (err) {
    console.log(err);
    return null;
  }
}
