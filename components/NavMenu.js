import {
    Box,
    Flex,
    Text,
    IconButton,
    Stack,
    Collapse,
    Icon,
    Popover,
    PopoverTrigger,
    PopoverContent,
    useColorModeValue,
    useDisclosure,
    Image
  } from '@chakra-ui/react';
  import {
    HamburgerIcon,
    CloseIcon,
    ChevronDownIcon,
    ChevronRightIcon,
  } from '@chakra-ui/icons';
  import useSWR from 'swr';
import Carrito from './Carrito';
import Link from 'next/link';
import { useEffect, useState } from 'react';

  
  export default function NavMenu({productosCarrito,eliminarDeCarrito}) {
    const [navItemsCategoria, setnavItemsCategoria] = useState([])
    const [marcaNav, setMarcaNav] = useState([])

    const fetcher = async (url) => {
      try {
        const response = await fetch(url, {
          headers: {
            accept: 'text/plain',
            'x-app-token': 'prueba123',
          },
        });
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error al obtener los datos:', error);
        throw new Error('Error al obtener los datos');
      }
    };

    const { data: categorias, error: errorCategorias } = useSWR(
      'https://hor5.bsite.net/api/categorias/all',
      fetcher
    );
    
    
    if (errorCategorias) {
      return <div>Error al cargar las categorías</div>;
    }
  
    const { data: marcas, error: errorMarcas } = useSWR(
      'https://hor5.bsite.net/api/marcas/all',
      fetcher
    );
  
    if (errorMarcas) {
      return <div>Error al cargar las marcas</div>;
    }

    const { isOpen, onToggle } = useDisclosure();

  

    useEffect(()=>{
      if(marcas){
        let tempArray= []
        marcas.forEach(marca=>{
          let tempItem = {
            label: marca.nombre,
            href: `/${marca.nombre}`
          }
          tempArray.push(tempItem)
        })
        setMarcaNav([{
          label :'Marcas',
          children: tempArray
        }])
         
      }
      
      if(categorias)
      {
        let aTempCategorias = []
        categorias.forEach(categoria => {
          let tempItem = {
          label : categoria.nombre,
          href : `/c/${categoria.nombre}`
          }         
         aTempCategorias.push(tempItem)
        });
        setnavItemsCategoria(aTempCategorias)
      }

    },[categorias, marcas])



  
    return (
      <Box>
        <Flex
          bg={useColorModeValue('blackAlpha', 'blackAlpha')}
          color={useColorModeValue('whiteAlpha', 'white')}
          minH={'60px'}
          py={{ base: 2 }}
          px={{ base: 4 }}
          borderBottom={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.900')}
          align={'center'}>
          <Flex
            flex={{ base: 1, md: 'auto' }}
            ml={{ base: -2 }}
            display={{ base: 'flex', md: 'none' }}>
            <IconButton
              onClick={onToggle}
              icon={
                isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
              }
              variant={'ghost'}
              aria-label={'Toggle Navigation'}
            />
          </Flex>
          <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
            <Link href="/">

                <Image src='https://i.ibb.co/wLYHGs2/Tiempo-logo.png' height={5} width={20}/>
              
            </Link>
  
            <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
              <DesktopNav  navItemsCategoria={navItemsCategoria} marcaNav={marcaNav} />
            </Flex>
          </Flex>
  


            <Carrito productosCarrito={productosCarrito} eliminarDeCarrito={eliminarDeCarrito}/>


        </Flex>
  
        <Collapse in={isOpen} animateOpacity>
          <MobileNav navItemsCategoria={navItemsCategoria} marcaNav={marcaNav} />
        </Collapse>
      </Box>
    );
  }
  
  const DesktopNav = ({navItemsCategoria,marcaNav}) => {
    const linkColor = useColorModeValue('gray.600', 'gray.200');
    const linkHoverColor = useColorModeValue('gray.800', 'white');
    const popoverContentBgColor = useColorModeValue('white', 'gray.800');
  
    return (
      <Stack direction={'row'} spacing={4}>
        
        {navItemsCategoria.map((navItem) => (
          <Box key={navItem.label}>
            <Popover trigger={'hover'} placement={'bottom-start'}>
              <PopoverTrigger>
                <Link
                  p={2}
                  href={navItem.href ?? '#'}
                  fontSize={'sm'}
                  fontWeight={500}
                  color={linkColor}
                  _hover={{
                    textDecoration: 'none',
                    color: linkHoverColor,
                  }}>
                  {navItem.label}
                </Link>
              </PopoverTrigger>
  
            </Popover>
          </Box>
        ))}

        {marcaNav.map((navItem) => (
          <Box key={navItem.label}>
            <Popover trigger={'hover'} placement={'bottom-start'}>
              <PopoverTrigger>
                <Link
                  p={2}
                  href={navItem.href ?? '#'}
                  fontSize={'sm'}
                  fontWeight={500}
                  color={linkColor}
                  _hover={{
                    textDecoration: 'none',
                    color: linkHoverColor,
                  }}>
                  {navItem.label}
                </Link>
              </PopoverTrigger>
  
              {navItem.children && (
                <PopoverContent
                  border={0}
                  boxShadow={'xl'}
                  bg={popoverContentBgColor}
                  p={4}
                  rounded={'xl'}
                  minW={'sm'}>
                  <Stack>
                    {navItem.children.map((child) => (
                      <DesktopSubNav key={child.label} {...child} />
                    ))}
                  </Stack>
                </PopoverContent>
              )}
            </Popover>
          </Box>
        ))}
      </Stack>
    );
  };
  
  const DesktopSubNav = ({ label, href, subLabel }) => {
    return (
      <Link
        href={href}
        role={'group'}
        display={'block'}
        p={2}
        rounded={'md'}
        _hover={{ bg: useColorModeValue('blue.50', 'gray.900') }}>
        <Stack direction={'row'} align={'center'}>
          <Box>
            <Text
              transition={'all .3s ease'}
              _groupHover={{ color: 'blue.400' }}
              fontWeight={500}>
              {label}
            </Text>
            <Text fontSize={'sm'}>{subLabel}</Text>
          </Box>
          <Flex
            transition={'all .3s ease'}
            transform={'translateX(-10px)'}
            opacity={0}
            _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
            justify={'flex-end'}
            align={'center'}
            flex={1}>
            <Icon color={'blue.400'} w={5} h={5} as={ChevronRightIcon} />
          </Flex>
        </Stack>
      </Link>
    );
  };
  
  const MobileNav = ({navItemsCategoria,marcaNav}) => {
    return (
      <Stack
        bg={useColorModeValue('white', 'gray.800')}
        p={4}
        display={{ md: 'none' }}>
        {navItemsCategoria.map((navItem) => (
          <MobileNavItem key={navItem.label} {...navItem} />
        ))}
        {marcaNav.map((navItem) => (
          <MobileNavItem key={navItem.label} {...navItem} />
        ))}
      </Stack>
    );
  };
  
  const MobileNavItem = ({ label, children, href }) => {
    const { isOpen, onToggle } = useDisclosure();
  
    return (
      <Stack spacing={4} onClick={children && onToggle}>
        <Flex
          py={2}
          as={Link}
          href={href ?? '#'}
          justify={'space-between'}
          align={'center'}
          _hover={{
            textDecoration: 'none',
          }}>
          <Text
            fontWeight={600}
            color={useColorModeValue('gray.600', 'gray.200')}>
            {label}
          </Text>
          {children && (
            <Icon
              as={ChevronDownIcon}
              transition={'all .25s ease-in-out'}
              transform={isOpen ? 'rotate(180deg)' : ''}
              w={6}
              h={6}
            />
          )}
        </Flex>
  
        <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
          <Stack
            mt={2}
            pl={4}
            borderLeft={1}
            borderStyle={'solid'}
            borderColor={useColorModeValue('gray.200', 'gray.700')}
            align={'start'}>
            {children &&
              children.map((child) => (
                <Link key={child.label} py={2} href={child.href}>
                  {child.label}
                </Link>
              ))}
          </Stack>
        </Collapse>
      </Stack>
    );
  };
  