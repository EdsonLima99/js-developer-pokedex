const backButton = document.getElementById('backButton');

backButton.addEventListener('click', function (event) {
    console.log('Clique no botão de volta'); // Adicione esta linha para verificar se o evento está ocorrendo
    document.location = 'index.html';
});