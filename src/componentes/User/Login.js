import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/ContextAuth'; 
import { VStack, Input, FormLabel, Heading, Text, Flex } from '@chakra-ui/react';

export const Login = () => {
  
  const navegate = useNavigate();

  const [error, setError] = useState()

  const [user, setUser] = useState({
    email:'',
    password:'',
  });
  
  const {login} = useAuth()

  const handleChange = ({target: {name, value}}) => setUser({...user, [name]: value})

  const handleSubmit = async (e) => {

    e.preventDefault()
    setError('')

    try {
      await login(user.email, user.password)
      navegate('/')
    } catch (error) {
      if(error.code === 'auth/invalid-email'){
        setError('Correo Invalido')
      }else if(error.code === 'auth/weak-password'){
        setError('La contraseña debe tener 6 caracteres como minimo')
      }
    }
  }

  return (
    <Flex bgGradient='linear(to-tl, red.300, blackAlpha.400, yellow.400)'>
      <Flex 
      flexDir='column' 
      justifyContent='center' 
      alignItems='center' 
      m='3rem auto'
      p='2rem'
      bg='blackAlpha.500'
      w='40%'
      borderRadius='10px'
      borderColor=''
      border='2px'
      >
        
        <Heading> Usuario </Heading>

        {
        error && 
        <Text bgColor='#f130308a' borderBottom='2px' borderTop='2px' w='100%' p='.3rem 0 .3rem 0'
        as='b' color='#cf0101' textShadow='.5px .5px black' display='flex' justifyContent='center'> 
          {error}
        </Text>
        } 

        <form onSubmit={handleSubmit} className="datosUser" >
            
          <VStack w='20rem' alignItems='flex-start'>
            <FormLabel fontSize='1.2rem'>Email:</FormLabel>
            <Input name='email' type='email' onChange={handleChange}
            placeholder='pepe@hotmail.com' _placeholder={{ textAlign:'center'}} 
            border='2px' _focus={{boxShadow:'0px 0px 4px 1px white', borderColor:'yellow.400', bgColor:'blackAlpha.400'}}
            textAlign='center' bgColor='blackAlpha.600'/>
          </VStack>
            
          <VStack w='20rem' alignItems='flex-start'>
            <FormLabel mt='1rem' fontSize='1.2rem'>Password:</FormLabel>
            <Input name='password' type='password' onChange={handleChange}
            placeholder='Minimo 6 caracteres' _placeholder={{ textAlign:'center'}} 
            border='2px' _focus={{boxShadow:'0px 0px 4px 1px white', borderColor:'yellow.400', bgColor:'blackAlpha.400'}}
            textAlign='center' bgColor='blackAlpha.600'/>
          </VStack>
          
          <Input w='10rem' m='auto' type="submit" value='Iniciar' display='flex' alignItems='center' justifyContent='center' color='white' bgColor='blackAlpha.600' border='2px' mt='1rem' _hover={{boxShadow:'0px 0px 4px 1px white', borderColor:'yellow.400'}}/>
            
        </form>

        <VStack>
          <NavLink to='/singup'>
            <Text color='yellow.200' fontSize='1.1rem' _hover={{color:'yellow.400', fontSize:'1.2rem'}}> No tengo una cuenta</Text>     
          </NavLink>

          <NavLink to='/pokemon'> 
            <Text color='yellow.200' fontSize='1.1rem' _hover={{textShadow:'0px 0px 10px white', color:'yellow.400'}}>Ir a ver Pokemones</Text>
          </NavLink>
        </VStack>

      </Flex>
    </Flex>
  )
}