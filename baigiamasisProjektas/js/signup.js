const username = document.querySelector('#username');
const password = document.querySelector('#password');
const email = document.querySelector('#email');
const submit = document.querySelector('#submit');

const data = () => {
fetch('https://testapi.io/api/edma2005/resource/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    "email": `${email.value}`,
    "password": `${password.value}`
  })
})
.then(response => response.json())
.then(data => {
  alert('Registration Succesful! Wish you great shopping!');
  location.href = 'index.html';
  console.log('Success:', data);
})
.catch((error) => {
  console.error('Error:', error);
});
};
submit.addEventListener('click', data);