import styled from 'styled-components';

import logoImg from '../../../assets/Logo.png';

const LogoStyled = styled.img`
  width: auto;
  height: 10rem;
`;

const Logo = () => {
  return <LogoStyled src={logoImg} alt="Logo 112" />;
};

export default Logo;
