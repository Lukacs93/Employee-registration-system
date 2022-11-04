import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const Create = () => {
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        middleName: "",
        position: "",
        level: "",
        equipment: []
    });

    const navigate = useNavigate();

    const [equipments, setEquipments] = useState([])

    useEffect(() => {
      const getEquipments = async () => {
        const response = await fetch('http://localhost:5000/equipment/all');
        const equipments = await response.json();

        setEquipments(equipments)
       
      }
      getEquipments()
    },[equipments])

    const onSubmit = async (e) => {
      e.preventDefault();
      console.log(form)

      await fetch("http://localhost:5000/record/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
        })
        .catch(error => {
          window.alert(error);
          return;
        });

        navigate("/");
    }

    return (
        <div>
        <h3>Create New Record</h3>
        <form onSubmit={onSubmit}>
        <div className="form-group">
            <label htmlFor="name">First name: </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={form.firstName}
              onChange={(e) => setForm({...form, firstName: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Last name: </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={form.lastName}
              onChange={(e) => setForm({...form, lastName: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Middle name: </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={form.middleName}
              onChange={(e) => setForm({...form, middleName: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="position">Position</label>
            <input
              type="text"
              className="form-control"
              id="position"
              value={form.position}
              onChange={(e) => setForm({...form, position: e.target.value })}
            />
          </div>
          <div className="form-group">

            <div className="radio-button">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="positionOptions"
                  id="positionIntern"
                  value="Intern"
                  checked={form.level === "Intern"}
                  onChange={(e) => setForm({...form, level: e.target.value })}
                />
                <label htmlFor="positionIntern">Intern</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="positionOptions"
                  id="positionJunior"
                  value="Junior"
                  checked={form.level === "Junior"}
                  onChange={(e) => setForm({...form, level: e.target.value })}
                />
                <label htmlFor="positionJunior">Junior</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="positionOptions"
                  id="positionSenior"
                  value="Senior"
                  checked={form.level === "Senior"}
                  onChange={(e) => setForm({...form, level: e.target.value })}
                />
                <label htmlFor="positionSenior">Senior</label>
              </div>
            </div>
            <br />
              {equipments && equipments.map(equipment => (
                
                <div key={equipment._id}>
                  {/* <input value={equipment.name} type='checkbox' onChange={() => form.equipment.push(equipment)}/> */}
                  <input value={equipment._id} type='checkbox' onChange={(e) => setForm({...form, ...form.equipment.push(equipment)})}/>
                  <label>{equipment.name}</label>
                </div>
              ))}

          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Create person"
              className="send-button"
            />
          </div>
        </form>
      </div>
    )
}

export default Create;