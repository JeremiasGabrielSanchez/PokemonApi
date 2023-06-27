import React from 'react'
import Pokemon from './Pokemon'
import { Grid } from '@chakra-ui/react'
import DetailPokemon from './Detalle/DetailPokemon'

function ListPokemon({pokemones}) {

  return (
    <>
    <DetailPokemon pokemon={pokemones}/>
    <Grid templateColumns='repeat(10, 1fr)' bgGradient='linear(to-tl, green.300, yellow.400, red.400)'>
      {pokemones.map(pokemon => <Pokemon key={pokemon.id} pokemon={pokemon}/>)}
    </Grid>
    </>
  )
}

export default ListPokemon