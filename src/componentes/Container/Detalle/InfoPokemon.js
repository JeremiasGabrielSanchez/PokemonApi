import React, { useEffect, useState } from 'react'
import { Flex, Text, Image, Grid, GridItem, Spacer, UnorderedList, ListItem } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'
import { FaMinusCircle, FaCheckCircle } from "react-icons/fa";

function InfoPokemon({detalle}) {
  const [color, setColor] = useState('')
  const [description, setDescription] = useState({})

  useEffect(()=>{

  const getColor = ()=>{
    if(detalle){

      const inf = detalle.especie.flavor_text_entries.filter(inf => inf.language.name === 'es')
      
      setDescription({
        nombre: detalle.nombre.toUpperCase(),
        img: detalle.all.sprites.other.home.front_default,
        img_back: detalle.all.sprites.back_default,
        clase: detalle.especie.genera.at(5).genus,
        pokedex: detalle.especie.pokedex_numbers.at(1).entry_number,
        altura: detalle.all.height,
        peso: detalle.all.weight, 
        andar: detalle.especie.shape.name,
        area: detalle.especie.pal_park_encounters.at(0).area.name,
        habitad: detalle.especie.habitat.name,
        captura: detalle.especie.capture_rate,
        habilidad: detalle.all.moves.length,
        description_uno: inf.at(0).flavor_text,
        description_dos: inf.at(1).flavor_text,
        description_tres: inf.at(2).flavor_text,
        description_cuatro: inf.at(3).flavor_text,
        stats_vida: detalle.all.stats.at(0).base_stat,
        stats_atq: detalle.all.stats.at(1).base_stat,
        stats_def: detalle.all.stats.at(2).base_stat,
        stats_vel: detalle.all.stats.at(3).base_stat,
        stats_atqesp: detalle.all.stats.at(4).base_stat,
        stats_defesp: detalle.all.stats.at(5).base_stat,
        mistico: detalle.especie.is_mythical,
        legendario: detalle.especie.is_legendary
        })

      if(detalle.especie.color.name === 'brown'){
        setColor('orange')
      }else if(detalle.especie.color.name === 'white'){
        setColor('blackAlpha')
      }else{
        setColor(detalle.especie.color.name)
      }
    }else{
      setDescription({
        nombre: '-',
        img: '-',
        img_back: '-',
        clase: '-',
        pokedex: '-',
        altura: '-',
        peso: '-',
        andar: '',
        area: '',
        habitad: '',
        captura: '',
        habilidad: '',
        description_uno: '',
        description_dos: '',
        description_tres: '',
        description_cuatro: '',
        stats_vida: '',
        stats_atq: '',
        stats_def: '',
        stats_vel: '',
        stats_atqesp: '',
        stats_defesp: '' })
    }
  }
  
  getColor()
  
},[detalle])

  return (
  <>
    {!detalle
    ?
    <Flex></Flex>
    :
    <>
      <Flex 
      flexDir='column' 
      alignItems='center' 
      justifyContent='center' 
      m='1rem'
      >

        <Grid 
        templateColumns='repeat(5, 1fr)'
        templeRows='repeat(5, 1fr)'
        w='60%'
        border='2px'
        borderStyle='groove' 
        boxShadow='1px 1px 5px 2px black'
        >
                      {/* Titulo */}
          <GridItem colSpan={5} rowSpan={1} borderBottom='2px' borderStyle='groove'
          fontWeight='extrabold' fontSize='2rem' textColor='blackAlpha.700'
          bgGradient={`linear(to-b, ${color}.500, ${color}.300)`}
          >
            <Flex justifyContent='center'>
              <Spacer/>
              <Text>{description.nombre}</Text>
              <Spacer/>
              <NavLink to='/pokemon'>
                <Text border='2px' p='0 .4rem' m='.3rem' fontSize='1.2rem' _hover={{fontSize:'1.3rem', boxShadow:'0px 0px 3px black'}}>X</Text>
              </NavLink>
            </Flex>
          </GridItem>

                      {/* Imagen Principal */}
          <GridItem colSpan={3} rowSpan={2}  p='.3rem' 
          bgGradient={`linear(to-tl, ${color}.100, ${color}.300)`}
          >
            <Image src={description.img} w='70%' border='2px' m='auto' borderStyle='groove' boxShadow='1px 1px 5px black'/>
          </GridItem>

                      {/* Datos Generales */}
          <GridItem colSpan={2} rowSpan={2} p='.3rem'
          bgGradient={`linear(to-tr, ${color}.100, ${color}.300)`}
          textAlign='center' fontWeight='semibold'
          >
            <Text fontWeight='extrabold' fontSize='1.2rem' textColor='blackAlpha.700' as='u'>Datos Generales</Text>
            <UnorderedList textAlign='left'>
              <ListItem>Clase: {description.clase}</ListItem>
              <ListItem>Pokedex: {description.pokedex}</ListItem>
              <ListItem>Altura: {description.altura} in</ListItem>
              <ListItem>Peso: {description.peso}gr</ListItem>
              <ListItem>Andar: {description.andar}</ListItem>
              <ListItem>Habitad: {description.habitad}</ListItem>
              <ListItem>Area: {description.area}</ListItem>
              <ListItem>Tasa de captura: {description.captura}%</ListItem>
              <ListItem>Habilidades Posibles : {description.habilidad}</ListItem>
              {(detalle.all.types.length === 1)? <ListItem>Tipo: {detalle.all.types.at(0).type.name}</ListItem> : <ListItem>Tipo: {detalle.all.types.at(0).type.name} y {detalle.all.types.at(1).type.name}</ListItem>}
            </UnorderedList>
          </GridItem>

                      {/* Stats */}
          <GridItem colSpan={3} rowSpan={1} p='.3rem 3rem .5rem'
          textAlign='center'
          bgGradient={`linear(to-bl, ${color}.100, ${color}.300)`}
          >
            <Text fontWeight='extrabold' fontSize='1.2rem' textColor='blackAlpha.700' as='u'>Stats</Text>
            <Flex flexDir='row' textAlign='left' fontWeight='semibold'>
              <UnorderedList>
                <ListItem>Vida: {description.stats_vida}</ListItem>
                <ListItem>Ataque: {description.stats_atq}</ListItem>
                <ListItem>Defensa: {description.stats_def}</ListItem>
              </UnorderedList>
              <Spacer/>
              <UnorderedList>
                <ListItem>Velocidad: {description.stats_vel}</ListItem>
                <ListItem>Ataque-Especial: {description.stats_atqesp}</ListItem>
                <ListItem>Defensa_Especial:{description.stats_defesp}</ListItem>
              </UnorderedList>
            </Flex>
          </GridItem>

                      {/* Imagen secundaria y Informacion de tipo*/}
          <GridItem colSpan={2} rowSpan={1}
          bgGradient={`linear(to-br, ${color}.100, ${color}.300)`}
          >
            <Flex alignItems='center' justifyContent='center'>
              <Image src={detalle.all.sprites.back_default} border='2px' borderStyle='groove' boxShadow='1px 1px 5px black'/>
              <Flex flexDir='column' ml='1rem' fontWeight='semibold'>

                <Flex flexDir='row' alignItems='center'>
                  {(description.mistico === true) ? <Flex color='green' boxShadow='1px 1px 2px black' borderRadius='100%'><FaCheckCircle/></Flex> : <Flex color='red' boxShadow='1px 1px 2px black' borderRadius='100%'><FaMinusCircle/></Flex>}
                  <Text ml='.3rem'> Mistico</Text>
                </Flex>

                <Flex flexDir='row' alignItems='center'>
                  {(description.legendario === true) ? <Flex color='green' boxShadow='1px 1px 2px black' borderRadius='100%'><FaCheckCircle/></Flex> : <Flex color='red' boxShadow='1px 1px 2px black' borderRadius='100%'><FaMinusCircle/></Flex>}
                  <Text ml='.3rem'> Legendario</Text>
                </Flex>
              </Flex>
            </Flex>
          </GridItem>

                      {/* Descripcion */}
          <GridItem colSpan={5} rowSpan={2} borderTop='2px' borderStyle='groove'
          bgGradient={`linear(to-tl, ${color}.500, ${color}.300)`}
          p='.5rem'
          >
            <Text fontWeight='extrabold' fontSize='1.2rem' textColor='blackAlpha.700' textAlign='center'>Decripción</Text>
            <Text as='b' p='.2rem'> {description.description_uno} {description.description_dos} {description.description_tres} {description.description_cuatro}
            </Text>
          </GridItem>
        </Grid>
      </Flex>
    </>
    }
  </>
  )
}

export default InfoPokemon