import {
  TableContainer,
  Table,
  Tr,
  Thead,
  Th as ChakraTh,
  Tbody,
  Td,
  Box,
  Text,
  Flex,
  Avatar,
  Heading,
  Tooltip,
  Button,
  Stack,
  Select,
  BoxProps,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  useTheme,
} from "@chakra-ui/react";
import { DownloadIcon, AddIcon, EditIcon } from "@chakra-ui/icons";
import { data as initialData } from "../../utils/fakeDataUsers";
import { useState } from "react";
const Th: React.FC<BoxProps> = (props) => (
  <ChakraTh
    color="#ffffff"
    fontSize={24}
    fontWeight="400"
    textTransform={"capitalize"}
    textAlign="center"
    {...props}
  />
);

interface User {
  id: number;
  Usuario: string;
  Estado: string;
  Ubicación: string;
  Teléfono: string;
  Tipo_Usuario: string;
}
const UserList = () => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(7);
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState<User[]>(initialData);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [usuario, setUsuario] = useState("");
  const [estado, setEstado] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState("");
  const openModal = (user: User) => {
    setSelectedUser(user);
    setUsuario(user.Usuario);
    setEstado(user.Estado);
    setUbicacion(user.Ubicación);
    setTelefono(user.Teléfono);
    setTipoUsuario(user.Tipo_Usuario);
    setIsOpen(true);
  };

  const saveChanges = () => {
    if (selectedUser) {
      const updatedUsers = users.map((user) =>
        user.id === selectedUser.id
          ? {
              ...user,
              Usuario: usuario,
              Estado: estado,
              Ubicación: ubicacion,
              Teléfono: telefono,
              Tipo_Usuario: tipoUsuario,
            }
          : user
      );
      setUsers(updatedUsers);
    }
    setIsOpen(false);
  };

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(Number(event.target.value));
    setPage(0);
  };

  return (
    <Box p={10}>
      <Flex alignItems="center" justifyContent={"space-between"} mb={4}>
        <Heading fontSize={48} mb={4}>
          IALARMED
        </Heading>
        <Flex alignItems="center">
          <Avatar name="Alejandra" src="url-to-user-image" />
          <Text fontSize={36} ml={2}>
            Alejandra
          </Text>
        </Flex>
      </Flex>

      <Flex mb={6} justifyContent={"space-between"}>
        <Text paddingLeft={8} fontWeight="bold">
          USUARIOS
        </Text>
        <Box>
          <Button
            leftIcon={<DownloadIcon />}
            variant="outline"
            color="white"
            mr={2}
            w={"147px"}
            _hover={{ bg: "none" }}
          >
            Descargar
          </Button>
          <Button
            w={"147px"}
            leftIcon={<AddIcon />}
            color="white"
            variant="outline"
            _hover={{ bg: "none" }}
          >
            Agregar
          </Button>
        </Box>
      </Flex>
      <Box>
        <TableContainer p={4}>
          <Table variant="striped">
            <Thead>
              <Tr>
                <Th>Usuario</Th>
                <Th>Estado</Th>
                <Th>Ubicación</Th>
                <Th>Teléfono</Th>
                <Th>Tipo Usuario</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users
                .slice(page * itemsPerPage, (page + 1) * itemsPerPage)
                .map((item, index) => (
                  <Tr
                    fontSize={16}
                    key={item.id}
                    bg={
                      index % 2 === 0
                        ? theme.colors.white
                        : theme.colors.background
                    }
                    color={
                      index % 2 === 0
                        ? theme.colors.background
                        : theme.colors.white
                    }
                  >
                    <Td textAlign="center">
                      <Box
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                        justifyContent="center"
                        width="100%"
                      >
                        <Avatar
                          name={item.Usuario}
                          src="url-to-user-image"
                          mr={2}
                        />
                        <Box width="150px" textAlign="left">
                          {item.Usuario}
                        </Box>
                      </Box>
                    </Td>
                    <Td textAlign="center">{item.Estado}</Td>
                    <Td textAlign="center">{item.Ubicación}</Td>
                    <Td textAlign="center">{item.Teléfono}</Td>
                    <Td textAlign="center">{item.Tipo_Usuario}</Td>
                    <Td textAlign="center">
                      <Tooltip
                        label="Editar"
                        aria-label="Un tooltip para editar"
                      >
                        <IconButton
                          onClick={() => openModal(item)}
                          w={20}
                          icon={<EditIcon />}
                          variant="unstyled"
                          colorScheme={
                            index % 2 === 0
                              ? theme.colors.background
                              : theme.colors.white
                          }
                          aria-label="Editar"
                        />
                      </Tooltip>
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
        <Stack
          fontWeight={"light"}
          spacing={2}
          direction="row"
          align="center"
          mt={4}
          justifyContent="space-between"
        >
          <Flex alignItems={"center"}>
            <Text fontSize={14}>Filas por página</Text>
            <Select
              ml={3}
              fontSize={14}
              w={"65px"}
              borderRadius={5}
              onChange={handleItemsPerPageChange}
              value={itemsPerPage}
            >
              <option value={7}>7</option>
              <option value={14}>14</option>
            </Select>
          </Flex>
          <Text fontSize={14}>
            {`${page * itemsPerPage + 1}-${Math.min(
              (page + 1) * itemsPerPage,
              users.length
            )} de ${users.length}`}
          </Text>
        </Stack>
      </Box>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay sx={{ backdropFilter: "blur(5px)" }} />
        <ModalContent
          borderRadius={20}
          border="1px solid #ffffff"
          bg={"primary"}
          maxW="560px"
          maxH="760px"
        >
          <ModalHeader fontSize={32} fontWeight={"bold"}>
            Editar Usuario
          </ModalHeader>
          <Flex direction="column" align="center" justify="center" h="full">
            <ModalBody minW={330}>
              <FormControl pt={62}>
                <FormLabel fontSize={14} fontWeight={"regular"}>
                  Usuario
                </FormLabel>
                <Input
                  variant={"outline"}
                  style={{
                    borderColor: "#278C7A",
                    color: "#000000",
                  }}
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Estado</FormLabel>
                <Input
                  variant={"outline"}
                  style={{
                    borderColor: "#278C7A",
                    color: "#000000",
                  }}
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Ubicación</FormLabel>
                <Input
                  variant={"outline"}
                  style={{
                    borderColor: "#278C7A",
                    color: "#000000",
                  }}
                  value={ubicacion}
                  onChange={(e) => setUbicacion(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Teléfono </FormLabel>
                <Input
                  variant={"outline"}
                  style={{
                    borderColor: "#278C7A",
                    color: "#000000",
                  }}
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Tipo Usuario</FormLabel>
                <Input
                  variant={"outline"}
                  style={{
                    borderColor: "#278C7A",
                    color: "#000000",
                  }}
                  value={tipoUsuario}
                  onChange={(e) => setTipoUsuario(e.target.value)}
                />
              </FormControl>
            </ModalBody>
          </Flex>
          <ModalFooter pt={76} pb={36}>
            <Flex>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={() => setIsOpen(false)}
                h={54}
                variant={"disabled"}
                borderRadius={10}
              >
                CANCELAR
              </Button>
              <Button
                borderRadius={10}
                h={54}
                variant={"enabled"}
                onClick={saveChanges}
                mr={"117px"}
              >
                ACEPTAR
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default UserList;
