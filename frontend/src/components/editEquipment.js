import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom";

const EditEquipment = () => {
    const params = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: '',
        type: '',
        amount: 0
    });

    const onSubmit = async (e) => {
        e.preventDefault()

        await fetch(`http://localhost:5000/equipment/update/${params.id}`, {
            method:'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        })

        navigate("/equipments")
    }

    return (
        <div>
            <h3>Update Equipment</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name: </label>
                    <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={form.name}
                    onChange={(e) => setForm({...form, name: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Type: </label>
                    <input
                    type="text"
                    className="form-control"
                    id="type"
                    value={form.type}
                    onChange={(e) => setForm({...form, type: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Amount: </label>
                    <input
                    type="number"
                    className="form-control"
                    id="amount"
                    value={form.amount}
                    onChange={(e) => setForm({...form, amount: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <input
                    type="submit"
                    value="Update Equipment"
                    className="btn btn-primary"
                    />
                </div>
            </form>
        </div>
    )
}

export default EditEquipment;