function finalizarCompra() {
    try {
        // Nome do usuário (pode ser ajustado conforme necessário)
        const user = "Usuário";

        // Obtém o elemento do preço total
        const totalPriceElement = document.getElementById("total-price");
        if (!totalPriceElement) {
            alert("Erro: Não foi possível encontrar o preço total.");
            console.error("Elemento com ID 'total-price' não encontrado.");
            return;
        }

        // Extrai o texto e converte o valor para um número válido
        const totalPriceText = totalPriceElement.textContent;
        const totalPrice = parseFloat(totalPriceText.replace("Total: R$ ", "").replace(",", "."));
        if (isNaN(totalPrice)) {
            alert("Erro: O preço total não é válido.");
            console.error("Preço total inválido:", totalPriceText);
            return;
        }

        // Obtém os itens do carrinho do localStorage
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        let pacoteLuxo = 0;
        let pacoteConforto = 0;
        let pacoteEconomico = 0;

        // Contabiliza os pacotes no carrinho
        cart.forEach((item) => {
            if (item.name === "Pacote Luxo") pacoteLuxo++;
            if (item.name === "Pacote Conforto") pacoteConforto++;
            if (item.name === "Pacote Econômico") pacoteEconomico++;
        });

        // Cria o objeto de dados a serem enviados
        const data = {
            user: user,
            totalPrice: totalPrice,
            pacoteLuxo: pacoteLuxo,
            pacoteConforto: pacoteConforto,
            pacoteEconomico: pacoteEconomico,
        };

        // Envia os dados ao Google Apps Script
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
                return response.json(); // Espera um JSON na resposta do servidor
            })
            .then((responseData) => {
                if (responseData.success) {
                    alert("Compra finalizada com sucesso! Seus dados foram registrados.");
                    console.log("Resposta do servidor:", responseData);

                    // Limpa o carrinho do localStorage após finalizar a compra
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

/**
 * Função para adicionar o evento de clique ao botão "Finalizar Compra"
 */
function configurarBotaoFinalizarCompra() {
    const checkoutButton = document.querySelector(".checkout-button");
    if (checkoutButton) {
        checkoutButton.addEventListener("click", finalizarCompra);
    } else {
        console.error("Botão 'Finalizar Compra' não encontrado.");
    }
}

/**
 * Configura os eventos quando o DOM estiver pronto
 */
document.addEventListener("DOMContentLoaded", configurarBotaoFinalizarCompra);