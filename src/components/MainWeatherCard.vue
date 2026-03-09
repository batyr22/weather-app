<template>
  <div v-if="weatherLoading || forecastLoading">Loading...</div>
  <div v-else-if="weather">
    <div class="main-card">
    <div class="city-row">
      <div>
        <div class="city-name">{{ weather.loc?.name || 'Ashgabat'}}</div>
        <div class="city-country">Туркменистан 🇹🇲</div>
      </div>
      <div class="local-time">
        <span class="time" id="clock">{{ currentTime }}</span>
        <span>{{ getDayName(weather.dateTimeISO) }}</span>
      </div>
    </div>

    <div class="weather-main">
      <div>
        <div class="temp-display">
          <span class="temp-big">{{ Math.round(weather?.tempC)}}</span>
          <span class="temp-unit">°C</span>
        </div>
        <div class="feels-like">Ощущается как <span>{{ Math.round(weather?.feelslikeC) }}</span></div>
        <div class="temp-range">
          <div class="temp-range-item">
            <span class="arrow-up">↑</span>
            <span class="val">{{ Math.round(forecast?.maxTempC) }}</span>
          </div>
          <div class="temp-range-item">
            <span class="arrow-down">↓</span>
            <span class="val">{{ Math.round(forecast?.minTempC) }}</span>
          </div>
        </div>
      </div>
      <div class="weather-icon-wrap">
        <div class="weather-icon">
          <img 
              :src="`https://cdn.aerisapi.com/wxicons/v2/${weather.icon}`" 
              :alt="weather.weather"
              class="weather-icon-img"
          />
        </div>
        <div class="weather-desc">{{ weather?.weather }}</div>
      </div>
      </div>
    </div>
  </div>
  <div v-else-if="error || 'Error'">Error...</div>
</template>

<script setup>
import {ref, onMounted, onUnmounted} from 'vue'; 
import { useWeather } from '../composables/useWeather';
import { useForecast } from '../composables/useForecast';

const { weather, loading: weatherLoading, fetchWeather } = useWeather()
const { forecast, loading: forecastLoading, fetchForecast } = useForecast();

onMounted(() => {
  const city = 'ashgabat,turkmenistan';
  fetchWeather(city);  
  fetchForecast(city); 
});

const getDayName = (isoString) => {
  if (!isoString) return '';
  const date = new Date(isoString);
  const dayName = date.toLocaleDateString('ru-RU', { weekday: 'long' });
  return dayName.charAt(0).toUpperCase() + dayName.slice(1);
};

const currentTime = ref('');
let clockInterval = null;

const updateClock = () => {
  const now = new Date();
  currentTime.value = now.getHours().toString().padStart(2, '0') + ':' +
                      now.getMinutes().toString().padStart(2, '0');
};

onMounted(() => {
  updateClock();
  clockInterval = setInterval(updateClock, 1000);

});

onUnmounted(() => {
  clearInterval(clockInterval);
});

</script>

<style scoped></style>