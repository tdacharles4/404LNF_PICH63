// carrito.js - Updated class

class shoppingCart extends HTMLElement {
    constructor() {
        super();
        const savedCart = localStorage.getItem('shoppingCart');
        this.items = []; // Changed to array
        
        if (savedCart) {
            try {
                const cartData = JSON.parse(savedCart);
                // Check if we have old single-product format or new array format
                if (Array.isArray(cartData.items)) {
                    this.items = cartData.items;
                } else if (cartData.productName) {
                    // Convert old format to new array format
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
        
        // Keep handler reference
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

    // Find or add item to cart
    addItem(product) {
        const existingItemIndex = this.items.findIndex(item => 
            item.name === product.name && item.price === product.price
        );
        
        if (existingItemIndex >= 0) {
            // Increase quantity of existing item
            this.items[existingItemIndex].quantity++;
        } else {
            // Add new item
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
            return `
                <div class="text-center py-5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" class="bi bi-cart-x text-muted mb-3" viewBox="0 0 16 16">
                        <path d="M7.354 5.646a.5.5 0 1 0-.708.708L7.793 7.5 6.646 8.646a.5.5 0 1 0 .708.708L8.5 8.207l1.146 1.147a.5.5 0 0 0 .708-.708L9.207 7.5l1.147-1.146a.5.5 0 0 0-.708-.708L8.5 6.793z"/>
                        <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
                    </svg>
                    <h5 class="text-muted">Your cart is empty</h5>
                </div>
            `;
        }
        
        // Generate HTML for all items
        const itemsHtml = this.items.map((item, index) => `
            <div class="card rounded-3 mb-4 position-relative cart-item" data-index="${index}">
                <button type="button" class="btn btn-sm position-absolute top-0 end-0 m-2 p-1 delete-btn" style="color: #dc3545; border: none; background: transparent;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                    </svg>
                </button>
                <div class="card-body p-4">
                    <div class="row d-flex justify-content-between align-items-center">
                        <div class="col-3">
                            <img src="${item.image || 'img/test.jpg'}" class="img-fluid rounded-3" alt="${item.name || 'Product'}">
                        </div>
                        <div class="col-4">
                            <p class="lead fw-normal mb-2">${item.name || 'Product'}</p>
                            <p class="text-muted small">$${item.price}</p>
                        </div>
                        <div class="col-3 d-flex align-items-center">
                            <button type="button" class="btn btn-outline-dark px-2 py-0 decrease-btn">
                                <i class="fas fa-minus"></i>
                            </button>
                            <input type="number" value="${item.quantity}" class="form-control form-control-sm text-center quantity-input" style="width: 50px;" readonly />
                            <button type="button" class="btn btn-outline-dark px-2 py-0 increase-btn">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                        <div class="col-2 text-end">
                            <h6 class="mb-0 total-price">$${(item.price * item.quantity).toFixed(2)}</h6>
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