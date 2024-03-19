const input = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const pokResult = document.querySelector(".pokemon-result");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const pokemonWeight = document.getElementById("weight");
const pokemonHeight = document.getElementById("height");
const pokemonSprite = document.getElementById("sprite");
const pokemonTypes = document.getElementById("types");
const pokemonHp = document.getElementById("hp");
const pokemonAttack = document.getElementById("attack");
const pokemonDefense = document.getElementById("defense");
const pokemonSpAttack = document.getElementById("special-attack");
const pokemonSpDefense = document.getElementById("special-defense");
const pokemonSpeed = document.getElementById("speed");
const pokemonStats = document.querySelectorAll(".stats");


const fetchData = async (pokemon) => {
  pokemon = pokemon.toLowerCase()
  try {
    const res = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemon}`);
    const data = await res.json();
    updateUI(data)
  } catch (err) {
    console.log(err);
    alert("Pokemon not found")
  }
};

const updateUI = (data) => {
    const {name, id, weight, height, sprites, types, stats, base_stat} = data
    pokemonName.textContent = name.toUpperCase()
    pokemonId.textContent = `#${id}`;
    pokemonWeight.textContent = `Weight: ${weight}`;
    pokemonHeight.textContent = `Height: ${height}`;
    pokemonSprite.setAttribute("src", `${sprites["front_default"]}`)
    types.forEach(obj => {
      pokemonTypes.innerHTML += 
      `<span class="type ${obj.type.name}"> ${obj.type.name.toUpperCase()}</span> `
    })
    for(let i = 0; i < pokemonStats.length; i++) {
      pokemonStats[i].textContent = `${stats[i].base_stat}`
    }


}  


const findPokemon = () => {
  let toggleUI = false
  let inputValue = input.value.trim()
  if(toggleUI && input.value === inputValue) { 
    ""
  } else {
    pokemonTypes.innerText = "";
    fetchData(input.value);
  }

  toggleUI = !toggleUI;
}

searchBtn.addEventListener("click", () => {
  findPokemon()
  
  });

input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    findPokemon()  
  }
});