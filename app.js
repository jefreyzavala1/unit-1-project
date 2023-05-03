const players = {
  length: 0,
};

const playingText = "Player1";
const playerChoose = document.querySelector("#player");
playerChoose.innerText = playingText;

const div = document.querySelector(".container");
div.addEventListener("click", (evt) => {
  if (!evt.target.alt) {
    return;
  }
  if (players[0]) {
    players[1] = evt.target.alt;
  } else {
    players[0] = evt.target.alt;
  }
  players.length++;
  const child = evt.target;
  const parent = child.parentNode;
  // parent.remove();
  playerChoose.innerText = "Player 2";
  parent.classList.add("unclickable");
  //child.classList.add('unclickable')
  if (players.length == 2) {
    console.log("Two players ready");
    //div.removeEventListener("click", this);
    //console.log(players);
    init();
    //CALL GAME CLASS
  }
  //console.log(players);
});

function init() {
  const player1 = { player1: players[0] };
  const player2 = { player2: players[1] };

  //console.log(player1);
  //console.log(player2);
  //create modal
  const modal = document.createElement("div");
  modal.classList.add("modal");

  modal.innerHTML = `<h2>Welcome Fighters!!</h2><h3>Player 1 chose ${player1.player1}</h3> <h3>Player 2 chose ${player2.player2}</br>
 <button id="fight" style="">Fight!!</button>`;

  document.body.appendChild(modal);
  //console.log(players)
  const btnEl = document.getElementById("fight");

  const battleEl = document.createElement("div");
  btnEl.addEventListener("click", (evt) => {
    //call game
    console.log("Let begin game");
    //toggle mainscreen class
    const h2El = document.querySelector("h2");
    const containerEl = document.querySelector(".container");
    h2El.classList.add("mainscreen");
    containerEl.classList.add("mainscreen");
    modal.remove();

    //    const battlebackgrounds = ["asset/back.jpeg"];
    //    document.body.style.backgroundImage = `url(${battlebackgrounds[0]})`
    //   document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundImage = "none";

    // battleEl.innerText = "Lets fight";

    document.body.appendChild(battleEl);
    battleEl.setAttribute("id", "battleContainer");

    //find players choices in pokemons  and send pokemons to game
    let poke1 = {};
    let poke2 = {};
    for (let pokemon of pokemonObjectArray) {
      if (pokemon.name === player1.player1) {
        poke1 = pokemon;
      }
      if (pokemon.name === player2.player2) {
        poke2 = pokemon;
      }
    }

    //poke1 , poke2 are pokemon objects
    //console.log(poke1, poke2);

    const game = new Game(poke1, poke2);
    //start game
    game.start();
  });
}

//also need to be able to cache divs of characters to be able have
//that state in an array of objects
//so that when players select a pokemon on screen we can search
//in our array and set the state of pokemon objects.

const pokemonsDivs = document.querySelectorAll(".container div");
const pokemonArray = [];

for (let pokemon of pokemonsDivs) {
  pokemonArray.push(pokemon.id);
}
console.log(pokemonArray);

//declare pokemon1 as an object
const pokemon1 = {};
//declare pokemon2 as an object
const pokemon2 = {};
//declare a turn toggle option
let turn = 0;
//declare turn as a global variable and set it to 0
//declare winner - this will be 0 or 1
let winner = null;

class Pokemon {
  constructor(name, abilities) {
    this.name = name;
    this.health = 100;
    this.abilities = abilities;
  }
}

Math.floor(Math.random() * 10) + 1;
function randomPower() {
  return Math.floor(Math.random() * 10) + 1;
}
const abilities = [
  { abilityName: "iron-tail", power: randomPower() },
  { abilityName: "thunderbolt", power: randomPower() },
  { abilityName: "static-surge", power: randomPower() },
];
const pikachu = new Pokemon("pikachu", abilities);

const charizard = new Pokemon("charizard", [
  { abilityName: "flamethrower", power: randomPower() },
  { abilityName: "dragon-claw", power: randomPower() },
  { abilityName: "wing-attack", power: randomPower() },
]);

const blastoise = new Pokemon("blastoise", [
  {
    abilityName: "hydro-pump",
    power: randomPower(),
    abilityName: "ice-beam",
    power: randomPower(),
  },
  { abilityName: "skull-bash", power: randomPower() },
]);

