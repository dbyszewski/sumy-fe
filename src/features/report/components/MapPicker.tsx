import axios from 'axios';
import { useEffect, useLayoutEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Position } from '@/api/events/types';
import { Button } from '@/components/Elements/Button';
import ButtonContainer from '@/components/Elements/LandingPage/ButtonContainer/ButtonContainer';
import { Map } from '@/components/Elements/Map';
import Nullable from '@/types/nullable';
import { getGeolocation } from '@/utils/geoHelper.tsx';

interface MapPickerProps {
  initialPosition?: Position;
}

export const MapPicker = ({ initialPosition }: MapPickerProps) => {
  const [currentPosition, setCurrentPosition] = useState<Nullable<Position>>(
    initialPosition || null
  );
  const [address, setAddress] = useState<string>('');
  const navigate = useNavigate();

  const handleNext = () => {
    localStorage.setItem('reportLocation', JSON.stringify(currentPosition));
    navigate('/report/files');
  };

  useLayoutEffect(() => {
    getGeolocation().then((position) => {
      setCurrentPosition(position);
    });
  }, []);

  useEffect(() => {
    if (currentPosition) {
      axios({
        method: 'GET',
        url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${currentPosition.lat},${currentPosition.lng}&key=AIzaSyD-vIAZx7ywuyHukcLw2qZlgm8CRceTOsc&language=pl`,
      })
        .then((response) => {
          setAddress(response.data.results[0].formatted_address);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [currentPosition]);

  return (
    <Container>
      <Label>Wybierz lokalizację zgłoszenia z mapy:</Label>
      <MapContainer>
        {currentPosition && (
          <Map currentPosition={currentPosition} setCurrentPosition={setCurrentPosition} />
        )}
      </MapContainer>
      <AddressContent>{address}</AddressContent>
      <ButtonContainer>
        <Link to="/report/data">
          <Button>Wstecz</Button>
        </Link>
        <Button disabled={!currentPosition} onClick={handleNext}>
          Dalej
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
  height: 100%;
  text-align: start;
`;

const MapContainer = styled.div`
  width: 100%;
  height: 50vh;
  border-radius: 1rem;
  overflow: hidden;
`;

const Label = styled.div`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  width: 100%;
  color: ${({ theme }) => theme.colors.text.themeDark};
  font-weight: bold;
`;

const AddressContent = styled.div`
  margin: 0.5rem auto 2rem;
  width: 100%;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text.themeDark};
`;
