import { GOOGLE_API_KEY } from './api-key';
import axios from 'axios';

const googleApiUrl = 'https://maps.googleapis.com/maps/api/geocode/json';

const form = document.querySelector('form')!;
const addresInput = document.getElementById('address') as HTMLInputElement;

// https://developers.google.com/maps/documentation/javascript/overview
const script = document.createElement('script');
script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}`;
document.body.appendChild(script);

// Partial expected shape of the json, for more details see:
// https://developers.google.com/maps/documentation/geocoding/start
// https://developers.google.com/maps/documentation/geocoding/overview#StatusCodes
type GoogleGeocodingResponse = {
  results: { geometry: { location: { lat: number; lng: number } } }[];
  status: 'OK' | 'ZERO_RESULTS';
};

function searchAddressHandler(ev: Event) {
  ev.preventDefault();
  const userEnteredAddress = addresInput.value;
  const encodedAddress = encodeURI(userEnteredAddress);
  axios
    .get<GoogleGeocodingResponse>(
      `${googleApiUrl}?address=${encodedAddress}&key=${GOOGLE_API_KEY}`
    )
    .then(response => {
      if (response.data.status !== 'OK') {
        throw new Error('Could not fetch location');
      }
      const coordinates = response.data.results[0].geometry.location;
      console.log(coordinates);
      const map = new google.maps.Map(document.getElementById('map')!, {
        center: coordinates,
        zoom: 17,
      });
      new google.maps.Marker({ position: coordinates, map });
    })
    .catch(err => {
      console.warn(err);
    });
}

form.addEventListener('submit', searchAddressHandler);
