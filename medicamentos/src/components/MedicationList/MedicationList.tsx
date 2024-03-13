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
import { data as initialData } from "../../utils/fakeData";
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

interface Medication {
  Nombre: string;
  Laboratorio: string;
  Dosis: string;
  Registro_Sanitario: string;
  Via_Administracion: string;
}
const MedicationList = () => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(7);
  const [isOpen, setIsOpen] = useState(false);
  const [medications, setMedications] = useState(initialData);
  const [nombre, setNombre] = useState("");
  const [laboratorio, setLaboratorio] = useState("");
  const [dosis, setDosis] = useState("");
  const [registroSanitario, setRegistroSanitario] = useState("");
  const [selectedMedication, setSelectedMedication] =
    useState<Medication | null>(null);
  const [viaAdministracion, setViaAdministracion] = useState("");

  const openModal = (medication: Medication) => {
    setSelectedMedication(medication);
    setNombre(medication.Nombre);
    setLaboratorio(medication.Laboratorio);
    setDosis(medication.Dosis);
    setRegistroSanitario(medication.Registro_Sanitario);
    setViaAdministracion(medication.Via_Administracion);
    setIsOpen(true);
  };

  const saveChanges = () => {
    if (selectedMedication) {
      const updatedMedications = medications.map((medication) =>
        medication.Nombre === selectedMedication.Nombre
          ? {
              ...medication,
              Nombre: nombre,
              Laboratorio: laboratorio,
              Dosis: dosis,
              Registro_Sanitario: registroSanitario,
              Via_Administracion: viaAdministracion,
            }
          : medication
      );
      setMedications(updatedMedications);
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
          <Avatar name="Marina" src="url-to-user-image" />
          <Text fontSize={36} ml={2}>
            Marina
          </Text>
        </Flex>
      </Flex>

      <Flex mb={6} justifyContent={"space-between"}>
        <Text paddingLeft={8} fontWeight="bold">
          MEDICAMENTOS
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
                <Th>Nombre</Th>
                <Th>Laboratorio</Th>
                <Th>Dosis</Th>
                <Th>Registro Sanitario</Th>
                <Th>Vía de Administración</Th>
              </Tr>
            </Thead>
            <Tbody>
              {medications
                .slice(page * itemsPerPage, (page + 1) * itemsPerPage)
                .map((item, index) => (
                  <Tr
                    fontSize={16}
                    key={item.ID}
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
                    <Td textAlign="center">{item.Nombre}</Td>
                    <Td textAlign="center">{item.Laboratorio}</Td>
                    <Td textAlign="center">{item.Dosis}</Td>
                    <Td textAlign="center">{item.Registro_Sanitario}</Td>
                    <Td textAlign="center">{item.Via_Administracion}</Td>
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
              medications.length
            )} de ${medications.length}`}
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
            Editar Medicamento
          </ModalHeader>
          <Flex direction="column" align="center" justify="center" h="full">
            <ModalBody minW={330}>
              <FormControl pt={62}>
                <FormLabel fontSize={14} fontWeight={"regular"}>
                  Nombre
                </FormLabel>
                <Input
                  variant={"outline"}
                  style={{
                    borderColor: "#278C7A",
                    color: "#000000",
                  }}
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Laboratorio</FormLabel>
                <Input
                  variant={"outline"}
                  style={{
                    borderColor: "#278C7A",
                    color: "#000000",
                  }}
                  value={laboratorio}
                  onChange={(e) => setLaboratorio(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Dosis</FormLabel>
                <Input
                  variant={"outline"}
                  style={{
                    borderColor: "#278C7A",
                    color: "#000000",
                  }}
                  value={dosis}
                  onChange={(e) => setDosis(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Registro Sanitario</FormLabel>
                <Input
                  variant={"outline"}
                  style={{
                    borderColor: "#278C7A",
                    color: "#000000",
                  }}
                  value={registroSanitario}
                  onChange={(e) => setRegistroSanitario(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Via Administración</FormLabel>
                <Input
                  variant={"outline"}
                  style={{
                    borderColor: "#278C7A",
                    color: "#000000",
                  }}
                  value={viaAdministracion}
                  onChange={(e) => setViaAdministracion(e.target.value)}
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

export default MedicationList;
