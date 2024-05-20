// Seleciona todas as divs com a classe "box-content"
const boxes = document.querySelectorAll('.box-content');

// Adiciona um evento de clique a cada div
boxes.forEach(box => {
    box.addEventListener('click', () => {
        // Alterna a classe "selected" da div clicada
        box.classList.toggle('selected');
    });
});
