emailjs.init("KxyTxLre9xJXkNShv");

document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    emailjs.sendForm("service_m1ps3ji", "template_rbyh7be", this)
        .then(function(response) {
            console.log('Sucesso:', response);
            alert('Mensagem enviada com sucesso!');
        }, function(error) {
            console.log('Erro:', error);
            alert('Erro ao enviar a mensagem. Tente novamente.');
        });
});
