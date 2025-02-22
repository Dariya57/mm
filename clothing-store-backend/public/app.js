document.addEventListener("DOMContentLoaded", function () {
    // Register User
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
                body: JSON.stringify({ username:name, email, password }),
            });

            const data = await res.json();
            alert(data.message);
        });
    }

    // Login User
    document.addEventListener("DOMContentLoaded", function () {
        const loginForm = document.getElementById("loginForm");

        if (loginForm) {
            loginForm.addEventListener("submit", async (e) => {
                e.preventDefault();

                const email = document.getElementById("email").value;
                const password = document.getElementById("password").value;

                try {
                    const res = await fetch("/api/users/login", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ email, password }),
                    });

                    // Debugging response
                    console.log("Response Status:", res.status);

                    const data = await res.json();
                    console.log("Response Data:", data);

                    alert(data.message);

                    if (res.ok && data.token) {
                        localStorage.setItem("token", data.token);
                        alert("Login successful!");
                        window.location.href = "dashboard.html"; // Redirect if needed
                    }
                } catch (error) {
                    console.error("Error during login:", error);
                    alert("Something went wrong. Please try again.");
                }
            });
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
        location.reload();
    });}