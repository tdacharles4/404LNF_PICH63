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
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.classList.add("was-validated");
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      const status = document.getElementById("formStatus");

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';
      }

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Enviar';
        }
        if (status) {
          status.classList.remove('visually-hidden');
        }
        form.reset();
        form.classList.remove('was-validated');
        setTimeout(() => {
          if (status) status.classList.add('visually-hidden');
        }, 4000);
      }, 1200);
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

//Cargar productos y filtrar categorías

let currentPage = 1;
const productsPerPage = 6;

async function loadProducts() {

    const cardsContainer = document.getElementById("cardsContainer");

    if (!cardsContainer) return;

    try {
      const response = await fetch("../data/products.json");
      const data = await response.json();

      const catalogo = data.catalogo;
      const products = catalogo.productos;

      const selectedMaterials = getSelectedMaterials();
      const selectedRegion = getSelectedRegion();
      const sortOption = document.getElementById("sortProducts")?.value;  
      const searchText = document.getElementById("catalogSearch")?.value.toLowerCase().trim();    

      let filteredProducts = products;

      const categoryFromURL = getCategoryFromURL();

      if (categoryFromURL) {
        const categoriaSeleccionada = catalogo.categorias.find(
          c => c.nombre.toLowerCase().trim() === decodeURIComponent(categoryFromURL).toLowerCase().trim()
        );

        if (categoriaSeleccionada) {
          filteredProducts = filteredProducts.filter(product =>
            product.categoria_id === categoriaSeleccionada.id
          );
        }
      }

      if (selectedMaterials.length > 0) {
        filteredProducts = filteredProducts.filter(product =>
          selectedMaterials.includes(product.material_id)
        );
      }

      if (selectedRegion !== "Todos") {
        filteredProducts = filteredProducts.filter(product => {
          const estado = catalogo.estados.find(e => e.id === product.estado_id);
          return estado && estado.nombre === selectedRegion;
        });
      }

      if (searchText) {
        filteredProducts = filteredProducts.filter(product =>
          product.nombre.toLowerCase().includes(searchText) ||
          product.descripcion.toLowerCase().includes(searchText)
        );
      }

      if (sortOption === "recientes") {
          filteredProducts.sort((a, b) => b.id - a.id);
      }
      if (sortOption === "precio-asc") {
          filteredProducts.sort((a, b) => a.precio - b.precio);
      }
      if (sortOption === "precio-desc") {
          filteredProducts.sort((a, b) => b.precio - a.precio);
      }            

      const start = (currentPage - 1) * productsPerPage;
      if (start >= filteredProducts.length) {
        currentPage = 1;
      }
      const end = start + productsPerPage;
      const paginatedProducts = filteredProducts.slice(start, end);

      cardsContainer.innerHTML = "";

      paginatedProducts.forEach(product => {

      const material = catalogo.materiales.find(m => m.id === product.material_id);
      const estado = catalogo.estados.find(e => e.id === product.estado_id);
      const categoria = catalogo.categorias.find(c => c.id === product.categoria_id);

      const card = document.createElement("div");
      card.classList.add("col-12", "col-md-6", "col-xl-4");

      card.innerHTML = `
          <div class="card h-100">
              <img src="${product.imagenes}" alt="${product.nombre}">
              <div class="p-3">                    
                  <h5 class="mb-1">${product.nombre}</h5>
                  <div class="muted mb-2">
                      ${categoria?.nombre || ""} · ${estado?.nombre || ""} · ${material?.nombre || ""}
                  </div>
                  <div class="d-flex justify-content-between align-items-center">
                      <div class="price">$${product.precio}</div>
                      <button class="btn btn-outline-success cart-btn-animated" type="button"> <!--carrito push 06/02-->
                          <span class="cart-icon"> <!-- Push Carrito 12/02 BootStrap to Font-Awesome -->
                              <i class="fa-solid fa-cart-shopping"></i>
                          </span>
                          <span class="cart-text">Add to cart</span>
                      </button>
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

function getSelectedMaterials() {
    const checked = document.querySelectorAll(".material-filter:checked");
    return Array.from(checked).map(cb => Number(cb.value));
}
function getSelectedRegion() {
    const region = document.getElementById("regionFilter");
    return region ? region.value : "Todos";
}
function getCategoryFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("categoria");
}


document.addEventListener("DOMContentLoaded", () => {

    loadProducts();

    const sortSelect = document.getElementById("sortProducts");
    if (sortSelect) {
        sortSelect.addEventListener("change", () => {
            currentPage = 1;
            loadProducts();
        });
    }

    const paginationLinks = document.querySelectorAll(".pagination .page-link");
    if (paginationLinks.length > 0) {
        paginationLinks.forEach(link => {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                const page = parseInt(link.textContent);
                if (!isNaN(page)) {
                    currentPage = page;
                    loadProducts();
                }
            });
        });
    }

    const applyBtn = document.getElementById("applyFilters");
    if (applyBtn) {
        applyBtn.addEventListener("click", () => {
        currentPage = 1;
        loadProducts();
    });}

    const clearBtn = document.getElementById("clearFilters");
    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        document.querySelectorAll(".material-filter").forEach(cb => cb.checked = false);
        const regionSelect = document.getElementById("regionFilter");
        if (regionSelect) {
          regionSelect.value = "Todos";
        }
        window.history.replaceState({}, document.title, "Products.html");
        currentPage = 1;
        loadProducts();
      });
    }

    const searchInput = document.getElementById("catalogSearch");
    if (searchInput) {
      searchInput.addEventListener("input", () => {
        currentPage = 1;
        loadProducts();
      });
    }

});