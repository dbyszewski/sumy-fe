import { Button } from '@/components/Elements/Button';
import ButtonContainer from '@/components/Elements/LandingPage/ButtonContainer/ButtonContainer.tsx';
import Divider from '@/components/Elements/LandingPage/Divider/Divider.tsx';
import LandingPageLayout from '@/components/Elements/LandingPage/LandingPageLayout/LandingPageLayout.tsx';
import Logo from '@/components/Elements/LandingPage/Logo/Logo.tsx';

const LandingPage = () => {
  return (
    <div>
      <h1>Landing Page</h1>
      <LandingPageLayout>
        <Logo></Logo>
        <Button variant={'secondary'} size={'lg'}>
          Wezwij pomoc!
        </Button>
        <Divider></Divider>
        <ButtonContainer>
          <Button variant={'primary'} size={'md'}>
            Zaloguj się
          </Button>
          <Button variant={'primary'} size={'md'}>
            Zarejestruj się
          </Button>
        </ButtonContainer>
      </LandingPageLayout>
    </div>
  );
};

export default LandingPage;
