document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let message = document.getElementById("message");

    // Проверки на введенные данные
    if (username.length < 3) {
        message.textContent = "Логин должен содержать минимум 3 символа";
        return;
    }
    if (!email.includes("@")) {
        message.textContent = "Введите корректный email";
        return;
    }
    if (password.length < 6) {
        message.textContent = "Пароль должен быть минимум 6 символов";
        return;
    }

    message.textContent = "Загрузка...";

    // Отправка данных на сервер
    fetch("http://localhost:3000/register", {  // Изменили URL на наш локальный сервер
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === "Регистрация успешна!") {
            message.style.color = "green";
            message.textContent = "Регистрация успешна!";
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
