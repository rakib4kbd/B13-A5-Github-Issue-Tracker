const signIn = () => {
  const username = document.getElementById("username_input").value;
  const password = document.getElementById("password_input").value;

  if (username === "admin" && password === "admin123") {
    windowRedirectorBtn("main.html");
  } else loginToaster(false);
};

const windowRedirectorBtn = (url) => {
  window.location.href = url;
};

const loginToaster = (status) => {
  const toaster = document.getElementById("login_toaster");
  toaster.innerHTML = "";
  const element = document.createElement("div");
  element.classList.add("alert", "alert-warning");
  if (status) {
    element.innerText = "200 Logged In";
  } else element.innerText = "401 Failed";

  toaster.appendChild(element);

  setTimeout(() => {
    toaster.removeChild(element);
  }, 3000);
};
