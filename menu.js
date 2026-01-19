const menuItems = [
    { id: 1, name: "Gourmet Burger", price: 4500, category: "Fast Food", img: "images/burgerMenu.jpg" },
    { id: 2, name: "Special Shawarma", price: 3500, category: "Fast Food", img: "images/shawarma.jpg" },
    { id: 3, name: "Large Pizza", price: 12000, category: "Fast Food", img: "images/pizza.jpg" },
    { id: 4, name: "Loaded French Fries Portion", price: 2000, category: "Sides", img: "images/fries.jpg" },
    { id: 5, name: "Meat Pie", price: 1300, category: "Snacks", img: "images/meatpie.jpg" },
    { id: 6, name: "Chicken Pie", price: 1500, category: "Snacks", img: "images/chickenpie.jpg" },
    { id: 7, name: "Hotdog", price: 3500, category: "Fast Food", img: "images/hotdog.jpg" },
    { id: 8, name: "Glazed Doughnut", price: 2000, category: "Snacks", img: "images/doughnut.jpg" },
    { id: 9, name: "Jollof Rice Portion", price: 3000, category: "Rice Section", img: "images/jollof.jpg" },
    { id: 10, name: "Fried Rice Portion", price: 3200, category: "Rice Section", img: "images/friedrice.jpg" },
    { id: 11, name: "Chinese Fried Rice", price: 4500, category: "Rice Section", img: "images/chinese.jpg" },
    { id: 12, name: "Fried Chicken (Per Piece)", price: 4500, category: "Protein", img: "images/chicken.jpg" },
    { id: 13, name: "Grilled Turkey", price: 6000, category: "Protein", img: "images/turkey.jpg" }
];

let cart = [];

function displayMenu() {
    const grid = document.getElementById('menu-grid');
    if (!grid) return;
    grid.innerHTML = menuItems.map(item => `
        <div class="item-card">
            <img src="${item.img}" alt="${item.name}" class="item-img" onerror="this.src='https://via.placeholder.com'">
            <div class="item-info">
                <h3>${item.name}</h3>
                <span class="price">₦${item.price.toLocaleString()}</span>
                <button class="add-btn" onclick="addToCart(${item.id})">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

function addToCart(id) {
    const item = menuItems.find(p => p.id === id);
    const existingItem = cart.find(cartItem => cartItem.id === id);

    if (existingItem) {
        existingItem.quantity += 1; // Correct: Just increase number
    } else {
        cart.push({ ...item, quantity: 1 }); // Correct: Add new with qty 1
    }
    updateCart();
}

function changeQuantity(id, delta) {
    const item = cart.find(cartItem => cartItem.id === id);
    if (!item) return;
    item.quantity += delta;
    if (item.quantity <= 0) {
        cart = cart.filter(cartItem => cartItem.id !== id);
    }
    updateCart();
}

function updateCart() {
    const cartList = document.getElementById('cart-items');
    const totalEl = document.getElementById('total-price');
    
    if (cart.length === 0) {
        cartList.innerHTML = '<p class="empty-msg">Your cart is empty</p>';
        totalEl.innerText = "₦0";
        return;
    }

    cartList.innerHTML = cart.map((item) => `
        <div class="cart-item">
            <div class="cart-item-info">
                <span>${item.name}</span>
                <small>₦${(item.price * item.quantity).toLocaleString()}</small>
            </div>
            <div class="qty-controls">
                <button onclick="changeQuantity(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="changeQuantity(${item.id}, 1)">+</button>
            </div>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalEl.innerText = `₦${total.toLocaleString()}`;
}

displayMenu();

document.querySelector('.checkout-btn').addEventListener('click', () => {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    localStorage.setItem('urbanBitesCart', JSON.stringify(cart));
    window.location.href = 'checkout.html';
});
