// script.js
const productContainer = document.getElementById('product-container');
const apiURL = 'https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json';

async function fetchProducts() {
    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        return data.categories;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

function calculateDiscount(price, compareAtPrice) {
    return Math.round(((compareAtPrice - price) / compareAtPrice) * 100);
}

function createProductCard(product) {
    const discount = calculateDiscount(product.price, product.compare_at_price);
    return `
        <div class="product-card">
            ${product.badge_text ? `<div class="product-badge">${product.badge_text}</div>` : ''}
            <img src="${product.image}" alt="${product.title}">
            <h3 class="product-title">${product.title}</h3>
            <p class="product-vendor">${product.vendor}</p>
            <p class="product-price">₹${product.price}</p>
            <p class="compare-price">₹${product.compare_at_price}</p>
            <p class="discount">${discount}% off</p>
            <button class="add-to-cart">Add to Cart</button>
        </div>
    `;
}

function showTab(categoryName) {
    productContainer.innerHTML = ''; // Clear previous products
    fetchProducts().then(categories => {
        const category = categories.find(cat => cat.category_name === categoryName);
        if (category) {
            category.category_products.forEach(product => {
                productContainer.innerHTML += createProductCard(product);
            });
        }
    });
}

// Show Men category by default
showTab('blank');
