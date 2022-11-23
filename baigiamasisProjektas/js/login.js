// async function getUsers() {
//   try {
//       let res = await fetch('https://testapi.io/api/edma2005/resource/users');
//       return await res.json();
//   } catch (error) {
//       console.log(error);
//   }
// }
// console.log(getUsers());

// const getData = () => {
//   fetch('https://testapi.io/api/edma2005/resource/users',
// {
//   method: 'GET',
//   headers: {
//     'Content-Type':
//     'application/json'
//   }
// })
// .then((response) => {
//   if (response.ok) {
//     return response.json();
//     // location.href = 'index.html';
//   }
// })
// .then((result) => {
//   console.log('Data got from GET: ', result.data);
//   return result.data;
// })
// .then((data)=>{
//   console.log('Type or data getting: ', typeof data);
//   sessionStorage.setItem("users", JSON.stringify(data));
// })
// .catch(error => {
//   console.log(error);
// });
// };
// getData();


const emailLogin = document.querySelector('#emailLogin');
const passwordLogin = document.querySelector('#passwordLogin');
const submitLogin = document.querySelector('#submitLogin');

const getUser = () => {
  fetch('https://testapi.io/api/edma2005/resource/users',
  {
   method: 'GET',
   headers: {
   'Content-Type':
   'application/json'
   }
   })
  
   .then((response) => {
     if (response.ok) {
       return response.json();
     }
   })  
    .then(data => {
     console.log(data);
     return data.data;
   }).then(users => {
     console.log(users);
     sessionStorage.setItem("users", JSON.stringify(users));
   });
 };
 
 getUser();