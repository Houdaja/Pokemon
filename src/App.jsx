import { useState, useEffect } from "react"
import "./index.css";
function App() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    getPokemons();
  }, [])

  const getPokemons = async () => {
    try {
      const response = await fetch("https://pokebuildapi.fr/api/v1/pokemon/limit/151");
      const data = await response.json();
      setPokemons(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="grid">
        {pokemons.map(pokemon => (
          <div key={pokemon.id}>
            <h2>{pokemon.name} - {pokemon.id}</h2>
            <img src={pokemon.image} alt={pokemon.name} />
            <ul>
              {/* Dans l'API, nous recuperons les statistiques sous forme d'objet */}
              {/* Donc pour recuperer l'interieur de l'objet, on doit mettre le chemin complet */}
              {/* Donc on part de notre variable pokemon, puis on recupere l'objet stats, puis les points de vie, donc hp*/}
              {/* Ce qui donne pokemon.stats.HP */}
              <li>Points de vie : {pokemon.stats.HP}</li>
              <li>Attaque : {pokemon.stats.attack}</li>
              <li>Défense : {pokemon.stats.defense}</li>
            </ul>
            <div className="types">
              {/* Dans notre objet pokemon, nous avons la propriété apiTypes qui est un tableau */}
              {/* Donc tout comme notre state pokemons, nous pouvons utiliser map pour passer a travers, boucler */}

              {pokemon.apiTypes.map(type => (
                // Donc on recupere ici chaque element du tableau a l'unité dans la variable "type"
                // type est un objet, donc je peux recup son nom et son image en mettant type.name et type.image
                <div key={type.name}>
                  <h3>{type.name}</h3>
                  <img src={type.image} alt={type.name} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default App
