import React, { useEffect, useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Card,
  CardContent
} from '@mui/material';

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
    fetch('http://localhost:5000/usuario/1')
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

    if (userData.sexo === 'Masculino') {
      resultado = 66 + 13.7 * peso + 5 * altura - 6.8 * idade;
    } else if (userData.sexo === 'Feminino') {
      resultado = 655 + 9.6 * peso + 1.7 * altura - 4.7 * idade;
    }

    let fator = 1;
    if (userData.intensidade === 'N') fator = 1.2;
    else if (userData.intensidade === 'M') fator = 1.35;
    else if (userData.intensidade === 'I') fator = 1.45;

    const tmbFinal = resultado * fator;
    setTmb(tmbFinal.toFixed(2));
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Card elevation={3}>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            Calculadora TMB (Taxa de Metabolismo Basal)
          </Typography>

          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Typography variant="h6">Sua TMB é...</Typography>
            <Typography variant="h3" color="primary" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
              {tmb ? `${tmb} cal/dia` : '---'}
              <Box component="img" src="/heat.png" alt="heat" height={40} />
            </Typography>
            <Typography variant="body2">
              Baseado no seu peso, altura, sexo, idade e intensidade de atividade física
            </Typography>
          </Box>

          <Box component="form" onSubmit={e => e.preventDefault()} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Peso (kg)"
              value={userData.peso}
              onChange={e => setUserData({ ...userData, peso: e.target.value })}
              fullWidth
            />
            <TextField
              label="Altura (cm)"
              value={userData.altura}
              onChange={e => setUserData({ ...userData, altura: e.target.value })}
              fullWidth
            />

            <FormControl fullWidth>
              <InputLabel>Sexo</InputLabel>
              <Select
                value={userData.sexo}
                label="Sexo"
                onChange={e => setUserData({ ...userData, sexo: e.target.value })}
              >
                <MenuItem value="Masculino">Masculino</MenuItem>
                <MenuItem value="Feminino">Feminino</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Idade"
              value={userData.idade}
              onChange={e => setUserData({ ...userData, idade: e.target.value })}
              fullWidth
            />

            <FormControl fullWidth>
              <InputLabel>Intensidade</InputLabel>
              <Select
                value={userData.intensidade}
                label="Intensidade"
                onChange={e => setUserData({ ...userData, intensidade: e.target.value })}
              >
                <MenuItem value="N">Normal</MenuItem>
                <MenuItem value="M">Moderada</MenuItem>
                <MenuItem value="I">Intensa</MenuItem>
              </Select>
            </FormControl>

            <Button variant="contained" size="large" onClick={calcularTmb}>
              Calcular
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default UserData;
