function finalizarCompra() {
    try {
        const user = "Usuário";

        const totalPriceElement = document.getElementById("total-price");
        if (!totalPriceElement) {
            alert("Erro: Não foi possível encontrar o preço total.");
            console.error("Elemento com ID 'total-price' não encontrado.");
            return;
        }

        const totalPriceText = totalPriceElement.textContent;
        const totalPrice = parseFloat(totalPriceText.replace("Total: R$ ", "").replace(",", "."));
        if (isNaN(totalPrice)) {
            alert("Erro: O preço total não é válido.");
            console.error("Preço total inválido:", totalPriceText);
            return;
        }

        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        let pacoteLuxo = 0;
        let pacoteConforto = 0;
        let pacoteEconomico = 0;

        cart.forEach((item) => {
            if (item.name === "Pacote Luxo") pacoteLuxo++;
            if (item.name === "Pacote Conforto") pacoteConforto++;
            if (item.name === "Pacote Econômico") pacoteEconomico++;
        });

        const data = {
            user: user,
            totalPrice: totalPrice,
            pacoteLuxo: pacoteLuxo,
            pacoteConforto: pacoteConforto,
            pacoteEconomico: pacoteEconomico,
        };

        fetch("https://script.google.com/macros/s/AKfycbxnZGHB5llvmMYrdvRLD8B_Na9MFCYWLVLkU1U83keQkxM-bhUpS4Q7UvEr7lCX8OhT/exec", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Erro na resposta do servidor.");
                }
                return response.json();
            })
            .then((responseData) => {
                if (responseData.success) {
                    alert("Compra finalizada com sucesso! Seus dados foram registrados.");
                    console.log("Resposta do servidor:", responseData);

                    localStorage.removeItem("cart");
                } else {
                    throw new Error(responseData.message || "Erro ao processar a compra.");
                }
            })
            .catch((error) => {
                console.error("Erro ao enviar os dados:", error);
                alert("Erro ao registrar a compra. Tente novamente mais tarde.");
            });
    } catch (error) {
        console.error("Erro inesperado:", error);
        alert("Ocorreu um erro inesperado. Tente novamente mais tarde.");
    }
}

function configurarBotaoFinalizarCompra() {
    const checkoutButton = document.querySelector(".checkout-button");
    if (checkoutButton) {
        checkoutButton.addEventListener("click", finalizarCompra);
    } else {
        console.error("Botão 'Finalizar Compra' não encontrado.");
    }
}

document.addEventListener("DOMContentLoaded", configurarBotaoFinalizarCompra);