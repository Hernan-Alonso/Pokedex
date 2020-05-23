//variables
/**
 * Variables para el manejo del DOM y otras utilidades
 * @const divPokemon Div donde se van a mostrar los pokémons
 * @const mostrarMas Botón para listar la siguiente página de pokémons
 * @const spanMas Texto al inicio del DOM, se cambia segun idioma
 * @const main Main del sitio para generar un @data
 * @btnEs y @btnEn Botones de cambio de idioma
 * @const api @class Api
 * @const ui @class Ui
 * @let offset Valor para el paginador
 * @const welcomeH1 Welcome del sitio
 * @const welcomeP Parrafor de bienvenida
 * @const searchPlaceHolder placeholder label del Search
 * @introChar Span intro del personaje
 * @firstIntro Primer parrafo de la intro
 * @secondIntro Segundo parrafo de la intro
 * @let languages @object Contiene los valores para el cambio de idioma
 * 
 */
const divPokemon = document.querySelector('#pokemon');
const formulario = document.querySelector('#formulario');
const mostrarMas = document.createElement('div'); 
      mostrarMas.id = 'mas';  
      mostrarMas.classList.add('contenedor-boton');  
const spanMas = document.createElement('span');
      spanMas.innerHTML ='Ver más Pokémons';
      divPokemon.appendChild(mostrarMas);
      mostrarMas.appendChild(spanMas);
const main = document.querySelector('main');
const btnEs = document.querySelector('#es');
      btnEs.disabled = true;      
const btnEn = document.querySelector('#en');
const api = new Api();
const ui = new Ui();
let offset = 0;
const welcomeH1 = document.querySelector('#welcome');
const welcomeP = document.querySelector('#welcome-speech');
const searchPlaceHolder = document.querySelector('#search-label');
const introChar = document.querySelector('#intro-char');
const firstIntro = document.querySelector('#first-intro');
const secondIntro = document.querySelector('#second-intro');
let languages = {
    es: {
        details: 'Ver detalle',
        base_exp: 'Exp. Base',
        moves: 'Movimientos',
        abilities: 'Habilidades',
        stats: 'Estadisticas',
        heading: 'Listado de Pokémons',
        more: 'Ver más Pokémons',
        welcomeH1: '¡Hola!',
        welcomeP: 'Soy Pikachu, bienvenido a la Pokédex. Te voy a estar ayudando a que encuentres a todos los Pokémon del mundo.',
        searchPlaceHolder: 'Escribe el nombre de tu Pokémon',
        introChar: 'Intro personaje',
        firstIntro: 'Conocido en Japón como Satoshi, es el protagonista de la serie de anime Pokémon.',
        secondIntro: 'Mide 1.65 m y pesa 54 kg. Es un entrenador Pokémon originario de Pueblo Paleta, de la región de Kanto.',
        description: 'Descripción'
    },
    en: {
        details: 'Details',
        base_exp: 'Base Exp.',
        moves: 'Moves',
        abilities: 'Abilities',
        stats: 'Stats',
        heading: 'Pokémon List',
        more: 'Show more Pokémons',
        welcomeH1: 'Hi!',
        welcomeP: 'I\'m Pikachu, welcome to the Pokédex. I will be helping you to find all Pokémons around the world.',
        searchPlaceHolder: 'Type the name of your Pokémon',
        introChar: 'Character intro',
        firstIntro: 'Known in Japan as Satoshi, is the main character of the anime serie Pokémon.',
        secondIntro: 'He is 1.65 m in height and weights 54 kg. Is a Pokémon trainer from Pueblo Paleta, in Kanto\'s region.',
        description: 'Description'
    }
}




//EventListener
eventListener();
/**
 * Todos los EventListeners se guardan en esta funcion. se dispone cunado se inicia el DOM
 * @function
 */
function eventListener(){
    document.addEventListener('DOMContentLoaded', buscarPokemons);
    mostrarMas.addEventListener('click', mostrarMasPokemons);
    btnEs.addEventListener('click',cambiarIdioma);
    btnEn.addEventListener('click', cambiarIdioma);
    formulario.addEventListener('submit', buscarPokemon);
}


//Funciones
/**
 * Se inicia con el DOM, llama a la API 
 * @Api pokemon.co
 * @function
 */
function buscarPokemons(){
    api.obtenerPokemons()
    .then(data=>{
        ui.traerPokemons(data);
    })
}
/**
 * Muestra la siguiente página de pokémons
 * @function
 */
function mostrarMasPokemons(){
    offset += 1;
    ui.mostrarMasPokemons(offset);
}
/**
 * 
 * @param {Action} e 
 * Recibe @String del Pokémon a buscar.
 */
//TODO: Feedback al no poner nada, y al poner cualquier value
function buscarPokemon(e){
    e.preventDefault();
    let input = document.querySelector('#buscador');
    let pokemon = input.value;
        pokemon = pokemon.toLowerCase();
    if(pokemon !== ''){
        api.obtenerDetallePokemon(pokemon)
            .then(data=>{
                divPokemon.scrollIntoView();
                divPokemon.innerHTML = '';
                divPokemon.appendChild(mostrarMas);
                mostrarMas.classList.add('contenedor-boton');
                mostrarMas.appendChild(spanMas);
                ui.traerPokemon(data);
            },data =>{
                console.log(data);
                console.log('hubo un error');
            });
    }else{
        console.log('Ingresa un Nombre de Pokemon');
    }
    
}

/**
 * Cambia el idioma a inglés o español
 * @function
 */
function cambiarIdioma(){
    this.classList.remove('not-selected-lang');
    if(this.parentNode.nextSibling.nextSibling === null){
        this.parentNode.previousSibling.previousSibling.childNodes[1].classList.add('not-selected-lang');
    }else{
        this.parentNode.nextSibling.nextSibling.childNodes[1].classList.add('not-selected-lang');
    }
    ui.cambiarIdioma(this.id);
    divPokemon.innerHTML = '';
    divPokemon.appendChild(mostrarMas);
    mostrarMas.classList.add('contenedor-boton');
    mostrarMas.appendChild(spanMas);
    offset = 0;
    buscarPokemons();
}
