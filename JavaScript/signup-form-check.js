/* Comienzo validación de datos */

document.addEventListener('DOMContentLoaded', function () {
    const phoneInput = document.getElementById('phone-input');
    const feedback = document.getElementById('phone-feedback');

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
     
    /* Zorayda - Creación objetos tipo JSON */
    const form = document.getElementById('PaginaRegistro');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        
        const usuarioJSON = {
            nombre:   form.querySelector('[name="nombre"]').value.trim(),
            apellido: form.querySelector('[name="apellido"]').value.trim(),
            telefono: document.getElementById('phone-input').value.trim(),
            email:    form.querySelector('[name="correo"]').value.trim().toLowerCase(),
            password: form.querySelector('[name="password"]').value
        };

        const jsonPreview = document.getElementById("jsonPreview");
        const jsonOutput  = document.getElementById("jsonOutput");

        jsonOutput.textContent = JSON.stringify(usuarioJSON, null, 2);
        jsonPreview.classList.remove("d-none");
        jsonPreview.scrollIntoView({ behavior: "smooth", block: "start" });
        /* Fin creación objetos tipo JSON */
    });

});

/* Fin validación de datos */