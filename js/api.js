/**
 * @class Api
 */
class Api{ 
    /**
     * @async @function
     * @param {Number} offset Valor del paginador.
     * Obtiene la lista de pokémons con un máximo de 5 por llamado. 
     */
    async obtenerPokemons(offset = 0){
        const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=5`;

        //fetch a la api

        const urlObtenerPokemons = await fetch(url);

        //respuestaJson
        const pokemons = await urlObtenerPokemons.json();
        return{pokemons}
    }
    /**
     * @async @function
     * @param {String} name 
     * Recibe el nombre del pokémon a buscar.
     * @returns Detalles del Pokémon
     */
    async obtenerDetallePokemon(name){
        const url = `https://pokeapi.co/api/v2/pokemon/${name}`;

        const urlDataPokemon = await fetch(url);

        const pokemon = await urlDataPokemon.json();

        return{pokemon}
    }
    /**
     * @async @function
     * @param {Number} id 
     * Recibe el id de la habilidad a buscar.
     * @returns habilidad en los idiomas disponibles.
     */
    async obtenerHabilidad(id){
        const url = `https://pokeapi.co/api/v2/ability/${id}`;

        const urlDataAbility = await fetch(url);

        const ability = await urlDataAbility.json();

        return{ability}
    }
}