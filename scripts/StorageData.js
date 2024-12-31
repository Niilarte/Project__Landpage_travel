// Selecionar todos os botões
// Selecionar todos os botões de adicionar/remover do carrinho
const productButtons = document.querySelectorAll(".mainly__content__button");

// Carregar o carrinho do localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Atualizar o estado visual dos botões com base nos itens do carrinho
function updateButtonStates() {
    productButtons.forEach((button) => {
        const productName = button.getAttribute("data-name");
        const inCart = cart.some((item) => item.name === productName);

        if (inCart) {
            button.textContent = "Remover do Carrinho";
            button.style.backgroundColor = "#e74c3c"; // Vermelho para destacar
            button.style.color = "white";
        } else {
            button.textContent = "Adicionar ao Carrinho";
            button.style.backgroundColor = "";
            button.style.color = "";
        }
    });
}

// Lógica para adicionar ou remover itens do carrinho
productButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const productName = button.getAttribute("data-name");
        const productPrice = parseFloat(button.getAttribute("data-price"));

        // Verificar se o item já está no carrinho
        const itemIndex = cart.findIndex((item) => item.name === productName);

        if (itemIndex !== -1) {
            // Se já estiver, remover do carrinho
            cart.splice(itemIndex, 1);
            alert(`${productName} foi removido do carrinho!`);
        } else {
            // Se não estiver, adicionar ao carrinho
            cart.push({ name: productName, price: productPrice });
            alert(`${productName} foi adicionado ao carrinho!`);
        }

        // Atualizar o localStorage e o estado dos botões
        localStorage.setItem("cart", JSON.stringify(cart));
        updateButtonStates();
    });
});

// Atualizar os botões ao carregar a página
updateButtonStates();
