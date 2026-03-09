/* Comienzo validación de datos */

document.addEventListener('DOMContentLoaded', function () {
    checkPhoneNumber()
    checkName()
    checkLastName()
    checkEmail()
    checkPassword()
    checkConfirmPassword()
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
        this.value = formattedValue
        if(this.value.length === 12){
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
            return true;
        }
        else if(this.value === ''){
            this.classList.remove('is-invalid');
            this.classList.remove('is-valid');
        }
        else{
            this.classList.remove('is-valid');
            this.classList.add('is-invalid');
        }

    });
}

function checkName() {
    const nameInput = document.getElementById('first-name');

    nameInput.addEventListener('input', function (e) {
        // El regex reemplaza todo lo que no sea un dígito por cadenas vacías
        const invalidCharacters = /[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]/g;
        if (invalidCharacters.test(this.value)) {
            this.value = this.value.replace(invalidCharacters, '');
        }
        return true;
    });
}

function checkLastName() {
    const lastNameInput = document.getElementById('last-name');

    lastNameInput.addEventListener('input', function (e) {
        // El regex reemplaza todo lo que no sea un dígito por cadenas vacías
        const invalidCharacters = /[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]/g;
        if (invalidCharacters.test(this.value)) {
            this.value = this.value.replace(invalidCharacters, '');
        }
        return true;
    });
}

function checkEmail() {
    const emailInput = document.getElementById('e-mail');
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    emailInput.addEventListener('blur', function (e) { // email vacío
        if (this.value.trim() === '') {
            
        }
        else if (emailRegex.test(this.value.trim())) {  // comprobación email válido
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
            return true;
        } else { // email inválido
            this.classList.add('is-invalid');
        }
    })
}

function checkPassword() {
    const passwordInput = document.getElementById('input-password');
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    passwordInput.addEventListener('blur', function (e) {
        if (this.value.trim() === '') {
            this.classList.remove('is-invalid');
            this.classList.remove('is-valid');
        }
        else if (passwordRegex.test(this.value.trim())) {
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
            return true;
        } else {
            this.classList.add('is-invalid');
        }
    })

    
}

function checkConfirmPassword(){
    const firstPassword = document.getElementById('input-password');
    const passwordInput = document.getElementById('confirm-password');
    passwordInput.addEventListener('blur', function (e) {
        if (this.value !== firstPassword.value) {
            this.classList.remove('is-valid');
            this.classList.add('is-invalid');
        }
        else {
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
            return true;
        }
    })
}

/* Fin validación de datos */


/* Comienzo de creación objetos tipo JSON */

/* Zorayda - Creación objetos tipo JSON */
const form = document.getElementById('PaginaRegistro');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (checkPhoneNumber() && checkName() && checkLastName() && checkEmail() && checkPassword() && checkConfirmPassword()) {
        const usuarioJSON = {
            nombre: form.querySelector('[name="nombre"]').value.trim(),
            apellido: form.querySelector('[name="apellido"]').value.trim(),
            telefono: document.getElementById('phone-input').value.trim(),
            email: form.querySelector('[name="correo"]').value.trim().toLowerCase(),
            password: form.querySelector('[name="password"]').value
        };

        const jsonPreview = document.getElementById("jsonPreview");
        const jsonOutput = document.getElementById("jsonOutput");

        jsonOutput.textContent = JSON.stringify(usuarioJSON, null, 2);
        jsonPreview.classList.remove("d-none");
        jsonPreview.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    /* Fin creación objetos tipo JSON */
});

/* Fin validación de datos */