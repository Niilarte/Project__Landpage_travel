document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".mainly__options button");
    const settingsContent = document.getElementById("settings-content");

    // Conteúdo dinâmico baseado na opção escolhida
    const settingsData = {
        profile: "<h3>Configurações de Perfil</h3><p>Aqui você pode editar seu nome, email e outras informações pessoais.</p>",
        security: "<h3>Configurações de Segurança</h3><p>Aqui você pode alterar sua senha, habilitar autenticação em dois fatores, etc.</p>",
        notifications: "<h3>Configurações de Notificações</h3><p>Gerencie como e quando você será notificado.</p>",
        appearance: "<h3>Configurações de Aparência</h3><p>Personalize o tema, fonte e layout do site.</p>",
    };

    // Adiciona eventos de clique para os botões
    buttons.forEach(button => {
        button.addEventListener("click", function () {
            const option = button.getAttribute("data-option");
            settingsContent.innerHTML = settingsData[option] || "<p>Opção não encontrada.</p>";
        });
    });
});
