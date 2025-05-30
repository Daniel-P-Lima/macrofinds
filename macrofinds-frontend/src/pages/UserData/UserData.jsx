import React, { useEffect, useState } from 'react';
import Navbar from "../../assets/Navbar/Navbar"
import "./UserData.css"

const UserData = () => {
    const [userData, setUserData] = useState({
        peso: '',
        altura: '',
        biotipo: '',
        intensidade: ''
    });

    /*
        Busca de dados para TMB
    */
    useEffect(() => {
        fetch('http://localhost:3000/usuario/1')
        .then(res => res.json())
        .then(data => {
            setUserData({
            peso: data.peso_usuario || '',
            altura: data.altura_usuario || '',
            biotipo: data.biotipo_usuario || '',
            intensidade: data.tipo_atividade_fisica || ''
        });
    })

    }, []);

  return (
    <div className='dieta-main'>
        <div className='left-column column'>
            <Navbar />
        </div>
        <div className='main'>
            <div className='header-tmb'>
                <header>
                    <h2>Calculadora de TMB (Taxa de Metabolismo Basal)</h2>
                </header>
            </div>
        <div className='container'>
            <div className='main-container'>
                <h2>Sua TMB é...</h2>
                <h1 className='tmb-val'>2.3555cal/dia<img className='heat-img' src='/heat.png' alt='heat'/></h1>
                <p>Baseado no seu peso, altura, biotipo e intensidade de atividade física</p>
                <div className='input-container'>
                <form className='input-container-form'>
                    <label>Peso</label>
                    <input
                    type="text"
                    value={userData.peso}
                    onChange={e => setUserData({ ...userData, peso: e.target.value })}
                    />

                    <label>Altura</label>
                    <input
                    type="text"
                    value={userData.altura}
                    onChange={e => setUserData({ ...userData, altura: e.target.value })}
                    />

                    <label>Biotipo</label>
                    <select
                    value={userData.biotipo}
                    onChange={e => setUserData({ ...userData, biotipo: e.target.value })}
                    >
                    <option value="Ectomorfo">Ectomorfo</option>
                    <option value="Endomorfo">Endomorfo</option>
                    <option value="Mesomorfo">Mesomorfo</option>
                    </select>

                    <label>Intensidade</label>
                    <select
                    value={userData.intensidade}
                    onChange={e => setUserData({ ...userData, intensidade: e.target.value })}
                    >
                    <option value="N">Normal</option>
                    <option value="M">Moderada</option>
                    <option value="I">Intensa</option>
                    </select>

                    <button type="button" className='button-calc'>Calcular</button>
                </form>
                </div>
            </div>
        </div>
        </div>
    </div>
  );
};

export default UserData;
