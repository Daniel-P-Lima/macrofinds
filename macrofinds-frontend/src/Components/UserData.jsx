import React, { useEffect, useState } from 'react';

const UserData = () => {
    const [userData, setUserData] = useState({
        peso: '',
        altura: '',
        sexo: '',
        intensidade: '',
        idade: ''
    });

    const [tmb, setTmb] = useState('');

    useEffect(() => {
        fetch('http://localhost:3000/usuario/1')
        .then(res => res.json())
        .then(data => {
            setUserData({
                peso: data.peso_usuario || '',
                altura: data.altura_usuario || '',
                sexo: data.sexo_usuario || '',
                intensidade: data.tipo_atividade_fisica || '',
                idade: data.idade_usuario || ''
            });
        });
    }, []);

    const calcularTmb = () => {
        
        const peso = parseFloat(userData.peso);
        const altura = parseFloat(userData.altura);
        const idade = parseFloat(userData.idade);
        let resultado = 0;

        console.log("peso", peso);
        console.log("altura", altura);
        console.log("idade", idade);




        if (userData.sexo === 'Masculino') {
            resultado = 66 + (13.7 * peso) + (5 * altura) - (6.8 * idade);
        } else if (userData.sexo === 'Feminino') {
            resultado = 655 + (9.6 * peso) + (1.7 * altura) - (4.7 * idade);
        }

        let fator = 1;
        if (userData.intensidade === 'N') fator = 1.2;
        else if (userData.intensidade === 'M') fator = 1.35;
        else if (userData.intensidade === 'I') fator = 1.45;

        const tmbFinal = resultado * fator;

        setTmb(tmbFinal.toFixed(2));
    };

    return (
        <div className='main'>
            <div className='header-tmb'>
                <header>
                    <h1>Calculadora TMB (Taxa de Metabolismo Basal)</h1>
                </header>
            </div>
            <div className='container'>
                <div className='main-container'>
                    <h2>Sua TMB é...</h2>
                    <h1 className='tmb-val'>{tmb ? `${tmb} cal/dia` : '---'}<img className='heat-img' src='/heat.png' /></h1>
                    <p>Baseado no seu peso, altura, sexo, idade e intensidade de atividade física</p>
                    <div className='input-container'>
                        <form className='input-container-form' onSubmit={e => e.preventDefault()}>
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

                            <label>Sexo</label>
                            <select
                                value={userData.sexo}
                                onChange={e => setUserData({ ...userData, sexo: e.target.value })}
                            >
                                <option value="Masculino">Masculino</option>
                                <option value="Feminino">Feminino</option>
                            </select>

                            <label>Idade</label>
                            <input
                                type="text"
                                value={userData.idade}
                                onChange={e => setUserData({ ...userData, idade: e.target.value })}
                            />

                            <label>Intensidade</label>
                            <select
                                value={userData.intensidade}
                                onChange={e => setUserData({ ...userData, intensidade: e.target.value })}
                            >
                                <option value="N">Normal</option>
                                <option value="M">Moderada</option>
                                <option value="I">Intensa</option>
                            </select>

                            <button type="button" className='button-calc' onClick={calcularTmb}>Calcular</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserData;
