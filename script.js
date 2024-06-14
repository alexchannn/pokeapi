document.addEventListener("DOMContentLoaded", () => {
   fetchPokemonList();
});

function fetchPokemonList() {
   fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then((response) => response.json())
      .then((data) => {
         const pokemonList = document.getElementById("pokemon-list");
         data.results.forEach((pokemon) => {
            fetch(pokemon.url)
               .then((response) => response.json())
               .then((pokemonData) => {
                  const pokemonItem = document.createElement("div");
                  pokemonItem.className = "pokemon-item";
                  pokemonItem.innerHTML = `
                           <img src="${pokemonData.sprites.front_default}" alt="${pokemon.name}">
                           <p>${pokemon.name}</p>
                        `;
                  pokemonItem.addEventListener("click", () => fetchPokemonDetails(pokemon.url));
                  pokemonList.appendChild(pokemonItem);
               });
         });
      })
      .catch((error) => console.error("Error fetching Pokemon list:", error));
}

function fetchPokemonDetails(url) {
   fetch(url)
      .then((response) => response.json())
      .then((data) => {
         const details = document.getElementById("details");
         details.innerHTML = `
               <h2>${data.name}</h2>
               <img src="${data.sprites.front_default}" alt="${data.name}">
               <p>Height: ${data.height}</p>
               <p>Weight: ${data.weight}</p>
               <p>Base Experience: ${data.base_experience}</p>
               <p>Abilities: ${data.abilities.map((ability) => ability.ability.name).join(", ")}</p>
            `;
         document.getElementById("pokemon-details").style.display = "block";
      })
      .catch((error) => console.error("Error fetching Pokemon details:", error));
}

function hideDetails() {
   document.getElementById("pokemon-details").style.display = "none";
}
