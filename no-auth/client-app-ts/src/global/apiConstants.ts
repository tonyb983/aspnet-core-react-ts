const baseUrl = "localhost"
const port = "8080";
const forecastApi = 'weatherforecast';

const allForecasts = () => `https://${baseUrl}:${port}/${forecastApi}/`;

const urls = {
    allForecasts
}

const Global  = {
    baseUrl,
    port,
    forecastApi,
    urls
}

export default Global;