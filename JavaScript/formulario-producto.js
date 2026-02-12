
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('productoForm');
    const alertContainer = document.getElementById('alertContainer');
    const jsonPreview = document.getElementById('jsonPreview');
    const jsonOutput = document.getElementById('jsonOutput');

    /**
     * Muestra una alerta de Bootstrap
     * @param {string} mensaje - Mensaje a mostrar
     * @param {string} tipo - Tipo de alerta (danger, success, warning, info)
     */
    function mostrarAlerta(mensaje, tipo = 'danger') {
        // Limpiar alertas anteriores
        alertContainer.innerHTML = '';
        
        const alertHTML = `
            <div class="alert alert-${tipo} alert-dismissible fade show" role="alert">
                <i class="bi bi-${tipo === 'danger' ? 'exclamation-triangle' : 'check-circle'} me-2"></i>
                ${mensaje}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
            </div>
        `;
        
        alertContainer.innerHTML = alertHTML;
        
        // Scroll hacia la alerta
        alertContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    /**
     * Muestra múltiples errores en una alerta
     * @param {Array} errores - Array de mensajes de error
     */
    function mostrarErrores(errores) {
        alertContainer.innerHTML = '';
        
        let listaErrores = errores.map(error => `<li>${error}</li>`).join('');
        
        const alertHTML = `
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                <strong><i class="bi bi-exclamation-triangle me-2"></i>Por favor corrige los siguientes errores:</strong>
                <ul class="mb-0 mt-2">${listaErrores}</ul>
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
            </div>
        `;
        
        alertContainer.innerHTML = alertHTML;
        alertContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    /**
     * Valida el formulario completo
     * @returns {Object} - { valido: boolean, errores: Array, datos: Object }
     */
    function validarFormulario() {
        const errores = [];
        const datos = {};

        // Validar SKU
        const sku = document.getElementById('sku').value.trim();
        const skuRegex = /^[A-Z]+-\d{3}$/;
        if (!sku) {
            errores.push('El SKU es obligatorio');
        } else if (!skuRegex.test(sku)) {
            errores.push('El SKU debe tener el formato: LETRAS-NÚMEROS (ej: MAD-001)');
        } else {
            datos.sku = sku;
        }

        // Validar Nombre
        const nombre = document.getElementById('nombre').value.trim();
        if (!nombre) {
            errores.push('El nombre del producto es obligatorio');
        } else if (nombre.length < 3) {
            errores.push('El nombre debe tener al menos 3 caracteres');
        } else if (nombre.length > 100) {
            errores.push('El nombre no puede exceder 100 caracteres');
        } else {
            datos.nombre = nombre;
        }

        // Validar Descripción
        const descripcion = document.getElementById('descripcion').value.trim();
        if (!descripcion) {
            errores.push('La descripción es obligatoria');
        } else if (descripcion.length < 20) {
            errores.push('La descripción debe tener al menos 20 caracteres');
        } else if (descripcion.length > 500) {
            errores.push('La descripción no puede exceder 500 caracteres');
        } else {
            datos.descripcion = descripcion;
        }

        // Validar Precio
        const precio = parseFloat(document.getElementById('precio').value);
        if (isNaN(precio) || precio <= 0) {
            errores.push('El precio debe ser un número mayor a 0');
        } else {
            datos.precio = precio;
        }

        // Validar Stock
        const stock = parseInt(document.getElementById('stock').value);
        if (isNaN(stock) || stock < 0) {
            errores.push('El stock debe ser un número igual o mayor a 0');
        } else {
            datos.stock = stock;
        }

        // Validar Categoría
        const categoriaId = document.getElementById('categoria').value;
        if (!categoriaId) {
            errores.push('Debes seleccionar una categoría');
        } else {
            datos.categoria_id = parseInt(categoriaId);
        }

        // Validar Material
        const material = document.getElementById('material').value.trim();
        if (!material) {
            errores.push('El material es obligatorio');
        } else if (material.length < 3) {
            errores.push('El material debe tener al menos 3 caracteres');
        } else {
            datos.material = material;
        }

        // Validar Procedencia
        const procedencia = document.getElementById('procedencia').value;
        if (!procedencia) {
            errores.push('Debes seleccionar el estado de procedencia');
        } else {
            datos.procedencia = procedencia;
        }

        // Obtener estado activo (checkbox)
        datos.activo = document.getElementById('activo').checked;

        // Imágenes (array vacío por ahora, se puede implementar carga)
        datos.imagenes = [];

        return {
            valido: errores.length === 0,
            errores: errores,
            datos: datos
        };
    }

    /**
     * Genera el objeto JSON completo del producto
     * @param {Object} datos - Datos validados del formulario
     * @returns {Object} - Objeto producto en formato JSON
     */
    function generarModeloJSON(datos) {
        // Generar ID único (simulado - backend)
        const nuevoId = Math.floor(Math.random() * 1000) + 100;

        const producto = {
            id: nuevoId,
            sku: datos.sku,
            nombre: datos.nombre,
            descripcion: datos.descripcion,
            precio: datos.precio,
            stock: datos.stock,
            categoria_id: datos.categoria_id,
            imagenes: datos.imagenes,
            activo: datos.activo,
            material: datos.material,
            procedencia: datos.procedencia
        };

        return producto;
    }

    /**
     * Maneja el envío del formulario
     */
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        event.stopPropagation();

        // Ocultar preview anterior
        jsonPreview.classList.add('d-none');

        // Validar el formulario
        const resultado = validarFormulario();

        if (!resultado.valido) {
            // Mostrar errores con alertas de Bootstrap
            mostrarErrores(resultado.errores);
            form.classList.add('was-validated');
            return;
        }

        // Si es válido, generar el JSON
        const productoJSON = generarModeloJSON(resultado.datos);

        // Mostrar alerta de éxito
        mostrarAlerta('¡Producto agregado correctamente!', 'success');

        // Mostrar el JSON generado
        jsonOutput.textContent = JSON.stringify(productoJSON, null, 2);
        jsonPreview.classList.remove('d-none');

        // Log en consola para verificación
        console.log('Producto creado:', productoJSON);

        /* Limpiar el formulario después de 2 segundos (opcional)
        setTimeout(() => {
            form.reset();
            form.classList.remove('was-validated');
        }, 2000); */
    });

    /**
     * Limpiar alertas y preview al resetear el formulario
     */
    form.addEventListener('reset', function() {
        alertContainer.innerHTML = '';
        jsonPreview.classList.add('d-none');
        form.classList.remove('was-validated');
    });

    /**
     * Validación en tiempo real para mejorar UX
     */
    const camposRequeridos = ['sku', 'nombre', 'descripcion', 'precio', 'stock', 'material'];
    
    camposRequeridos.forEach(campoId => {
        const campo = document.getElementById(campoId);
        if (campo) {
            campo.addEventListener('blur', function() {
                // Validar campo individual al perder foco
                if (this.value.trim() === '' && this.hasAttribute('required')) {
                    this.classList.add('is-invalid');
                    this.classList.remove('is-valid');
                } else {
                    this.classList.remove('is-invalid');
                    this.classList.add('is-valid');
                }
            });
        }
    });
});
