import styled from 'styled-components';

import { Title } from '@/components/Elements/Headers/Title';
import { UserInfo } from '@/features/user/userPanel/components/UserInfo.tsx';
import { useSettings } from '@/hooks/useSettings.ts';

export const UserSettingsPanel = () => {
  const { theme, changeTheme } = useSettings();

  return (
    <Container>
      <Title>Moje ustawienia</Title>
      <RoundedContainer>
        <Section>
          <Label>Motyw:</Label>
          <SwitchContainer>
            <Switch>
              <SwitchInput
                type="checkbox"
                id="themeSwitch"
                checked={theme === 'dark'}
                onChange={() => changeTheme(theme === 'light' ? 'dark' : 'light')}
              />
              <Slider htmlFor="themeSwitch" />
            </Switch>
            <SwitchLabel>{theme === 'light' ? 'Jasny' : 'Ciemny'}</SwitchLabel>
          </SwitchContainer>
        </Section>
      </RoundedContainer>
      <Title>Moje Dane</Title>
      <RoundedContainer>
        <Section>
          <UserInfo />
        </Section>
      </RoundedContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: auto;
`;

const RoundedContainer = styled.div`
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
  padding: 2rem;
  background: ${({ theme }) => theme.colors.elements.brightLight};
  overflow: hidden;
  flex-grow: 1;
`;

const Section = styled.div`
  margin: 1rem 0;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Switch = styled.div`
  position: relative;
  display: inline-block;
  width: 80px;
  height: 40px;
`;

const SwitchInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + label {
    background-color: ${({ theme }) => theme.colors.navigation.darkRed};
  }

  &:checked + label:before {
    transform: translateX(40px);
  }
`;

const Slider = styled.label`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.colors.elements.light};
  transition: 0.4s;
  border-radius: 40px;

  &:before {
    position: absolute;
    content: '';
    height: 32px;
    width: 32px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
`;

const SwitchLabel = styled.span`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text.dark};
`;
