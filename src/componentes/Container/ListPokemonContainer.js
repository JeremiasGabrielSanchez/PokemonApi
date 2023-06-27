import React, {useState, useEffect} from 'react'
import axios from 'axios'
import ListPokemon from './ListPokemon'
import { Image, Flex } from '@chakra-ui/react'

function ListPokemonContainer() {

  const [listPokemones, setListPokemones] = useState(null)
  const [loading, setLoading] = useState(true)

  const logoCarga = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/1200px-Pok%C3%A9_Ball_icon.svg.png'
  const baseUrl = 'https://pokeapi.co/api/v2/pokemon?limit=150&offset=0'

  const getPokemones = async() =>{
    const data = await axios.get(baseUrl)
    const { results } = data.data

    const newPokemones = results.map( async (pokemon)=>{
      const response = await axios.get(pokemon.url)
      const poke = response.data
      
      const esp = await axios.get(poke.species.url)
      
      return {
        id: poke.id,
        nombre: poke.name,
        img: poke.sprites.front_default,
        especie: esp.data,
        all: poke
      }
    })
    setListPokemones(await Promise.all(newPokemones))
    setLoading(false)
  }
  
  useEffect(()=>{

    setLoading(true);

    getPokemones();

  },[])

  return (
    <>
    {!loading
      ? 
      <ListPokemon pokemones={listPokemones}/>
      : 
      <Flex w='100%' alignItems='center' justifyContent='center'>
        <Image src={logoCarga} w='200px'/>
      </Flex>
      }
    </>
  )
}

export default ListPokemonContainer