import React, { useEffect, useState } from "react";
import axios from "axios";

// Tipagem para cada Pokémon da lista inicial
interface Pokemon {
  name: string;
  url: string;
}

// Tipagem para os detalhes do Pokémon
interface PokemonDetails {
  name: string;
  base_experience: number;
  sprites: {
    front_default: string;
  };
}

// Componente para exibir os detalhes de cada Pokémon
const PokemonMoreDetails: React.FC<{ data: Pokemon }> = ({ data }) => {
  const [details, setDetails] = useState<PokemonDetails | null>(null);

  useEffect(() => {
    axios.get<PokemonDetails>(data.url).then(res => setDetails(res.data));
  }, [data.url]);

  if (!details) return <p>Carregando...</p>;

  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: 5 }}>
      <img
        src={details.sprites.front_default}
        alt={details.name}
        width={50}
        style={{ marginRight: 10 }}
      />
      <p>{details.name} - {details.base_experience} EXP</p>
    </div>
  );
};

// Componente principal
const App: React.FC = () => {
  const [list, setList] = useState<Pokemon[]>([]);

  useEffect(() => {
    axios.get<{ results: Pokemon[] }>("https://pokeapi.co/api/v2/pokemon?limit=20")
      .then(res => {
        const sorted = res.data.results.sort((a, b) => a.name.localeCompare(b.name));
        setList(sorted);
      });
  }, []);

  return (
    <div>
      <h1>Lista de Pokémons</h1>
      {list.map(pokemon => (
        <PokemonMoreDetails key={pokemon.name} data={pokemon} />
      ))}
    </div>
  );
};

export default App;
