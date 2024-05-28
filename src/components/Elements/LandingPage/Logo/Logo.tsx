import styled from 'styled-components';

import logoSvg from '@/assets/Logo.svg';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
}

const Logo = ({ size }: LogoProps) => {
  return <LogoStyled src={logoSvg} alt="Logo SafelyAround" size={size} />;
};

const LogoStyled = styled.img<LogoProps>`
  width: auto;
  height: ${({ size }) => {
    switch (size) {
      case 'sm':
        return '2rem';
      case 'md':
        return '5rem';
      case 'lg':
        return '20rem';
      default:
        return '5rem';
    }
  }};
`;

export default Logo;
