import axios from "axios";

// declare var google: any;

const GOOGLE_API_KEY = 'GOOGLE_API_KEY';

type GoogleGeocodingResponse = {
    results: {
        geometry: {
            location: {
                lat: number,
                lng: number
            }
        }
    }[],
    status: 'OK' | 'ZERO_RESULTS'
};

type MapCoordinates = {
    lat: number,
    lng: number
}

let map;
const initMap = async(coordinates: MapCoordinates): Promise<void> => {
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
  const { Marker } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

  // The map, centered at Uluru
  map = new Map(
    document.getElementById('map') as HTMLElement,
    {
      zoom: 16,
      mapId: 'DEMO_MAP_ID',
    }
  );

  // The marker, positioned at Uluru
  const marker = new Marker({
    position: coordinates,
    title: 'Uluru'
  });

  marker.setMap(map);
  map.setCenter(coordinates);
}

const searchAddressHandler = (event: Event) => {
    event.preventDefault();
    const input = document.getElementById('address')! as HTMLInputElement;
    const address = input.value;

    axios.get<GoogleGeocodingResponse>(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(address)}&key=${GOOGLE_API_KEY}`)
        .then(resp => {
            if (resp.data.status !== 'OK') {
                throw new Error('Could not fetch location');
            }

            const coordinates: MapCoordinates = resp.data.results[0].geometry.location;
            initMap(coordinates);
            

            console.log(coordinates);
        })
        .catch( error => {
            alert(error.message);
            console.log(error);
        });
}

const form = document.querySelector('form');
form?.addEventListener('submit', searchAddressHandler);