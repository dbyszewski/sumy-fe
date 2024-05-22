import moment from 'moment';

export const formatDateTime = (dateString: string): string => {
  if (dateString == null) {
    return '';
  }
  const dateObject = moment(dateString);

  return dateObject.format('DD-MM-YYYY HH:mm:ss');
};
