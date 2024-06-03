import Axios from 'axios';
import { toast } from 'react-hot-toast';

// import { API_URL } from '@/config';

const sourceMap = {
  userName: 'Nazwa użytkownika',
  email: 'Email',
  phone: 'Numer telefonu',
};

const detailMap = {
  string_pattern_mismatch: 'Niepoprawny format tekstu',
  value_error: 'Niepoprawna wartość',
};

type SourceMapKeys = keyof typeof sourceMap;
type DetailMapKeys = keyof typeof detailMap;

const sourceToDisplay = (source: SourceMapKeys) => {
  if (Object.keys(sourceMap).includes(source)) return sourceMap[source];

  return source;
};

const detailToDisplay = (detail: DetailMapKeys) => {
  if (Object.keys(detailMap).includes(detail)) return detailMap[detail];

  return detail;
};

const mapError = ({ source, detail }: { source: SourceMapKeys; detail: DetailMapKeys }) => {
  return `${sourceToDisplay(source)} - ${detailToDisplay(detail)}`;
};

export const apiClient = Axios.create({
  // TODO: Change this to the actual API URL
  baseURL: 'http://127.0.0.1:5000',
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('site');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    if (response.headers['content-type'] === 'application/octet-stream') {
      return {
        data: response.data,
        contentType: response.headers['content-type'],
      };
    }

    if (response.data?.result) return response.data.result;

    return response.data;
  },
  (error) => {
    if (error.code === 'ERR_NETWORK' || error.response.status === 500) {
      toast.error('Błąd serwera: something is no yes');
    }
    if (error.response.status === 422) {
      if (error.response.data.detail) {
        const errors = error.response.data.detail;
        errors.forEach(({ loc, type }: { loc: string[]; type: string }) => {
          toast.error(
            mapError({
              source: loc[loc.length - 1] as SourceMapKeys,
              detail: type as DetailMapKeys,
            })
          );
        });
      } else if (error.response.data.errors) {
        const errors = error.response.data.errors;
        errors.forEach(({ source, detail }: { source: string; detail: string }) => {
          toast.error(
            mapError({ source: source as SourceMapKeys, detail: detail as DetailMapKeys })
          );
        });
      } else {
        toast.error('Nieokreślony błąd walidacji');
      }
    }
    if (error.response.status === 403) {
      toast.error('Nie masz prawa');
    }
    if (error.response.status === 404) {
      toast.error('Nie znaleziono zasobu');
    }
    if (error.response.status === 418) {
      toast.error('Jesteś dzbanem i masz bana :)');
    }
    if (error.response.status === 401) {
      localStorage.removeItem('site');
      window.location.href = '/auth/login';
    }

    return Promise.reject(error);
  }
);
