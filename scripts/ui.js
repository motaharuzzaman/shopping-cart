// Handle clicks outside the cart
document.addEventListener("click", function(event) {
    const cartSummary = document.getElementById("cart-summary");
    const cartButton = document.querySelector(".btn-warning");
    
    if (!cartSummary.contains(event.target) && !cartButton.contains(event.target)) {
        cartSummary.classList.add("d-none");
    }
});

// Add smooth toggle animation
function toggleCart() {
    const cartSummary = document.getElementById("cart-summary");
    cartSummary.classList.toggle("d-none");
    
    // Force reflow for smooth transition
    void cartSummary.offsetWidth;
    cartSummary.style.opacity = cartSummary.classList.contains("d-none") ? 0 : 1;
    
    updateCartUI();
}