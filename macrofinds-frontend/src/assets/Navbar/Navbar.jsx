// eslint-disable-next-line
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import React, { Component } from 'react'
import "./Navbar.css"

export default class Navbar extends Component {
  render() {
    return (
        <div className='nav-bar'>
            <ul>
                <li>
                    <Link to={"/"}>Home</Link>
                </li>
                <li>
                    <Link to={"/dadosUsuario"}>Dados Usuário</Link>
                </li>
            </ul>
        </div>
    )
  }
}
