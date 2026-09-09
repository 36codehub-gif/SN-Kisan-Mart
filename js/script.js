/* =========================================
   SN KISAN MART - MAIN SCRIPT
========================================= */


/* =========================================
   CART
========================================= */

let cart = JSON.parse(localStorage.getItem("snKisanCart")) || [];


function saveCart() {
    localStorage.setItem("snKisanCart", JSON.stringify(cart));
}


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


function updateCart() {

    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");
    const cartCount = document.getElementById("cartCount");

    const totalQuantity = cart.reduce(
        (sum, item) => sum + Number(item.quantity),
        0
    );

    if (cartCount) {
        cartCount.textContent = totalQuantity;
    }

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


    if (cartItems) {

        cartItems.innerHTML = cart.map(
            (item, index) => {

                const itemTotal =
                    Number(item.price) *
                    Number(item.quantity);

                return `
                    <div class="cart-item">

                        <div class="cart-item-info">
                            <h4>${item.name}</h4>
                            <p>
                                ₹${Number(item.price).toLocaleString("en-IN")}
                                × ${item.quantity}
                            </p>
                        </div>

                        <div class="cart-item-controls">

                            <button
                                type="button"
                                onclick="decreaseCartItem(${index})"
                            >
                                −
                            </button>

                            <span>${item.quantity}</span>

                            <button
                                type="button"
                                onclick="increaseCartItem(${index})"
                            >
                                +
                            </button>

                        </div>

                        <div class="cart-item-total">
                            ₹${itemTotal.toLocaleString("en-IN")}
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


    const total = cart.reduce(
        (sum, item) =>
            sum +
            Number(item.price) * Number(item.quantity),
        0
    );

    if (cartTotal) {
        cartTotal.textContent =
            "₹" + total.toLocaleString("en-IN");
    }
}


function increaseCartItem(index) {

    if (!cart[index]) return;

    cart[index].quantity += 1;

    saveCart();
    updateCart();
}


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


function removeCartItem(index) {

    if (!cart[index]) return;

    const productName = cart[index].name;

    cart.splice(index, 1);

    saveCart();
    updateCart();

    showToast(productName + " removed from cart");
}


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


function checkout() {

    if (!cart || cart.length === 0) {
        showToast("Your cart is empty");
        return;
    }

    window.location.href = "checkout.html";
}


/* =========================================
   AUTH SYSTEM
========================================= */


function getUsers() {

    return JSON.parse(
        localStorage.getItem("snKisanUsers")
    ) || [];
}


function saveUsers(users) {

    localStorage.setItem(
        "snKisanUsers",
        JSON.stringify(users)
    );
}


/* =========================================
   LOGIN MODAL
========================================= */


function openLoginModal() {

    const modal =
        document.getElementById("loginModal");

    if (!modal) return;

    modal.classList.add("active");

    showLoginSection();
}


function closeLoginModal() {

    const modal =
        document.getElementById("loginModal");

    if (modal) {
        modal.classList.remove("active");
    }
}


function showLoginSection() {

    const loginSection =
        document.getElementById("loginSection");

    const registerSection =
        document.getElementById("registerSection");

    if (loginSection) {
        loginSection.style.display = "block";
    }

    if (registerSection) {
        registerSection.style.display = "none";
    }
}


function showRegisterSection() {

    const loginSection =
        document.getElementById("loginSection");

    const registerSection =
        document.getElementById("registerSection");

    if (loginSection) {
        loginSection.style.display = "none";
    }

    if (registerSection) {
        registerSection.style.display = "block";
    }
}


/* =========================================
   PASSWORD SHOW / HIDE
========================================= */


function togglePassword(inputId, button) {

    const input =
        document.getElementById(inputId);

    if (!input) return;

    if (input.type === "password") {

        input.type = "text";

        if (button) {
            button.textContent = "🙈";
        }

    } else {

        input.type = "password";

        if (button) {
            button.textContent = "👁️";
        }
    }
}


/* =========================================
   AUTH SETUP
========================================= */


function setupLogin() {

    const loginForm =
        document.getElementById("loginForm");

    const registerForm =
        document.getElementById("registerForm");

    const showRegister =
        document.getElementById("showRegister");

    const showLogin =
        document.getElementById("showLogin");

    const closeLogin =
        document.getElementById("closeLogin");

    const loginModal =
        document.getElementById("loginModal");


    /* -------------------------------------
       HEADER LOGIN BUTTON
    ------------------------------------- */

    const loginLinks =
        document.querySelectorAll(
            '.login-btn, a[href="#login"]'
        );


    loginLinks.forEach(link => {

        link.addEventListener(
            "click",
            function(event) {

                event.preventDefault();

                const currentUser =
                    JSON.parse(
                        localStorage.getItem(
                            "snKisanCurrentUser"
                        )
                    );

                if (currentUser) {

                    window.location.href =
                        "account.html";

                } else {

                    openLoginModal();

                }

            }
        );

    });


    /* -------------------------------------
       CREATE ACCOUNT
    ------------------------------------- */

    if (showRegister) {

        showRegister.addEventListener(
            "click",
            function(event) {

                event.preventDefault();

                showRegisterSection();

            }
        );

    }


    /* -------------------------------------
       BACK TO LOGIN
    ------------------------------------- */

    if (showLogin) {

        showLogin.addEventListener(
            "click",
            function(event) {

                event.preventDefault();

                showLoginSection();

            }
        );

    }


    /* -------------------------------------
       CLOSE BUTTON
    ------------------------------------- */

    if (closeLogin) {

        closeLogin.addEventListener(
            "click",
            function() {

                closeLoginModal();

            }
        );

    }


    /* -------------------------------------
       CLICK OUTSIDE MODAL
    ------------------------------------- */

    if (loginModal) {

        loginModal.addEventListener(
            "click",
            function(event) {

                if (event.target === loginModal) {

                    closeLoginModal();

                }

            }
        );

    }


    /* =====================================
       REGISTER
    ===================================== */

    if (registerForm) {

        registerForm.addEventListener(
            "submit",
            function(event) {

                event.preventDefault();


                const name =
                    document
                        .getElementById("registerName")
                        ?.value
                        .trim();


                const email =
                    document
                        .getElementById("registerEmail")
                        ?.value
                        .trim()
                        .toLowerCase();


                const password =
                    document
                        .getElementById("registerPassword")
                        ?.value;


                const confirmPassword =
                    document
                        .getElementById(
                            "registerConfirmPassword"
                        )
                        ?.value;


                /* Validation */

                if (
                    !name ||
                    !email ||
                    !password ||
                    !confirmPassword
                ) {

                    showToast(
                        "Please fill all fields"
                    );

                    return;
                }


                if (password.length < 6) {

                    showToast(
                        "Password must be at least 6 characters"
                    );

                    return;
                }


                if (
                    password !== confirmPassword
                ) {

                    showToast(
                        "Passwords do not match"
                    );

                    return;
                }


                /* Get Users */

                const users = getUsers();


                /* Check Existing Email */

                const existingUser =
                    users.find(
                        user =>
                            user.email === email
                    );


                if (existingUser) {

                    showToast(
                        "Email already registered"
                    );

                    return;
                }


                /* Create User */

                const newUser = {

                    id:
                        "USER" +
                        Date.now(),

                    name: name,

                    email: email,

                    password: password

                };


                /* Save User */

                users.push(newUser);

                saveUsers(users);


                /* Auto Login */

                localStorage.setItem(
                    "snKisanCurrentUser",
                    JSON.stringify(newUser)
                );


                updateAuthUI();


                showToast(
                    "Account created successfully 🎉"
                );


                /* Go Account */

                setTimeout(
                    function() {

                        closeLoginModal();

                        window.location.href =
                            "account.html";

                    },
                    800
                );

            }
        );

    }


    /* =====================================
       LOGIN
    ===================================== */

    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            function(event) {

                event.preventDefault();


                const email =
                    document
                        .getElementById("loginEmail")
                        ?.value
                        .trim()
                        .toLowerCase();


                const password =
                    document
                        .getElementById("loginPassword")
                        ?.value;


                if (!email || !password) {

                    showToast(
                        "Please enter email and password"
                    );

                    return;
                }


                const users = getUsers();


                const user =
                    users.find(
                        item =>
                            item.email === email &&
                            item.password === password
                    );


                if (!user) {

                    showToast(
                        "Invalid email or password"
                    );

                    return;
                }


                /* Save Current User */

                localStorage.setItem(
                    "snKisanCurrentUser",
                    JSON.stringify(user)
                );


                updateAuthUI();


                showToast(
                    "Login successful 🎉"
                );


                setTimeout(
                    function() {

                        closeLoginModal();

                        window.location.href =
                            "account.html";

                    },
                    800
                );

            }
        );

    }

}


/* =========================================
   UPDATE AUTH UI
========================================= */


function updateAuthUI() {

    const loginButtons =
        document.querySelectorAll(
            ".login-btn"
        );


    let currentUser = null;


    try {

        currentUser =
            JSON.parse(
                localStorage.getItem(
                    "snKisanCurrentUser"
                )
            );

    } catch (error) {

        currentUser = null;

    }


    loginButtons.forEach(
        button => {

            if (currentUser) {

                button.textContent =
                    "👤 " +
                    currentUser.name;

                button.href =
                    "account.html";

            } else {

                button.textContent =
                    "👤 Login";

                button.href =
                    "#login";

            }

        }
    );
}


/* =========================================
   LOGOUT
========================================= */


function logoutUser() {

    localStorage.removeItem(
        "snKisanCurrentUser"
    );

    updateAuthUI();

    showToast(
        "You have been logged out"
    );
}


/* =========================================
   HOMEPAGE ADD TO CART BUTTONS
========================================= */


function setupAddToCartButtons() {

    const buttons =
        document.querySelectorAll(
            ".add-cart"
        );


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            function(event) {

                event.preventDefault();
                event.stopPropagation();


                const productName =
                    button.dataset.product;


                const card =
                    button.closest(
                        ".product-card"
                    );


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
   CART BUTTON
========================================= */


function setupCartButton() {

    const cartButton =
        document.getElementById(
            "cartBtn"
        );


    if (cartButton) {

        cartButton.addEventListener(
            "click",
            openCart
        );

    }


    const closeButton =
        document.getElementById(
            "closeCart"
        );


    if (closeButton) {

        closeButton.addEventListener(
            "click",
            closeCart
        );

    }


    const overlay =
        document.getElementById(
            "overlay"
        );


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
        document.getElementById(
            "menuBtn"
        );


    const mobileMenu =
        document.getElementById(
            "mobileMenu"
        );


    if (!menuBtn || !mobileMenu) {
        return;
    }


    menuBtn.addEventListener(
        "click",
        function() {

            mobileMenu.classList.toggle(
                "active"
            );

        }
    );


    mobileMenu
        .querySelectorAll("a")
        .forEach(
            link => {

                link.addEventListener(
                    "click",
                    function() {

                        mobileMenu.classList.remove(
                            "active"
                        );

                    }
                );

            }
        );

}


/* =========================================
   SEARCH
========================================= */


function setupSearch() {

    const searchInput =
        document.getElementById(
            "searchInput"
        );


    const searchButton =
        document.getElementById(
            "searchBtn"
        );


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


        productCards.forEach(
            card => {

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

            }
        );


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
            function(event) {

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
        function(event) {

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
   TOAST
========================================= */


function showToast(message) {

    const toast =
        document.getElementById(
            "toast"
        );


    if (!toast) {
        alert(message);
        return;
    }


    toast.textContent = message;

    toast.classList.add("show");


    setTimeout(
        function() {

            toast.classList.remove(
                "show"
            );

        },
        2500
    );

}


/* =========================================
   CURRENT YEAR
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
    function() {

        updateCart();

        setupAddToCartButtons();

        setupCartButton();

        setupMobileMenu();

        setupLogin();

        setupSearch();

        setupNewsletter();

        setCurrentYear();

        updateAuthUI();

    }
);
