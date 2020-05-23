/**
 * @class Ui
 */
class Ui{
    /**
     * 
     * @param {String} lang 
     * Recibe idioma al que cambiar ES - Español o EN - Inglés
     * Modifica todos los textos del sitio.
     */
    cambiarIdioma(lang){
        main.setAttribute('lang',lang);
        spanMas.innerHTML = languages[lang].more;
        welcomeH1.innerHTML = languages[lang].welcomeH1;
        welcomeP.innerHTML = languages[lang].welcomeP;
        searchPlaceHolder.innerHTML = languages[lang].searchPlaceHolder;
        introChar.innerHTML = languages[lang].introChar;
        firstIntro.innerHTML = languages[lang].firstIntro;
        secondIntro.innerHTML = languages[lang].secondIntro;
    }
    /**
     * 
     * @param {Number} offset 
     * Número de la página a buscar.
     */
    mostrarMasPokemons(offset){
        let pagina = offset*5;
        ui.mostrarOcultarSpinner('block','.modal');
        mostrarMas.classList.remove('show');
        mostrarMas.classList.add('hide');
        setTimeout(()=>{
            api.obtenerPokemons(pagina)
                .then(data=>{
                    ui.traerPokemons(data);
                });
            ui.mostrarOcultarSpinner('none','.modal');
            mostrarMas.classList.remove('hide');
            mostrarMas.classList.add('show');
        },4000);
    }
    /**
     * 
     * @param {Object} data 
     * Recibe el objeto del Pokémon
     */
    traerPokemon(data){
        let lang = main.getAttribute('lang');
        let pokemon = data.pokemon;
        let html;
        let divAbilities = document.createElement('div');
            divAbilities.classList.add('contenedor-habilidad');
        let div = document.createElement('div');
            div.classList.add('contenedor-pokemon', 'flip-card');
            div.id = pokemon.name;
            html = `
            <div class="flip-card-inner">
                <div class="flip-card-front front-${pokemon.name}">
                    <div class="contenedor-datos">
                        <div class="contenedor-imagen">
                            <img src="img/pokeball.png" alt="pokeball">
                        </div>
                        <h2>${pokemon.name}</h2>
                    </div>
                        <button><span>${languages[lang].details}<span></button>
                </div>    
                <div class="flip-card-back back-${pokemon.name}">
                    <div class="flip-back go-back-${pokemon.name}"><span class="back-btn">&#8617;</span></div>
                    <div class="contenedor-img-pokemon contenedor-img-${pokemon.name}">
                    </div>
                    <div class="wrapper-datos""> 
                        <div class="habilidad-container" id="habilidad-${pokemon.name}">
                            <div class="heading-card-front"> 
                                <img class="poke-card-head" src="img/card-pokeball.png"><h3>${pokemon.name}</h3>
                            </div>
                            <div class="caracteristicas-container" id="datos-habilidad-${pokemon.name}"></div>
                        </div>  
                    </div> 
                    <div class="detalles-hab detalles-hab-${pokemon.name}">
                        <div>
                            <span class="desc-head-${pokemon.name}">${languages[lang].description}</span>
                            <p class="desc"></p>
                        </div>                                    
                    </div>  
                </div>
            </div>    
                `;
        div.innerHTML = html;
        divPokemon.appendChild(div);
        div.addEventListener('click',ui.infoPokemonFlip);    
    }

