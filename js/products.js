const products = [
    {
        id: 1,
        name: "Premium Vegetable Seeds",
        category: "Seeds",
        price: 299,
        icon: "🌱",
        description: "High-quality vegetable seeds for healthy and productive crops."
    },
    {
        id: 2,
        name: "Organic Growth Fertilizer",
        category: "Fertilizers",
        price: 499,
        icon: "🌿",
        description: "Organic fertilizer designed to improve soil health and plant growth."
    },
    {
        id: 3,
        name: "Advanced Crop Protection",
        category: "Crop Protection",
        price: 699,
        icon: "🛡️",
        description: "Reliable crop protection solution for healthier and stronger crops."
    },
    {
        id: 4,
        name: "Professional Farming Tool Kit",
        category: "Farm Tools",
        price: 899,
        icon: "🛠️",
        description: "Essential farming tools suitable for everyday agricultural work."
    },
    {
        id: 5,
        name: "Hybrid Tomato Seeds",
        category: "Seeds",
        price: 349,
        icon: "🍅",
        description: "Quality hybrid tomato seeds suitable for productive farming."
    },
    {
        id: 6,
        name: "NPK Plant Fertilizer",
        category: "Fertilizers",
        price: 599,
        icon: "🌾",
        description: "Balanced plant nutrition to support crop development."
    },
    {
        id: 7,
        name: "Plant Protection Spray",
        category: "Crop Protection",
        price: 449,
        icon: "🪴",
        description: "Crop-care product for maintaining healthy plants."
    },
    {
        id: 8,
        name: "Hand Garden Tool Set",
        category: "Farm Tools",
        price: 249,
        icon: "🔧",
        description: "Compact hand tools for gardening and small farming activities."
    }
];

let currentCategory = "all";


function displayProducts(list = products) {

    const grid = document.getElementById("productsGrid");

    if (!grid) return;

    if (list.length === 0) {

        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align:center; padding:40px;">
                <h3>No products found</h3>
                <p>Try another product or category.</p>
            </div>
        `;

        return;
    }

    grid.innerHTML = list.map(product => `

        <div class="product-card"
             data-category="${product.category}"
             data-price="${product.price}"
             data-name="${product.name}"
             onclick="openProductDetails(${product.id})">

            <div class="product-image">
                ${product.icon}
            </div>

            <div class="product-info">

                <div class="product-category">
                    ${product.category}
                </div>

                <h3>${product.name}</h3>

                <p class="product-description">
                    ${product.description}
                </p>

                <div class="product-bottom">

                    <span class="product-price">
                        ₹${product.price}
                    </span>

                    <button
                        class="add-cart-btn"
                        onclick="event.stopPropagation(); addToCart('${product.name}', ${product.price})">
                        Add to Cart
                    </button>

                </div>

            </div>

        </div>

    `).join("");
}


/* ================================
   OPEN PRODUCT DETAILS
================================ */

function openProductDetails(productId) {

    window.location.href =
        `product-details.html?id=${productId}`;

}


/* ================================
   FILTER PRODUCTS
================================ */

function filterProducts(category, button) {

    currentCategory = category;

    document
        .querySelectorAll(".category-filter button")
        .forEach(btn => btn.classList.remove("active"));

    if (button) {
        button.classList.add("active");
    }

    const searchInput =
        document.getElementById("productSearch");

    const search = searchInput
        ? searchInput.value.toLowerCase().trim()
        : "";

    let filtered = products.filter(product => {

        const categoryMatch =
            category === "all" ||
            product.category === category;

        const searchMatch =
            product.name.toLowerCase().includes(search) ||
            product.category.toLowerCase().includes(search);

        return categoryMatch && searchMatch;
    });

    displayProducts(filtered);
}


/* ================================
   SEARCH PRODUCTS
================================ */

function searchProducts() {

    const searchInput =
        document.getElementById("productSearch");

    const search = searchInput
        ? searchInput.value.toLowerCase().trim()
        : "";

    let filtered = products.filter(product => {

        const categoryMatch =
            currentCategory === "all" ||
            product.category === currentCategory;

        const searchMatch =
            product.name.toLowerCase().includes(search) ||
            product.category.toLowerCase().includes(search);

        return categoryMatch && searchMatch;
    });

    displayProducts(filtered);
}


/* ================================
   SORT PRODUCTS
================================ */

function sortProducts() {

    const sortSelect =
        document.getElementById("sortProducts");

    const sort = sortSelect
        ? sortSelect.value
        : "default";

    const searchInput =
        document.getElementById("productSearch");

    const search = searchInput
        ? searchInput.value.toLowerCase().trim()
        : "";

    let filtered = products.filter(product => {

        const categoryMatch =
            currentCategory === "all" ||
            product.category === currentCategory;

        const searchMatch =
            product.name.toLowerCase().includes(search) ||
            product.category.toLowerCase().includes(search);

        return categoryMatch && searchMatch;
    });


    if (sort === "low") {

        filtered.sort(
            (a, b) => a.price - b.price
        );

    } else if (sort === "high") {

        filtered.sort(
            (a, b) => b.price - a.price
        );

    } else if (sort === "name") {

        filtered.sort(
            (a, b) =>
                a.name.localeCompare(b.name)
        );
    }

    displayProducts(filtered);
}


/* ================================
   INITIALIZE PRODUCTS
================================ */

document.addEventListener("DOMContentLoaded", () => {

    displayProducts(products);

    const searchInput =
        document.getElementById("productSearch");

    if (searchInput) {

        searchInput.addEventListener(
            "keyup",
            searchProducts
        );

    }

});
