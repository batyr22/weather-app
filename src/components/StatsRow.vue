<template>
    <div v-if="forecastLoading">Loading...</div>
    <div v-else-if="forecast">
      <div class="stats-row">
      <div class="stat-card">
        <span class="stat-icon">💧</span>
        <span class="stat-value">{{ forecast?.humidity }}%</span>
        <span class="stat-label">Влажность</span>
      </div>
      <div class="stat-card">
        <span class="stat-icon">💨</span>
        <span class="stat-value">{{ forecast?.windSpeedKPH }}</span>
        <span class="stat-label">км/ч ветер</span>
      </div>
      <div class="stat-card">
        <span class="stat-icon">👁️</span>
        <span class="stat-value">{{Math.round(forecast?.visibilityKM)}} км</span>
        <span class="stat-label">Видимость</span>
      </div>
    </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useForecast } from '../composables/useForecast';

const { forecast, loading: forecastLoading, fetchForecast } = useForecast();
onMounted(() => {
  const city = 'ashgabat,turkmenistan';
  fetchForecast(city); 
});

</script>

<style scoped></style>