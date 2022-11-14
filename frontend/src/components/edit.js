import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

const Edit = () => {
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        middleName: "",
        position: "",
        level: "",
        equipment: [],
        location: ''
    });

    const params = useParams();
    const navigate = useNavigate();

    const [locations, setLocations] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const id = params.id.toString();
            const response = await fetch(`http://localhost:5000/record/${params.id.toString()}`);
 
            if (!response.ok) {
            const message = `An error has occurred: ${response.statusText}`;
            window.alert(message);
            return;
            }
        
            const record = await response.json();
            if (!record) {
            window.alert(`Record with id ${id} not found`);
            navigate("/");
            return;
            }
        
            setForm(record[0]);
            console.log(record)
        }
 
        fetchData();
        
        return;
    }, [params.id, navigate]);

    const onSubmit = async (e) => {
        e.preventDefault();
      
        await fetch(`http://localhost:5000/update/${params.id}`, {
          method: "POST",
          body: JSON.stringify(form),
          headers: {
            'Content-Type': 'application/json'
          },
        });
      
        navigate("/");
    }

    useEffect(() => {
      const getLocations = async () => {
        const response = await fetch('http://localhost:5000/locations/')

        const locations = await response.json()

        setLocations(locations)
        console.log(locations)
      }

      getLocations()
    }, [])

    const selectLocation = () => {

    }

    return (
        <div>
        <h3>Update Record</h3>
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
            <label htmlFor="position">Position: </label>
            <input
              type="text"
              className="form-control"
              id="position"
              value={form.position}
              onChange={(e) => setForm({...form, position: e.target.value })}
            />
          </div>
          <div className="form-group">
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
          <select onChange={(e) => setForm({...form, location: e.target.value})}>
            <option></option>
            {locations && locations.map(location => 
              <option value={location.city}>{location.city}</option>
              )}
          </select>

          <br />
            {/* {form && form.equipment.map(x=> <input type="checkbox">{x.name}</input>)} */}
          <div className="form-group">
            <input
              type="submit"
              value="Update Record"
              className="send-button"
            />
          </div>
        </form>
      </div>
    );
}

export default Edit;