const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");

const maxRecords = 151;
const limit = 10;
let offset = 0;

// No início do arquivo, você pode definir uma função para redirecionar para a página de detalhes com o ID do Pokémon como parâmetro:
function redirectToDetailsPage(pokemonId) {
    window.location.href = `details.html?id=${pokemonId}`;
}

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" data-id="${pokemon.number}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types
            .map((type) => `<li class="type ${type}">${type}</li>`)
            .join("")}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `;
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join("");
        pokemonList.innerHTML += newHtml;
    });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener("click", () => {
    offset += limit;
    const qtdRecordsWithNexPage = offset + limit;

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit);

        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadPokemonItens(offset, limit);
    }
});

pokemonList.addEventListener("click", (event) => {
    const clickedPokemon = event.target.closest("li.pokemon");
    
    if (clickedPokemon) {
        const pokemonId = clickedPokemon.getAttribute("data-id");
        redirectToDetailsPage(pokemonId);
    }
});

