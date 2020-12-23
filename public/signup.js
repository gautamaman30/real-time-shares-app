const signupButton = document.getElementById("login-signup-form-submit");


signupButton.addEventListener("click", (e) => {
  const signupForm = document.getElementById("login-signup-form");
  e.preventDefault();
  let userInfo = {};
  userInfo.name = signupForm.name.value;
  userInfo.password = signupForm.password.value;
  userInfo.confirm_password = signupForm.confirm_password.value;
  axios.post('http://localhost:3000/api/v1/user/signup', userInfo)
  .then( res => {
    sessionStorage.setItem('session', JSON.stringify(res.data.session));
    sessionStorage.setItem('session_id', res.data.session.session_id);
    window.location = "http://localhost:3000/";
  })
  .catch(err =>{
    const errBox = document.getElementById('login-signup-error-msg-holder');
    let el = document.createElement('p');
    el.setAttribute("id",'login-signup-error-msg');
    el.innerHTML = err.response.data.error;
    errBox.appendChild(el);
  });
});
