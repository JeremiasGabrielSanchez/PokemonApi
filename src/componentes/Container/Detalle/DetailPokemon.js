import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import InfoPokemon from './InfoPokemon'
import { Flex } from '@chakra-ui/react'

function DetailPokemon({pokemon}) {

  const {id} = useParams()

  const [infoPoke, setInfoPoke] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
  
    const getInfo = () =>{
    
      const mapeo = pokemon.find(det => det.id === parseInt(id))
      setInfoPoke(mapeo)
      console.log(mapeo)

      setLoading(false)
    }
  
    setLoading(true)
    
    getInfo()
    
  },[id, pokemon])
  return (
    <>
    {!loading 
    ? 
    <Flex bgGradient='linear(to-bl, green.500, blackAlpha.600, red.500)'>
      <InfoPokemon detalle={infoPoke}/>
    </Flex>
    :
    <h2>cargando...</h2>
    }
    </>
  )
}

export default DetailPokemon