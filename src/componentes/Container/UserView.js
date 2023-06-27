import { useEffect, useState } from "react"
import { useAuth } from "../context/ContextAuth"
import { Grid, GridItem, Text, Button, Image, Flex } from "@chakra-ui/react"
import {db} from '../tools/firebase'
import { collection, getDocs } from 'firebase/firestore'
import { useNavigate } from "react-router-dom"

function UserView() {

  const {user, logout} = useAuth()
  const [cliente, setClient] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const handleLogout = async()=>{
    await logout()
    navigate('/')
  }

  useEffect(()=>{

    const usuario = collection(db, "usuarios")
    const consulta = getDocs(usuario)
    consulta
    .then( res =>{
      const clientes = res.docs.map(doc => {
        return {...doc.data()}
      })
      setClient(clientes.find( clie => clie.email === user.email))
      setLoading(false)
    }) //fin del then
    .catch(err => (console.log(err)))
    
  }, [cliente, user])
  
  return (
    <> 
    {
      loading 
      ?
      <h1>cargando</h1>
      :
      <Flex justifyContent='center' textAlign='center'
      bgGradient='linear(to-tl, red.300, blackAlpha.400, yellow.400)'>

        <Flex flexDir='column' alignItems='center' w='50%' h='30rem' bg='tomato' boxShadow='0px 3px 4px 1px black' m='1rem'>

          <Text as='b' fontSize='2rem' p='0 .1rem .5rem .1rem' color='white' textShadow='1px 1px 1px black'> {cliente.name} {cliente.lastName} </Text>
          <Image src={cliente.perfil} h='45%' p='.2rem' bgColor='yellow.400' borderBottom='2px'/>

          <Grid
          templateColumns='repeat(2, 1fr)'
          >
            <GridItem>
              <Text color='white' fontSize='1.2rem' as='b' mt='1rem' textShadow='1px 1px 1px black'>Información Personal</Text>
              <Flex flexDir='column' alignItems='flex-start' m='.5rem .5rem 0 .5rem' p='.5rem' fontSize='1rem' as='b' color='white' bgColor='blackAlpha.400'>
                <Text m='0 auto .5rem auto'> {cliente.email}</Text>
                <Text>País: {cliente.country}</Text>
                <Text>Casa: {cliente.street}</Text>
                <Text>Telefono: {cliente.phone}</Text>
              </Flex>
            </GridItem>
            <GridItem>
              <Button m='3rem 1rem .5rem 1rem ' w='11rem' bgColor='blue.400' color='white' textShadow='1px 1px 1px black' border='2px' borderColor='black' _hover={{boxShadow:'0px 3px 3px 1px black'}} >Editar Perfil</Button>
              <Button w='11rem' bgColor='blue.400' color='white' textShadow='1px 1px 1px black' border='2px' borderColor='black' _hover={{boxShadow:'0px 3px 3px 1px black'}} >Cambiar Contraseña</Button>
              <Button m='.5rem' mb='1.5rem' w='11rem' bgColor='blue.400' color='white' textShadow='1px 1px 1px black' border='2px' borderColor='black' _hover={{boxShadow:'0px 3px 3px 1px black'}} onClick={handleLogout}>Cerrar Sesion</Button>
            </GridItem>
          </Grid>

        </Flex>
    </Flex>
    }
    </>
  )
}

export default UserView