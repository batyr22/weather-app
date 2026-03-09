import { ref } from "vue";

export function useWeather() {
    const weather = ref(null);
    const loading = ref(false);
    const error = ref(null);

    async function fetchWeather(city) {
        loading.value = true;
        try {
            const API_KEY = import.meta.env.VITE_WEATHER_KEY;
            const API_ID = import.meta.env.VITE_CLIENT_ID;
            
            const res = await fetch(
                `https://data.api.xweather.com/conditions/${city}?format=json&client_id=${API_ID}&client_secret=${API_KEY}`
            );
            const data = await res.json();
            console.log('Weather',data)
            if (data.success && data.response.length > 0) {
                weather.value = data.response[0].periods[0];
            } else {
                error.value = "Данные не найдены";
            }
        
        } catch (e) {
            error.value = e;
        } finally {
            loading.value = false;
        }
    }

    return { weather, loading, error, fetchWeather };
}