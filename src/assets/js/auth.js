import '../css/pages/auth.css';
import { user } from './list'

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".auth-form");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    
    const login = document.getElementById("login").value;
    const password = document.getElementById("password").value;

    if (user.login === login && user.password === password) {
      const token = Math.random().toString(36).substr(2);
      localStorage.setItem("authToken", token);
      window.location.href = "../todo";
      return;
    } 
    alert("Неверные учетные данные");
  });
});