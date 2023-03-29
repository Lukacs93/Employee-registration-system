import React from "react";
 
import { Route, Routes } from "react-router-dom";
 
import Navbar from "./components/navbar";
import RecordList from "./components/recordList";
import Edit from "./components/edit";
import Create from "./components/create";
import CreateEquipment from "./components/createEquipment";
import EquipmentList from "./components/equipmentList";
import EditEquipment from "./components/editEquipment";
 
const App = () => {
  return (
    <div>
    <Navbar />
    <Routes>
      <Route exact path="/" element={<RecordList />} />
      <Route path="/edit/:id" element={<Edit />} />
      <Route path="/create" element={<Create />} />
      <Route path="/create-equipment" element={<CreateEquipment />}/>
      <Route path="/equipments" element={<EquipmentList />} />
      <Route path="/edit-equipment/:id" element={<EditEquipment />}/>
    </Routes>
  </div>
  );
};
 
export default App;