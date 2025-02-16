document.addEventListener("DOMContentLoaded", () => {
    fetch("products.json")
        .then(response => response.json())
        .then(products => displayProducts(products))
        .catch(error => console.error("Error loading products:", error));
});

function displayProducts(products) {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";
    
    products.forEach(product => {
        const productCard = `
            <div class="col-md-3 mb-4">
                <div class="card h-100">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text flex-grow-1">${product.description}</p>
                        <p class="card-text"><strong>$${product.price.toFixed(2)}</strong></p>
                        <button class="btn btn-primary mt-auto" onclick="addToCart(${product.id}, '${product.name.replace(/'/g, "\\'")}', ${product.price})">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `;
        productList.innerHTML += productCard;
    });
}