/* =========================================
   SN KISAN MART - MAIN SCRIPT
========================================= */


/* =========================================
   CURRENT YEAR
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const year = document.getElementById("currentYear");

    if (year) {
        year.textContent = new Date().getFullYear();
    }

});


/* =========================================
   MOBILE MENU
========================================= */

function setupMobileMenu() {

    const menuBtn = document.getElementById("mobileMenuBtn");
    const nav = document.getElementById("mainNav");

    if (!menuBtn || !nav) return;

    menuBtn.addEventListener("click", () => {

        nav.classList.toggle("active");

    });

}

document.addEventListener("DOMContentLoaded", setupMobileMenu);


/* =========================================
   CART SYSTEM
========================================= */

let cart = JSON.parse(localStorage.getItem("snKisanCart")) || [];


/* Save Cart */

function saveCart() {

    localStorage.setItem(
        "snKisanCart",
        JSON.stringify(cart)
    );

}


/* =========================================
   ADD TO CART
========================================= */

function addToCart(name, price) {

    price = Number(price);

    const existingItem = cart.find(
        item => item.name === name
    );

    if (existingItem) {

        existingItem.quantity += 1;

    } else {

        cart.push({
            name: name,
            price: price,
            quantity: 1
        });

    }

    saveCart();

    updateCart();

    showCart();

    showToast(`${name} added to cart`);

}


/* =========================================
   UPDATE CART
========================================= */

function updateCart() {

    const cartItems =
        document.getElementById("cartItems");

    const cartTotal =
        document.getElementById("cartTotal");

    const cartCount =
        document.getElementById("cartCount");


    /* Cart Count */

    const totalQuantity = cart.reduce(
        (total, item) =>
            total + item.quantity,
        0
    );

    if (cartCount) {

        cartCount.textContent =
            totalQuantity;

    }


    /* Empty Cart */

    if (cart.length === 0) {

        if (cartItems) {

            cartItems.innerHTML = `
                <div class="empty-cart">
                    <p>Your cart is empty.</p>
                    <p>Add some products to continue.</p>
                </div>
            `;

        }

        if (cartTotal) {

            cartTotal.textContent = "₹0";

        }

        return;

    }


    /* Cart Items */

    if (cartItems) {

        cartItems.innerHTML = cart.map(
            (item, index) => `

            <div class="cart-item">

                <div class="cart-item-info">

                    <h4>${item.name}</h4>

                    <p>₹${item.price}</p>

                </div>


                <div class="cart-item-controls">

                    <button
                        onclick="decreaseCartItem(${index})">
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        onclick="increaseCartItem(${index})">
                        +
                    </button>

                </div>


                <div class="cart-item-total">

                    ₹${item.price * item.quantity}

                </div>


                <button
                    class="remove-cart-btn"
                    onclick="removeCartItem(${index})">

                    ×

                </button>

            </div>

        `
        ).join("");

    }


    /* Total Price */

    const total = cart.reduce(
        (sum, item) =>
            sum + (item.price * item.quantity),
        0
    );


    if (cartTotal) {

        cartTotal.textContent =
            `₹${total}`;

    }

}


/* =========================================
   INCREASE CART ITEM
========================================= */

function increaseCartItem(index) {

    if (!cart[index]) return;

    cart[index].quantity += 1;

    saveCart();

    updateCart();

}


/* =========================================
   DECREASE CART ITEM
========================================= */

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


/* =========================================
   REMOVE CART ITEM
========================================= */

function removeCartItem(index) {

    if (!cart[index]) return;

    cart.splice(index, 1);

    saveCart();

    updateCart();

    showToast("Product removed from cart");

}


/* =========================================
   OPEN CART
========================================= */

function showCart() {

    const cartSidebar =
        document.getElementById("cartSidebar");

    const cartOverlay =
        document.getElementById("cartOverlay");

    if (cartSidebar) {

        cartSidebar.classList.add("active");

    }

    if (cartOverlay) {

        cartOverlay.classList.add("active");

    }

}


/* =========================================
   CLOSE CART
========================================= */

function closeCart() {

    const cartSidebar =
        document.getElementById("cartSidebar");

    const cartOverlay =
        document.getElementById("cartOverlay");

    if (cartSidebar) {

        cartSidebar.classList.remove("active");

    }

    if (cartOverlay) {

        cartOverlay.classList.remove("active");

    }

}


/* =========================================
   CART BUTTON
========================================= */

function setupCartButtons() {

    const cartButton =
        document.getElementById("cartButton");

    const closeButton =
        document.getElementById("closeCart");

    const overlay =
        document.getElementById("cartOverlay");


    if (cartButton) {

        cartButton.addEventListener(
            "click",
            showCart
        );

    }


    if (closeButton) {

        closeButton.addEventListener(
            "click",
            closeCart
        );

    }


    if (overlay) {

        overlay.addEventListener(
            "click",
            closeCart
        );

    }

}

document.addEventListener(
    "DOMContentLoaded",
    setupCartButtons
);


/* =========================================
   WISHLIST
========================================= */

let wishlist =
    JSON.parse(
        localStorage.getItem("snKisanWishlist")
    ) || [];


function toggleWishlist(name) {

    const index =
        wishlist.indexOf(name);


    if (index === -1) {

        wishlist.push(name);

        showToast("Added to wishlist");

    } else {

        wishlist.splice(index, 1);

        showToast("Removed from wishlist");

    }


    localStorage.setItem(
        "snKisanWishlist",
        JSON.stringify(wishlist)
    );

}


/* =========================================
   LOGIN MODAL
========================================= */

function openLogin() {

    const modal =
        document.getElementById("loginModal");

    if (modal) {

        modal.classList.add("active");

    }

}


function closeLogin() {

    const modal =
        document.getElementById("loginModal");

    if (modal) {

        modal.classList.remove("active");

    }

}


function setupLogin() {

    const loginButton =
        document.getElementById("loginButton");

    const closeButton =
        document.getElementById("closeLogin");

    const form =
        document.getElementById("loginForm");


    if (loginButton) {

        loginButton.addEventListener(
            "click",
            openLogin
        );

    }


    if (closeButton) {

        closeButton.addEventListener(
            "click",
            closeLogin
        );

    }


    if (form) {

        form.addEventListener(
            "submit",
            function(event) {

                event.preventDefault();

                showToast(
                    "Demo login successful"
                );

                closeLogin();

            }
        );

    }

}

document.addEventListener(
    "DOMContentLoaded",
    setupLogin
);


/* =========================================
   CHECKOUT
========================================= */

function checkout() {

    if (cart.length === 0) {

        showToast("Your cart is empty");

        return;

    }

    showToast(
        "Checkout will be available soon"
    );

}


/* =========================================
   NEWSLETTER
========================================= */

function setupNewsletter() {

    const form =
        document.getElementById(
            "newsletterForm"
        );

    if (!form) return;


    form.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            showToast(
                "Thank you for subscribing!"
            );

            form.reset();

        }
    );

}

document.addEventListener(
    "DOMContentLoaded",
    setupNewsletter
);


/* =========================================
   TOAST MESSAGE
========================================= */

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


/* =========================================
   INITIALIZE CART
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        updateCart();

    }
);
