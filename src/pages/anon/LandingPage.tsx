import { Link } from 'react-router-dom';

import { Button } from '@/components/Elements/Button';
import ButtonContainer from '@/components/Elements/LandingPage/ButtonContainer/ButtonContainer.tsx';
import Divider from '@/components/Elements/LandingPage/Divider/Divider.tsx';
import LandingPageLayout from '@/components/Elements/LandingPage/LandingPageLayout/LandingPageLayout.tsx';
import Logo from '@/components/Elements/LandingPage/Logo/Logo.tsx';

const LandingPage = () => {
  return (
    <div>
      <LandingPageLayout>
        <Logo />
        <Link to="/report/data">
          <Button variant="secondary" size="lg">
            Zgłoś zagrożenie!
          </Button>
        </Link>
        <Divider></Divider>
        <ButtonContainer>
          <Link to="/auth/login">
            <Button variant="primary" size="md">
              Zaloguj się
            </Button>
          </Link>
          <Link to="/auth/register">
            <Button variant="primary" size="md">
              Zarejestruj się
            </Button>
          </Link>
        </ButtonContainer>
      </LandingPageLayout>
    </div>
  );
};

export default LandingPage;
