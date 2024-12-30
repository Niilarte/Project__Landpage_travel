document.addEventListener('DOMContentLoaded', function() {
    const userProfileBtn = document.getElementById('user-profile');
    const userMenu = document.getElementById('user-menu');

    if (!userProfileBtn || !userMenu) {
        console.error('Elementos necessários não encontrados.');
        return;
    }

    userProfileBtn.addEventListener('click', function() {
        console.log("Imagem clicada!");

        userMenu.classList.toggle('show');

        console.log("Classes do menu: ", userMenu.classList);
    });
});