<template>
  <div class="forecast-card">
    <div class="forecast-title">☁ Прогноз на 7 дней</div>
    <div class="forecast-list">
      <div v-for="period in Periods" :key="period" class="forecast-item">
        <span class="forecast-day today">{{ getDayName(period.dateTimeISO) }}</span>
        <span class="forecast-icon">
          <img 
              :src="`https://cdn.aerisapi.com/wxicons/v2/${period.icon}`" 
              :alt="period.weather"
              style="width: 75%;"
          />
        </span>
        <div class="forecast-bar-wrap"><div class="forecast-bar" style="width:30%; margin-left:20%"></div></div>
        <div class="forecast-temps">
          <span class="forecast-min">{{ Math.round(period.minTempC) }}°C</span>
          <span class="forecast-max">{{ Math.round(period.maxTempC) }}°C</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const Periods = ref([])
const API_KEY = import.meta.env.VITE_WEATHER_KEY
const API_ID = import.meta.env.VITE_CLIENT_ID

onMounted(async()=>{
  const res = await fetch(`https://data.api.xweather.com/forecasts/ashgabat,turkmenistan?format=json&filter=day&limit=7&fields=periods.dateTimeISO,periods.minTempC,periods.maxTempC,periods.weather,periods.icon&client_id=${API_ID}&client_secret=${API_KEY}`)
  const data = await res.json()
  console.log(data)
  Periods.value = data.response[0].periods.slice(0, 7)
})

const getDayName = (isoString) => {
  if (!isoString) return '';
  const date = new Date(isoString);
  const dayName = date.toLocaleDateString('ru-RU', { weekday: 'short' });
  return dayName.charAt(0).toUpperCase() + dayName.slice(1);
};

</script>

<style scoped></style>