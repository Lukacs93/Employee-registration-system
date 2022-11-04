import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Record = (props) => (
    <tr>
      <td>{props.record.firstName}</td>
      <td>{props.record.lastName}</td>
      <td>{props.record.middleName}</td>
      <td>{props.record.position}</td>
      <td>{props.record.level}</td>
      {/* <td>{props.record.equipment.map(x=>x.name)}</td> */}
      <td>{props.record.equipment && props.record.equipment.map(eq=><li>{eq.name}</li>)}</td>
      <td>
        <Link className="btn btn-link" to={`/edit/${props.record._id}`}>Edit</Link> |
        <button className="btn btn-link"
          onClick={() => {
            props.deleteRecord(props.record._id);
          }}
        >
          Delete
        </button>
      </td>
    </tr>
);

const RecordList = () => {
    const [records, setRecords] = useState([]);

  console.log(records)
    useEffect(() => {
        const getRecords = async () => {
          const response = await fetch(`http://localhost:5000/record/`);

          if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.alert(message);
            return;
          }
        
          const records = await response.json();
          setRecords(records);
        }
        
        getRecords();
        
        return;
    }, []);
    
    const deleteRecord = async (id) => {

      await fetch(`http://localhost:5000/${id}`, {

        method: "DELETE"
      });
        
      const newRecords = records.filter((el) => el._id !== id);
      setRecords(newRecords);
    }

    const [filterInput, setFilterInput] = useState({
      position: '',
      level: ''
    });

    const filterByPosition = () => {
      const filteredRecord = records.filter(record => {
        if (filterInput.position && filterInput.level) {
          return record.position.toLowerCase().includes(filterInput.position.toLowerCase()) &&
          record.level.toLowerCase().includes(filterInput.level.toLowerCase())
        }
        if (filterInput.position) {
          return record.position.toLowerCase().includes(filterInput.position.toLowerCase())

        } else if (filterInput.level) {
          return record.level.toLowerCase().includes(filterInput.level.toLowerCase())

        } else {
          return records
        }
      })

      return filteredRecord
    }

    //const [filterInput, setFilterInput] = useState(records);
    
    // const filterByPosition = (e) => {
    //   const filteredRecord = records.filter(record => record.position.includes(e.target.value))
    //   setRecords(filteredRecord)

    //   console.log(filterInput)
    //   //console.log(filteredRecord)
    // }


  //   const filterByPosition = async(e) => {

  //     const filteredRecord = records.filter(record => record.position.includes(e.target.value))
  //     setRecords(filteredRecord)
  //     console.log(filteredRecord)
  // }

    const recordList = () => {
      return filterByPosition().map((record) => {
        return (
          <Record
          record={record}
          deleteRecord={() => deleteRecord(record._id)}
          key={record._id}
          />
        );
      });
    }
    //sort with dropdown
    const sortEmployeeRecords = (e) => {

      if (e.target.value === 'firstName') {
        const sortOrder = records.sort((a, b) => a.firstName > b.firstName ? 1 : b.firstName > a.firstName ? -1 : 0);
        setRecords([...sortOrder]);
      } else if (e.target.value === 'lastName') {
        const sortOrder = records.sort((a, b) => a.lastName > b.lastName ?  1 : -1);
        setRecords([...sortOrder]);
      } else if (e.target.value === 'middleName') {
        const sortOrder = records.sort((a, b) => a.middleName > b.middleName ? 1 : -1);
        setRecords([...sortOrder]);
      } else if (e.target.value === 'position') {
        const sortOrder = records.sort((a, b) => a.position > b.position ? 1 : -1);
        setRecords([...sortOrder]);
      } else if (e.target.value === 'level') {
        const sortOrder = records.sort((a, b) => a.level > b.level ? 1 : -1);
        setRecords([...sortOrder]);
      }
    }
    //sort on header
    const[order, setOrder] = useState(true);
    const [header, setHeader] = useState('');

    const sortEmployees = (e) => {

      if (e.target.id === 'firstName') {
        setOrder(!order);
        setHeader(e.target.id);
        records.sort((a, b) => order && a.firstName > b.firstName ?  1 : -1);
      } else if (e.target.id === 'lastName') {
        setOrder(!order);
        setHeader(e.target.id);
        records.sort((a, b) => order && a.lastName > b.lastName ?  1 : -1);
      } else if (e.target.id === 'middleName') {
        setOrder(!order);
        setHeader(e.target.id);
        records.sort((a, b) => order && a.middleName > b.middleName ?  1 : -1);
      } else if (e.target.id === 'position') {
        setOrder(!order);
        setHeader(e.target.id);
        records.sort((a, b) => order && a.position > b.position ?  1 : -1);
      } else if (e.target.id === 'level') {
        setOrder(!order);
        setHeader(e.target.id);
        records.sort((a, b) => order && a.level > b.level ?  1 : -1);
      }
    }

    return (
        <div>
        <h3>Record List</h3>
        <div className="filter">
          <select onChange={(e) => sortEmployeeRecords(e)}>
            <option>--sort by--</option>
            <option value='firstName'>First Name</option>
            <option value='lastName'>Last name</option>
            <option value='middleName'>Middle name</option>
            <option value='position'>Position</option>
            <option value='level'>Level</option>
          </select>

          <input onChange={(e) => setFilterInput({...filterInput, position: e.target.value})} placeholder="filter by position"></input>
          <input onChange={(e) => setFilterInput({...filterInput, level: e.target.value})} placeholder="filter by level"></input>
        </div>

        <table className="table table-striped" style={{ marginTop: 20}}>
          <thead>
            <tr onClick={(e) => sortEmployees(e)}>
            {/* className={header === "firstName" ? 'active' : ''}>First name {order && order ? '▲' : '▼'} */}
              <th id="firstName" className={header === 'firstName' ? order ? 'ascending' : 'descending' : ''}>First Name</th>
              <th id="lastName" className={header === 'lastName' ? order ? 'ascending' : 'descending' : ''}>Last name</th>
              <th id="middleName" className={header === 'middleName' ? order ? 'ascending' : 'descending' : ''}>Middle name</th>
              <th id="position" className={header === 'position' ? order ? 'ascending' : 'descending' : ''}>Position
                {/* <select onChange={(e) => filterByPosition(e)}>
                  <option></option>
                  {records.map(record => <option value={record.position}>{record.position}</option>)}
                </select> */}
              </th>
              <th id="level" className={header === 'level' ? order ? 'ascending' : 'descending' : ''}>Level</th>
              <th>Equipments</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{recordList()}</tbody>
        </table>
      </div>
    );
} 

export default RecordList;