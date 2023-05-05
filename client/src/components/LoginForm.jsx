import React, { useContext, useEffect, useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex,
  Text,
  FormErrorMessage,
  useToast,
  Spinner,
} from '@chakra-ui/react';
import { NavLink, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import handleRequest from '../API.js';
import { GlobalContext } from '../context/GlobalContext.jsx';

const LoginForm = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { setAppSessionToken } = useContext(GlobalContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isErrorEmail, setIsErrorEmail] = useState(false);
  const [isErrorPassword, setIsErrorPasswrod] = useState(false);
  const [isRequestInProcess, setIsRequstInProcess] = useState(false);

  const handleLogin = (event) => {
    setIsRequstInProcess(true);

    event.preventDefault();
    if (email === '') {
      setIsErrorEmail(true);
    }

    if (password === '') {
      setIsErrorPasswrod(true);
    }

    handleRequest(
      'auth/login',
      'POST',
      {
        'Content-Type': 'application/json',
      },
      JSON.stringify({
        email,
        password,
      }),
    ).then((data) => {
      Cookies.set('app_session_token', data.data.token);
      setAppSessionToken(data.data.token);
      toast({
        title: 'Login Success',
        status: 'success',
        isClosable: true,
      });

      setIsRequstInProcess(true);
      navigate('/posts');
    })
      .catch((error) => {
        setIsRequstInProcess(false);
        toast({
          title: error.message,
          status: 'error',
          isClosable: true,
        });
      });
  };

  return (
    <Flex direction="column" align="center" widht="40%" margin="auto" marginTop={40}>
      <form style={{ width: '40%' }} onSubmit={handleLogin}>
        <FormControl id="email" isRequired isInvalid={isErrorEmail}>
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            _placeholder={{ color: 'gray.400' }}
          />
          <FormErrorMessage>
            Email is required
          </FormErrorMessage>
        </FormControl>
        <FormControl id="password" isRequired isInvalid={isErrorPassword} mt={4}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            _placeholder={{ color: 'gray.400' }}
          />
          <FormErrorMessage>
            Password is required
          </FormErrorMessage>
        </FormControl>
        <Button mt={4} colorScheme="blue" type="submit">

          {
            isRequestInProcess ? (
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="sm"
              />
            ) : 'Login'

          }
        </Button>
      </form>
      <Flex mt={4}>
        <Text>
          Don&apos;t have an account?
          {' '}
        </Text>
        <NavLink to="/signup">
          Signup
        </NavLink>
      </Flex>
    </Flex>
  );
};

export default LoginForm;
