export default class WeatherConditions {
    constructor( jsonWC ) {
        this.time = jsonWC.time;
        this.summary = jsonWC.summary;
        this.icon = jsonWC.icon;
        this.precipIntensity = jsonWC.precipIntensity;
        this.precipProbability = jsonWC.precipProbability;
        this.precipType = jsonWC.precipType;
        this.temperature = jsonWC.temperature;
        this.apparentTemperature = jsonWC.apparentTemperature;
        this.dewPoint = jsonWC.dewPoint;
        this.humidity = jsonWC.humidity;
        this.pressure = jsonWC.pressure;
        this.windSpeed = jsonWC.windSpeed;
        this.windGust = jsonWC.windGust;
        this.windBearing = jsonWC.windBearing;
        this.cloudCover = jsonWC.cloudCover;
        this.uvIndex = jsonWC.uvIndex;
        this.visibility = jsonWC.visibility;
        this.ozone = jsonWC.ozone;
    }
}
