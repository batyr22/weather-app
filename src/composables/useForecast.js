import { ref } from "vue";

export function useForecast() {
    const forecast = ref(null);
    const forecastLoading = ref(false); 

    async function fetchForecast(city) { 
        forecastLoading.value = true;
        try {
            const API_KEY = import.meta.env.VITE_WEATHER_KEY;
            const API_ID = import.meta.env.VITE_CLIENT_ID;
            
            const res = await fetch(`https://data.api.xweather.com/forecasts/${city}?format=json&filter=day&limit=7&client_id=${API_ID}&client_secret=${API_KEY}`);
            const data = await res.json();
            console.log('Forecast:',data)
            if (data.success) {
                forecast.value = data.response[0].periods[0];
            }
        } catch (e) {
            console.error(e);
        } finally {
            forecastLoading.value = false;
        }
    }
    return { forecast, forecastLoading, fetchForecast };
}