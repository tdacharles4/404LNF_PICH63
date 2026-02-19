/* Comienzo validación de datos */

document.addEventListener('DOMContentLoaded', function () {
    checkPhoneNumber()
    checkName()
    checkEmail()
    checkPassword()
});

function checkPhoneNumber() {
    const phoneInput = document.getElementById('phone-input');

    phoneInput.addEventListener('input', function (e) {
        // El regex reemplaza todo lo que no sea un dígito por cadenas vacías
        this.value = this.value.replace(/[^0-9]/g, '');
        let rawValue = this.value; // variable para operar el teléfono

        if (rawValue > 10) {
            rawValue = rawValue.substring(0, 10);
        } // no permite que se pongan más de 10 dígitos

        let formattedValue = rawValue;

        if (rawValue.length > 3) { // agrega el primer guión en el número
            formattedValue = rawValue.substring(0, 3) + '-' + rawValue.substring(3);
        }
        if (rawValue.length > 6) { // agrega el segundo guión en el número
            formattedValue = formattedValue.substring(0, 7) + '-' + formattedValue.substring(7);
        }
        // 4. Update the input field
        this.value = formattedValue;
    });
}

function checkName() {
    const nameInput = document.getElementById('first-name');
    const lastNameInput = document.getElementById('last-name');

    nameInput.addEventListener('input', function (e) {
        // El regex reemplaza todo lo que no sea un dígito por cadenas vacías
        const invalidCharacters = /[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]/g;
        if (invalidCharacters.test(this.value)) {
            this.value = this.value.replace(invalidCharacters, '');
        }
    });

    lastNameInput.addEventListener('input', function (e) {
        // El regex reemplaza todo lo que no sea un dígito por cadenas vacías
        const invalidCharacters = /[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]/g;
        if (invalidCharacters.test(this.value)) {
            this.value = this.value.replace(invalidCharacters, '');
        }
    });
}

function checkEmail() {
    const emailInput = document.getElementById('e-mail');
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    emailInput.addEventListener('blur', function (e) {
        if (this.value.trim() === '') {
            this.classList.remove('is-invalid');
            this.classList.remove('is-valid');
        }
        else if (emailRegex.test(this.value.trim())) {
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
            // Valid email
        } else {
            // Invalid email format
            this.classList.add('is-invalid');
        }
    })
}

function checkPassword() {
    const passwordInput = document.getElementById('input-password');
    const confirmPassword = document.getElementById('confirm-password');
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    passwordInput.addEventListener('blur', function (e) {
        if (this.value.trim() === '') {
            this.classList.remove('is-invalid');
            this.classList.remove('is-valid');
        }
        else if (passwordRegex.test(this.value.trim())) {
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
            // Valid email
        } else {
            // Invalid email format
            this.classList.add('is-invalid');
        }
    })

    confirmPassword.addEventListener('blur', function (e) {
        if (this.value !== passwordInput.value) {
            this.classList.add('is-invalid');
        }
        else {
            // Invalid email format
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
        }
    })
}

/* Fin validación de datos */


/* Comienzo de creación objetos tipo JSON */


/* Fin de creación objetos tipo JSON */