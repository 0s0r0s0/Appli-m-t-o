import config from '../../app.config';
import '../scss/style.scss';

import mapboxgl, { LngLat } from 'mapbox-gl';

import jQuery from 'jquery';
import WeatherConditions from './WeatherConditions';
const $ = jQuery;

class App {
    constructor() {
        this.weatherStorages = {};

        this.loader = document.getElementById('loader');
        this.initMap();

    }

    start() {

    }

    initMap(){
        mapboxgl.accessToken = config.api.mapboxgl.accessToken;

        this.map = new mapboxgl.Map({
            container: 'map',
            zoom: 17,
            style: 'mapbox://styles/mapbox/satellite-streets-v11'
        });

        //ecouteur qui detecte lorsque la carte est chargé
        this.map.on('load', this.onMapLoad.bind(this) );

    }

    addUserMarker(lngLat){



        const domMarker = document.createElement('div');
        domMarker.classList.add('map-marker', 'map-tornado');
        domMarker.title = 'Vous êtes ici!!!';

        domMarker.addEventListener('click', this.onUserMarkerClick.bind(this));

        this.userMarker = new mapboxgl.Marker({
            element: domMarker,
            //offset: { x: -27, y:22 },

            // draggable: true,
        });
        this.userMarker
            .setLngLat(lngLat)
            .addTo(this.map);
    }

    //Callback
    positionsuccess(position){
        const lngLat = { lng: position.coords.longitude, lat: position.coords.latitude };




        $.ajax( {
            url: `https://api.darksky.net/forecast/${config.api.darksky.secretKey}/${lngLat.lat},${lngLat.lng}`,
            method:'GET',
            data: {
                lang: config.api.darksky.params.lang,
                units: config.api.darksky.params.units,
                exclude: 'hourly.daily.flags.alerts'
            },
            dataType: 'JSONP',
            crossDomain: true,
            success: (function(response) {
                this.weatherStorages.userLocation = {
                    time: Date.now(),
                    data: response
                };

                this.map.setCenter(lngLat);
                this.addUserMarker(lngLat);

            }).bind(this),
            error: function(error) {
                console.log(error.statusText);
            }
        });
    }

    // gestionnaire d'evenement

    onUserMarkerClick() {
        if(this.userMarker.getPopup()) {
            return;
        }
        const conditions = new WeatherConditions(this.weatherStorages.userLocation.data.currently)
        const userPopup = new mapboxgl.Popup({
            offset: 22,
            className: 'map-popup'
        });
        console.log(this.weatherStorages.userLocation.data);
        userPopup.setHTML(`

            <div class="popup-inner">
                <div>${conditions.summary}</div>
                <div>Températures: ${conditions.temperature}</div>
                <div class="map-marker map-${conditions.icon}"></div>
                <div class="map-marker" style="transform: rotate(${conditions.windBearing}deg)" >⬇ </div>
            </div>
        `);

        this.userMarker.setPopup(userPopup);

    }

    onMapLoad(){
        //affichage de la carte
        this.map.getContainer().style.display = 'block';
        //redessin de la carte
        this.map.resize();
        //localisation du client
        this.loader.style.display = 'none';
        navigator.geolocation.getCurrentPosition(this.positionsuccess.bind(this));
    }

}
const app = new App;

export default app;