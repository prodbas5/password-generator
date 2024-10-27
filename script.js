function generatePassword(length = 12, options) {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const specialChars = '!@#$%^&*()_+{}[]<>?';
    let customChars = document.getElementById('customChars').value; // Получаем пользовательские символы

    let characters = '';
    if (options.includeLowercase) characters += lowercase;
    if (options.includeUppercase) characters += uppercase;
    if (options.includeNumbers) characters += numbers;
    if (options.includeSpecialChars) characters += specialChars;
    if (customChars) characters += customChars; // Добавляем пользовательские символы

    if (!characters) return 'Выберите хотя бы один тип символов';

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }

    return password;
}

function evaluatePasswordStrength(password) {
    let strength = 0;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    if (password.length >= 12) strength += 1;

    const strengthBar = document.getElementById('passwordStrength');
    strengthBar.className = 'strength-bar'; // Сбрасываем класс

    // Убираем предыдущие классы перед добавлением нового
    strengthBar.classList.remove('low', 'medium', 'high', 'very-high');

    if (strength <= 1) {
        strengthBar.classList.add('low');
    } else if (strength === 2) {
        strengthBar.classList.add('medium');
    } else if (strength === 3) {
        strengthBar.classList.add('high');
    } else if (strength >= 4) {
        strengthBar.classList.add('very-high');
    }
}

function generateAndDisplayPassword() {
    const length = parseInt(document.getElementById('length').value, 10);
    const options = {
        includeUppercase: document.getElementById('includeUppercase').checked,
        includeLowercase: document.getElementById('includeLowercase').checked,
        includeNumbers: document.getElementById('includeNumbers').checked,
        includeSpecialChars: document.getElementById('includeSpecialChars').checked
    };

    const password = generatePassword(length, options);
    document.getElementById('passwordOutput').textContent = `Ваш пароль: ${password}`;
    evaluatePasswordStrength(password);
}

function copyPassword() {
    const passwordOutput = document.getElementById('passwordOutput').textContent;
    const password = passwordOutput.replace('Ваш пароль: ', ''); // Извлекаем только пароль

    navigator.clipboard.writeText(password).then(() => {
        alert('Пароль скопирован в буфер обмена!');
    }).catch(err => {
        console.error('Ошибка при копировании: ', err);
    });
}
