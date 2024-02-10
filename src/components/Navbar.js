import React, { useState } from "react";
import logo from '../asserts/images/logo.png';
import '../styles/Navbar.css';
import { useDispatch} from "react-redux";

const Navbar = () => {
    const dispatch = useDispatch()
    const [newTodo, setNewTodo] = useState('');

    const handleSearch = () => {
        dispatch({type: 'ID_TOBE_SEARCHED', payload: newTodo});
    }

    return (
        <div className="Navbar">
            <img className="logo" src={logo} alt="logo"></img>
            <div className="logoText">
                To
                <span style={{ color: 'orange' }}>Do</span>
            </div>
            <input
                className="searchBar"
                type="text"
                placeholder="Search by id"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
            />
            <div className="buttonSearch" onClick={handleSearch}>
                Search
            </div>
        </div>
    );
}

export default Navbar;