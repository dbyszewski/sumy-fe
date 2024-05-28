import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChangeEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Button } from '@/components/Elements/Button';
import ButtonContainer from '@/components/Elements/LandingPage/ButtonContainer/ButtonContainer.tsx';
import { axios } from '@/lib/axios';

interface FileInputProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: File | null;
  name: string;
  alt?: string;
}

export const FileSelect = ({ name, alt, value, ...rest }: FileInputProps) => {
  const navigate = useNavigate();

  const handleNext = async () => {
    // alert('File sent');
    const reportData = JSON.parse(localStorage.getItem('reportData'));
    const reportLocation = JSON.parse(localStorage.getItem('reportLocation'));
    try {
      const requestBody = {
        phone: 123456789,
        title: reportData.title,
        description: reportData.description,
        eventDate: reportData.eventDate,
        latitude: reportLocation.lat,
        longitude: reportLocation.lng,
      };
      console.log('requestBody', requestBody);
      const response = await axios.post('/events', requestBody);
      console.log('response', response);
      navigate('/');
      localStorage.clear();
    } catch (error) {
      alert('Wystąpił błąd podczas wysyłania zgłoszenia');
    } finally {
      console.log('finally');
    }
  };

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
      <ButtonContainer>
        <Link to="/report/location">
          <Button size="md" variant="primary">
            Wstecz
          </Button>
        </Link>
        <Button size="md" variant="primary" onClick={handleNext}>
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
  margin-top: 10;
`;

const FileContainer = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.div`
  font-size: 1rem;
  margin-bottom: 1rem;
  width: 100%;
`;
