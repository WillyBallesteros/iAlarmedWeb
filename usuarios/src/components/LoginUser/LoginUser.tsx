import {
  Box,
  VStack,
  Heading,
  Divider,
  Input,
  Button,
  InputRightElement,
  InputGroup,
  IconButton,
  Text,
  HStack,
  Link,
  Flex,
} from "@chakra-ui/react";
import { ViewOffIcon, ViewIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const LoginUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleClickPassword = () => setShowPassword(!showPassword);
  const history = useNavigate();

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      textAlign="center"
    >
      <Box
        w="560px"
        minH="750px"
        bg="primary"
        borderRadius="40px"
        border="1px solid #ffffff"
        p={4}
      >
        <VStack spacing={4}>
          <Heading size="lg" fontWeight="bold" pt={15} pb={15}>
            INGRESO
          </Heading>
          <Divider borderColor="#ffffff" />
          <Box as="form" pt={100} w={330}>
            <Input
              mt={35}
              placeholder="Correo"
              variant="outline"
              onChange={(e) => setEmail(e.target.value)}
              style={{
                borderColor: email ? "#278C7A" : "#79747E",
                color: email ? "#000000" : "#979797",
              }}
              autoComplete="email"
              type="email"
            />
            <InputGroup size="md">
              <Input
                mt={35}
                placeholder="Contraseña"
                variant="outline"
                type={showPassword ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  borderColor: password ? "#278C7A" : "#79747E",
                  color: password ? "#000000" : "#979797",
                }}
                autoComplete="new-password"
              />
              <InputRightElement padding={7}>
                <IconButton
                  mt={16}
                  aria-label="Mostrar contraseña"
                  size="sm"
                  variant="ghost"
                  onClick={handleClickPassword}
                  icon={
                    showPassword ? (
                      <ViewOffIcon w={8} h={8} />
                    ) : (
                      <ViewIcon w={8} h={8} />
                    )
                  }
                />
              </InputRightElement>
            </InputGroup>
            <Flex paddingTop={5}>
              <HStack
                fontSize={14}
                spacing="1"
                w="100%"
                justifyContent="flex-end"
              >
                <Link
                  textDecoration={"underline"}
                  as={RouterLink}
                  to="/"
                  color="#ffffff"
                >
                  ¿Olvidaste la contraseña?
                </Link>
              </HStack>
            </Flex>
          </Box>
        </VStack>
        <Box pt={93}>
          <Button
            w={190}
            h={54}
            mt={4}
            variant={email && password ? "enabled" : "disabled"}
            onClick={() => {
              if (email && password) {
                history("/list");
              }
            }}
          >
            Ingresar
          </Button>
          <Flex paddingTop={20}>
            <HStack fontSize={14} spacing="1" w="100%" justifyContent="center">
              <Text>¿ No tiene una cuenta ?</Text>
              <Link
                textDecoration={"underline"}
                as={RouterLink}
                to="/"
                color="#ffffff"
              >
                Registrese
              </Link>
            </HStack>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginUser;
