import React from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Divider,
  Stack,
} from "@mui/material";
import "typeface-inter";
import "../../assets/login.css"; 

export default function Login() {
  return (
    <>
      <hr className="full-hr" />

      <Box
        sx={{
          minHeight: "75vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: 1,
        }}
        
      >
      
        <Stack spacing={3} sx={{ width: "100%", maxWidth: 440 }}>
          <Typography variant="h4" textAlign="center">
            MacroFinds
          </Typography>

          <TextField
            label="email"
            type="email"
            variant="outlined"
            fullWidth
            autoFocus
            InputProps={{ className: "input-field" }}
          />

          <TextField
            label="senha"
            type="password"
            variant="outlined"
            fullWidth
            InputProps={{ className: "input-field" }} 
          />

          <Button
            className="btn-login"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
          >
            Login
          </Button>

          <Typography textAlign="center" sx={{ mt: 1 }}>
            Novo aqui? 
            <a href="/register" style={{ textDecoration: "none", color: "#1a73e8" }}>
              Registre-se
            </a>
          </Typography>

          <Divider>ou</Divider>

          <Button
            className="btn-google"
            variant="outlined"
            fullWidth
            size="large"
            sx={{ textTransform: "none", fontSize: 20, fontWeight: 400 }}
            startIcon={
              <Typography sx={{ fontSize: 25, fontWeight: 600 }}>G</Typography>
            }
          >
            Continuar com o Google
          </Button>
        </Stack>
      </Box>

      <hr className="full-hr" />
    </>
  );
}
