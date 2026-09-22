// ===============================
// KLECOMMERCE JAVASCRIPT
// ===============================


// PRODUCT DATA

const products = [
    {
        name: "Men's Shirt",
        price: 999,
        category: "Fashion"
    },

    {
        name: "Premium Basmati Rice",
        price: 1200,
        category: "Groceries"
    },

    {
        name: "Smart Phone",
        price: 15000,
        category: "Mobiles"
    },

    {
        name: "Washing Machine",
        price: 22000,
        category: "Appliances"
    }
];


// CART

let cart = JSON.parse(localStorage.getItem("kleCart")) || [];


// ===============================
// SELECT HTML ELEMENTS
// ===============================

const cartLinks = document.querySelectorAll(".user-section a");

const searchInput = document.querySelector(".search-section input");

const searchButton = document.querySelector(".search-section button");

const productCards = document.querySelectorAll(".product-card");

const addToCartButtons = document.querySelectorAll(".cart-button");


// ===============================
// CART COUNT
// ===============================

function updateCartCount() {

    let totalItems = 0;

    cart.forEach(function(item) {
        totalItems += item.quantity;
    });

    cartLinks[2].innerHTML = `🛒 Cart (${totalItems})`;
}


// ===============================
// SAVE CART
// ===============================

function saveCart() {

    localStorage.setItem(
        "kleCart",
        JSON.stringify(cart)
    );
}


// ===============================
// ADD PRODUCT TO CART
// ===============================

function addToCart(productIndex) {

    const product = products[productIndex];

    const existingProduct = cart.find(
        item => item.name === product.name
    );


    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            name: product.name,
            price: product.price,
            category: product.category,
            quantity: 1
        });

    }


    saveCart();

    updateCartCount();

    showMessage(
        product.name + " added to cart!"
    );
}


// ===============================
// ADD TO CART BUTTONS
// ===============================

addToCartButtons.forEach(function(button, index) {

    button.addEventListener("click", function() {

        addToCart(index);

    });

});


// ===============================
// SEARCH PRODUCTS
// ===============================

function searchProducts() {

    const searchText =
        searchInput.value.toLowerCase().trim();


    productCards.forEach(function(card) {

        const productName =
            card.querySelector("h3")
                .textContent
                .toLowerCase();


        const category =
            card.querySelector(".category")
                .textContent
                .toLowerCase();


        if (
            productName.includes(searchText) ||
            category.includes(searchText)
        ) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

}


// SEARCH BUTTON

searchButton.addEventListener(
    "click",
    searchProducts
);


// SEARCH WHILE TYPING

searchInput.addEventListener(
    "input",
    searchProducts
);


// ===============================
// ENTER KEY SEARCH
// ===============================

searchInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            searchProducts();

        }

    }
);


// ===============================
// MESSAGE
// ===============================

function showMessage(message) {

    const notification =
        document.createElement("div");


    notification.textContent = message;


    notification.style.position = "fixed";

    notification.style.top = "20px";

    notification.style.right = "20px";

    notification.style.background = "#073b91";

    notification.style.color = "white";

    notification.style.padding = "15px 25px";

    notification.style.borderRadius = "8px";

    notification.style.fontWeight = "bold";

    notification.style.zIndex = "9999";

    notification.style.boxShadow =
        "0 5px 15px rgba(0,0,0,0.3)";


    document.body.appendChild(notification);


    setTimeout(function() {

        notification.remove();

    }, 2000);

}


// ===============================
// CART WINDOW
// ===============================

cartLinks[2].addEventListener(
    "click",
    function(event) {

        event.preventDefault();

        showCart();

    }
);


// ===============================
// SHOW CART
// ===============================

