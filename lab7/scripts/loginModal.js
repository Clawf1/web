document.addEventListener('DOMContentLoaded', () => {
    const authForm = document.getElementById('auth-form');
    const authMessage = document.getElementById('auth-message');

    authForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const username = event.target.username.value;
        const password = event.target.password.value;

        if (username === "user" && password === "password") {
            authMessage.textContent = "Вход выполнен успешно!";
            authMessage.style.color = "#28a745";
            setTimeout(() => {
                window.location.href = "index.html";
            }, 1500);
        } else {
            authMessage.textContent = "Неверный логин или пароль.";
            authMessage.style.color = "#FF4B4B";
        }
    });
});
