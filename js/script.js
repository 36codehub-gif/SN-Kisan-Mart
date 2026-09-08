let cart = JSON.parse(localStorage.getItem("snKisanCart")) || [];

// ===============================
// CART SAVE
// ===============================
function saveCart() {
    localStorage.setItem("snKisanCart", JSON.stringify(cart));
}


// ===============================
// ADD TO CART
// ===============================
function addToCart(name, price, quantity = 1) {

    price = Number(price);
    quantity = Number(quantity);

    const existingProduct = cart.find(item => item.name === name);

    if (existingProduct) {
        existingProduct.quantity += quantity;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: quantity
        });
    }

    saveCart();
    updateCart();

    showToast(name + " added to cart");
}


// ===============================
// UPDATE CART
// ===============================
function updateCart() {

    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");
    const cartCount = document.getElementById("cartCount");

    // Total quantity
    const totalQuantity = cart.reduce(
        (sum, item) => sum + Number(item.quantity),
        0
    );

    if (cartCount) {
        cartCount.textContent = totalQuantity;
    }

    // Empty cart
    if (cart.length === 0) {

        if (cartItems) {
            cartItems.innerHTML = `
                <div style="text-align:center;padding:30px;">
                    <div style="font-size:45px;">🛒</div>
                    <h3>Your cart is empty</h3>
                    <p>Add products to your cart.</p>
                </div>
            `;
        }

        if (cartTotal) {
            cartTotal.textContent = "₹0";
        }

        return;
    }


    // Cart products
    if (cartItems) {

        cartItems.innerHTML = cart.map((item, index) => {

            const itemTotal =
                Number(item.price) * Number(item.quantity);

            return `
                <div class="cart-item">

                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p>₹${item.price} × ${item.quantity}</p>
                    </div>

                    <div class="cart-item-controls">

                        <button onclick="decreaseCartItem(${index})">
                            −
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button onclick="increaseCartItem(${index})">
                            +
                        </button>

                    </div>

                    <div class="cart-item-total">
                        ₹${itemTotal}
                    </div>

                    <button
                        class="remove-cart-btn"
                        onclick="removeCartItem(${index})"
                    >
                        ✕
                    </button>

                </div>
            `;

        }).join("");
    }


    // GRAND TOTAL
    const total = cart.reduce(
        (sum, item) =>
            sum + (Number(item.price) * Number(item.quantity)),
        0
    );

    if (cartTotal) {
        cartTotal.textContent = "₹" + total;
    }
}


// ===============================
// PLUS
// ===============================
function increaseCartItem(index) {

    if (!cart[index]) return;

    cart[index].quantity += 1;

    saveCart();
    updateCart();
}


// ===============================
// MINUS
// ===============================
function decreaseCartItem(index) {

    if (!cart[index]) return;

    if (cart[index].quantity > 1) {

        cart[index].quantity -= 1;

    } else {

        cart.splice(index, 1);

    }

    saveCart();
    updateCart();
}


// ===============================
// REMOVE
// ===============================
function removeCartItem(index) {

    if (!cart[index]) return;

    cart.splice(index, 1);

    saveCart();
    updateCart();
}


// ===============================
// OPEN CART
// ===============================
function openCart() {

    const sidebar =
        document.getElementById("cartSidebar");

    const overlay =
        document.getElementById("cartOverlay");

    if (sidebar) {
        sidebar.classList.add("active");
    }

    if (overlay) {
        overlay.classList.add("active");
    }

    updateCart();
}


// ===============================
// CLOSE CART
// ===============================
function closeCart() {

    const sidebar =
        document.getElementById("cartSidebar");

    const overlay =
        document.getElementById("cartOverlay");

    if (sidebar) {
        sidebar.classList.remove("active");
    }

    if (overlay) {
        overlay.classList.remove("active");
    }
}


// ===============================
// LOGIN
// ===============================
function openLoginModal() {

    const modal =
        document.getElementById("loginModal");

    if (modal) {
        modal.classList.add("active");
    }
}


function closeLoginModal() {

    const modal =
        document.getElementById("loginModal");

    if (modal) {
        modal.classList.remove("active");
    }
}


// ===============================
// TOAST
// ===============================
function showToast(message) {

    const toast =
        document.getElementById("toast");

    if (!toast) return;

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}


// ===============================
// CHECKOUT
// ===============================
function checkout() {

    if (cart.length === 0) {

        showToast("Your cart is empty");

        return;
    }

    showToast("Checkout coming soon");
}


// ===============================
// PAGE LOAD
// ===============================
document.addEventListener("DOMContentLoaded", function () {

    updateCart();

    const overlay =
        document.getElementById("cartOverlay");

    if (overlay) {
        overlay.addEventListener("click", closeCart);
    }

});
