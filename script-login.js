document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let message = document.getElementById("message");

    // Проверки на введенные данные
    if (!email.includes("@")) {
        message.textContent = "Введите корректный email";
        return;
    }
    if (password.length < 6) {
        message.textContent = "Пароль должен быть минимум 6 символов";
        return;
    }

    message.textContent = "Загрузка...";

    // Отправка данных на сервер для авторизации
    fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === "Авторизация успешна!") {
            message.style.color = "green";
            message.textContent = "Авторизация успешна!";
            // Перенаправление на страницу, например:
            // window.location.href = "/dashboard";
        } else {
            message.style.color = "red";
            message.textContent = "Ошибка: " + data.error;
        }
    })
    .catch(error => {
        message.style.color = "red";
        message.textContent = "Ошибка сети!";
    });
});
