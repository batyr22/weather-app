<template>
  <div v-if="SunMoon && SunMoon.sun" class="sun-card">
    <div class="sun-item">
      <span class="sun-icon">🌅</span>
      <div>
        <span class="sun-label">Восход</span>
        <span class="sun-time">{{ formatTime(SunMoon.sun.riseISO) }}</span>
      </div>
    </div>
    
    <div class="sun-divider"></div>
    
    <div class="sun-item">
      <span class="sun-icon">🌇</span>
      <div>
        <span class="sun-label">Закат</span>
        <span class="sun-time">{{ formatTime(SunMoon.sun.setISO) }}</span>
      </div>
    </div>
  </div>
  
  <div v-else-if="SunMoonLoading" class="loading">Загрузка данных о солнце...</div>
</template>

<script setup>
import { onMounted } from 'vue'; 
import { useSunMoon } from '../composables/useSunMoon';

const { SunMoon, SunMoonLoading, fetchSunMoon } = useSunMoon()

onMounted(() => {
  const city = 'ashgabat,turkmenistan';
  fetchSunMoon(city);  
});

const formatTime = (isoString) => {
  if (!isoString) return '--:--';
  const date = new Date(isoString);
  return date.toLocaleTimeString('ru-RU', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
}

</script>

<style scoped></style>