import { Route, Routes } from "react-router-dom";
import RegisterForm from "./components/RegisterForm/RegisterForm";
import LoginUser from "./components/LoginUser/LoginUser";
import UserList from "./components/UserList/UserList";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<RegisterForm />} />
        <Route path="/login" element={<LoginUser />} />
        {/* <Route path="/list" element={<MedicationList />} /> */}
        <Route path="/list" element={<UserList />} />

        <Route path="/lo" element={<h1>Contact</h1>} />
      </Routes>
    </>
  );
}

export default App;
