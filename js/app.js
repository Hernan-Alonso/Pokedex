//variables
/**
 * Variables para el manejo del DOM y otras utilidades
 * @const divPokemon Div donde se van a mostrar los pokémons
 * @const formulario form del search
 * @const submitBtn boton de lupa
 * @const chipSearch div que se genera al buscar un Pokemon
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
const input = document.querySelector('#buscador');
const submitBtn = document.querySelector('input[type="submit"]');
const chipSearch = document.querySelector('#chipSearch');
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
    input.addEventListener('blur',contenidoInput);
    chipSearch.querySelector('span').addEventListener('click', limpiarBusqueda);
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
 * Si el campo esta vacio, devuelve mensaje de error para completar el campo
 * Si el Pokemon no existe devuelve error de que no existe, solo puede buscar por Nombre, no ID
 */
function buscarPokemon(e){
    e.preventDefault();
    let pokemon = input.value;
    let pokemonSearch = pokemon.toLowerCase();
        submitBtn.disabled = true;    
    if(pokemonSearch !== '' && isNaN(pokemonSearch)){
        api.obtenerDetallePokemon(pokemonSearch)
            .then(data=>{
                if(data.type === 'error'){
                    let mensaje;
                    if(main.getAttribute('lang') === 'es'){
                        mensaje = 'El Pokémon no existe en el Pokedex';
                    }else{
                        mensaje = 'The Pokémon is not in the Pokedex';
                    }
                    ui.mostrarMensaje(mensaje);
                }else{
                    divPokemon.scrollIntoView();
                    divPokemon.innerHTML = '';
                    divPokemon.appendChild(mostrarMas);
                    mostrarMas.classList.add('contenedor-boton');
                    mostrarMas.appendChild(spanMas);
                    ui.traerPokemon(data);
                    divPokemon.classList.add('hasChip');
                    chipSearch.classList.remove('hide');
                    chipSearch.classList.add('show');
                    chipSearch.querySelector('span').innerHTML = pokemon+`<b>&times;</b>`;
                    mostrarMas.classList.add('hide');
                    formulario.reset();
                    input.blur();
                    submitBtn.disabled = false;
                }
            });
    }else{
        let mensaje;
        if(main.getAttribute('lang') === 'es'){
            mensaje = 'Ingresa un nombre de Pokémon';
        }else{
            mensaje = 'You must enter a Pokémon name';
        }
        ui.mostrarMensaje(mensaje);
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

/**
 * @function contenidoInput
 * Siempre que haya texto en el input se mantendra como Focused.
 */
function contenidoInput(){
    if(input.value !== ''){
        input.focus({preventScroll: true});
    }
}

/**
 * @function limpiarBusqueda
 * remueve el Chip de busqueda y limpia el registro, trae nuevamente todos los pokemons de la pirmera pagina.
 */
function limpiarBusqueda(){
    chipSearch.classList.remove('show');
    chipSearch.classList.add('hide');
    mostrarMas.classList.remove('hide');
    divPokemon.classList.remove('hasChip');
    divPokemon.innerHTML = '';
    offset = 0;
    buscarPokemons();
    divPokemon.appendChild(mostrarMas);
    mostrarMas.appendChild(spanMas);
}