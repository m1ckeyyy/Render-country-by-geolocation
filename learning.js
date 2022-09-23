const getUserData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('1. get user data');
      resolve();
    }, 800);
  });
};
const validateData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('2. validate');
      resolve();
    }, 900);
  });
};
const registerUser = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('3. register');
      resolve();
    }, 400);
  });
};
const sendEmail = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('4. send email');
      reject('email error');
    }, 200);
  });
};
getUserData()
  .then(validateData)
  .then(registerUser)
  .then(sendEmail)
  .then(() => {
    console.log('end!');
  })
  .catch(err => {
    console.log('error: ', err);
  });
console.log('===============');

let i,
  word = '';
function reverseWords(str) {
  str = str.split(' ');
  str.forEach(e => (word += e.split('').reverse().join('') + ' '));

  return word.slice(0, -1);
}
console.log(
  reverseWords(
    'random  is  avoid  always  hardocoded  This  rule!  a  should  Kata  tests  case  have  to  solution.'
  )
);
