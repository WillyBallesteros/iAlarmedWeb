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
} from "@chakra-ui/react";
import { ViewOffIcon, ViewIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const history = useNavigate();
  const handleClickPassword = () => setShowPassword(!showPassword);
  const handleClickConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

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
            REGISTRO
          </Heading>
          <Divider borderColor="#ffffff" />
          <Box as="form" pt={100} w={330}>
            <Input
              placeholder="Nombre y Apellido"
              variant="outline"
              type="text"
              onChange={(e) => setName(e.target.value)}
              style={{
                borderColor: name ? "#278C7A" : "#79747E",
                color: name ? "#000000" : "#979797",
              }}
              autoComplete="name"
            />
            <Input
              mt={35}
              placeholder="Correo"
              variant="outline"
              onChange={(e) => setEmail(e.target.value)}
              style={{
                borderColor: email ? "#278C7A" : "#79747E",
                color: email ? "#000000" : "#979797",
              }}
              type="email"
              autoComplete="email"
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

            <InputGroup size="md">
              <Input
                mt={35}
                placeholder="Confirmar Contraseña"
                variant="outline"
                type={showConfirmPassword ? "text" : "password"}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{
                  borderColor: confirmPassword ? "#278C7A" : "#79747E",
                  color: confirmPassword ? "#000000" : "#979797",
                }}
                autoComplete="none"
              />
              <InputRightElement padding={7}>
                <IconButton
                  mt={16}
                  aria-label="Mostrar contraseña"
                  h="1.75rem"
                  size="sm"
                  onClick={handleClickConfirmPassword}
                  variant="ghost"
                  icon={
                    showConfirmPassword ? (
                      <ViewOffIcon w={8} h={8} />
                    ) : (
                      <ViewIcon w={8} h={8} />
                    )
                  }
                />
              </InputRightElement>
            </InputGroup>
          </Box>
        </VStack>
        <Box pt={93}>
          <Button
            w={190}
            h={54}
            mt={4}
            variant={
              name && email && password && confirmPassword
                ? "enabled"
                : "disabled"
            }
            onClick={() => {
              if (name && email && password && confirmPassword) {
                // Ejecuta la acción del botón
                history("/login");
              }
            }}
          >
            Registrarse
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default RegisterForm;
