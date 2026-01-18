// Load the cart from localStorage
const savedCart = JSON.parse(localStorage.getItem('urbanBitesCart')) || [];
const summaryDiv = document.getElementById('summary-items');
const totalDiv = document.getElementById('final-total');

function loadSummary() {
    if (savedCart.length === 0) {
        summaryDiv.innerHTML = "<p>No items found.</p>";
        return;
    }

    summaryDiv.innerHTML = savedCart.map(item => `
        <div class="summary-item">
            <span>1x ${item.name}</span>
            <span>₦${item.price.toLocaleString()}</span>
        </div>
    `).join('');

    const total = savedCart.reduce((sum, item) => sum + item.price, 0);
    totalDiv.innerText = `₦${total.toLocaleString()}`;
}

// Dummy "Complete Order" action
document.getElementById('checkout-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    
    alert(`Order Received!\n\nMethod: ${paymentMethod}\nTotal: ${totalDiv.innerText}\n\nThank you for choosing Urban Bites!`);
    
    localStorage.removeItem('urbanBitesCart'); // Clear cart
    window.location.href = 'index.html'; // Go home
});

loadSummary();
