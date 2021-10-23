  // hide all divs
  document.getElementById("signup-wrapper").style.display = "none";
  document.getElementById("forgot-wrapper").style.display = "none";

  // Handle buttons to dynamic login
  const loadLoginBtn = document.getElementById("loadLoginBtn");

  loadLoginBtn.addEventListener("click", () => {
    document.getElementById("login-wrapper").style.display = "initial";
    document.getElementById("signup-wrapper").style.display = "none";
    document.getElementById("forgot-wrapper").style.display = "none";

    document.getElementById("login-foot").style.display = "initial";
  });

  const loadSignupBtn = document.getElementById("loadSignupBtn");

  loadSignupBtn.addEventListener("click", () => {
    document.getElementById("login-wrapper").style.display = "none";
    document.getElementById("signup-wrapper").style.display = "initial";
    document.getElementById("forgot-wrapper").style.display = "none";

    document.getElementById("login-foot").style.display = "none";
  });

  const loadForgotBtn = document.getElementById("login-foot").querySelector("#loadforgotBtn");

  loadForgotBtn.addEventListener("click", () => {
    document.getElementById("login-wrapper").style.display = "none";
    document.getElementById("signup-wrapper").style.display = "none";
    document.getElementById("forgot-wrapper").style.display = "initial";

    document.getElementById("login-foot").style.display = "none";
  });