var $ = function(param) {
  return document.querySelector(param);
};
var isLogin = false;
function login() {
  var username = $('#inputUserName');
  var userpassword = $('#inputUserPassword');
  if (!username.value) {
    alert('Please enter username');
    return;
  } else if (!userpassword.value) {
    alert('Please enter password');
    return;
  }
  isLogin = true;
  var reqUrl = 'http://localhost:3000/userLogin';
  axios.post(reqUrl, {
    data: {
      'username': username.value,
      'userpassword': userpassword.value,
    },
  }).then((res) => {
    if (res.data.code === 0) {
      window.localStorage.setItem('_id', res.data.data._id);
      window.localStorage.setItem('_info', JSON.stringify(res.data.data));
      window.location.href = window.location.origin + '/home';
    } else {
      alert(res.data.msg);
    }
    isLogin = false;
  });
}

window.onload = function() {
  var loginBtn = $('#btnSubmit');
  loginBtn.addEventListener('click', function() {
    if (isLogin) return;
    login();
  });
};
