import React, { useEffect, useState } from 'react';
import {
    TextField,
    Button,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    Typography,
    Box,
    Checkbox,
    FormControlLabel,
    FormGroup
} from '@mui/material';
import Navbar from '../../assets/Navbar/Navbar';
import './UserData.css';

const UserData = () => {
    const [userData, setUserData] = useState({
        peso: '',
        altura: '',
        sexo: '',
        intensidade: '',
        idade: '',
        tmb_usuario: ''
    });
    const [salvarTmb, setSalvarTmb] = useState(true);
    const [tmb, setTmb] = useState('');

    useEffect(() => {
        fetch('http://localhost:5000/usuario/1')
            .then(res => res.json())
            .then(data => {
                setUserData({
                    peso: data.peso_usuario || '',
                    altura: data.altura_usuario || '',
                    sexo: data.sexo_usuario || '',
                    intensidade: data.tipo_atividade_fisica || '',
                    idade: data.idade_usuario || '',
                    tmb_usuario: data.tmb_usuario || ''
                });

                if (data.tmb_usuario !== null && data.tmb_usuario !== undefined && data.tmb_usuario !== '') {
                    const valor = parseFloat(data.tmb_usuario).toFixed(2);
                    setTmb(valor);
                    console.log("TMB carregada do banco:", valor);
                }
            });
    }, []);

    const calcularTmb = () => {
        const peso = parseFloat(userData.peso);
        const altura = parseFloat(userData.altura);
        const idade = parseFloat(userData.idade);

        if (isNaN(peso) || isNaN(altura) || isNaN(idade)) {
            alert("Preencha corretamente peso, altura e idade.");
            return;
        }

        let resultado = 0;
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

        if (salvarTmb) {
            fetch("http://localhost:5000/usuario/1", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    peso: parseFloat(userData.peso),
                    altura: parseFloat(userData.altura),
                    sexo: userData.sexo,
                    intensidade: userData.intensidade,
                    idade: parseInt(userData.idade, 10),
                    tmb: parseFloat(tmbFinal.toFixed(2))
                })
            })
                .then(async (res) => {
                    const text = await res.text();
                    try {
                        const data = JSON.parse(text);
                        console.log("Resposta do back:", data);
                    } catch (e) {
                        console.error("Erro ao fazer parse do JSON:", text);
                    }
                })
                .catch(err => console.error("Erro ao salvar TMB:", err));
        }
    };

    return (
        <div className='userData-main'>
            <div className='column left-column'>
                <Navbar />
            </div>
            <div className='column mid-column user-data'>
                <div className='main-container'>
                    <header className='container-header'>
                        <h5><strong>Calculadora TMB (Taxa de Metabolismo Basal)</strong></h5>
                    </header>
                    <Typography variant="h5">Sua TMB é...</Typography>
                    <Typography variant="h3" className='tmb-val'>
                        {tmb ? `${tmb} cal/dia` : '---'}
                        <img className='heat-img' src='/heat.png' alt="heat" />
                    </Typography>
                    <Typography variant="body1">
                        Baseado no seu peso, altura, sexo, idade e intensidade de atividade física
                    </Typography>

                    <Box
                        component="form"
                        noValidate
                        autoComplete="off"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            mt: 4,
                            maxWidth: 400,
                            width: '100%',
                            mx: 'auto'
                        }}
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <TextField
                            label="Idade"
                            type="number"
                            variant="outlined"
                            value={userData.idade}
                            onChange={(e) => setUserData({ ...userData, idade: e.target.value })}
                            fullWidth
                        />

                        <TextField
                            label="Peso (kg)"
                            type="number"
                            variant="outlined"
                            value={userData.peso}
                            onChange={(e) => setUserData({ ...userData, peso: e.target.value })}
                            fullWidth
                        />

                        <TextField
                            label="Altura (cm)"
                            type="number"
                            variant="outlined"
                            value={userData.altura}
                            onChange={(e) => setUserData({ ...userData, altura: e.target.value })}
                            fullWidth
                        />

                        <FormControl fullWidth>
                            <InputLabel>Sexo</InputLabel>
                            <Select
                                value={userData.sexo}
                                label="Sexo"
                                variant="outlined"
                                onChange={(e) => setUserData({ ...userData, sexo: e.target.value })}
                            >
                                <MenuItem value="Masculino">Masculino</MenuItem>
                                <MenuItem value="Feminino">Feminino</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl fullWidth>
                            <InputLabel>Intensidade</InputLabel>
                            <Select
                                value={userData.intensidade}
                                label="Intensidade"
                                variant="outlined"
                                onChange={(e) => setUserData({ ...userData, intensidade: e.target.value })}
                            >
                                <MenuItem value="N">Normal</MenuItem>
                                <MenuItem value="M">Moderada</MenuItem>
                                <MenuItem value="I">Intensa</MenuItem>
                            </Select>
                        </FormControl>

                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={salvarTmb}
                                        onChange={(e) => setSalvarTmb(e.target.checked)}
                                    />
                                }
                                label="Salvar TMB"
                            />
                        </FormGroup>

                        <Button variant="contained" color="primary" onClick={calcularTmb}>
                            Calcular
                        </Button>
                    </Box>
                </div>
            </div>
        </div>
    );
};

export default UserData;
