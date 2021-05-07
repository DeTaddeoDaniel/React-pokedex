import { useEffect, useState } from "react";

function App() {

  const [allPokemons, setAllPokemons] = useState([])
  const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=20')

  const getAllPokemons = async () => {
    const res = await fetch(loadMore)
    const data = await res.json()

    setLoadMore(data.next)

    function createPokemonObject(results)  {
      results.forEach( async pokemon => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        const data =  await res.json()
        setAllPokemons( currentList => [...currentList, data])
        await console.log(allPokemons)
      })
    }
    
    createPokemonObject(data.results)

    console.log(data)
  }
  
  useEffect( () => {
    getAllPokemons()
  }, [])

  return (
    <div className="app-contaner">
      <h1>Pokedex</h1>
      <div className="pokemon-container">
        <div className="all-container">
          
        </div>
        <button className="load-more">Load more</button>
      </div>
    </div>
  );
}

export default App;
