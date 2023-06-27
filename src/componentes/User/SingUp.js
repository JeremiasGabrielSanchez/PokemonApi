import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/ContextAuth'; 
import { doc, setDoc } from "firebase/firestore";
import { db } from '../tools/firebase';
import { HStack, VStack, Flex, Input, InputGroup, InputRightElement, FormLabel, Heading, Button, Text, Icon, Collapse, useDisclosure,Image, Grid, GridItem } from '@chakra-ui/react';
import { ViewOffIcon, ViewIcon } from '@chakra-ui/icons'

export const SingUp = () => {

  const [user, setUser] = useState({
    email: '',
    password:'',
  });

  const { isOpen, onToggle } = useDisclosure()
  const [fotoPerfil, setFotoPerfil] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState()

  const { signup } = useAuth()
  const navigate = useNavigate()

  const handleChange = ({target: {name, value}}) => setUser({...user, [name]: value})

  const registerUser = async(email, password, nombre, apellido, pais, telefono, postal, calle, fotoPerfil) =>{  //Con este metodo creo el registro del usuario
    const infoUser = await signup(email, password).then((userFirebase) => {
      return userFirebase
    })

    const docRef = doc(db,`usuarios/${infoUser.user.uid}`)    // Y aquí lo almaceno en firestore
    setDoc(docRef, {
      email: email, 
      name: nombre,
      lastName: apellido,
      country: pais,
      phone: telefono,
      codigoPostal: postal,
      street: calle,
      perfil: fotoPerfil
    })
    }

  const handleSubmit = async (e) =>{

    e.preventDefault()
    setError('')

    try {
      const email = user.email
      const password = user.password

      const nombre = e.target.nombre.value;
      const apellido= e.target.apellido.value;
      const pais = e.target.pais.value;
      const telefono = e.target.telefono.value;
      const postal = e.target.postal.value;
      const calle = e.target.calle.value;
    
      await registerUser(email, password, nombre, apellido, pais, telefono, postal, calle, fotoPerfil) 
      console.log(email, password, nombre, apellido, pais, telefono, postal, calle)

      navigate('/')
    } catch (error) {
      console.log(error)
      console.log(error.message)
      console.log(error.code)

      if(error.code === 'auth/invalid-email'){
        setError('Correo Invalido')
      }else if(error.code === 'auth/weak-password'){
        setError('La contraseña debe tener 6 caracteres como minimo')
      }else if(error.code==='auth/email-already-in-use'){
        setError('Correo en uso')
      }
    }
  }

  return (
    <Flex bgGradient='linear(to-tl, red.300, blackAlpha.400, yellow.400)'>
      <Flex 
      flexDirection='column' alignItems='center' justifyContent='center'
      border='2px' borderRadius='10px' bg='blackAlpha.500'
      w='50%' m='3rem auto' boxShadow='1px 1px 10px 2px white' 
      fontFamily='sans-serif'
      >

        <Heading p='1.5rem 0 1rem 0' color='white' textShadow='1px 1px black'> Crear Usuario </Heading>

        {error && <Text bgColor='#f130308a' borderBottom='2px' borderTop='2px' w='100%' p='.3rem 0 .3rem 0'
        as='b' color='#cf0101' textShadow='.5px .5px black' display='flex' justifyContent='center'>{error}</Text>} 

        <VStack color='white' textShadow='1px 1px black'>

          <form onSubmit={handleSubmit} className="datosUser" >

            <VStack w='100%' alignItems='flex-start'>
              <FormLabel fontSize='1.5rem'> Email: </FormLabel>

              <Input name='email' type='email' onChange={handleChange}
              placeholder='pepe@hotmail.com' _placeholder={{ textAlign:'center'}} 
              border='2px' _focus={{boxShadow:'0px 0px 4px 1px white', borderColor:'yellow.400', bgColor:'blackAlpha.400'}}
              textAlign='center' bgColor='blackAlpha.600'/>

            </VStack>
          

            <VStack w='100%' alignItems='flex-start' mb='.5rem'>
              <FormLabel mt='1rem' fontSize='1.5rem'> Password: </FormLabel>
              <InputGroup>

                <Input name='password' type={show ? 'text' : 'password'} onChange={handleChange}
                placeholder='Minimo 6 caracteres' _placeholder={{ textAlign:'center'}} 
                border='2px' _focus={{boxShadow:'0px 0px 4px 1px white', borderColor:'yellow.400', bgColor:'blackAlpha.400'}}
                textAlign='center' bgColor='blackAlpha.600'/>

                <InputRightElement w='4rem'>
                  <Button h='1.75rem' bgColor='blackAlpha.100' _hover={{bgColor:'blackAlpha.100'}} onClick={()=>setShow(!show)}>
                    {show ? <Icon as={ViewOffIcon}/> : <Icon as={ViewIcon}/>}
                  </Button>
                </InputRightElement>

              </InputGroup>
            </VStack>

{/* ------------------------------ Foto Perfil ------------------------------------------- */}

            <Flex flexDir='column' p='1rem'>
              <Button 
              onClick={onToggle}
              bg='blackAlpha.600'
              _hover={{bg:'blackAlpha.500'}}
              >
                Foto de Perfil
              </Button>

              <Collapse in={isOpen} animateOpacity>
                <Grid
                  color='white'
                  mt='1'
                  p='1rem'
                  bg='teal.500'
                  rounded='md'
                  shadow='md'
                  templateColumns='repeat(4, 1fr)'
                  templeRows='repeat(3, 1fr)'
                  gap={2}
                >
                  <GridItem>
                    <Image 
                    w='100px' 
                    src='https://i.pinimg.com/736x/3d/19/1e/3d191eb67077c5f622dbf37b63676627--pokemon-go-pikachu.jpg'
                    onClick={()=>{
                      setFotoPerfil('https://i.pinimg.com/736x/3d/19/1e/3d191eb67077c5f622dbf37b63676627--pokemon-go-pikachu.jpg') 
                      onToggle()}}
                    _hover={{w:'90px'}}
                    border='2px'
                    borderRadius='5px'
                    color='yellow.500'
                    />
                  </GridItem>

                  <GridItem>
                    <Image 
                    w='100px' 
                    src='https://i.pinimg.com/550x/af/b9/ab/afb9abe634d79fc11a43f909164006e8.jpg'
                    onClick={()=>{
                      setFotoPerfil('https://i.pinimg.com/550x/af/b9/ab/afb9abe634d79fc11a43f909164006e8.jpg')
                      onToggle()}}
                    _hover={{w:'90px'}}
                    border='2px'
                    borderRadius='5px'
                    color='blue.600'
                    />
                  </GridItem>

                  <GridItem>
                    <Image 
                    w='100px' 
                    src='https://i.pinimg.com/736x/99/18/21/991821ec7139de2d6aff1d72f6990e1c.jpg'
                    onClick={()=>{
                      setFotoPerfil('https://i.pinimg.com/736x/99/18/21/991821ec7139de2d6aff1d72f6990e1c.jpg')
                      onToggle()}}
                    _hover={{w:'90px'}}
                    border='2px'
                    borderRadius='5px'
                    color='green.600'
                    />
                  </GridItem>

                  <GridItem>
                    <Image 
                    w='100px' 
                    src='https://pokecenter.cl/wp-content/uploads/2021/09/0-9439_charmander-github-vicky002charmander-a-bot-for-slack-pokemon-1.png'
                    onClick={()=>{
                      setFotoPerfil('https://pokecenter.cl/wp-content/uploads/2021/09/0-9439_charmander-github-vicky002charmander-a-bot-for-slack-pokemon-1.png')
                      onToggle()}}
                    _hover={{w:'90px'}}
                    border='2px'
                    borderRadius='5px'
                    color='orange.500'
                    />
                  </GridItem>

                  <GridItem>
                    <Image 
                    w='100px' 
                    src='https://i.pinimg.com/originals/57/9e/a8/579ea8c25360372861223da98a2a4574.jpg'
                    onClick={()=>{
                      setFotoPerfil('https://i.pinimg.com/originals/57/9e/a8/579ea8c25360372861223da98a2a4574.jpg')
                      onToggle()}}
                    _hover={{w:'90px'}}
                    border='2px'
                    borderRadius='5px'
                    color='green.600'
                    />
                  </GridItem>

                  <GridItem>
                    <Image 
                    w='100px' 
                    src='https://i.pinimg.com/474x/29/b4/d6/29b4d6dd6d9c20fe94375bc7444b738b.jpg'
                    onClick={()=>{
                      setFotoPerfil('https://i.pinimg.com/474x/29/b4/d6/29b4d6dd6d9c20fe94375bc7444b738b.jpg')
                      onToggle()}}
                    _hover={{w:'90px'}}
                    border='2px'
                    borderRadius='5px'
                    color='blue.600'
                    />
                  </GridItem>

                  <GridItem>
                    <Image 
                    w='100px' 
                    src='https://pm1.aminoapps.com/7242/8ff41bc706abdfdb094f8b2422cfd2899ffe666fr1-557-551v2_uhq.jpg'
                    onClick={()=>{
                      setFotoPerfil('https://pm1.aminoapps.com/7242/8ff41bc706abdfdb094f8b2422cfd2899ffe666fr1-557-551v2_uhq.jpg')
                      onToggle()}}
                    _hover={{w:'90px'}}
                    border='2px'
                    borderRadius='5px'
                    color='blue.600'
                    />
                  </GridItem>

                  <GridItem>
                    <Image 
                    w='100px' 
                    src='https://www.pngitem.com/pimgs/m/206-2063897_pokemon-abra-render-hd-png-download.png'
                    onClick={()=>{
                      setFotoPerfil('https://www.pngitem.com/pimgs/m/206-2063897_pokemon-abra-render-hd-png-download.png')
                      onToggle()}}
                    _hover={{w:'90px'}}
                    border='2px'
                    borderRadius='5px'
                    color='yellow.500'
                    />
                  </GridItem>

                  <GridItem>
                    <Image 
                    w='100px' 
                    src='https://oyster.ignimgs.com/mediawiki/apis.ign.com/pokemon-switch/a/ac/Vulpix.jpg?width=640'
                    onClick={()=>{
                      setFotoPerfil('https://oyster.ignimgs.com/mediawiki/apis.ign.com/pokemon-switch/a/ac/Vulpix.jpg?width=640')
                      onToggle()}}
                    _hover={{w:'90px'}}
                    border='2px'
                    borderRadius='5px'
                    color='orange.500'
                    />
                  </GridItem>

                  <GridItem>
                    <Image 
                    w='100px' 
                    src='https://wallpapercave.com/wp/wp3906055.jpg'
                    onClick={()=>{
                      setFotoPerfil('https://wallpapercave.com/wp/wp3906055.jpg')
                      onToggle()}}
                    _hover={{w:'90px'}}
                    border='2px'
                    borderRadius='5px'
                    color='yellow.500'
                    />
                  </GridItem>

                  <GridItem>
                    <Image 
                    w='100px' 
                    src='https://www.dibujos-faciles.com/wp-content/uploads/2023/02/Dibujo-De-Pokemon-Ponyta-paso12.jpg'
                    onClick={()=>{
                      setFotoPerfil('https://www.dibujos-faciles.com/wp-content/uploads/2023/02/Dibujo-De-Pokemon-Ponyta-paso12.jpg')
                      onToggle()}}
                    _hover={{w:'90px'}}
                    border='2px'
                    borderRadius='5px'
                    color='orange.500'
                    />
                  </GridItem>

                  <GridItem>
                    <Image 
                    w='100px' 
                    src='https://cosplayfu-website.s3.amazonaws.com/_Upload/b/30cm-Electrode-Pokemon-Plush-Toy.jpg'
                    onClick={()=>{
                      setFotoPerfil('https://cosplayfu-website.s3.amazonaws.com/_Upload/b/30cm-Electrode-Pokemon-Plush-Toy.jpg')
                      onToggle()}}
                    _hover={{w:'90px'}}
                    border='2px'
                    borderRadius='5px'
                    color='red.500'
                    />
                  </GridItem>
                </Grid>
              </Collapse>
            </Flex>

            <HStack className='entrada' mt='.5rem'>
              <VStack alignItems='flex-start' >
                <FormLabel>Nombre:</FormLabel>
                <Input name='nombre' type='text' 
                placeholder='Pepe' _placeholder={{ textAlign:'center'}} 
                border='2px' _focus={{boxShadow:'0px 0px 4px 1px white', borderColor:'yellow.400', bgColor:'blackAlpha.400'}}
                textAlign='center' bgColor='blackAlpha.600'/>
              </VStack>
              <VStack alignItems='flex-start'>
                <FormLabel>Apellido:</FormLabel>
                <Input name='apellido' type='text' 
                placeholder='Sancho' _placeholder={{ textAlign:'center'}} 
                border='2px' _focus={{boxShadow:'0px 0px 4px 1px white', borderColor:'yellow.400', bgColor:'blackAlpha.400'}}
                textAlign='center' bgColor='blackAlpha.600'/>
              </VStack>
            </HStack>

            <HStack className='entrada'>
              <VStack alignItems='flex-start' >
                <FormLabel>País:</FormLabel>
                <Input name='pais' type='text' 
                placeholder='Argentina' _placeholder={{ textAlign:'center'}} 
                border='2px' _focus={{boxShadow:'0px 0px 4px 1px white', borderColor:'yellow.400', bgColor:'blackAlpha.400'}}
                textAlign='center' bgColor='blackAlpha.600'/>
              </VStack>
              <VStack alignItems='flex-start'>
                <FormLabel>Telefono:</FormLabel>
                <Input name='telefono' type='tel'  
                placeholder='+54 381 000 0000' _placeholder={{ textAlign:'center'}} 
                border='2px' _focus={{boxShadow:'0px 0px 4px 1px white', borderColor:'yellow.400', bgColor:'blackAlpha.400'}}
                textAlign='center' bgColor='blackAlpha.600'/>
              </VStack>
            </HStack>

            <HStack className='entrada'>
              <VStack alignItems='flex-start' >
                <FormLabel>Codigo postal:</FormLabel>
                <Input name='postal' type='text'  
                placeholder='****' _placeholder={{ textAlign:'center'}} 
                border='2px' _focus={{boxShadow:'0px 0px 4px 1px white', borderColor:'yellow.400', bgColor:'blackAlpha.400'}}
                textAlign='center' bgColor='blackAlpha.600'/>
              </VStack>
              <VStack alignItems='flex-start'>
                <FormLabel>Direccion del Hogar:</FormLabel>
                <Input name='calle' type='text'  placeholder='Plaza Sesamo 150' _placeholder={{ textAlign:'center'}} 
                border='2px' _focus={{boxShadow:'0px 0px 4px 1px white', borderColor:'yellow.400', bgColor:'blackAlpha.400'}}
                textAlign='center' bgColor='blackAlpha.600'/>
              </VStack>
            </HStack>   
            {
            (fotoPerfil === '')
            ? 
              <Text textAlign='center' bg='blackAlpha.600' p='.5rem' borderRadius='5px' mt='.5rem'> Debes Llenar todos los campos </Text> 
            :
              <Input w='50%' type="submit" value='Registrate' display='flex' alignItems='center' justifyContent='center' color='white' bgColor='blackAlpha.600' border='2px' m='1rem auto 0 auto' _hover={{boxShadow:'0px 0px 4px 1px white', borderColor:'yellow.400'}} mb='1rem'/>
            }
          </form>

          <NavLink to='/login'>
            <Text color='yellow.200' fontSize='1.1rem' textShadow='1px 1px black' mb='1rem' _hover={{color:'yellow.400', fontSize:'1.2rem'}}> Ya tengo una cuenta </Text>
          </NavLink>

        </VStack>
          
      </Flex>
    </Flex>
  )
};
