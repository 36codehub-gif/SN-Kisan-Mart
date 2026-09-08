
/* =========================================
   SN KISAN MART - MAIN JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       ELEMENTS
    ========================================= */

    const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");

    const cartBtn = document.getElementById("cartBtn");
    const cartSidebar = document.getElementById("cartSidebar");
    const closeCart = document.getElementById("closeCart");
    const overlay = document.getElementById("overlay");

    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const cartTotal = document.getElementById("cartTotal");

    const wishlistBtn = document.getElementById("wishlistBtn");
    const wishlistButtons = document.querySelectorAll(".wishlist");

    const loginBtn = document.querySelector(".login-btn");
    const loginModal = document.getElementById("loginModal");
    const closeLogin = document.getElementById("closeLogin");
    const loginForm = document.getElementById("loginForm");

    const searchInput = document.getElementById("searchInput");
    const searchBtn = document.getElementById("searchBtn");

    const newsletterForm =
        document.getElementById("newsletterForm");

    const toast = document.getElementById("toast");

    const currentYear =
        document.getElementById("currentYear");


    /* =========================================
       CURRENT YEAR
    ========================================= */

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    /* =========================================
       MOBILE MENU
    ========================================= */

    if (menuBtn && mobileMenu) {

        menuBtn.addEventListener("click", () => {

            mobileMenu.classList.toggle("active");

            menuBtn.textContent =
                mobileMenu.classList.contains("active")
                    ? "✕"
                    : "☰";
        });

        const mobileLinks =
            mobileMenu.querySelectorAll("a");

        mobileLinks.forEach(link => {

            link.addEventListener("click", () => {

                mobileMenu.classList.remove("active");

                menuBtn.textContent = "☰";
            });

        });

    }


    /* =========================================
       CART DATA
    ========================================= */

    let cart = JSON.parse(
        localStorage.getItem("snKisanCart")
    ) || [];


    /* =========================================
       SAVE CART
    ========================================= */

    function saveCart() {

        localStorage.setItem(
            "snKisanCart",
            JSON.stringify(cart)
        );

    }


    /* =========================================
       SHOW TOAST
    ========================================= */

    function showToast(message) {

        if (!toast) return;

        toast.textContent = message;

        toast.classList.add("show");

        setTimeout(() => {

            toast.classList.remove("show");

        }, 2500);

    }


    /* =========================================
       UPDATE CART
    ========================================= */

    function updateCart() {

        if (!cartItems) return;

        cartItems.innerHTML = "";

        if (cart.length === 0) {

            cartItems.innerHTML = `
                <div class="empty-cart">
                    <div>🛒</div>
                    <h3>Your cart is empty</h3>
                    <p>Add products to your cart.</p>
                </div>
            `;

            if (cartCount) {
                cartCount.textContent = "0";
            }

            if (cartTotal) {
                cartTotal.textContent = "₹0";
            }

            saveCart();

            return;
        }


        let total = 0;
        let quantity = 0;


        cart.forEach((item, index) => {

            total += item.price * item.quantity;

            quantity += item.quantity;


            const cartItem =
                document.createElement("div");

            cartItem.className = "cart-product";

            cartItem.style.cssText = `
                display:flex;
                gap:12px;
                padding:12px 0;
                border-bottom:1px solid #edf0eb;
                align-items:center;
            `;


            cartItem.innerHTML = `

                <div style="
                    width:55px;
                    height:55px;
                    border-radius:10px;
                    background:#edf6ea;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    font-size:25px;
                ">
                    🌱
                </div>

                <div style="flex:1">

                    <strong style="
                        display:block;
                        font-size:12px;
                        color:#24382a;
                    ">
                        ${item.name}
                    </strong>

                    <span style="
                        display:block;
                        color:#176b35;
                        font-size:12px;
                        margin-top:3px;
                    ">
                        ₹${item.price}
                    </span>

                    <div style="
                        display:flex;
                        align-items:center;
                        gap:7px;
                        margin-top:7px;
                    ">

                        <button
                            class="quantity-btn"
                            data-index="${index}"
                            data-action="decrease"
                            style="
                                width:24px;
                                height:24px;
                                border:1px solid #dce5da;
                                background:white;
                                border-radius:5px;
                            "
                        >
                            −
                        </button>

                        <span style="
                            font-size:12px;
                            font-weight:bold;
                        ">
                            ${item.quantity}
                        </span>

                        <button
                            class="quantity-btn"
                            data-index="${index}"
                            data-action="increase"
                            style="
                                width:24px;
                                height:24px;
                                border:1px solid #dce5da;
                                background:white;
                                border-radius:5px;
                            "
                        >
                            +
                        </button>

                    </div>

                </div>

                <button
                    class="remove-cart"
                    data-index="${index}"
                    style="
                        border:none;
                        background:none;
                        color:#d94b3b;
                        font-size:16px;
                    "
                >
                    ✕
                </button>
            `;


            cartItems.appendChild(cartItem);

        });


        if (cartCount) {
            cartCount.textContent = quantity;
        }

        if (cartTotal) {
            cartTotal.textContent =
                "₹" + total.toLocaleString("en-IN");
        }


        saveCart();

    }


    /* =========================================
       ADD TO CART
    ========================================= */

    const addCartButtons =
        document.querySelectorAll(".add-cart");


    addCartButtons.forEach(button => {

        button.addEventListener("click", () => {

            const productName =
                button.dataset.product ||
                "Agriculture Product";


            const productCard =
                button.closest(".product-card");


            let price = 0;

            if (productCard) {

                const priceElement =
                    productCard.querySelector(
                        ".price-row strong"
                    );

                if (priceElement) {

                    price =
                        parseInt(
                            priceElement.textContent
                                .replace(/[₹,]/g, "")
                        ) || 0;

                }

            }


            const existingProduct =
                cart.find(
                    item => item.name === productName
                );


            if (existingProduct) {

                existingProduct.quantity += 1;

            } else {

                cart.push({
                    name: productName,
                    price: price,
                    quantity: 1
                });

            }


            updateCart();

            showToast(
                `${productName} added to cart!`
            );

        });

    });


    /* =========================================
       CART ITEM ACTIONS
    ========================================= */

    if (cartItems) {

        cartItems.addEventListener(
            "click",
            event => {

                const button =
                    event.target.closest("button");

                if (!button) return;


                const index =
                    parseInt(button.dataset.index);


                if (button.classList.contains(
                    "remove-cart"
                )) {

                    cart.splice(index, 1);

                    updateCart();

                    showToast(
                        "Product removed from cart."
                    );

                }


                if (button.classList.contains(
                    "quantity-btn"
                )) {

                    const action =
                        button.dataset.action;


                    if (action === "increase") {

                        cart[index].quantity++;

                    }


                    if (action === "decrease") {

                        cart[index].quantity--;

                        if (cart[index].quantity <= 0) {

                            cart.splice(index, 1);

                        }

                    }


                    updateCart();

                }

            }
        );

    }


    /* =========================================
       OPEN CART
    ========================================= */

    function openCart() {

        if (cartSidebar) {
            cartSidebar.classList.add("open");
        }

        if (overlay) {
            overlay.classList.add("active");
        }

        document.body.style.overflow = "hidden";

    }


    /* =========================================
       CLOSE CART
    ========================================= */

    function closeCartSidebar() {

        if (cartSidebar) {
            cartSidebar.classList.remove("open");
        }

        if (overlay) {
            overlay.classList.remove("active");
        }

        document.body.style.overflow = "";

    }


    if (cartBtn) {

        cartBtn.addEventListener(
            "click",
            openCart
        );

    }


    if (closeCart) {

        closeCart.addEventListener(
            "click",
            closeCartSidebar
        );

    }


    if (overlay) {

        overlay.addEventListener(
            "click",
            closeCartSidebar
        );

    }


    /* =========================================
       WISHLIST
    ========================================= */

    let wishlist =
        JSON.parse(
            localStorage.getItem("snKisanWishlist")
        ) || [];


    function updateWishlistCount() {

        if (wishlistBtn) {

            const badge =
                wishlistBtn.querySelector(".badge");

            if (badge) {
                badge.textContent =
                    wishlist.length;
            }

        }

    }


    wishlistButtons.forEach(button => {

        button.addEventListener("click", () => {

            const productCard =
                button.closest(".product-card");

            if (!productCard) return;


            const name =
                productCard.querySelector(
                    "h3"
                )?.textContent.trim();


            if (!name) return;


            const index =
                wishlist.indexOf(name);


            if (index === -1) {

                wishlist.push(name);

                button.textContent = "♥";

                showToast(
                    "Added to wishlist ❤️"
                );

            } else {

                wishlist.splice(index, 1);

                button.textContent = "♡";

                showToast(
                    "Removed from wishlist."
                );

            }


            localStorage.setItem(
                "snKisanWishlist",
                JSON.stringify(wishlist)
            );


            updateWishlistCount();

        });

    });


    /* Restore wishlist */

    wishlistButtons.forEach(button => {

        const productCard =
            button.closest(".product-card");

        const name =
            productCard?.querySelector(
                "h3"
            )?.textContent.trim();


        if (name && wishlist.includes(name)) {

            button.textContent = "♥";

        }

    });


    if (wishlistBtn) {

        wishlistBtn.addEventListener(
            "click",
            () => {

                if (wishlist.length === 0) {

                    showToast(
                        "Your wishlist is empty."
                    );

                } else {

                    showToast(
                        `${wishlist.length} item(s) in wishlist ❤️`
                    );

                }

            }
        );

    }


    /* =========================================
       LOGIN MODAL
    ========================================= */

    function openLogin() {

        if (loginModal) {

            loginModal.classList.add("active");

            document.body.style.overflow =
                "hidden";

        }

    }


    function closeLoginModal() {

        if (loginModal) {

            loginModal.classList.remove("active");

            document.body.style.overflow = "";

        }

    }


    if (loginBtn) {

        loginBtn.addEventListener(
            "click",
            event => {

                event.preventDefault();

                openLogin();

            }
        );

    }


    if (closeLogin) {

        closeLogin.addEventListener(
            "click",
            closeLoginModal
        );

    }


    if (loginModal) {

        loginModal.addEventListener(
            "click",
            event => {

                if (event.target === loginModal) {

                    closeLoginModal();

                }

            }
        );

    }


    /* =========================================
       LOGIN FORM
    ========================================= */

    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                const email =
                    document.getElementById(
                        "loginEmail"
                    )?.value.trim();

                const password =
                    document.getElementById(
                        "loginPassword"
                    )?.value.trim();


                if (!email || !password) {

                    showToast(
                        "Please enter email and password."
                    );

                    return;

                }


                /*
                 * FRONTEND DEMO ONLY
                 *
                 * Real authentication will be
                 * connected to Node.js + MongoDB later.
                 */

                showToast(
                    "Login system will be connected soon."
                );

            }
        );

    }


    /* =========================================
       SEARCH
    ========================================= */

    function searchProducts() {

        if (!searchInput) return;


        const searchTerm =
            searchInput.value
                .trim()
                .toLowerCase();


        const products =
            document.querySelectorAll(
                ".product-card"
            );


        if (!searchTerm) {

            products.forEach(product => {

                product.style.display = "";

            });

            return;

        }


        let found = 0;


        products.forEach(product => {

            const text =
                product.textContent.toLowerCase();


            if (text.includes(searchTerm)) {

                product.style.display = "";

                found++;

            } else {

                product.style.display = "none";

            }

        });


        document
            .getElementById("products")
            ?.scrollIntoView({
                behavior: "smooth"
            });


        if (found === 0) {

            showToast(
                "No matching products found."
            );

        } else {

            showToast(
                `${found} product(s) found.`
            );

        }

    }


    if (searchBtn) {

        searchBtn.addEventListener(
            "click",
            searchProducts
        );

    }


    if (searchInput) {

        searchInput.addEventListener(
            "keydown",
            event => {

                if (event.key === "Enter") {

                    searchProducts();

                }

            }
        );

    }


    /* =========================================
       NEWSLETTER
    ========================================= */

    if (newsletterForm) {

        newsletterForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                const email =
                    document.getElementById(
                        "emailInput"
                    )?.value.trim();


                if (!email) {

                    showToast(
                        "Please enter your email."
                    );

                    return;

                }


                showToast(
                    "Thanks for subscribing! 🌱"
                );


                newsletterForm.reset();

            }
        );

    }


    /* =========================================
       CHECKOUT BUTTON
    ========================================= */

    const checkoutBtn =
        document.querySelector(
            ".checkout-btn"
        );


    if (checkoutBtn) {

        checkoutBtn.addEventListener(
            "click",
            () => {

                if (cart.length === 0) {

                    showToast(
                        "Your cart is empty."
                    );

                    return;

                }


                showToast(
                    "Checkout will be connected soon."
                );

            }
        );

    }


    /* =========================================
       INITIALIZE
    ========================================= */

    updateCart();

    updateWishlistCount();

});
