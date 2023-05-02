
const players ={
length:0
}

const playingText = "Player1"
const playerChoose = document.querySelector('#player');
playerChoose.innerText = playingText;

const div =  document.querySelector('.container');
div.addEventListener('click',(evt)=>{
    if(!evt.target.alt){
        return
    }
if(players[0]){
    players[1] = evt.target.alt
}else{
    players[0]= evt.target.alt
}
players.length++;
const child = evt.target;
const parent = child.parentNode;
// parent.remove();
playerChoose.innerText = "Player 2";
parent.classList.add('unclickable')
//child.classList.add('unclickable')
if(players.length==2){
    console.log("Two players ready")
    div.removeEventListener('click',this)
     init();
    //CALL GAME CLASS 

}
//console.log(players);
})

function init(){
 const player1 = {'player1':players[0]};
 const player2 = {'player2':players[1]};

 //create modal
 const modal = document.createElement('div');
 modal.classList.add('modal');
 
 modal.innerHTML =`<h2>Welcome Fighters!!</h2> <h3>Player 1 chose ${player1}</h3> <h3>Player 2 chose ${player2} </br>
 <button id="fight" style="">Fight!!</button>`;

 document.body.appendChild(modal);
 //console.log(players)
 const btnEl = document.getElementById('fight');

 const battleEl = document.createElement('div');
 btnEl.addEventListener('click',(evt)=>{
   //call game
   console.log("Let begin game")
   //toggle mainscreen class
   const h2El = document.querySelector('h2');
   const containerEl = document.querySelector('.container');
   h2El.classList.add('mainscreen');
   containerEl.classList.add('mainscreen')
   modal.remove();

//    const battlebackgrounds = ["asset/back.jpeg"];
//    document.body.style.backgroundImage = `url(${battlebackgrounds[0]})`
//   document.body.style.backgroundRepeat = 'no-repeat';
document.body.style.backgroundImage = 'none'
  
  battleEl.innerText = 'Lets fight';

  document.body.appendChild(battleEl);
  battleEl.setAttribute('id','battleContainer');

  //find players choices in pokemons  and send pokemons to game
  let poke1 = {};
  let poke2 = {}
  for(let pokemon of pokemonObjectArray){
    if(pokemon.name===player1.player1){
        poke1 = pokemon
    }
    if(pokemon.name===player2.player2){
        poke2 = pokemon
    }
  }

  //console.log(poke1,poke2)

const game = new Game(poke1,poke2);
console.log(game)
 })
 }




//also need to be able to cache divs of characters to be able have 
//that state in an array of objects
//so that when players select a pokemon on screen we can search
//in our array and set the state of pokemon objects.

const pokemonsDivs = document.querySelectorAll('.container div')
const pokemonArray = [];

for(let pokemon of pokemonsDivs){
pokemonArray.push(pokemon.id)
}
console.log(pokemonArray)



//declare pokemon1 as an object
const pokemon1 = {};
//declare pokemon2 as an object
const pokemon2 = {};
//declare a turn toggle option
const turn = 0;
//declare turn as a global variable and set it to 0
//declare winner - this will be 0 or 1
let winner = null


class Pokemon{
    constructor(name,abilities){
        this.name = name;
        this.health = 100;
        this.abilities = abilities;
    }
}

Math.floor(Math.random()*10) + 1;
function randomPower(){
    return Math.floor(Math.random()*10) + 1;
}
const abilities = [{'iron-tail':randomPower()},{'thunderbolt':randomPower()},{'static-surge':randomPower()}]
const pikachu = new Pokemon("pikachu",abilities);

const charizard = new Pokemon("charizard",[{'flamethrower':randomPower()},{'dragon-claw':randomPower()},{'wing-attack':randomPower()}]);

const blastoise = new Pokemon("blastoise",[{"hydro-pump":randomPower(),"ice-beam":randomPower()},{"skull-bash":randomPower()}]);

//not using snorlax const snorlax = new Pokemon('snorlax',[{"thick-"}])
const machamp = new Pokemon("machamp",{"cross-chop":randomPower(),"dynamic-punch":randomPower()},{"stone-edge":randomPower()});

const alakazam =  new Pokemon("alakazam",{"psychic":randomPower(),"future-sight":randomPower(),"shadow-ball":randomPower()});

const squirtle  = new Pokemon("squirtle",{"water-gun":randomPower(),"bubble-beam":randomPower()},{"aqua-tail":randomPower()})

const gyarados = new Pokemon("gyarados",{'hydro-pump':randomPower()},{'crunch':randomPower()},{'dragon-pulse':randomPower()});

const lucario = new Pokemon("lucario",{"aura-sphere":randomPower(),'close-combat':randomPower(),'flash-cannon':randomPower()});

const pokemonObjectArray = [pikachu,charizard,blastoise,machamp,alakazam,squirtle];
class Game{
    constructor(player1,player2){
        this.player1 = player1;
        this.player2 = player2;
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