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

export interface CreateEventInput {
  title: string;
  phone?: string;
  description: string;
  eventDate: string;
  longitude: number;
  latitude: number;
  visibility?: boolean;
}
