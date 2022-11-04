import React from "react";

import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <div>
            <nav className="navbar">
                <NavLink className="navbar-brand" to="/">
                <img style={{"width" : 25 + '%'}} src="https://d3cy9zhslanhfa.cloudfront.net/media/3800C044-6298-4575-A05D5C6B7623EE37/4B45D0EC-3482-4759-82DA37D8EA07D229/webimage-8A27671A-8A53-45DC-89D7BF8537F15A0D.png" alt="img"></img>
                </NavLink>
        
            <div >
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink  to="/equipments">
                            Equipments
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink  to="/create-equipment">
                            Create_Equipment
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/create">
                            Create_Record
                        </NavLink>
                    </li>
                </ul>
            </div>
            </nav>
        </div>
    );
}

export default Navbar;