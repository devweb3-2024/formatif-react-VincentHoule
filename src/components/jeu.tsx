import React, { useState, useEffect } from 'react';
import { Container, Snackbar, Alert } from '@mui/material';
import GrilleMot from './grillemots';
import { obtenirMotAleatoire, listeMots } from '../utils/mots';
import Clavier from './clavier';

const Jeu: React.FC = () => {
  const [motCible, setMotCible] = useState<string>('');
  const [essais, setEssais] = useState<string[]>([]);
  const [essaiCourant, setEssaiCourant] = useState<string>('');
  const [finPartie, setFinPartie] = useState<boolean>(false);
  const [message, setMessage] = useState<{
    text: string;
    severity: 'success' | 'error';
  } | null>(null);

  useEffect(() => {
    setMotCible(obtenirMotAleatoire().normalize('NFD').replace(/[\u0300-\u036f]/g, ""));
  }, []);

  useEffect(() => {
    if (essais.length > 0) {
      verifierDernierEssai();
    }
  }, [essais]);

  const verifierDernierEssai = () => {
    const dernierEssai = essais[essais.length - 1];
    if (dernierEssai === motCible) {
      setFinPartie(true);
      setMessage({
        text: 'Félicitations ! Vous avez trouvé le mot !',
        severity: 'success',
      });
    } else if (essais.length > 6) {
      setFinPartie(true);
      setMessage({
        text: `Dommage ! Le mot était "${motCible}".`,
        severity: 'error',
      });
    }
  };

  // VH sert à trouver le mot ciblé et à ignorer les accents
  function TrouverMot(mot: String): boolean {
    listeMots.forEach(motPotentiel => {
      if (motPotentiel.normalize('NFD').replace(/[\u0300-\u036f]/g, "") == mot.toLowerCase())
        return true
    });
    return false
  }

  const handleSoumettreEssai = () => {
    if (essaiCourant.length !== 5) {
      setMessage({
        text: 'Le mot doit comporter 5 lettres.',
        severity: 'error',
      });
      return;
    }
    // condtion s'il le mot n'existe pas
    if (TrouverMot(essaiCourant)) {
      setMessage({
        text: "Ce mot n'est pas dans la liste.",
        severity: 'error',
      });
      return;
    }
    setEssais([...essais, essaiCourant.toUpperCase()]);
    setEssaiCourant('');
  };

  // VH réinitialiser les constantes pour une nouvelle partie
  const recommencerPartie = () => {
    setMotCible(obtenirMotAleatoire())
    setEssaiCourant('')
    setEssais([])
    setFinPartie(false)
  };


  return (
    <Container maxWidth="sm">
      <div>${motCible}</div>
      <GrilleMot
        essais={essais}
        motCible={motCible}
        essaiCourant={essaiCourant}
      />
      <Clavier
        essaiCourant={essaiCourant}
        setEssaiCourant={setEssaiCourant}
        onEnter={handleSoumettreEssai}
        inactif={finPartie}
        // VH transferer l'action de recommencer
        onRecommencer={recommencerPartie}
      />
      {message && (
        <Snackbar open autoHideDuration={6000} onClose={() => setMessage(null)}>
          <Alert
            onClose={() => setMessage(null)}
            severity={message.severity}
            sx={{ width: '100%' }}
          >
            {message.text}
          </Alert>
        </Snackbar>
      )}
    </Container>
  );
};

export default Jeu;
