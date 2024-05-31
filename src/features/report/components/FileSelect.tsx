import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChangeEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useCreateEvent } from '@/api/events/create-event.ts';
import { CreateEventInput } from '@/api/events/types.ts';
import { Button } from '@/components/Elements/Button';
import ButtonContainer from '@/components/Elements/LandingPage/ButtonContainer/ButtonContainer.tsx';

interface FileInputProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: File | null;
  name: string;
  alt?: string;
}

export const FileSelect = ({ name, alt, value, ...rest }: FileInputProps) => {
  const navigate = useNavigate();
  const createEventMutation = useCreateEvent({
    mutationConfig: {
      onSuccess: () => {
        localStorage.removeItem('reportData');
        localStorage.removeItem('reportLocation');
        navigate('/');
      },
    },
  });

  const handleNext = () => {
    // alert('File sent');
    const reportData = JSON.parse(localStorage.getItem('reportData') || '{}');
    const reportLocation = JSON.parse(localStorage.getItem('reportLocation') || '{}');
    const requestBody = {
      phone: reportData.phone,
      title: reportData.title,
      description: reportData.description,
      eventDate: reportData.eventDate,
      latitude: reportLocation.lat,
      longitude: reportLocation.lng,
    } as CreateEventInput;
    createEventMutation.mutate({ data: requestBody });
  };

  const [isChecked, setIsChecked] = useState(false);

  return (
    <>
      <FileContainer>
        <Label>Dodaj zdjęcie związane ze zgłosieniem:</Label>
        <FileInputWrapper>
          <HiddenFileInput
            id={name}
            name={name}
            {...rest}
            type="file"
            accept="image/png, image/jpeg"
          />
          <FileInputLabel htmlFor={name}>
            <FontAwesomeIcon icon={faUpload} />
          </FileInputLabel>
          {value?.name && <FileNameDisplay title={value?.name}>{value?.name}</FileNameDisplay>}
        </FileInputWrapper>
        {value && (
          <ImageContainer>
            <FilePreview src={URL.createObjectURL(value)} alt={alt} />
          </ImageContainer>
        )}
      </FileContainer>
      <CheckboxContainer>
        <StyledCheckbox
          type="checkbox"
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
        />
        <CheckboxLabel htmlFor="visibility">Akceptuję zasady</CheckboxLabel>
      </CheckboxContainer>
      <ButtonContainer>
        <Link to="/report/location">
          <Button disabled={createEventMutation.isPending}>Wstecz</Button>
        </Link>
        <Button onClick={handleNext} disabled={!isChecked || createEventMutation.isPending}>
          Wyślij
        </Button>
      </ButtonContainer>
    </>
  );
};

const HiddenFileInput = styled.input`
  display: none;
`;

const FileInputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin: 10px 0;
  max-width: 100%;
`;

const FileInputLabel = styled.label`
  display: inline-block;
  padding: 10px;
  background-color: #eee;
  border-radius: 4px;
  cursor: pointer;
  margin: 0;
  font-size: 16px;
  border: 1px solid #ccc;

  &:hover {
    background-color: #ddd;
  }
`;

const FileNameDisplay = styled.span`
  display: inline-block;
  padding: 10px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-grow: 1;
  max-width: 100%;
`;

const FilePreview = styled.img`
  max-width: 100%;
`;

const ImageContainer = styled.div`
  position: relative;
  margin-top: 10px;
`;

const FileContainer = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.div`
  font-size: 1rem;
  margin-bottom: 1rem;
  width: 100%;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem;
`;

const StyledCheckbox = styled.input`
  accent-color: ${({ theme }) => theme.colors.navigation.darkRed};
  width: 24px;
  height: 24px;
`;

const CheckboxLabel = styled.label`
  cursor: pointer;
  font-size: 1rem;
  margin-left: 0.5rem;
`;
