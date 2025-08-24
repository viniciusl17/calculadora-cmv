import React from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { CheckCircleOutline } from '@mui/icons-material';

const advantages = [
  'Construir uma base sólida e confiável para fazer a precificação dos produtos e criar promoções.',
  'Medir com eficiência sua gestão financeira e identificar fatores que colocam seu negócio em risco.',
  'Obter dados concretos e seguros para a tomada de decisões e definição de estratégias do delivery.',
];

const Advantages = () => {
  return (
    <Box mt={5}>
      <Typography variant="h5" gutterBottom align="center" color="text.primary" sx={{ mb: 3 }}>
        Vantagens de Calcular o CMV no seu Delivery
      </Typography>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <List>
          {advantages.map((text, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <CheckCircleOutline color="primary" />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default Advantages;