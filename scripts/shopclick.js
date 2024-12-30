const buttons = document.querySelectorAll('.mainly__content__button');

buttons.forEach(button => {
    button.addEventListener('click', function() {
        if (button.classList.contains('clicked')) {
            button.classList.remove('clicked');
            button.textContent = 'Adicionar ao Carrinho';
            button.style.backgroundColor = '';
        } else {
            button.classList.add('clicked');
            button.textContent = 'Remover do Carrinho';
            button.style.backgroundColor = '#ff6347';
        }
    });
});