document.addEventListener('DOMContentLoaded', () => {
    // Função que aplica o tema no início
    function applySavedTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light'; // Padrão 'light' se não houver preferência salva
        document.documentElement.setAttribute('data-theme', savedTheme); // Aplica o tema ao elemento <html>
    }

    // Inicializar o tema quando a página carrega
    applySavedTheme();

    // Monitorar se o formulário de tema foi adicionado ao DOM
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                const themeForm = document.getElementById('theme-form');
                if (themeForm) {
                    observer.disconnect(); // Parar de observar depois que encontrar o formulário
                    initializeThemeForm(themeForm);
                }
            }
        });
    });

    // Iniciar o observador
    observer.observe(document.body, { childList: true, subtree: true });

    // Função para inicializar o formulário de tema
    function initializeThemeForm(themeForm) {
        const savedTheme = localStorage.getItem('theme') || 'light'; // Define 'light' como padrão

        // Seleciona o radio button correspondente ao tema salvo
        const selectedRadio = themeForm.querySelector(`input[value="${savedTheme}"]`);
        if (selectedRadio) {
            selectedRadio.checked = true;
        }

        // Adiciona evento para alterar o tema ao salvar
        themeForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Evita o reload da página

            // Obtém o valor do tema selecionado
            const selectedTheme = themeForm.querySelector('input[name="theme"]:checked').value;

            // Aplica o tema ao elemento <html>
            document.documentElement.setAttribute('data-theme', selectedTheme);

            // Salva o tema no localStorage
            localStorage.setItem('theme', selectedTheme);

            // Exibe um feedback ao usuário
            alert('Tema alterado para: ' + (selectedTheme === 'light' ? 'Claro' : 'Escuro'));
        });
    }
});
