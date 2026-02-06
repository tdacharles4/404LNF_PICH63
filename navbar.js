//const contact = "/pages/Contact.html";


document.addEventListener("DOMContentLoaded", () => {
  const navbar = `
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    
    <a class="navbar-brand" href="#pages/Index.html">MIXA | ARTESANÍAS</a>

    <!-- Íconos -->
    <div class="d-flex align-items-center order-lg-3">
      <a href="#" class="nav-link me-3 position-relative">
        <i class="fa-regular fa-user fs-5"></i>
      </a>

      <a href="#" class="nav-link me-3 position-relative">
        <i class="fas fa-shopping-cart fs-5"></i>
        <span class="badge bg-danger position-absolute top-0 start-100 translate-middle">
          10
        </span>
      </a>
    </div>

    <!-- Botón hamburguesa -->
    <button
      class="navbar-toggler order-lg-2"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNavAltMarkup">
      <span class="navbar-toggler-icon"></span>
    </button>

    <!-- Menú -->
    <div class="collapse navbar-collapse order-lg-1" id="navbarNavAltMarkup">
      <div class="navbar-nav ms-auto">
        <a class="nav-link active" href="/pages/Index.html">Inicio</a>
        <a class="nav-link" href="/pages/Products.html"></a>
        <!--<a class="nav-link" href="#">Ofertas</a>-->
        <a class="nav-link" href="/pages/Contact.html">Contacto</a>
        <a class="nav-link" href="/pages/AboutUs.html">Acerca de</a>
      </div>
    </div>

  </div>
</nav>
  `;
  document.getElementById("navbar").innerHTML = navbar;
});