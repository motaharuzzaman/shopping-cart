let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Add item to cart
function addToCart(id, name, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartUI();
}

// Remove item from cart
function removeFromCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartUI();
}

// Clear the entire cart
function clearCart() {
    localStorage.removeItem("cart");
    updateCartUI();
}

// Update cart UI
function updateCartUI() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    document.getElementById("cart-count").textContent = cart.reduce((total, item) => total + item.quantity, 0);
    updateCartSummary();
}

// Update cart summary
function updateCartSummary() {
    const cartItemsList = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartItemsList.innerHTML = "";

    let totalAmount = 0;

    if (cart.length === 0) {
        cartItemsList.innerHTML = "<li class='list-group-item text-center'>Cart is empty</li>";
    } else {
        cart.forEach((item) => {
            totalAmount += item.price * item.quantity;
            const li = document.createElement("li");
            li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
            li.innerHTML = `
                <span>${item.name} (x${item.quantity})</span>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
                <button class="btn btn-sm btn-danger" onclick="removeFromCart(${item.id})">Remove</button>
            `;
            cartItemsList.appendChild(li);
        });
    }

    cartTotal.textContent = totalAmount.toFixed(2);
}

// Initialize cart on page load
document.addEventListener("DOMContentLoaded", updateCartUI);