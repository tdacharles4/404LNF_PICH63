class shoppingCart extends HTMLElement {
    constructor() {
        super();
        const savedCart = localStorage.getItem('shoppingCart');
        this.items = [];
        
        if (savedCart) {
            try {
                const cartData = JSON.parse(savedCart);
                if (Array.isArray(cartData.items)) {
                    this.items = cartData.items;
                } else if (cartData.productName) {
                    if (cartData.quantity > 0) {
                        this.items = [{
                            name: cartData.productName,
                            price: cartData.price,
                            image: cartData.productImage,
                            quantity: cartData.quantity
                        }];
                    }
                }
            } catch (error) {
                console.error('Error loading cart:', error);
                this.items = [];
            }
        }
        
        this.handleButtonClick = (e) => {
            if (!this.contains(e.target)) return;
            
            // Handle quantity buttons
            if (e.target.closest('.increase-btn') || e.target.classList.contains('increase-btn')) {
                e.preventDefault();
                e.stopPropagation();
                const index = e.target.closest('.cart-item')?.dataset.index;
                if (index !== undefined) {
                    this.increaseQuantity(parseInt(index));
                }
            }
            
            if (e.target.closest('.decrease-btn') || e.target.classList.contains('decrease-btn')) {
                e.preventDefault();
                e.stopPropagation();
                const index = e.target.closest('.cart-item')?.dataset.index;
                if (index !== undefined) {
                    this.decreaseQuantity(parseInt(index));
                }
            }
            
            if (e.target.closest('.delete-btn') || e.target.classList.contains('delete-btn')) {
                e.preventDefault();
                e.stopPropagation();
                const index = e.target.closest('.cart-item')?.dataset.index;
                if (index !== undefined) {
                    this.deleteItem(parseInt(index));
                }
            }
        };
    }

    connectedCallback() {
        this.render();
        document.addEventListener('click', this.handleButtonClick);
    }

    disconnectedCallback() {
        document.removeEventListener('click', this.handleButtonClick);
    }

    addItem(product) {
        const existingItemIndex = this.items.findIndex(item => 
            item.name === product.name && item.price === product.price
        );
        
        if (existingItemIndex >= 0) {
            this.items[existingItemIndex].quantity++;
        } else {
            this.items.push({
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }
        
        this.updateCartContent();
        this.updateBadge();
        this.saveCart();
    }

    updateBadge() {
        const totalQuantity = this.items.reduce((sum, item) => sum + item.quantity, 0);
        const badge = document.querySelector('.cart-badge');
        if (badge) {
            badge.textContent = totalQuantity;
            if (totalQuantity > 0) {
                badge.style.display = 'inline-block';
                badge.style.visibility = 'visible';
            } else {
                badge.style.display = 'none';
            }
        }
        this.saveCart();
    }

    increaseQuantity(index) {
        if (this.items[index]) {
            this.items[index].quantity++;
            this.updateCartContent();
            this.updateBadge();
            this.saveCart();
        }
    }

    decreaseQuantity(index) {
        if (this.items[index] && this.items[index].quantity > 1) {
            this.items[index].quantity--;
            this.updateCartContent();
            this.updateBadge();
            this.saveCart();
        }
    }

    deleteItem(index) {
        if (this.items[index]) {
            this.items.splice(index, 1);
            this.updateCartContent();
            this.updateBadge();
            this.saveCart();
        }
    }

    getTotal() {
        return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);
    }

    saveCart() {
        const cartData = {
            items: this.items,
            lastUpdated: new Date().toISOString()
        };
        localStorage.setItem('shoppingCart', JSON.stringify(cartData));
    }

    render() {
        this.innerHTML = `
            <div class="offcanvas offcanvas-end" tabindex="-1" id="shoppingCartOffcanvas" 
                aria-labelledby="shoppingCartOffcanvasLabel" 
                style="width: 500px;">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="shoppingCartOffcanvasLabel">Shopping Cart</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body" id="cartBody">
                    ${this.getCartContent()}
                </div>
            </div>
        `;
        
        this.offcanvas = new bootstrap.Offcanvas(this.querySelector('#shoppingCartOffcanvas'));
    }

    getCartContent() {
        if (this.items.length === 0) {
            // Push Carrito 12-02 // All icons from BootStrap to Font-Awesome // Icono World para Empty Cart
            return `
                <div class="text-center py-5">
                    <i class="fa-solid fa-earth-americas"></i>
                    <h5 class="text-muted">Your cart is empty</h5>
                </div>
            `;
        }
        
        // Push Carrito 11-02 // Overlap de precio y botones arreglado en display y responsivo
        // Push Carrito 12-02 // All icons from BootStrap to Font-Awesome
            // Icono TrashCan para Delete de Carrito
        const itemsHtml = this.items.map((item, index) => `
            <div class="card rounded-3 mb-4 position-relative cart-item" data-index="${index}">
                <button type="button" class="btn btn-sm position-absolute top-0 end-0 m-2 p-1 delete-btn" style="color: #dc3545; border: none; background: transparent; z-index: 10;">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
                <div class="card-body p-3 p-md-4">
                    <div class="row g-2 align-items-center">
                        <div class="col-3 col-md-2">
                            <img src="${item.image || 'img/test.jpg'}" class="img-fluid rounded-3" alt="${item.name || 'Product'}">
                        </div>
                        <div class="col-9 col-md-4">
                            <p class="fw-normal mb-1 small">${item.name || 'Product'}</p>
                            <p class="text-muted small mb-0">$${item.price}</p>
                        </div>
                        <div class="col-7 col-md-4 d-flex align-items-center justify-content-start gap-1">
                            <button type="button" class="btn btn-outline-dark btn-sm px-2 py-1 decrease-btn">
                                <i class="fas fa-minus fa-xs"></i>
                            </button>
                            <input type="number" value="${item.quantity}" class="form-control form-control-sm text-center quantity-input" style="width: 45px; min-width: 45px;" readonly />
                            <button type="button" class="btn btn-outline-dark btn-sm px-2 py-1 increase-btn">
                                <i class="fas fa-plus fa-xs"></i>
                            </button>
                        </div>
                        <div class="col-5 col-md-2 text-end">
                            <h6 class="mb-0 total-price small fw-bold">$${(item.price * item.quantity).toFixed(2)}</h6>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        const totalQuantity = this.items.reduce((sum, item) => sum + item.quantity, 0);
        
        return itemsHtml + `
            <div class="card mb-4">
                <div class="card-body">
                    <div class="d-flex justify-content-between mb-2">
                        <span>Subtotal (${totalQuantity} items):</span>
                        <span class="subtotal">$${this.getTotal()}</span>
                    </div>
                    <div class="d-flex justify-content-between mb-2">
                        <span>Shipping:</span>
                        <span>$0.00</span>
                    </div>
                    <hr>
                    <div class="d-flex justify-content-between fw-bold">
                        <span>Total:</span>
                        <span class="cart-total">$${this.getTotal()}</span>
                    </div>
                </div>
            </div>

            <div class="card">
                <div class="card-body">
                    <button type="button" class="btn btn-warning btn-lg w-100">Proceed to Pay</button>
                </div>
            </div>
        `;
    }

    updateCartContent() {
        const cartBody = this.querySelector('#cartBody');
        if (cartBody) {
            cartBody.innerHTML = this.getCartContent();
        }
    }
}

customElements.define('shopping-cart', shoppingCart);