document.addEventListener("DOMContentLoaded", () => {
    const cartItemsContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");

    if (!cartItemsContainer || !totalPriceElement) {
        console.error("Elementos do carrinho não encontrados no DOM.");
        return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    function updateCartDisplay() {
        cartItemsContainer.innerHTML = "";
        let total = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = "<p>Seu carrinho está vazio.</p>";
            totalPriceElement.textContent = "Total: R$ 0,00";
            return;
        }

        cart.forEach((item, index) => {
            const itemElement = document.createElement("div");
            itemElement.classList.add("item");
            itemElement.innerHTML = `
                <div class="item-details">
                    <h4>${item.name}</h4>
                </div>
                <div class="item-price">R$ ${item.price.toFixed(2)}</div>
                <button class="remove-item" data-index="${index}">Remover</button>
            `;
            cartItemsContainer.appendChild(itemElement);

            total += item.price;
        });

        totalPriceElement.textContent = `Total: R$ ${total.toFixed(2)}`;
    }

    cartItemsContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("remove-item")) {
            const index = event.target.getAttribute("data-index");
            cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartDisplay();
        }
    });

    updateCartDisplay();
});