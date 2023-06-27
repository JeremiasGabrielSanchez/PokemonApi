import {useState} from 'react';
import { Flex, Box, IconButton, useBreakpointValue, Image, Text, AspectRatio, Grid, GridItem } from '@chakra-ui/react';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
import Slider from 'react-slick';

// Settings for the slider
const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 10000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

function CarrucelHome() {

  const [slider, setSlider] = useState(null);

  const top = useBreakpointValue({ base: '90%', md: '50%' });
  const side = useBreakpointValue({ base: '30%', md: '10px' });

  const cards = [
    'https://www.ansaldo.cl/wp-content/uploads/2022/05/banner-pokemon-web-25-1.jpg?x65945',
    'https://pbs.twimg.com/media/FFUb54jXwAMZczq?format=jpg&name=large',
    'https://www.ytgraphics.com/wp-content/uploads/2014/12/pokmeon.jpg',
  ];

  return (
    <Flex 
    flexDir='column'
    justifyContent='center'
    alignItems='center'
    bgGradient='linear(to-tl, red.300, blackAlpha.400, yellow.400)'
    >
      <Box
        position={'relative'}
        height={'400px'}
        width={'70%'}
        overflow={'hidden'}
        border='2px'
        borderStyle='groove' 
        boxShadow='1px 1px 5px black'
        mt='1rem'
      >

        {/* CSS files for react-slick */}
        <link
          rel="stylesheet"
          type="text/css"
          charSet="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />

        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />

        {/* Left Icon */}
        <IconButton
          aria-label="left-arrow"
          colorScheme="messenger"
          borderRadius="full"
          position="absolute"
          left={side}
          top={top}
          transform={'translate(0%, -50%)'}
          zIndex={2}
          onClick={() => slider?.slickPrev()}>
          <BiLeftArrowAlt />
        </IconButton>

        {/* Right Icon */}
        <IconButton
          aria-label="right-arrow"
          colorScheme="messenger"
          borderRadius="full"
          position="absolute"
          right={side}
          top={top}
          transform={'translate(0%, -50%)'}
          zIndex={2}
          onClick={() => slider?.slickNext()}>
          <BiRightArrowAlt />
        </IconButton>

        {/* Slider */}
        <Slider {...settings} ref={(slider) => setSlider(slider)}>
          {cards.map((url, index) => (
            <Flex
              key={index}
              height={'6xl'}
              position="relative"
            >
              <Image src={url}/>
            </Flex>
          ))}
        </Slider>
      </Box>
      <Grid
      templateColumns='repeat(2, 1fr)'
      m='1rem 4rem'
      p='1rem'
      fontFamily='sans-serif'
      as='b'
      border='2px'
      borderStyle='groove' 
      boxShadow='1px 1px 5px black'
      bg='whiteAlpha.400'
      >
        <GridItem mr='1rem'>
          <Text>
            -Pokémon es una franquicia de medios que originalmente comenzó como un videojuego RPG, pero debido a su popularidad ha logrado expandirse a otros medios de entretenimiento como 
            series de televisión, películas, juegos de cartas, ropa, entre otros, convirtiéndose en una marca que es reconocida en el mercado mundial. Las ventas de videojuegos hasta el 1 
            de diciembre de 2006 habían alcanzado una cantidad de 340 millones de ejemplares (incluyendo la venta de la versión Pikachu de la consola Nintendo 64) logrando ocupar el segundo
            lugar de las sagas de videojuegos más vendidos de Nintendo.
          </Text>
          <Text>
            -La producción de los videojuegos, serie de anime y demás material para su distribución en occidente fue realizada en Estados Unidos por 4Kids Entertainment hasta noviembre 
            de 2005, momento en que decidió no renovar su contrato con Pokémon USA (una subsidiaria de Pokémon Company). Actualmente esta supervisa todo lo referente al material de 
            Pokémon en su distribución en occidente.
          </Text>
        </GridItem>

        <GridItem pl='1rem' fontSize='1.5rem' borderLeft='2px' borderColor='white'>
          <Text as='u'>
            Primer Opening de la serie animada
          </Text>

          <AspectRatio 
          mt='.5rem'
          ratio={2}
          height='300px'
          border='2px'
          borderStyle='groove' 
          boxShadow='1px 1px 4px black'
          >
            <iframe 
            src="https://www.youtube.com/embed/uDIoEbbFKAY" 
            title="YouTube video player"
            />
          </AspectRatio>
        </GridItem>
      </Grid>

    </Flex>
  );
}

export default CarrucelHome