import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  Button
} from '@chakra-ui/react';
import {
    FiSmartphone,
    FiShoppingBag,
    FiTag,
    FiLayers,
    FiTruck,
  FiMenu,
  FiUsers
} from 'react-icons/fi';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

const LinkItems= [
  { name: 'Productos', icon: FiSmartphone,redireccion:"/admin/productos" },
  { name: 'SKU', icon: FiShoppingBag ,redireccion:"/admin/skus"},
  { name: 'Categorias', icon: FiLayers,redireccion:"/admin/categorias" },
  { name: 'Marcas', icon: FiTag,redireccion:"/admin/marcas" },
  { name: 'Pedidos', icon: FiTruck, redireccion:"/admin/pedidos" },
  { name: 'Clientes', icon: FiUsers, redireccion:"/admin/clientes" },
];

export default function Sidebar({ children }) {
  const {data: session}= useSession();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} session={session}/>
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}


const SidebarContent = ({ session,onClose, ...rest }) => {
  console.log(session)
  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontWeight="bold">
          ADMIN
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} redireccion={link.redireccion}>
          {link.name}
        </NavItem>
      ))}
      
      <Button mt={60} ml={5} onClick={()=>{signOut()}}>cerrar sesión</Button>
    </Box>
  );
};

const NavItem = ({redireccion, icon, children, ...rest }) => {
  return (
    <Link href={redireccion} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent="flex-start"
      {...rest}>
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text fontSize="2xl" ml="8" fontWeight="bold">
        Admin
      </Text>
    </Flex>
  );
};