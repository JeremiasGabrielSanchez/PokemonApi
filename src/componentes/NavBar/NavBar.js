import {useState, useEffect} from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../tools/firebase'
import { Flex, Text, Button, Spacer, Image } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/ContextAuth'

function NavBar() {

  const [cliente, setClient] = useState([])
  const {user} = useAuth()

  useEffect(()=>{

    const usuario = collection(db, "usuarios")
    const consulta = getDocs(usuario)
    consulta
    .then( res =>{
      const clientes = res.docs.map(doc => {
        return {...doc.data()}
      })
      setClient(clientes.find( clie => clie.email === user.email))
    }) //fin del then
    .catch(err => (console.log(err)))
    
  }, [user])

  return (
    <Flex flexDir='column'>
      <Flex flexDir='row' alignItems='center'
      pl='1rem' bgGradient='linear(to-r, red.500, red.300, red.100)'
      border='2px' color='blackAlpha.700'
      fontWeight='extrabold'>
        
        <Text ml='3rem' fontSize='3rem' 
        textColor='black' textShadow='2px 2px rgba(1, 1, 192, 0.897)'> {/* Sombra del titulo*/}
          PokeLista - 1° Generación 
        </Text>
        <Text position='absolute' ml='3rem' fontSize='3rem'
        bgGradient='linear(to-t, yellow.300, yellow.500 ,whiteAlpha.500)' bgClip='text'> {/* Color principal del titulo*/}
          PokeLista - 1° Generación
        </Text>
        <Spacer/>

        <Flex alignItems='center' justifyContent='center' p='1rem'>

          <NavLink to='/'>
            <Button fontSize='1.5rem' mr='1rem' h='5rem' border='2px' 
            bgGradient='linear(to-r, orange.300, red.200)' 
            _hover={{bgGradient:'linear(to-r, orange.400, red.200)', h:'4.5rem', boxShadow:'1px 1px 3px black'}}>
              Home
            </Button>
          </NavLink>

          <NavLink to='/pokemon'>
            <Button fontSize='1.5rem' mr='1rem' h='5rem' border='2px' 
            bgGradient='linear(to-r, orange.300, red.200)' 
            _hover={{bgGradient:'linear(to-r, orange.400, red.200)', h:'4.5rem', boxShadow:'1px 1px 3px black'}}>
              Pokemones
            </Button>
          </NavLink>

          {user
          ?
          <NavLink to='/user'>
            <Image 
            src={cliente.perfil} 
            w='80px' 
            borderRadius='40px' border='2px' 
            _hover={{boxShadow:'1px 1px 3px black', w:'75px', borderRadius:'38px'}}/>
          </NavLink>
          :
          <Flex>
            <NavLink to='/login'>
              <Button fontSize='1.5rem' h='5rem' border='2px' 
              bgGradient='linear(to-r, orange.300, red.200)' 
              _hover={{bgGradient:'linear(to-r, orange.400, red.200)', h:'4.5rem', boxShadow:'1px 1px 3px black'}}>
                Login
              </Button>
            </NavLink>

            <NavLink to='/singup'>
              <Button fontSize='1.5rem' h='5rem' ml='1rem' border='2px' 
              bgGradient='linear(to-r, orange.300, red.200)' 
              _hover={{bgGradient:'linear(to-br, orange.400, red.200)', h:'4.5rem', boxShadow:'1px 1px 3px black'}}>
                Sign Up
              </Button>
            </NavLink>
          </Flex>
          }
        </Flex>

      </Flex>

    </Flex>
  )
}

export default NavBar