    /**
     * 
     * @param {Object} data 
     * Recibe el Objeto de la lista de Pokémons
     */
    traerPokemons(data){
        let html= '';
        let lang = main.getAttribute('lang');
        let pokemons = data.pokemons.results;
            pokemons.forEach(pokemon =>{
                let divAbilities = document.createElement('div');
                    divAbilities.classList.add('contenedor-habilidad');
                let div = document.createElement('div');
                    div.classList.add('contenedor-pokemon', 'flip-card');
                    div.id = pokemon.name;
            html = `
                        <div class="flip-card-inner">
                            <div class="flip-card-front front-${pokemon.name}">
                                <div class="contenedor-datos">
                                    <div class="contenedor-imagen">
                                        <img src="img/pokeball.png" alt="pokeball">
                                    </div>
                                    <h2>${pokemon.name}</h2>
                                </div>
                                    <button><span>${languages[lang].details}<span></button>
                            </div>    
                            <div class="flip-card-back back-${pokemon.name}">
                                <div class="flip-back go-back-${pokemon.name}"><span class="back-btn">&#8617;</span></div>
                                <div class="contenedor-img-pokemon contenedor-img-${pokemon.name}">
                                </div>
                                <div class="wrapper-datos""> 
                                    <div class="habilidad-container" id="habilidad-${pokemon.name}">
                                        <div class="heading-card-front"> 
                                            <img class="poke-card-head" src="img/card-pokeball.png"><h3>${pokemon.name}</h3>
                                        </div>
                                        <div class="caracteristicas-container" id="datos-habilidad-${pokemon.name}"></div>
                                    </div>  
                                </div> 
                                <div class="detalles-hab detalles-hab-${pokemon.name}">
                                    <div>
                                        <span class="desc-head-${pokemon.name}">${languages[lang].description}</span>
                                        <p class="desc"></p>
                                    </div>                                    
                                </div>  
                            </div>
                        </div>    
                            `;
                            div.innerHTML = html;
                            divPokemon.appendChild(div);
                            div.addEventListener('click',ui.infoPokemonFlip);
            });            
    }
    /**
     * 
     * @param {Event} e 
     * Genera la animación para mostrar el front de la carta,
     * y llama a la Api, con el Id del pokémon a mostrar
     * si ya esta dada vuelta, no realiza esta acción
     */
    infoPokemonFlip(e){
        e.stopPropagation();
        let divFlip = this.childNodes[1];
        let spanBtn = this.childNodes[1].childNodes[3].childNodes[1].childNodes[0];
        let id = this.id;        
        if(divFlip.classList.contains('flipped')){
            spanBtn.addEventListener('click',ui.flipBack);
        }else{  
            ui.pokemonDetails(id);
        }
        if(divFlip.classList.contains('backFlip')){
            divFlip.classList.remove('backFlip');
        }
        this.childNodes[1].childNodes[1].classList.add('hide');
        divFlip.childNodes[1].classList.remove('show');
        spanBtn.parentNode.classList.add('show');
        spanBtn.parentNode.classList.remove('hide');
        divFlip.classList.add('flipped');
    }
    /**
     * 
     * @param {Event} e 
     * Gira la carta nuevamente para ver el Dorso
     */
    flipBack(e){
        e.stopPropagation();
        let divFlip = this.parentNode.parentNode.parentNode;
            this.parentNode.classList.remove('show');
            this.parentNode.classList.add('hide');
            divFlip.childNodes[1].classList.remove('hide');
            divFlip.childNodes[1].classList.add('show');
            divFlip.classList.add('backFlip');

    }
    /**
     * 
     * @param {Number} id 
     * Recibe el id del pokémon a mostrar.
     * Si es en Español realiza un nuevo llamado a la Api para mostrar la habilidad en el idioma Español
     */
    pokemonDetails(id){
        let lang = main.getAttribute('lang');
        api.obtenerDetallePokemon(id)
            .then(data =>{
                let pokemon = data.pokemon;
                let spanHeading = document.createElement('span');
                    spanHeading.innerHTML = `${languages[lang].abilities}`;
                    spanHeading.classList.add('sm-heading-hab');
                    spanHeading.classList.add(`${pokemon.types[0].type.name}`);
                document.querySelector(`#datos-habilidad-${pokemon.name}`).appendChild(spanHeading); 
                document.querySelector(`.detalles-hab-${pokemon.name}`).classList.add('hide');
                let cardFront = document.querySelector(`.go-back-${pokemon.name}`);
                    cardFront.classList.add(`${pokemon.types[0].type.name}`);
                let divImgs = document.querySelector(`.contenedor-img-${pokemon.name}`);
                    divImgs.innerHTML = 
                    `
                        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}_front">
                    `;
                if(lang !== 'es'){
                    pokemon.abilities.forEach(ability =>{
                        let dataId = ability.ability.url;
                            dataId = dataId.replace("https://pokeapi.co/api/v2/ability/", "");
                            dataId = dataId.replace("/","");
                        let spanHab = document.createElement('span');
                        let divContainer = document.createElement('div');
                            divContainer.classList.add('ct-habs');
                        let descHead = document.querySelector(`.desc-head-${pokemon.name}`);
                            descHead.classList.add(`${pokemon.types[0].type.name}`);
                        spanHab.classList.add('pokemon-data-hab', `${pokemon.types[0].type.name}`);
                        spanHab.setAttribute('data-id',dataId);
                        spanHab.appendChild(document.createTextNode(`${ability.ability.name}`));
                        divContainer.appendChild(spanHab);
                            document.querySelector(`#datos-habilidad-${pokemon.name}`).appendChild(divContainer);
                        document.querySelector(`.detalles-hab-${pokemon.name}`).setAttribute('ab-id',dataId);
                        spanHab.addEventListener('click', ui.detalleHabilidad);
                    });  
                }else{
                    pokemon.abilities.forEach(ability =>{
                        let dataId = ability.ability.url;
                            dataId = dataId.replace("https://pokeapi.co/api/v2/ability/", "");
                            dataId = dataId.replace("/","");
                        let spanHab = document.createElement('span');
                        let divContainer = document.createElement('div');
                            divContainer.classList.add('ct-habs');
                        let descHead = document.querySelector(`.desc-head-${pokemon.name}`);
                            descHead.classList.add(`${pokemon.types[0].type.name}`);
                        spanHab.classList.add('pokemon-data-hab', `${pokemon.types[0].type.name}`);
                        spanHab.setAttribute('data-id',dataId);
                        api.obtenerHabilidad(dataId)
                        .then(data=>{
                            let translate_ab = data.ability.names.find(trad =>{
                                return trad.language.name === lang;
                            });
                            spanHab.appendChild(document.createTextNode(translate_ab.name));
                            divContainer.appendChild(spanHab);
                            document.querySelector(`#datos-habilidad-${pokemon.name}`).appendChild(divContainer);
                        });
                        document.querySelector(`.detalles-hab-${pokemon.name}`).setAttribute('ab-id',dataId);
                        spanHab.addEventListener('click', ui.detalleHabilidad);
                    });  
                }   
            });
    }
    /**
     * @function 
     * Enciende el Chip seleccionado
     * Busca con Id de la habilidad, los detalles.
     */
    detalleHabilidad(){
        this.classList.add('active');
        if(this.parentNode.nextSibling === null && this.parentNode.previousSibling.classList.contains('ct-habs')){
            this.parentNode.previousSibling.childNodes[0].classList.remove('active');
            if(this.parentNode.previousSibling.previousSibling !== null && this.parentNode.previousSibling.previousSibling.classList.contains('ct-habs')){
                this.parentNode.previousSibling.previousSibling.childNodes[0].classList.remove('active');
            }
        }else{
            if(this.parentNode.nextSibling !== null && this.parentNode.nextSibling.classList.contains('ct-habs')){
                this.parentNode.nextSibling.childNodes[0].classList.remove('active');
                if(this.parentNode.nextSibling.nextSibling !== null && this.parentNode.nextSibling.nextSibling.classList.contains('ct-habs')){
                    this.parentNode.nextSibling.nextSibling.childNodes[0].classList.remove('active');
                }
            }
        }
        ui.mostrarOcultarSpinner('block','.modal');
        this.parentNode.parentNode.parentNode.parentNode.nextSibling.nextSibling.classList.remove('hide');
        let description = this.parentNode.parentNode.parentNode.parentNode.nextSibling.nextSibling.childNodes[1].childNodes[3];
        let id = this.getAttribute('data-id');
        let lang = main.getAttribute('lang');
        setTimeout(()=>{
            api.obtenerHabilidad(id)
            .then(data=>{
                let text_ab = data.ability.flavor_text_entries.find(desc =>{
                    return desc.language.name === lang;
                });
                description.innerHTML = text_ab.flavor_text;
            });
            ui.mostrarOcultarSpinner('none','.modal');
        },3000);
    }
    /**
     * 
     * @param {String} vista 
     * @param {String} spin 
     * Busca @spin como valor de Selector 
     * le da el valor de @vista
     */
    mostrarOcultarSpinner(vista, spin){
        let spinner = document.querySelector(spin);
        spinner.style.display = vista;
    }

}