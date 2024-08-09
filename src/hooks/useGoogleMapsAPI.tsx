// useGoogleMapsAPI.js
import { useJsApiLoader } from '@react-google-maps/api';

const useGoogleMapsAPI = () => {
  const apiKey = "AIzaSyAQXlMbN8IvHtMzQB6B-zxzqeH2XkKY9sM"; 
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
    libraries: ['places'],
  });
  return { isLoaded, loadError ,apiKey};
};

export default useGoogleMapsAPI;
