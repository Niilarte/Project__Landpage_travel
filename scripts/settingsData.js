document.addEventListener('DOMContentLoaded', () => {
    const settingsContent = document.getElementById('settings-content');
    const buttons = document.querySelectorAll('.mainly__options button');

    const settingsData = {
        profile: `
            <h3>Configurações de Perfil</h3>
            <form>
                <label for="username">Nome de Usuário:</label>
                <input type="text" id="username" name="username" placeholder="Digite seu nome de usuário" required>
                
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" placeholder="Digite seu email" required>
                
                <label for="profile-picture">Foto de Perfil:</label>
                <input type="file" id="profile-picture" name="profile-picture">
                
                <button type="submit">Salvar Alterações</button>
            </form>
        `,
        security: `
            <h3>Configurações de Segurança</h3>
            <form>
                <label for="current-password">Senha Atual:</label>
                <input type="password" id="current-password" name="current-password" placeholder="Digite sua senha atual" required>
                
                <label for="new-password">Nova Senha:</label>
                <input type="password" id="new-password" name="new-password" placeholder="Digite sua nova senha" required>
                
                <label for="confirm-password">Confirme a Nova Senha:</label>
                <input type="password" id="confirm-password" name="confirm-password" placeholder="Confirme sua nova senha" required>
                
                <button type="submit">Salvar Alterações</button>
            </form>
        `,
        notifications: `
            <h3>Configurações de Notificações</h3>
            <form>
                <label>
                    <input type="checkbox" id="email-notifications" name="email-notifications"> Receber notificações por email
                </label>
                <label>
                    <input type="checkbox" id="sms-notifications" name="sms-notifications"> Receber notificações por SMS
                </label>
                <label>
                    <input type="checkbox" id="push-notifications" name="push-notifications" checked> Receber notificações no navegador
                </label>
                <button type="submit">Salvar Alterações</button>
            </form>
        `,
        appearance: `
            <h3>Configurações de Aparência</h3>
            <form id="theme-form">
                <label>
                    <input type="radio" name="theme" value="light" checked> Tema Claro
                </label>
                <label>
                    <input type="radio" name="theme" value="dark"> Tema Escuro
                </label>
                <button type="submit">Salvar Alterações</button>
            </form>
        `
    };

    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            const option = event.target.dataset.option;
            settingsContent.innerHTML = settingsData[option] || '<p>Opção não encontrada.</p>';
        });
    });
});

    const form = document.getElementById("settings-form");
    if (form) {
        form.addEventListener("submit", function(event) {
            event.preventDefault();

            const username = document.getElementById("username").value;
            const email = document.getElementById("email").value;
            const profilePicture = document.getElementById("profile-picture").files[0];

            const profileData = {
                username: username,
                email: email,
                profilePicture: profilePicture ? URL.createObjectURL(profilePicture) : null
            };

            localStorage.setItem("userProfile", JSON.stringify(profileData));
            alert("Configurações salvas com sucesso!");
        });
    }