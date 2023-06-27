import React from 'react'
import { Flex, Image, Text } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'


function Pokemon({pokemon}) {
  
  return (
    <NavLink to={`/pokemon/${pokemon.id}`}>

      <Flex flexDir='column' alignItems='center' justifyContent='center' 
      w='100%' border='2px' borderColor='white' 
      fontFamily='sans-serif' fontWeight='extrabold' color='blackAlpha.800'
      _hover={{bgGradient:'linear(to-tl, green.300, yellow.400, red.400)'}}
      >
        <Text p='.3rem .3rem 0'>{pokemon.nombre.toUpperCase()}</Text>
        <Image src={pokemon.img} borderBottom='2px'/>
      </Flex>
      
    </NavLink>
  )
}

export default Pokemon