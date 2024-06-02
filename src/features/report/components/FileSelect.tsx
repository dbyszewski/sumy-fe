import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import Dropzone from 'react-dropzone';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useCreateEvent } from '@/api/events/create-event.ts';
import { Button } from '@/components/Elements/Button';
import { ImageComponent } from '@/components/Elements/Image/Image.tsx';
import ButtonContainer from '@/components/Elements/LandingPage/ButtonContainer/ButtonContainer.tsx';

interface FileInputProps {
  onDrop: (files: File[]) => void;
  onRemoveFile: (file: File) => void;
  value: File[];
  name: string;
  alt?: string;
}

export const FileSelect = ({ value, onDrop, onRemoveFile }: FileInputProps) => {
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
    const reportData = JSON.parse(localStorage.getItem('reportData') || '{}');
    const reportLocation = JSON.parse(localStorage.getItem('reportLocation') || '{}');
    const visibility = JSON.parse(localStorage.getItem('visibility') || 'false');
    const formData = new FormData();
    if (reportData.phone) formData.append('phone', reportData.phone);
    if (reportData.title) formData.append('title', reportData.title);
    formData.append('description', reportData.description);
    formData.append('eventDate', reportData.eventDate);
    formData.append('latitude', reportLocation.lat);
    formData.append('longitude', reportLocation.lng);
    formData.append('visibility', visibility);
    value.forEach((file) => {
      formData.append('files', file);
    });
    createEventMutation.mutate({ data: formData });
  };

  const [isChecked, setIsChecked] = useState(false);

  return (
    <Container>
      <FileContainer>
        <Dropzone onDrop={onDrop} maxSize={5000000} multiple>
          {({ getRootProps, getInputProps }) => (
            <StyledDropzone {...getRootProps()}>
              <input {...getInputProps()} multiple />
              <p>{`Przeciągnij i upuść zdjęcia, lub kliknij aby wybrać pliki`}</p>

              <FontAwesomeIcon icon={faUpload} style={{ width: 200, height: 200 }} />
            </StyledDropzone>
          )}
        </Dropzone>
        <PreviewContainer>
          {value.map((file, index) => (
            <ImageContainer key={index}>
              <ImageComponent url={URL.createObjectURL(file)} onDelete={() => onRemoveFile(file)} />
            </ImageContainer>
          ))}
        </PreviewContainer>
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
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-height: 85vh;
  text-align: start;
  overflow-y: auto;
`;

const PreviewContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  max-height: 50vh;
  overflow-y: auto;
`;

const ImageContainer = styled.div`
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  height: fit-content;
  flex: 1;
  min-width: 20rem;
  background-color: ${({ theme }) => theme.colors.elements.light};
`;

const FileContainer = styled.div`
  margin-bottom: 1rem;
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

const StyledDropzone = styled.div`
  border: 2px dashed ${({ theme }) => theme.colors.elements.light};
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
  transition: border-color 0.3s;
  &:hover {
    border-color: ${({ theme }) => theme.colors.elements.dark};
  }
  color: ${({ theme }) => theme.colors.text.themeDark};
`;
