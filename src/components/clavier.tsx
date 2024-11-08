import React from 'react';
import { TextField, Box, Button } from '@mui/material';

interface ClavierProps {
  essaiCourant: string;
  setEssaiCourant: React.Dispatch<React.SetStateAction<string>>;
  onEnter: () => void;
  onRecommencer: () => void;
  inactif: boolean;
}

const Clavier: React.FC<ClavierProps> = ({
  essaiCourant,
  setEssaiCourant,
  onEnter,
  onRecommencer,
  inactif,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^[a-zA-Z]{0,5}$/.test(value)) {
      setEssaiCourant(value);
    }
  };


  
  return (
    <Box sx={{ marginTop: 2, display: 'flex', gap: 2 }}>
      <TextField
        label="Entrez un mot"
        variant="outlined"
        value={essaiCourant}
        onChange={handleChange}
        disabled={inactif}
        slotProps={{ htmlInput: { style: { textTransform: 'uppercase' } } }}
        fullWidth
      />
      <Button variant="contained" onClick={onEnter} disabled={inactif}>
        Entrer
      </Button>
      <Button variant='contained' onClick={onRecommencer}>
        Recommencer
      </Button>
    </Box>
  );
};

export default Clavier;
