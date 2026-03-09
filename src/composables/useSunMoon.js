import { ref } from "vue";

export function useSunMoon() {
    const SunMoon = ref(null);
    const SunMoonLoading = ref(false); 

    async function fetchSunMoon(city) { 
        SunMoonLoading.value = true;
        try {
            const API_KEY = import.meta.env.VITE_WEATHER_KEY;
            const API_ID = import.meta.env.VITE_CLIENT_ID;
            
            const res = await fetch(`https://data.api.xweather.com/sunmoon/${city}?format=json&filter=day&limit=1&client_id=${API_ID}&client_secret=${API_KEY}`);
            const data = await res.json();
            console.log('SunMoon',data)
            if (data.success) {
                SunMoon.value = data.response[0];
            }
        } catch (e) {
            console.error(e);
        } finally {
            SunMoonLoading.value = false;
        }
    }
    return { SunMoon, SunMoonLoading, fetchSunMoon };
}