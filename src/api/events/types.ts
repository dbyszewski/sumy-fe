export interface Event {
  eventID: number;
  phone: string;
  title: string;
  description: string;
  eventDate: string;
  reportDate: string;
  status: 'pending' | 'accepted' | 'rejected';
  visibility: boolean;
  longitude: number;
  latitude: number;
  filesList: string[];
  user: {
    userID: number;
    userName: string;
  };
}

export type DownloadedImage = {
  data: Blob;
  contentType: string;
};

export type Position = {
  lat: number;
  lng: number;
};

export interface GetEventParams {
  eventID?: string | number;
}

export interface DownloadImageParams {
  eventID: string | number;
  fileID: string;
}

export type CreateEventInput = FormData;
