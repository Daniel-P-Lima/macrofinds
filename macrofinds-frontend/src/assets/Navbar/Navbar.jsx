// eslint-disable-next-line
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import React, { Component } from 'react'
import user_icon from "./assets/user.svg"
import dietas_icon from "./assets/dietas.svg"
import tmb_icon from "./assets/tmb.svg"
import metodologia_icon from "./assets/metodologia.svg"
import "./Navbar.css"

export default class Navbar extends Component {
  render() {
    return (
        <div className='nav-bar'>
            <div className="user-row">
                <img src={user_icon} alt="user" />
                USER_NAME
            </div>
            <Link to={"/"}>
                <div className="row">
                    <img src={dietas_icon} alt="dietas" />
                    Dietas
                </div>
            </Link>
            
            <Link to={"/dadosUsuario"}>
                <div className="row">
                    <img src={tmb_icon} alt="dietas" />
                    Calculadora de TMB
                </div>
            </Link>
            
            <div className="row">
                <img src={metodologia_icon} alt="dietas" />
                Metodologia
            </div>
        </div>
    )
  }
}
