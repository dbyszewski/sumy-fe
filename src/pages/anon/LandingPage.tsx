import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Button, EmergencyButton } from '@/components/Elements/Button';
import ButtonContainer from '@/components/Elements/LandingPage/ButtonContainer/ButtonContainer.tsx';
import Divider from '@/components/Elements/LandingPage/Divider/Divider.tsx';
import LandingPageLayout from '@/components/Elements/LandingPage/LandingPageLayout/LandingPageLayout.tsx';
import Logo from '@/components/Elements/LandingPage/Logo/Logo.tsx';
import { useAuth } from '@/hooks/useAuth.ts';

const LandingPage = () => {
  const { token } = useAuth();

  const buttons = useMemo(() => {
    if (token) {
      return (
        <ButtonContainer>
          {/*TODO: Dać warunek żeby user zwykły był przekierowany na /app, czeka na be*/}
          <Link to="/admin">
            <Button>Przejdź do panelu</Button>
          </Link>
        </ButtonContainer>
      );
    }

    return (
      <ButtonContainer>
        <Link to="/auth/login">
          <Button>Zaloguj się</Button>
        </Link>
        <Link to="/auth/register">
          <Button>Zarejestruj się</Button>
        </Link>
      </ButtonContainer>
    );
  }, [token]);

  return (
    <div>
      <LandingPageLayout>
        <LogoContainers>
          <Logo size="lg" />
          {/*TODO: odkomentować, jak poprawi się logo, bo ono jest większe niż się wydaje*/}
          {/*<Title>SafelyAround</Title>*/}
        </LogoContainers>
        <Link to="/report/data">
          <EmergencyButton>Zgłoś zagrożenie!</EmergencyButton>
        </Link>
        <Divider />
        {buttons}
      </LandingPageLayout>
    </div>
  );
};

export default LandingPage;

const LogoContainers = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: ${({ theme }) => theme.colors.text.light};
  align-items: center;
`;
