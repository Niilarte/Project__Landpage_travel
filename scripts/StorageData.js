const productButtons = document.querySelectorAll(".mainly__content__button");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateButtonStates() {
    productButtons.forEach((button) => {
        const productName = button.getAttribute("data-name");
        const inCart = cart.some((item) => item.name === productName);

        if (inCart) {
            button.textContent = "Remover do Carrinho";
            button.style.backgroundColor = "#e74c3c";
            button.style.color = "white";
        } else {
            button.textContent = "Adicionar ao Carrinho";
            button.style.backgroundColor = "";
            button.style.color = "";
        }
    });
}

productButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const productName = button.getAttribute("data-name");
        const productPrice = parseFloat(button.getAttribute("data-price"));

        const itemIndex = cart.findIndex((item) => item.name === productName);

        if (itemIndex !== -1) {
            cart.splice(itemIndex, 1);
            alert(`${productName} foi removido do carrinho!`);
        } else {
            cart.push({ name: productName, price: productPrice });
            alert(`${productName} foi adicionado ao carrinho!`);
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        updateButtonStates();
    });
});

updateButtonStates();
