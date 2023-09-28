const body = document.getElementById("body");

// Função para obter o ID do Pokémon da URL
function getPokemonIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("id");
}

function loadPokemonDetails() {
    const pokemonId = getPokemonIdFromUrl();
    pokeApi.getPokemon(pokemonId).then((pokemon) => {
        const newHtml = convertPokemonToBody(pokemon);
        console.log(newHtml);
        console.log(body);
        body.innerHTML += newHtml;
    });
}

function convertPokemonToBody(pokemon) {
    return `
    <div class="pokemon-detail ${pokemon.type}">
        <div class="header">
            <a href="index.html">
                <div class="back-button">
                    <button id="backButton">
                        Voltar
                    </button>
                </div>
            </a>
            <div class="pokemon">
                <h1 class="name">${pokemon.name}</h1>
                <span class="number">#${pokemon.number}</span>

                <div class="detail">
                <ol class="types">
                    ${pokemon.types
            .map((type) => `<li class="type ${type}">${type}</li>`)
            .join("")}
                </ol>
                </div>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </div>
        <div class="body">
            <h2 class="detail-heading">About</h2>
            <ul class="pokemon-details" id="pokemonDetails">
                <li class="main-item">
                    <span class="label">Species</span>
                    <ul class="sublist">
                        <li>${pokemon.species}</li>
                    </ul>
                </li>
                <li class="main-item">
                    <span class="label">Height</span>
                    <ul class="sublist">
                        <li>${pokemon.height} decimetres</li>
                    </ul>
                </li>
                <li class="main-item">
                    <span class="label">Weight</span>
                    <ul class="sublist">
                        <li>${pokemon.weight} hectograms</li>
                    </ul>
                </li>
                <li class="main-item">
                    <span class="label">Ability</span>
                    <ul class="sublist">
                        ${pokemon.abilities
            .map((abilitie) => `<li>${abilitie}</li>`)
            .join("")}
                    </ul>
                </li>
            </ul>
        </div>
    </div>
    `;
}

// Carregue os detalhes do Pokémon quando a página for carregada
window.addEventListener("load", loadPokemonDetails);