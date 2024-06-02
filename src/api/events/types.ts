export interface Event {
  eventID: number;
  phone: string;
  title: string;
  userID: string;
  description: string;
  eventDate: string;
  reportDate: string;
  status: 'pending' | 'accepted' | 'rejected';
  visibility: boolean;
  longitude: number;
  latitude: number;
}

export type Position = {
  lat: number;
  lng: number;
};

export interface GetEventParams {
  eventID?: string | number;
}

export type CreateEventInput = FormData;
