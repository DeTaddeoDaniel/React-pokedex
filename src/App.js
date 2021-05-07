import { useEffect, useState } from "react";

function App() {

  const [allPokemons, setAllPokemons] = useState([])
  const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=20')

  const getAllPokemons = async () => {
    const res = await fetch(loadMore)
    const data = await res.json()

    setLoadMore(data.next)

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
