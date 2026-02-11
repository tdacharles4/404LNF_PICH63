document.addEventListener("DOMContentLoaded", () => {
    
    const footer = `
        <footer class="mt-5 py-5 shadow p-3 mb-5 bg-soft">
            <div class="container">
                <div class="row g-3">
                    <div class="col-md-3 d-flex justify-content-center">
                        <a href="../../pages/Index.html"><img src="../img/logo/Logo.svg" alt="Logo Mixa" width="80%"></a>
                    </div>
                    <div class="col-md-3">
                        <h5>Legal y privacidad.</h5>
                        <a href="../Acerca de Nosotros/index.html">Aviso de privacidad.</a><br>
                        <a href="../Página de Contacto/index.html">Términos y condiciones.</a><br>
                        <a href="../Catálogo de Productos/index.html">Aviso de cookies.</a><br>
                        <a href="../Catálogo de Productos/index.html">Aviso legal.</a><br>
                    </div>
                    <div class="col-md-3">
                        <h5>Redes Sociales.</h5>
                        <a href="../Acerca de Nosotros/index.html">Facebook.</a><br>
                        <a href="../Página de Contacto/index.html">Instagram.</a><br>
                        <a href="../Catálogo de Productos/index.html">X.</a><br>
                    </div>
                    <div class="col-md-3">
                        <h5>Mapa de navegación.</h5>
                        <a href="../Acerca de Nosotros/index.html">Acerca de Nosotros.</a><br>
                        <a href="../Página de Contacto/index.html">Contáctanos.</a><br>
                        <a href="../Catálogo de Productos/index.html">Catálogo.</a><br>
                    </div>
                </div>
                <div class="text-center mt-4 py-4"> @ 2025 MIXA | Artesanías. Todos los derechos reservados. </div>
            </div>
        </footer>
        `;
    document.getElementById("footer").innerHTML = footer;
    });

