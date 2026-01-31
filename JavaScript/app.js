// MIXE | ARTESANÍAS - JS básico (catálogo + carrito fake + validaciones)

const STORAGE_KEY = "mixe_cart_count";

function getCartCount() {
  return Number(localStorage.getItem(STORAGE_KEY) || 0);
}

function setCartCount(n) {
  localStorage.setItem(STORAGE_KEY, String(n));
  const badge = document.querySelector("[data-cart-badge]");
  if (badge) badge.textContent = String(n);
}

function addToCart() {
  setCartCount(getCartCount() + 1);
}

// Set badge on load
document.addEventListener("DOMContentLoaded", () => {
  setCartCount(getCartCount());

  // Botones "Añadir al carrito"
  document.querySelectorAll("[data-add-to-cart]").forEach(btn => {
    btn.addEventListener("click", () => {
      addToCart();
      btn.blur();
    });
  });

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
      if (!form.checkValidity()) {
        e.preventDefault();
        e.stopPropagation();
      }
      form.classList.add("was-validated");
    });
  });
});
