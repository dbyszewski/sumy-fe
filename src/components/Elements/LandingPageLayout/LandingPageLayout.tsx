import styled from 'styled-components';

import { Button } from '@/components/Elements/Button';
import Divider from '@/components/Elements/Divider/Divider.tsx';
import Logo from '@/components/Elements/Logo/Logo.tsx';

const LayoutStyled = styled.div`
  display: flex;
  flex-direction: column; // Ustawiamy układ kolumnowy
  align-items: center;
  height: 100vh;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px; // Dodajemy odstęp między elementami
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px; // Dodajemy odstęp między przyciskami
`;

const Layout = () => {
  return (
    <LayoutStyled>
      <Logo />
      <ContentWrapper>
        <Button variant={'secondary'} size={'lg'}>
          Wezwij pomoc!
        </Button>
        <Divider />
        <ButtonWrapper>
          <Button variant={'primary'} size={'md'}>
            Zaloguj się
          </Button>
          <Button variant={'primary'} size={'md'}>
            Zarejestruj się
          </Button>
        </ButtonWrapper>
      </ContentWrapper>
    </LayoutStyled>
  );
};

export default Layout;