function showCart() {

    const oldCart =
        document.querySelector(".cart-popup");


    if (oldCart) {

        oldCart.remove();

        return;

    }


    const cartPopup =
        document.createElement("div");


    cartPopup.className = "cart-popup";


    cartPopup.style.position = "fixed";

    cartPopup.style.top = "80px";

    cartPopup.style.right = "30px";

    cartPopup.style.width = "380px";

    cartPopup.style.maxHeight = "500px";

    cartPopup.style.overflowY = "auto";

    cartPopup.style.background = "white";

    cartPopup.style.padding = "25px";

    cartPopup.style.borderRadius = "12px";

    cartPopup.style.boxShadow =
        "0 10px 30px rgba(0,0,0,0.3)";

    cartPopup.style.zIndex = "9998";


    let html = `

        <h2 style="color:#073b91; margin-bottom:20px;">
            🛒 Your Cart
        </h2>

    `;


    if (cart.length === 0) {

        html += `

            <p style="color:#666;">
                Your cart is empty.
            </p>

        `;

    } else {


        cart.forEach(function(item, index) {

            html += `

                <div style="
                    border-bottom:1px solid #ddd;
                    padding:15px 0;
                ">

                    <h3>
                        ${item.name}
                    </h3>

                    <p>
                        ₹${item.price}
                    </p>

                    <div style="
                        display:flex;
                        align-items:center;
                        gap:10px;
                        margin-top:10px;
                    ">

                        <button
                            onclick="decreaseQuantity(${index})"
                            style="
                                padding:5px 10px;
                                cursor:pointer;
                            "
                        >
                            −
                        </button>

                        <strong>
                            ${item.quantity}
                        </strong>

                        <button
                            onclick="increaseQuantity(${index})"
                            style="
                                padding:5px 10px;
                                cursor:pointer;
                            "
                        >
                            +
                        </button>

                        <button
                            onclick="removeFromCart(${index})"
                            style="
                                margin-left:auto;
                                padding:5px 10px;
                                background:#e53935;
                                color:white;
                                border:none;
                                border-radius:4px;
                                cursor:pointer;
                            "
                        >
                            Remove
                        </button>

                    </div>

                </div>

            `;

        });


        const total =
            calculateTotal();


        html += `

            <div style="
                margin-top:20px;
                padding-top:15px;
                border-top:2px solid #073b91;
            ">

                <h2>
                    Total: ₹${total}
                </h2>

                <button
                    onclick="checkout()"
                    style="
                        width:100%;
                        margin-top:15px;
                        padding:12px;
                        background:#ffb900;
                        color:#073b91;
                        border:none;
                        border-radius:6px;
                        font-weight:bold;
                        cursor:pointer;
                    "
                >
                    Proceed to Checkout
                </button>

            </div>

        `;

    }


    cartPopup.innerHTML = html;


    document.body.appendChild(cartPopup);

}


// ===============================
// INCREASE QUANTITY
// ===============================

function increaseQuantity(index) {

    cart[index].quantity++;

    saveCart();

    updateCartCount();

    refreshCart();

}


// ===============================
// DECREASE QUANTITY
// ===============================

function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }


    saveCart();

    updateCartCount();

    refreshCart();

}


// ===============================
// REMOVE FROM CART
// ===============================

function removeFromCart(index) {

    const productName =
        cart[index].name;


    cart.splice(index, 1);


    saveCart();

    updateCartCount();

    refreshCart();


    showMessage(
        productName + " removed from cart!"
    );

}


// ===============================
// CALCULATE TOTAL
// ===============================

function calculateTotal() {

    let total = 0;


    cart.forEach(function(item) {

        total +=
            item.price * item.quantity;

    });


    return total;

}


// ===============================
// REFRESH CART
// ===============================

function refreshCart() {

    const cartPopup =
        document.querySelector(".cart-popup");


    if (cartPopup) {

        cartPopup.remove();

        showCart();

    }

}


// ===============================
// CHECKOUT
// ===============================

function checkout() {

    if (cart.length === 0) {

        showMessage(
            "Your cart is empty!"
        );

        return;

    }


    const total =
        calculateTotal();


    alert(
        "Thank you for shopping with KLECommerce!\n\n" +
        "Order Total: ₹" + total +
        "\n\nCheckout functionality can be connected to a payment system later."
    );

}


// ===============================
// CATEGORY FILTER
// ===============================

const categories =
    document.querySelectorAll(".navbar a");


categories.forEach(function(categoryLink) {

    categoryLink.addEventListener(
        "click",
        function(event) {

            event.preventDefault();


            const category =
                categoryLink.textContent
                    .toLowerCase()
                    .trim();


            productCards.forEach(function(card) {

                const productCategory =
                    card.querySelector(".category")
                        .textContent
                        .toLowerCase()
                        .trim();


                if (
                    category === productCategory
                ) {

                    card.style.display = "block";

                } else {

                    card.style.display = "none";

                }

            });


            document.querySelector(
                ".products-section"
            ).scrollIntoView({
                behavior: "smooth"
            });

        }
    );

});


// ===============================
// SHOW ALL PRODUCTS
// ===============================

document.querySelector(
    ".section-title h2"
).addEventListener(
    "dblclick",
    function() {

        productCards.forEach(
            card => card.style.display = "block"
        );

        searchInput.value = "";

    }
);


// ===============================
// INITIALIZE
// ===============================

updateCartCount();