//not using snorlax const snorlax = new Pokemon('snorlax',[{"thick-"}])
const machamp = new Pokemon(
  "machamp",
  {
    abilityName: "cross-chop",
    power: randomPower(),
    abilityName: "dynamic-punch",
    power: randomPower(),
  },
  { abilityName: "stone-edge", power: randomPower() }
);

const alakazam = new Pokemon("alakazam", {
  abilityName: "psychic",
  power: randomPower(),
  abilityName: "future-sight",
  power: randomPower(),
  abilityName: "shadow-ball",
  power: randomPower(),
});

const squirtle = new Pokemon("squirtle", [
  { abilityName: "water-gun", power: randomPower() },
  { abilityName: "bubble-beam", power: randomPower() },
  { abilityName: "aqua-tail", power: randomPower() },
]);

const gyarados = new Pokemon(
  "gyarados",
  { abilityName: "hydro-pump", power: randomPower() },
  { crunch: randomPower() },
  { "dragon-pulse": randomPower() }
);

const lucario = new Pokemon("lucario", {
  abilityName: "aura-sphere",
  power: randomPower(),
  abilityName: "close-combat",
  power: randomPower(),
  abilityName: "flash-cannon",
  power: randomPower(),
});

const pokemonObjectArray = [
  pikachu,
  charizard,
  blastoise,
  machamp,
  alakazam,
  squirtle,
];

class Game {
  constructor(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
  }
  start() {
    //set the battle field
    const containerEl = document.createElement("div");
    const player1Health = document.createElement("h2");
    player1Health.innerText = this.player1.name;
    const player2Health = document.createElement("h2");
    player2Health.innerText = this.player2.name;
    containerEl.appendChild(player1Health);
    containerEl.appendChild(player2Health);
    containerEl.classList.add("healthStatus");
    document.querySelector("#battleContainer").appendChild(containerEl);
    this.setPokemonsPosition();

    //can track players object to see whose turn it is
    //set turn to first pokemon
    turn = 0;
    console.log(`First player to start is ${players[turn]}`);
    this.beginAttack();
  }

  beginAttack() {
    //go to poke1 class or poke2 create a div container that holds 3 attack buttons
    // console.log(this.player1);
    // console.log(this.player2);
    this.setDivContainerWithButtons();
    //set player1 as first attacker

    const attackingPokemon = document.querySelector(".poke1 > div");
    attackingPokemon.classList.toggle("notattacking");

    this.setEventClicksToDiv();
    //will start the confrontation between pokemons
    this.battle();
    //create 3 buttons
    // const ability1 = document.createElement("button");
    // ability1.innerText = this.player1.name;

    // const ability2 = document.createElement("button");
    // ability2.innerText = this.player2.name;

    // const ability3 = document.createElement("button");
    // ability3.innerText = this.player1.name;

    // console.log(this.player1.abilities);
    // for (let ability of this.player1.abilities) {
    //   const btn = document.createElement("button");
    //   btn.innerText = ability.abilityName;
    //   pokemon1El.appendChild(btn);
    // }
    // document.querySelector(".poke1").appendChild(pokemon1El);
    // document.querySelector(".poke2").appendChild(pokemon2El);

    // pokemon1El.classList.toggle("notattacking");
    // pokemon1El.addEventListener("click", (evt) => {
    //   console.log("Player1 attacked so its player 2");
    //   pokemon1El.classList.toggle("notattacking");
    //   pokemon2El.classList.toggle("notattacking");
    // });
  }

  battle() {
    //will call attack when attack is called
  }

  setEventClicksToDiv() {
    document.querySelector(".poke1 > div").addEventListener("click", (evt) => {
      console.log(this.player2.health);

      //reduce player2 health and re render its health div
      //get attack power;

      const player1Abilities = this.player1.abilities;
      const targetAbility = evt.target.innerText;
      let abilityobj = {};
      for (let ability of player1Abilities) {
        if (ability.abilityName === targetAbility) {
          abilityobj = ability;
        }
      }
      console.log(abilityobj);

      this.player2.health -= abilityobj.power;
      //console.log(this.player2.health);

      //this.displayHealth()
      turn = turn ? 0 : 1;
      //toggle class
      document.querySelector(".poke1 > div").classList.toggle("notattacking");
      document.querySelector(".poke2 > div").classList.toggle("notattacking");

      console.log(`attacking now is ${players[turn]}`);
    });
    document.querySelector(".poke2 > div").addEventListener("click", (evt) => {
      console.log(this.player1.health);

      const player2Abilities = this.player2.abilities;
      const targetAbility = evt.target.innerText;
      let abilityobj = {};
      for (let ability of player2Abilities) {
        if (ability.abilityName === targetAbility) {
          abilityobj = ability;
        }
      }
      console.log(abilityobj);

      this.player2.health -= abilityobj.power;
      //console.log(this.player2.health);

      //this.displayHealth()
      turn = turn ? 0 : 1;
      //toggle class
      document.querySelector(".poke2 > div").classList.toggle("notattacking");
      document.querySelector(".poke1 > div").classList.toggle("notattacking");

      console.log(`attacking now is ${players[turn]}`);
    });
  }

