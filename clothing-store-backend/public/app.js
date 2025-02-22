document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const name = document.getElementById("username").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const res = await fetch("/api/users/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });
            const data = await res.json();
            alert(data.message);
        });  // Make sure this closing bracket exists
    }  // Make sure this closing bracket exists
});  // Make sure this closing bracket exists


// Login User
document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
        alert("All fields are required");
        return;
    }

    const res = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    alert(data.message);
    if (data.token) {
        localStorage.setItem("token", data.token);
    }
});


    document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("token");

    // Fetch Products
    const productList = document.getElementById("productList");
    if (productList) {
        fetch("/api/products")
            .then((res) => res.json())
            .then((products) => {
                products.forEach((product) => {
                    const li = document.createElement("li");
                    li.textContent = `${product.name} - $${product.price}`;
                    productList.appendChild(li);
                });
            })
            .catch((error) => console.error("Error fetching products:", error));
    }

    // Add Product (Admin Only)
    const addProductForm = document.getElementById("addProductForm");
    if (addProductForm) {
        addProductForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const name = document.getElementById("productName").value;
            const price = document.getElementById("productPrice").value;

            const res = await fetch("/api/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ name, price }),
            });

            const data = await res.json();
            alert(data.message);
            location.reload(); // Refresh page to update product list
        });
    }
});
// Fetch Orders
const orderList = document.getElementById("orderList");
if (orderList) {
    fetch("/api/orders", {
        headers: { Authorization: `Bearer ${token}` }
    })
        .then((res) => res.json())
        .then((orders) => {
            orders.forEach((order) => {
                const li = document.createElement("li");
                li.textContent = `Order ID: ${order._id}, Items: ${order.products.length}`;
                orderList.appendChild(li);
            });
        })
        .catch((error) => console.error("Error fetching orders:", error));
}

// Place Order
const placeOrderButton = document.getElementById("placeOrder");
if (placeOrderButton) {
    placeOrderButton.addEventListener("click", async () => {
        const res = await fetch("/api/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ products: [] }), // Pass selected product IDs
        });

        const data = await res.json();
        alert(data.message);
        location.reload();})}
fetch("/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
})
    .then(res => res.json())
    .then(data => {
        alert(data.message);
    })
    .catch(error => console.error("Error:", error)); // Ensure a .catch() block is present
