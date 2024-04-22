import styled from 'styled-components';

import logoImg from '@/assets/Logo.png';

const Logo = () => {
  return <LogoStyled src={logoImg} alt="Logo 112" />;
};

const LogoStyled = styled.img`
  width: auto;
  height: 10rem;
`;

export default Logo;
