
let limit = 20;
let offset = 0;

const pikapikaDiv = document.querySelector("#pikapika");
const loadMoreButton = document.querySelector(".loadMore");


window.addEventListener("load", async () => {
  
  const data = await getDataFromAPI(
    "https://pokeapi.co/api/v2/pokemon?limit=" + limit + "&offset=" + offset
  );
 
  populatePokemons(data);
});

function showExtraDiv(e) {
  const parentDiv = e.target.closest('.parent');
  if (e.target.innerText === "Know More") {
    e.target.innerText = "Know Less";
    e.target.nextElementSibling.style.display = "block";
    e.target.nextElementSibling.style.opacity = 1;
    parentDiv.querySelector('.flip-card-inner').classList.add('flipped');
  } else {
    e.target.innerText = "Know More";
    e.target.nextElementSibling.style.display = "none";
    e.target.nextElementSibling.style.opacity = 0;
    parentDiv.querySelector('.flip-card-inner').classList.remove('flipped');
  }
}

// extra information and flip the card
const knowMoreButtons = document.querySelectorAll('.know-more');
knowMoreButtons.forEach(button => {
  button.addEventListener('click', showExtraDiv);
});


// fetch data from the API
async function getDataFromAPI(url) {
  
  const response = await fetch(url);
    const result = await response.json();
    return result;
}

// populate Pokemon cards
async function populatePokemons(data) {
  const promises = data.results.map((pokemon) => getDataFromAPI(pokemon.url));
  const pokemonData = await Promise.all(promises);

  
  pokemonData.forEach((pokemon) => {
     const div = document.createElement("div");
      div.classList.add("parent");

    const image = document.createElement("img");
    image.src = pokemon.sprites.other.dream_world.front_default;

    const name = document.createElement("p");
    name.innerText = pokemon.name;

    const type = document.createElement("p");
    type.innerText = "Type: " + pokemon.types[0].type.name;

    const knowMore = document.createElement("button");
    knowMore.innerText = "Know More";
    knowMore.classList.add("know-more");
    knowMore.addEventListener("click", showExtraDiv);

    const extraDiv = document.createElement("div");
    extraDiv.classList.add("extraDiv");

    const height = document.createElement("p");
    height.innerHTML = "<strong>Height:  </strong>" + pokemon.height + " cm";
    extraDiv.append(height);

    const weight = document.createElement("p");
    weight.innerHTML = "<strong>Weight: </strong>" + pokemon.weight + " kg";
    extraDiv.append(weight);

    pokemon.stats.forEach((stat) => {
      const para = document.createElement("p");
      para.classList.add("stat");
      para.innerHTML =
        "<strong>" + stat.stat.name + "</strong>" + stat.base_stat;
      extraDiv.append(para);
    });

    const backCard = document.createElement("div");
    backCard.classList.add("back-pokemon-card");
    backCard.append(extraDiv);

    const frontCard = document.createElement("div");
    frontCard.classList.add("front-pokemon-card");
    frontCard.append(image, name, type, knowMore);

    const cardInner = document.createElement("div");
    cardInner.classList.add("flip-card-inner");
    cardInner.append(frontCard, backCard);

    div.append(cardInner);

    pikapikaDiv.append(div);
  });
}

loadMoreButton.addEventListener("click", async () => {
  offset = offset + limit;
  const response = await getDataFromAPI(
    "https://pokeapi.co/api/v2/pokemon?limit=" + limit + "&offset=" + offset
  );
  populatePokemons(response);
});