  // attack(evt) {
  //   //will need to check whose turn it is
  //   //then decrease the health of the other pokemon by
  //   //the power of the buttons ability

  //   console.log(`The player attacking is ${players[turn]}`);
  //   console.log(`With ability of ${evt.target.innerText}`);
  //   // console.log(this.player1);
  //   console.log(evt.target.innerText);
  // }
  setDivContainerWithButtons() {
    const pokemon1El = document.createElement("div");
    const pokemon2El = document.createElement("div");

    pokemon1El.setAttribute("class", "notattacking");
    pokemon2El.setAttribute("class", "notattacking");

    this.forAbilitiesCreateButtonsAppendToChild(pokemon1El, pokemon2El);

    document.querySelector(".poke1").appendChild(pokemon1El);
    document.querySelector(".poke2").appendChild(pokemon2El);
  }

  forAbilitiesCreateButtonsAppendToChild(pokemon1El, pokemon2El) {
    console.log(this.player1.abilities);
    for (let ability of this.player1.abilities) {
      const btn = document.createElement("button");
      btn.innerText = ability.abilityName;
      pokemon1El.appendChild(btn);
    }

    console.log(this.player2.abilities);
    for (let ability of this.player2.abilities) {
      const btn = document.createElement("button");
      btn.innerText = ability.abilityName;
      pokemon2El.appendChild(btn);
    }
  }
  setPokemonsPosition() {
    const poke1Pos = document.createElement("div");
    const poke2Pos = document.createElement("div");
    const poke1Img = document.createElement("img");
    poke1Img.src = "asset/pikachu.png";
    poke1Pos.appendChild(poke1Img);

    poke1Pos.setAttribute("class", "poke1");
    poke2Pos.setAttribute("class", "poke2");

    const poke2Img = document.createElement("img");
    poke2Img.src = "asset/squirtle.png";
    poke2Pos.appendChild(poke2Img);
    document.querySelector("#battleContainer").appendChild(poke1Pos);
    document.querySelector("#battleContainer").appendChild(poke2Pos);
  }
}
//Set pokemon1,pokemon2 properties:
// Set name property to a string
// Set turn property to 0
// Set turn property to 1
// Set health property to a number
// Set abilities property to an array of strings
// Set image property to a string

//create a Pokemon class
// Constructor with parameters for name,health, and abilities.
//property for name and set it to the name param
//property for health and set it to the health param.
//abilities property and set it to the abilities param

//create a backgrounds array
//set variable battleground = []//different background images.
//
//create a abilites array
//For each ability in the array,create a
//an object that has abilityName,and power(give 1-10 power by using the Math.random)

//need to cache attack buttons container
//Cache the first div element by selecting its div id name
//set the variable equal to document.getElementById('pokemon1')
//Cache the second div element by selecting its div id name
//set the variable equal to document.getElementByid('pokemon');
//next add an event listener to each such that when called it will call the attack function in the Game class

//attack function will decrease the damage of the pokemon being
//attacked also will need to checkHealth() and update() image
//also check if a winner has won
////check whether there is a winner call winner()

//winner function checks
//the health of each pokemon assigns winner = 0(pokemon1 won),1(pokemon2 won)
//will return the div element and message stating who has won and also have a button that allows to playagain which will call the initilize the state of the objects in game back to null

//above methods will be in a Game class which be in charge of the gameplay and what its rendered on screen.

//game will have a render method that will first display the health of the current pokemons by adding a shade transition to a div element.

//game method that will be called checkPokemon stats.
//will render the health and pokemon image and whose turn it is the screen
//displayHealth();

//on each player turn will check whose turn and depending on the player it will then

//gameMessage() will display whose turn it is
//also depending on whose turn it is an element that consists of their pokemon attack options will appear and dispear depends on whose turn it is.
//game.render();
