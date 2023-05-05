import React, { useState, useContext } from 'react';
import {
  Box,
  Flex,
  Link,
  Text,
  Spacer,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import Cookies from 'js-cookie';
import { GlobalContext } from '../context/GlobalContext';

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { appSessionToken, setAppSessionToken } = useContext(GlobalContext);

  const handleLogout = () => {
    // Handle logout logic here
    Cookies.remove('app_session_token');
    setAppSessionToken(null);
    navigate('/');
  };

  return (
    <Flex align="center" bg="blue.500" color="white" h="74px" px="32px">
      <Link as={RouterLink} to="/" display="flex" align="center">
        <Box boxSize="40px" bg="white" rounded="full" mr="2">
          <Text fontSize="2xl" fontWeight="bold" color="blue.500" textAlign="center" lineHeight="40px">P</Text>
        </Box>
        <Text fontSize="2xl" fontWeight="bold" letterSpacing="tight">Pixelgram</Text>
      </Link>
      <Spacer />
      {appSessionToken ? (
        <>
          <Link as={RouterLink} to="/profile" mr="4">
            Profile
          </Link>
          <Link as={RouterLink} to="/posts" mr="4">
            Posts
          </Link>
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<FaUserCircle />}
              variant="ghost"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              Account
            </MenuButton>
            <MenuList>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </>
      ) : (
        <>
          <Link as={RouterLink} to="/" mr="4">
            Login
          </Link>
          <Link as={RouterLink} to="/signup" mr="4">
            Sign Up
          </Link>
        </>
      )}
    </Flex>
  );
};

export default Navbar;
