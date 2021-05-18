const url = 'https://vue3-course-api.hexschool.io/'; 
const path = 'wu9zo4s'; 
const emailInput = document.querySelector('#username');
const pwInput = document.querySelector('#password');
const loginBtn = document.querySelector('#login');

loginBtn.addEventListener('click', login);
  function login() {
    const username = emailInput.value;
    const password = pwInput.value;
    const user = {
      username,
      password
    }
    console.log(user);
    axios.post(`${url}admin/signin`, user)
      .then((res) => {
        const token = res.data.token;
        const expired = res.data.expired;
        document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;
        
        if(res.data.success == true){
            window.location.href='/product.html';
        }else if(res.data.success == false){
            alert('請重新輸入');
        } 
    });
  }