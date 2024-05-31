import { useContext } from 'react';
import styled from 'styled-components';

import { Title } from '@/components/Elements/Headers/Title';
import { SettingsContext } from '@/providers/SettingsProvider';

export const UserSettingsPanel = () => {
  const { theme, visibility, setTheme, setVisibility } = useContext(SettingsContext);

  return (
    <Container>
      <Title>Moje ustawienia</Title>
      <RoundedContainer>
        <Section>
          <Label>Motyw:</Label>
          <SwitchContainer>
            <SwitchInput
              type="radio"
              id="light"
              name="theme"
              value="light"
              checked={theme === 'light'}
              onChange={() => setTheme('light')}
            />
            <SwitchLabel htmlFor="light">Jasny</SwitchLabel>
            <SwitchInput
              type="radio"
              id="dark"
              name="theme"
              value="dark"
              checked={theme === 'dark'}
              onChange={() => setTheme('dark')}
            />
            <SwitchLabel htmlFor="dark">Ciemny</SwitchLabel>
          </SwitchContainer>
        </Section>
        <Section>
          <Label>Domyślna widoczność zgłoszeń:</Label>
          <CheckboxContainer>
            <Checkbox
              type="checkbox"
              id="visibility"
              checked={visibility}
              onChange={() => setVisibility(!visibility)}
            />
            <CheckboxLabel htmlFor="visibility">Włącz</CheckboxLabel>
          </CheckboxContainer>
        </Section>
      </RoundedContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
`;

const RoundedContainer = styled.div`
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
  padding: 2rem;
  background-color: ${({ theme }) => theme.colors.background};
  overflow: hidden;
`;

const Section = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const SwitchContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const SwitchInput = styled.input`
  display: none;
`;

const SwitchLabel = styled.label`
  cursor: pointer;
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.colors.elements.brightLight};
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.elements.light};
  }

  ${SwitchInput}:checked + & {
    background-color: ${({ theme }) => theme.colors.buttons.primary};
    color: ${({ theme }) => theme.colors.buttonsText};
    border-color: ${({ theme }) => theme.colors.buttons.primary};
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Checkbox = styled.input`
  margin-right: 0.5rem;
`;

const CheckboxLabel = styled.label`
  cursor: pointer;
`;
