document.addEventListener('DOMContentLoaded', () => {
    function applySavedTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
    }

    applySavedTheme();

    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                const themeForm = document.getElementById('theme-form');
                if (themeForm) {
                    observer.disconnect();
                    initializeThemeForm(themeForm);
                }
            }
        });
    });


    // observer (Possivelmente vai ser tirado depois)
    observer.observe(document.body, { childList: true, subtree: true });

    function initializeThemeForm(themeForm) {
        const savedTheme = localStorage.getItem('theme') || 'light';

        const selectedRadio = themeForm.querySelector(`input[value="${savedTheme}"]`);
        if (selectedRadio) {
            selectedRadio.checked = true;
        }

        themeForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const selectedTheme = themeForm.querySelector('input[name="theme"]:checked').value;

            document.documentElement.setAttribute('data-theme', selectedTheme);

            localStorage.setItem('theme', selectedTheme);

            alert('Tema alterado para: ' + (selectedTheme === 'light' ? 'Claro' : 'Escuro'));
        });
    }
});
