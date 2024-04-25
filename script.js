// Get the container where we want to put our Pokémon cards
let container = document.getElementById("wrapper");

// Define how many Pokémon we want to fetch and where to start
let limit = 20;
let offset = 0;

// When the webpage loads, do the following:
window.addEventListener("load", async () => {
  // Fetch data about Pokémon from the PokeAPI using the limit and offset
  const pokemons = await getPokemons(
    "https://pokeapi.co/api/v2/pokemon?limit=" + limit + "&offset=" + offset
  );

  // For each Pokémon we fetched, do the following:
  pokemons.results.forEach(async (pokemon) => {
    // Fetch more detailed data about this Pokémon using its URL
    const response = await getPokemons(pokemon.url);
    // Create a card for this Pokémon using its detailed data
    createPokemonCard(response);
  });
});

// Function to fetch data about Pokémon from a given URL
async function getPokemons(uri) {
  // Fetch data from the given URL
  const response = await fetch(uri);
  // Convert the fetched data into a format we can use (like a list of Pokémon)
  const result = await response.json();
  // Return the converted data
  return result;
}

// Function to create a Pokémon card using its data
function createPokemonCard(pokemonData) {
  // Create different parts of the card: a container, a front side, a back side, an image, and a name
  let cardContainer = document.createElement("div");
  let cardContent = document.createElement("div");
  let frontSide = document.createElement("div");
  let backSide = document.createElement("div");
  let image = document.createElement("img");
  let name = document.createElement("p");

  // Set the image source and the Pokémon's name based on the fetched data
  image.src = pokemonData.sprites.other.dream_world.front_default;
  name.innerHTML = pokemonData.name;

  // Put the image on the front side of the card and the name on the back side
  frontSide.appendChild(image);
  backSide.appendChild(name);

  // Assemble the card structure by putting the front and back sides inside the main container
  cardContent.appendChild(frontSide);
  cardContent.appendChild(backSide);
  cardContainer.appendChild(cardContent);

  // Add CSS classes to style the card
  cardContainer.classList.add("flip-card");
  cardContent.classList.add("flip-card-inner");
  frontSide.classList.add("flip-card-front");
  backSide.classList.add("flip-card-back");

  // Add the card to the container on the webpage
  container.appendChild(cardContainer);
}
