import { Route, Routes } from "react-router-dom";
import RegisterForm from "./components/RegisterForm/RegisterForm";
import LoginUser from "./components/LoginUser/LoginUser";
import MedicationList from "./components/MedicationList/MedicationList";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<RegisterForm />} />
        <Route path="/login" element={<LoginUser />} />
        <Route path="/list" element={<MedicationList />} />

        <Route path="/lo" element={<h1>Contact</h1>} />
        {/* Añade más rutas según sea necesario */}
      </Routes>
    </>
  );
}

export default App;
