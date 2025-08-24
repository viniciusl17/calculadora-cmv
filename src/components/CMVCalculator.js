import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
  Alert,
  Collapse,
  Stack
} from '@mui/material';
import { Calculate, Clear } from '@mui/icons-material';

// Função para formatar o número para o padrão de moeda BRL (R$)
const formatCurrency = (value) => {
  if (value === null || isNaN(value)) {
    return '';
  }
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

const CMVCalculator = () => {
  const [inputs, setInputs] = useState({
    materiaPrima: '',
    maoDeObra: '',
    outrosCustos: '',
    quantidade: '',
  });

  const [totalCmv, setTotalCmv] = useState(null);
  const [error, setError] = useState('');

  const handleCurrencyChange = (event) => {
    const { name, value } = event.target;
    let formattedValue = value;
    formattedValue = formattedValue.replace(/\D/g, '');
    formattedValue = (Number(formattedValue) / 100).toFixed(2);
    formattedValue = formattedValue.replace('.', ',');
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: formattedValue,
    }));
  };

  const handleQuantityChange = (event) => {
    const { name, value } = event.target;
     setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  }

  const handleCalculate = () => {
    const { materiaPrima, maoDeObra, outrosCustos, quantidade } = inputs;

    if (!materiaPrima || !maoDeObra || !outrosCustos || !quantidade) {
      setError('Por favor, preencha todos os campos.');
      setTotalCmv(null);
      return;
    }

    const mp = parseFloat(materiaPrima.replace(',', '.'));
    const mo = parseFloat(maoDeObra.replace(',', '.'));
    const oc = parseFloat(outrosCustos.replace(',', '.'));
    const qtd = parseInt(quantidade);

    if (isNaN(mp) || isNaN(mo) || isNaN(oc) || isNaN(qtd) || qtd <= 0) {
        setError('Valores inválidos. Verifique os números digitados.');
        setTotalCmv(null);
        return;
    }
    
    const custoPorUnidade = mp + mo + oc;
    const cmvResultado = custoPorUnidade * qtd;

    setTotalCmv(cmvResultado);
    setError('');
  };

  const handleClear = () => {
    setInputs({
      materiaPrima: '',
      maoDeObra: '',
      outrosCustos: '',
      quantidade: '',
    });
    setTotalCmv(null);
    setError('');
  };

  return (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
      <Typography variant="h4" gutterBottom align="center" color="text.primary">
        Calculadora de CMV
      </Typography>
      <Typography variant="subtitle1" gutterBottom align="center" color="text.secondary" sx={{ mb: 4 }}>
        Preencha os custos por unidade e a quantidade para calcular seu CMV total.
      </Typography>

      {/* ÁREA DO GRID ATUALIZADA PARA O LAYOUT SOLICITADO */}
      <Grid container spacing={3} alignItems="flex-start">
        {/* Coluna 1: Matéria-prima */}
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Matéria-prima por unidade (R$)"
            name="materiaPrima"
            variant="outlined"
            placeholder="Ex: 15,00"
            value={inputs.materiaPrima}
            onChange={handleCurrencyChange}
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
          />
        </Grid>

        {/* Coluna 2: Mão de obra e Quantidade */}
        <Grid item xs={12} sm={4}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Mão de obra por unidade (R$)"
              name="maoDeObra"
              variant="outlined"
              placeholder="Ex: 5,00"
              value={inputs.maoDeObra}
              onChange={handleCurrencyChange}
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            />
            <TextField
              fullWidth
              label="Quantidade vendida"
              name="quantidade"
              type="number"
              variant="outlined"
              placeholder="Ex: 100"
              value={inputs.quantidade}
              onChange={handleQuantityChange}
            />
          </Stack>
        </Grid>

        {/* Coluna 3: Outros custos */}
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Outros custos por unidade (R$)"
            name="outrosCustos"
            variant="outlined"
            placeholder="Ex: 15,00"
            value={inputs.outrosCustos}
            onChange={handleCurrencyChange}
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
          />
        </Grid>
      </Grid>

      <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 4 }}>
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<Clear />}
          onClick={handleClear}
        >
          Limpar
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          startIcon={<Calculate />}
          onClick={handleCalculate}
          sx={{ color: 'white', fontWeight: 'bold' }}
        >
          Calcular
        </Button>
      </Stack>

      <Collapse in={!!error}>
        <Alert severity="error" sx={{ mt: 3 }}>
          {error}
        </Alert>
      </Collapse>

      {totalCmv !== null && (
        <Box sx={{ mt: 4, p: 3, borderRadius: 2, backgroundColor: 'background.default', textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary">
            Seu Custo de Mercadoria Vendida (total) é:
          </Typography>
          <Typography variant="h3" color="primary" sx={{ fontWeight: 'bold' }}>
            {formatCurrency(totalCmv)}
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default CMVCalculator;