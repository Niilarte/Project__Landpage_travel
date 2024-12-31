// Garantir que o DOM esteja carregado antes de executar o código
document.addEventListener("DOMContentLoaded", () => {
    const cartItemsContainer = document.getElementById("cart-items"); // Verifique o ID no HTML
    const totalPriceElement = document.getElementById("total-price");

    // Verifique se os elementos existem antes de continuar
    if (!cartItemsContainer || !totalPriceElement) {
        console.error("Elementos do carrinho não encontrados no DOM.");
        return;
    }

    // Carregar o carrinho do localStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Atualizar a interface com os itens do carrinho
    function updateCartDisplay() {
        cartItemsContainer.innerHTML = ""; // Limpar a exibição atual
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

            // Adicionar ao total
            total += item.price;
        });

        // Atualizar o preço total
        totalPriceElement.textContent = `Total: R$ ${total.toFixed(2)}`;
    }

    // Remover um item do carrinho
    cartItemsContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("remove-item")) {
            const index = event.target.getAttribute("data-index");
            cart.splice(index, 1); // Remover o item do array
            localStorage.setItem("cart", JSON.stringify(cart)); // Atualizar o localStorage
            updateCartDisplay(); // Atualizar a exibição
        }
    });

    // Inicializar a exibição do carrinho
    updateCartDisplay();
});