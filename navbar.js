document.addEventListener("DOMContentLoaded", () => {
  const navbar = `
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    
    <a class="navbar-brand" href="/pages/Index.html">
        <img src="../img/Logo_horizontal.svg" alt="MIXA | Artesanías" height="40">
    </a>

    <!-- Íconos -->
    <div class="d-flex align-items-center order-lg-3">
      <a href="/pages/Login.html" class="nav-link me-3 position-relative">
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
        <a class="nav-link" href="/pages/Index.html">Inicio</a>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle"
            href="/pages/Products.html"
            id="navbarDropdown"
            role="button"
            aria-expanded="false">
            Productos
          </a>
        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a class="dropdown-item" href="#!">Textiles</a></li>
                                <li><a class="dropdown-item" href="#!">Cerámica</a></li>
                                <li><a class="dropdown-item" href="#!">Joyería</a></li>
                                <li><a class="dropdown-item" href="#!">Alebrijes</a></li>
                            </ul>
                        </li>
                    </ul>
        <a class="nav-link" href="/pages/Contact.html">Contacto</a>
        <a class="nav-link" href="/pages/AboutUs.html">Acerca de</a>
        <a class="nav-link" href="/pages/SignUp.html">Registro</a>

      </div>
    </div>

  </div>
</nav>
 `;
 document.getElementById("navbar").innerHTML = navbar;
});