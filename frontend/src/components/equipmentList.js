import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const EquipmentList = () => {
    const [equipments, setEquipments] = useState([])

    useEffect(() => {
        const getEquipments = async () => {
            const response = await fetch('http://localhost:5000/equipment/all');
            const equipments = await response.json();

            setEquipments(equipments);
        }
        getEquipments();
    },[])

    const deleteEquipment = async (id) => {
        await fetch(`http://localhost:5000/equipment/${id}`, {
            method:'DELETE'
        })
    }
    

    return (
        <div>
        <h3>Equipment List</h3>
        <table className="table table-striped" style={{ marginTop: 20}}>
          <thead>
            <tr>
              <th id="name">Name</th>
              <th id="type">Type</th>
              <th id="amount">Amount</th>
              <th id="action">Action</th>
            </tr>
          </thead>
          <tbody>
            {equipments && equipments.map(equipment => (
                <tr key={equipment._id}>
                    <td>{equipment.name}</td>
                    <td>{equipment.type}</td>
                    <td>{equipment.amount}</td>
                    <td>  
                        <Link className="btn btn-link" to={`/edit-equipment/${equipment._id}`}>Edit</Link> |
                        <button className="btn btn-link"
                                onClick={() => {
                                    deleteEquipment(equipment._id);
                                }}
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
} 

export default EquipmentList;