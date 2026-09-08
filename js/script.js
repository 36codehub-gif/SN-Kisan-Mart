/* =========================================
   SN KISAN MART - MAIN SCRIPT
========================================= */

let cart = JSON.parse(localStorage.getItem("snKisanCart")) || [];


/* =========================================
   CART STORAGE
========================================= */

function saveCart() {
    localStorage.setItem("snKisanCart", JSON.stringify(cart));
}


/* =========================================
   ADD TO CART
========================================= */

function addToCart(name, price, quantity = 1) {

    price = Number(price);
    quantity = Number(quantity);

    if (!name || !price || quantity < 1) {
        return;
    }

    const existingProduct = cart.find(
        item => item.name === name
    );

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

    showToast(
        quantity > 1
            ? quantity + " × " + name + " added to cart"
            : name + " added to cart"
    );
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


    const totalQuantity = cart.reduce(
        (sum, item) =>
            sum + Number(item.quantity),
        0
    );


    if (cartCount) {
        cartCount.textContent = totalQuantity;
    }


    /* Empty Cart */

    if (cart.length === 0) {

        if (cartItems) {

            cartItems.innerHTML = `
                <div class="empty-cart">
                    <div>🛒</div>
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


    /* Cart Items */

    if (cartItems) {

        cartItems.innerHTML = cart.map(
            (item, index) => {

                const itemTotal =
                    Number(item.price) *
                    Number(item.quantity);

                return `
                    <div class="cart-item">

                        <div class="cart-item-info">

                            <h4>
                                ${item.name}
                            </h4>

                            <p>
                                ₹${item.price} × ${item.quantity}
                            </p>

                        </div>


                        <div class="cart-item-controls">

                            <button
                                type="button"
                                onclick="decreaseCartItem(${index})"
                            >
                                −
                            </button>

                            <span>
                                ${item.quantity}
                            </span>

                            <button
                                type="button"
                                onclick="increaseCartItem(${index})"
                            >
                                +
                            </button>

                        </div>


                        <div class="cart-item-total">
                            ₹${itemTotal}
                        </div>


                        <button
                            type="button"
                            class="remove-cart-btn"
                            onclick="removeCartItem(${index})"
                        >
                            ✕
                        </button>

                    </div>
                `;
            }
        ).join("");

    }


    /* Total */

    const total = cart.reduce(
        (sum, item) =>
            sum +
            (
                Number(item.price) *
                Number(item.quantity)
            ),
        0
    );


    if (cartTotal) {
        cartTotal.textContent =
            "₹" + total;
    }
}


/* =========================================
   INCREASE QUANTITY
========================================= */

function increaseCartItem(index) {

    if (!cart[index]) return;

    cart[index].quantity += 1;

    saveCart();
    updateCart();
}


/* =========================================
   DECREASE QUANTITY
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
   REMOVE PRODUCT
========================================= */

function removeCartItem(index) {

    if (!cart[index]) return;

    const productName =
        cart[index].name;

    cart.splice(index, 1);

    saveCart();
    updateCart();

    showToast(
        productName + " removed from cart"
    );
}


/* =========================================
   OPEN CART
========================================= */

function openCart() {

    const sidebar =
        document.getElementById("cartSidebar");

    const overlay =
        document.getElementById("overlay");

    const productsOverlay =
        document.getElementById("cartOverlay");


    if (sidebar) {

        sidebar.classList.add("open");
        sidebar.classList.add("active");

    }


    if (overlay) {
        overlay.classList.add("active");
    }


    if (productsOverlay) {
        productsOverlay.classList.add("active");
    }


    updateCart();
}


/* =========================================
   CLOSE CART
========================================= */

function closeCart() {

    const sidebar =
        document.getElementById("cartSidebar");

    const overlay =
        document.getElementById("overlay");

    const productsOverlay =
        document.getElementById("cartOverlay");


    if (sidebar) {

        sidebar.classList.remove("open");
        sidebar.classList.remove("active");

    }


    if (overlay) {
        overlay.classList.remove("active");
    }


    if (productsOverlay) {
        productsOverlay.classList.remove("active");
    }
}


/* =========================================
   LOGIN MODAL
========================================= */

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


/* =========================================
   TOAST
========================================= */

function showToast(message) {

    const toast =
        document.getElementById("toast");

    if (!toast) return;

    toast.textContent = message;

    toast.classList.add("show");


    clearTimeout(
        window.toastTimer
    );


    window.toastTimer =
        setTimeout(() => {

            toast.classList.remove("show");

        }, 2500);
}


/* =========================================
   HOMEPAGE PRODUCT CART BUTTONS
========================================= */

function setupAddToCartButtons() {

    const buttons =
        document.querySelectorAll(".add-cart");


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            function (event) {

                event.preventDefault();
                event.stopPropagation();


                const productName =
                    button.dataset.product;


                const card =
                    button.closest(".product-card");


                if (!card) return;


                const priceElement =
                    card.querySelector(
                        ".price-row strong"
                    );


                if (!priceElement) return;


                const priceText =
                    priceElement.textContent
                        .replace(/[₹,]/g, "")
                        .trim();


                const price =
                    Number(priceText);


                addToCart(
                    productName,
                    price
                );

            }
        );

    });
}


/* =========================================
   CART BUTTON - HOMEPAGE
========================================= */

function setupCartButton() {

    const cartButton =
        document.getElementById("cartBtn");


    if (cartButton) {

        cartButton.addEventListener(
            "click",
            openCart
        );

    }


    const closeButton =
        document.getElementById("closeCart");


    if (closeButton) {

        closeButton.addEventListener(
            "click",
            closeCart
        );

    }


    const overlay =
        document.getElementById("overlay");


    if (overlay) {

        overlay.addEventListener(
            "click",
            closeCart
        );

    }
}


/* =========================================
   MOBILE MENU
========================================= */

function setupMobileMenu() {

    const menuBtn =
        document.getElementById("menuBtn");

    const mobileMenu =
        document.getElementById("mobileMenu");


    if (!menuBtn || !mobileMenu) {
        return;
    }


    menuBtn.addEventListener(
        "click",
        function () {

            mobileMenu.classList.toggle(
                "active"
            );

        }
    );


    mobileMenu
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                function () {

                    mobileMenu.classList.remove(
                        "active"
                    );

                }
            );

        });
}


/* =========================================
   LOGIN BUTTON
========================================= */

function setupLogin() {

    const loginLinks =
        document.querySelectorAll(
            '.login-btn, a[href="#login"]'
        );


    loginLinks.forEach(link => {

        link.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                openLoginModal();

            }
        );

    });


    const closeLogin =
        document.getElementById("closeLogin");


    if (closeLogin) {

        closeLogin.addEventListener(
            "click",
            closeLoginModal
        );

    }


    const loginModal =
        document.getElementById("loginModal");


    if (loginModal) {

        loginModal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target ===
                    loginModal
                ) {

                    closeLoginModal();

                }

            }
        );

    }


    const loginForm =
        document.getElementById("loginForm");


    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                showToast(
                    "Login system coming soon"
                );

            }
        );

    }
}


/* =========================================
   SEARCH
========================================= */

function setupSearch() {

    const searchInput =
        document.getElementById("searchInput");

    const searchButton =
        document.getElementById("searchBtn");


    function performSearch() {

        if (!searchInput) return;

        const query =
            searchInput.value
                .toLowerCase()
                .trim();


        if (!query) {

            document
                .getElementById("products")
                ?.scrollIntoView({
                    behavior: "smooth"
                });

            return;

        }


        const productCards =
            document.querySelectorAll(
                ".product-card"
            );


        let found = false;


        productCards.forEach(card => {

            const name =
                card.querySelector("h3")
                    ?.textContent
                    .toLowerCase() || "";


            const category =
                card.querySelector(
                    ".product-category"
                )
                ?.textContent
                .toLowerCase() || "";


            const match =
                name.includes(query) ||
                category.includes(query);


            card.style.display =
                match ? "" : "none";


            if (match) {
                found = true;
            }

        });


        document
            .getElementById("products")
            ?.scrollIntoView({
                behavior: "smooth"
            });


        if (!found) {

            showToast(
                "No matching product found"
            );

        }

    }


    if (searchButton) {

        searchButton.addEventListener(
            "click",
            performSearch
        );

    }


    if (searchInput) {

        searchInput.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Enter") {

                    performSearch();

                }

            }
        );

    }
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
        function (event) {

            event.preventDefault();

            const input =
                document.getElementById(
                    "emailInput"
                );


            if (input) {

                input.value = "";

            }


            showToast(
                "Thank you for subscribing!"
            );

        }
    );
}


/* =========================================
   CHECKOUT
========================================= */

function checkout() {
    if (!cart || cart.length === 0) {
        showToast("Your cart is empty");
        return;
    }

    window.location.href = "checkout.html";
}

/* =========================================
   YEAR
========================================= */

function setCurrentYear() {

    const year =
        document.getElementById(
            "currentYear"
        );


    if (year) {

        year.textContent =
            new Date().getFullYear();

    }
}


/* =========================================
   INITIALIZE
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateCart();

        setupAddToCartButtons();

        setupCartButton();

        setupMobileMenu();

        setupLogin();

        setupSearch();

        setupNewsletter();

        setCurrentYear();

    }
);
