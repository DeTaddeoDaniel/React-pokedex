import { useEffect, useState } from "react"

// importa componente
import PokemonThumb from "./components/PokemonThumb "

function App() {

  // È un modo per “conservare” qualche valore durante le chiamate di funzione useState è un modo nuovo di usare la stessa esatta funzionalità che this.state fornisce ad una classe. 
  
  // Normalmente, le variabili “scompaiono” quando la funzione esce mentre le variabili di stato vengono preservate da React.


  const [allPokemons, setAllPokemons] = useState([])
  const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=20')

  // funzione asincrona che usa lo stato loadm more
  const getAllPokemons = async () => {
    const res = await fetch(loadMore)
    const data = await res.json()

    // set setLoadMore al succesiva chiamata
    setLoadMore(data.next)

    // funione asincrona per singolo pokemon
    function createPokemonObject(results)  {
      results.forEach( async pokemon => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        const data =  await res.json()

        // operatore spread
        setAllPokemons( currentList => [...currentList, data])
      })
    }
    
    // avvia funzione asincrona passandoli dati ricevuti dall'api
    createPokemonObject(data.results)
    // console.log(data)
  }
  
  // La funzione passata useEffectverrà eseguita dopo che il rendering è stato eseguito il commit sullo schermo. Pensa agli effetti come a una via di fuga dal mondo puramente funzionale di React al mondo imperativo.
  useEffect( () => {

    // chiama funzione asincrona getAllPokemons
    getAllPokemons()
  }, [])

  return (
    <div className="app-contaner">
      <h1>Pokedex</h1>
      <div className="pokemon-container">
        <div className="all-container">

          {/* prenditutti i pokemon in  allPokemons e mappali*/}
           {allPokemons.map( (pokemonStats, index) =>

            // pokemon card
            <PokemonThumb

              // pass data to component con hook
              key={index}
              id={pokemonStats.id}
              image={pokemonStats.sprites.other.dream_world.front_default}
              name={pokemonStats.name}
              type={pokemonStats.types[0].type.name} 
            />

           )}

        </div>

        {/* click sul pulsante, creando una funzione anomina */}
        <button className="load-more" onClick={ 
          ()=> {
            // richiama nuovi pokemon
            getAllPokemons()
          }
        }>Load more</button>

      </div>
    </div>
  );
}

export default App;
