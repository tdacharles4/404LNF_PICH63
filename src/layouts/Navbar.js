document.addEventListener("DOMContentLoaded", () => {
  const navbar = `
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    
    <a class="navbar-brand" href="Index.html">
        <img src="../img/logo/Logo_horizontal.svg" alt="MIXA | Artesanías" height="40">
    </a>

    <!-- Íconos -->
    <div class="d-flex align-items-center order-lg-3">
      <a href="Login.html" class="nav-link me-3 position-relative">
        <i class="fa-regular fa-user fs-5"></i>
      </a>

      <!--carrito push 06/02-->
      <button class="btn btn-outline-success" type="button" data-bs-toggle="offcanvas" data-bs-target="#shoppingCartOffcanvas" aria-controls="shoppingCartOffcanvas">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
          </svg>
          <span class="badge text-bg-secondary cart-badge">0</span>
      </button>
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
        <a class="nav-link" href="Index.html">Inicio</a>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle"
            href="Products.html"
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
        <a class="nav-link" href="Contact.html">Contacto</a>
        <a class="nav-link" href="AboutUs.html">Acerca de</a>
        <a class="nav-link" href="SignUp.html">Registro</a>

      </div>
    </div>

  </div>
</nav>
 `;
 document.getElementById("navbar").innerHTML = navbar;
});