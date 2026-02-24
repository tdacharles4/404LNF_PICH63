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
        if (this.value.length === 12) {
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
        }
        else if (this.value === '') {
            this.classList.remove('is-invalid');
            this.classList.remove('is-valid');
        }
        else {
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
        } else {
            this.classList.add('is-invalid');
        }
    })
}

function checkConfirmPassword() {
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

/* Funciones para retornar datos booleanos si la validación se efectúa adecuadamente */

function isPhoneValid(value) {
    return value.length === 12; // que el número tenga formato: 123-456-7890
}

function isNameValid(value) {
    return value.trim() !== ''; // Quita espacios en blanco antes y después, checa que no esté vacío (se va a usar para nombre y apellido)
}

function isEmailValid(value) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(value.trim()); // compara el email con el regex
}

function isPasswordValid(value) {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return passwordRegex.test(value.trim()); // compara la contraseña ingresada con el regex, quita espacios antes o después
}

function isConfirmPasswordValid(password, confirmPassword) {
    return confirmPassword !== '' && password === confirmPassword; // compara las contraseñas entre sí y que no esté vacía
}

/* Termina validación con booleanos */

/* Fin validación de datos */


/* Comienzo de creación objetos tipo JSON */

/* Zorayda - Creación objetos tipo JSON */
const form = document.getElementById('PaginaRegistro');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = form.querySelector('[name="nombre"]').value.trim()
    const lastName = form.querySelector('[name="apellido"]').value.trim()
    const phone =  document.getElementById('phone-input').value.trim()
    const email =  form.querySelector('[name="correo"]').value.trim().toLowerCase()
    const password = form.querySelector('[name="password"]').value
    const confirmPassword = form.querySelector('[name="confirmPassword"]').value

    if ( isNameValid(name) && isNameValid(lastName) && isPhoneValid(phone) && isEmailValid(email) && isPasswordValid(password) && isConfirmPasswordValid(password, confirmPassword)) {
        let usuarioJSON = {
            nombre: name,
            apellido: lastName,
            telefono: phone,
            email: email,
            password: password
        };

        // const jsonPreview = document.getElementById("jsonPreview");
        // const jsonOutput = document.getElementById("jsonOutput");

        usuarioJSON = JSON.stringify(usuarioJSON, null, 2);
        console.log(usuarioJSON)
        localStorage.setItem(email, usuarioJSON)
        form.reset()
        // jsonPreview.classList.remove("d-none");
        // jsonPreview.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    else {
        console.log("No se cumplieron las condiciones")
        console.log(`numero = ${isNameValid(name)}, nombre = ${isNameValid(lastName)}, apellido = ${isPhoneValid(phone)}, email = ${isEmailValid(email)}, contraseña = ${isPasswordValid(password)}, confirmación = ${isConfirmPasswordValid(password, confirmPassword)}`)
    }
    /* Fin creación objetos tipo JSON */
});

/* Fin validación de datos */