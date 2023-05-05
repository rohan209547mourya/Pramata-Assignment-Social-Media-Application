import React, { useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  IconButton,
  Stack,
  Link,
  useToast,
  Spinner,
  FormHelperText,
} from '@chakra-ui/react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import handleRequest from '../API';

const SignUpForm = () => {
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [signupFormData, setSignupFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [isRequestInProcess, setIsRequstInProcess] = useState(false);
  const navigate = useNavigate();

  const handlePasswordVisibility = () => setShowPassword(!showPassword);
  const handleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (signupFormData.password !== signupFormData.confirmPassword) {
      toast({
        title: 'Passwords do not match',
        status: 'error',
        isClosable: true,
      });

      return;
    }

    setIsRequstInProcess(true);

    handleRequest(
      'auth/register',
      'POST',
      {
        'Content-Type': 'application/json',
      },
      JSON.stringify({
        name: `${signupFormData.firstName} ${signupFormData.lastName}`,
        email: signupFormData.email,
        password: signupFormData.password,
      }),
    ).then((data) => {
      toast({
        title: 'Signup Success, please login',
        status: 'success',
        isClosable: true,
      });

      setIsRequstInProcess(true);
      navigate('/');
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
    <Box width="30%" margin="auto" mt="5%">
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <Stack direction="row" spacing={4}>
            <FormControl isRequired>
              <FormLabel>First Name</FormLabel>
              <Input
                type="text"
                placeholder="Enter your first name"
                name="firstName"
                value={signupFormData.firstName}
                onChange={(e) => setSignupFormData(
                  { ...signupFormData, firstName: e.target.value },
                )}
                _placeholder={{ color: 'gray.400' }}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Last Name</FormLabel>
              <Input
                type="text"
                placeholder="Enter your last name"
                _placeholder={{ color: 'gray.400' }}
                name="lastName"
                value={signupFormData.lastName}
                onChange={(e) => setSignupFormData(
                  { ...signupFormData, lastName: e.target.value },
                )}
              />
            </FormControl>
          </Stack>
          <FormControl isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              placeholder="Enter your email address"
              _placeholder={{ color: 'gray.400' }}
              name="email"
              value={signupFormData.email}
              onChange={(e) => setSignupFormData(
                { ...signupFormData, email: e.target.value },
              )}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                _placeholder={{ color: 'gray.400' }}
                name="password"
                value={signupFormData.password}
                onChange={(e) => setSignupFormData(
                  { ...signupFormData, password: e.target.value },
                )}
              />
              <InputRightElement>
                <IconButton
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  variant="unstyled"
                  icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                  onClick={handlePasswordVisibility}
                />
              </InputRightElement>
            </InputGroup>
            <FormHelperText>
              Password must be at least 8 characters long
            </FormHelperText>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup>
              <Input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm your password"
                _placeholder={{ color: 'gray.400' }}
                name="confirmPassword"
                value={signupFormData.confirmPassword}
                onChange={(e) => setSignupFormData(
                  { ...signupFormData, confirmPassword: e.target.value },
                )}
              />
              <InputRightElement>
                <IconButton
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                  variant="unstyled"
                  icon={showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  onClick={handleConfirmPasswordVisibility}
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Button type="submit" colorScheme="blue">
            {
              isRequestInProcess ? (
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="blue.500"
                  size="sm"
                />
              ) : 'Sign up'

            }

          </Button>
        </Stack>
      </form>
      <Box textAlign="center" mt={4}>
        <Link href="/">Already have an account? Log in</Link>
      </Box>
    </Box>
  );
};

export default SignUpForm;
