const loginButton = document.getElementById("login-signup-form-submit");


loginButton.addEventListener("click", (e) => {
  const loginForm = document.getElementById("login-signup-form");
  e.preventDefault();
  let userInfo = {};
  userInfo.user_id = loginForm.user_id.value;
  userInfo.password = loginForm.password.value;
  axios.post('http://localhost:3000/api/v1/user/login', userInfo)
  .then( res => {
    sessionStorage.setItem('session', JSON.stringify(res.data.session));
    sessionStorage.setItem('session_id', res.data.session.session_id);
    window.location = "http://localhost:3000/"
  })
  .catch(err => {console.log(err);
    const errBox = document.getElementById('login-signup-error-msg-holder');
    let el = document.createElement('p');
    el.setAttribute("id",'login-signup-error-msg');
    el.innerHTML = err.response.data.error;
    errBox.appendChild(el);
  });
})
