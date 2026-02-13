// MIXE | ARTESANÍAS - JS básico (catálogo + carrito fake + validaciones)

document.addEventListener("DOMContentLoaded", () => {
  // Filtro rápido del catálogo (por texto)
  const search = document.querySelector("#catalogSearch");
  if (search) {
    search.addEventListener("input", () => {
      const q = search.value.trim().toLowerCase();
      document.querySelectorAll("[data-product-card]").forEach(card => {
        const name = (card.getAttribute("data-name") || "").toLowerCase();
        const cat = (card.getAttribute("data-category") || "").toLowerCase();
        const show = name.includes(q) || cat.includes(q);
        card.style.display = show ? "" : "none";
      });
    });
  }

  // Validación Bootstrap forms
  document.querySelectorAll(".needs-validation").forEach(form => {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      if (!form.checkValidity()) {
        e.stopPropagation();
        form.classList.add("was-validated");
        return;
      }

      form.classList.add("was-validated");

      const data = new FormData(form);
      const response = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      const status = document.getElementById("formStatus");
      if (response.ok) {
        status.textContent = "¡Mensaje enviado con éxito!";
        status.classList.remove("visually-hidden");
        form.reset();
        form.classList.remove("was-validated");
      } else {
        status.textContent = "Hubo un error al enviar.";
        status.classList.remove("visually-hidden");
      }
    });
  });

  // Cargar miembros de equipo
  loadTeamMembers();

  // Push Carrito 06/02 - Badge initialization
  const badge = document.querySelector('.cart-badge');
  if (badge) {
    const savedCart = localStorage.getItem('shoppingCart');
    let shouldShowBadge = false;
    
    if (savedCart) {
      try {
        const cartData = JSON.parse(savedCart);
        const quantity = Math.max(0, parseInt(cartData.quantity) || 0);
        if (quantity > 0) {
          shouldShowBadge = true;
          badge.textContent = quantity;
        }
      } catch (error) {
        console.error('Error loading cart in main.js:', error);
      }
    }
    
    badge.style.display = shouldShowBadge ? 'inline-block' : 'none';
  }

  // Add to cart button handler
  document.addEventListener('click', function(e) {
      const addToCartBtn = e.target.closest('.cart-btn-animated');
      
      if (addToCartBtn) {
          e.stopImmediatePropagation();
          
          const card = addToCartBtn.closest('[data-product-card]') || addToCartBtn.closest('.card');
          const productName = card.querySelector('h5, h6').textContent.trim();
          const productPrice = parseFloat(card.querySelector('.price').textContent.replace('$', ''));
          const productImage = card.querySelector('img').src;
          
          // Get the shopping cart element and call addItem
          const shoppingCart = document.querySelector('shopping-cart');
          if (shoppingCart && typeof shoppingCart.addItem === 'function') {
              shoppingCart.addItem({
                  name: productName,
                  price: productPrice,
                  image: productImage
              });
          }
          
          // Visual feedback
          addToCartBtn.classList.add('btn-success');
          addToCartBtn.classList.remove('btn-outline-success');
          setTimeout(() => {
              addToCartBtn.classList.remove('btn-success');
              addToCartBtn.classList.add('btn-outline-success');
          }, 300);
      }
  });
});

async function loadTeamMembers() {
  const container = document.querySelector("#team-container");
  if (!container) return;

  try {
    const response = await fetch("../data/team.json");
    const members = await response.json();
    container.innerHTML = members.map(member => `
      <div class="col">
        <div class="team-flip-card">
          <div class="flip-card-inner">
            <div class="flip-card-front">
              <div class="avatar">
                <img alt="${member.alt}" src="${member.image}"/>
              </div>
              <h3 class="h6 fw-bold mb-1">${member.name}</h3>
            </div>
            <div class="flip-card-back">
              <h3 class="h6 fw-bold mb-2">${member.name}</h3>
              <p class="role mb-2">${member.role}</p>
              <p class="text-muted mb-0">${member.description}</p>
            </div>
          </div>
        </div>
      </div>
    `).join("");
  } catch (error) {
    console.error("Error loading team members:", error);
  }
}

//Cargar productos 

async function loadProducts() {

    const cardsContainer = document.getElementById("cardsContainer");

    if (!cardsContainer) return;

    try {
        const response = await fetch("../data/products.json");
        const data = await response.json();

        const catalogo = data.catalogo;
        const products = catalogo.productos;

        cardsContainer.innerHTML = "";

        products.forEach(product => {

    const material = catalogo.materiales.find(m => m.id === product.material_id);
    const estado = catalogo.estados.find(e => e.id === product.estado_id);

    const card = document.createElement("div");
    card.classList.add("col-12", "col-md-6", "col-xl-4");

    card.innerHTML = `
        <div class="card h-100">
            <img src="${product.imagenes}" alt="${product.nombre}">
            <div class="p-3">                    
                <h5 class="mb-1">${product.nombre}</h5>
                <div class="muted mb-2">
                    ${estado?.nombre || ""} · ${material?.nombre || ""}
                </div>
                <div class="d-flex justify-content-between align-items-center">
                    <div class="price">$${product.precio}</div>
                    <button class="btn btn-mixe btn-sm">Añadir</button>
                </div>
            </div>
        </div>
    `;

    cardsContainer.appendChild(card);
});
    } catch (error) {
        console.error("Error cargando productos:", error);
    }
}
loadProducts();