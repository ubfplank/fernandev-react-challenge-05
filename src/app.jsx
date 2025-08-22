import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios'


/*
Consuma a API e liste todos os pokemons da consulta do seguinte endpoint. 
https://pokeapi.co/api/v2/pokemon

Você deve exibir, de cada pokémon:
- imagem
- nome
- experiência

Você pode acessar as informações de cada pokemón individualmente em:
https://pokeapi.co/api/v2/pokemon/:id


DICA:
imagem => sprites.front_default
experiência => base_experience

EXTRA: se puder ordene por nome.
*/

function App() {

  const [list, setList] = useState([]);

  useEffect(() =>{
    axios.get('https://pokeapi.co/api/v2/pokemon').then(response => setList(response.data.results));
  },[])

  

  return (
    <>
      <h3>Listagens de pokemons</h3>
      {
        list.map(pokemon => 
        <p key={pokemon.name}>
          <PokemonMoreDetails data={pokemon}/>
        </p>)
      }
    </>
  );
}

const PokemonMoreDetails = ({data}) => {
  const [moreDetails, setMoreDetails] = useState('');

  useEffect(() => {
    axios.get(data.url).then(response => setMoreDetails(response.data))
  }, [])


  if(moreDetails === ''){
    return (
      <p>---</p>
    )
  }

  return(
    <div style={{display: 'flex', alignItens: 'center', }}>
    
    <img src={moreDetails.sprites.front_default} alt='pokemon image' style={{width: 30, marginRight: 5}}></img>
    <p>{moreDetails.name} - {moreDetails.base_experience} EXP</p>
    
    </div>
   
  )

}

export default App;