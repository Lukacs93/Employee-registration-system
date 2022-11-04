import { useState } from "react";
import { useNavigate } from "react-router";


const CreateEquipment = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: '',
        type: '',
        amount: 0
    })

    const onSubmit = async (e) => {
        e.preventDefault();

        await fetch('http://localhost:5000/equipment/add', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form)
        })
        navigate("/equipments");
    }

    return (
        <div>
            <h3>Create New Equipment</h3>
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
                    value="Create equipment"
                    className="send-button"
                    />
                </div>
            </form>
        </div>
    )
}

export default CreateEquipment;