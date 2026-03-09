<template>
  <div id="stars" class="stars-container">
    <div 
      v-for="(star, index) in stars" 
      :key="index"
      class="star"
      :style="star.style"
    ></div>
  </div>

  <div class="blob blob-1"></div>
  <div class="blob blob-2"></div>
  <div class="blob blob-3"></div>

  <div class="app">
    <SearchBar />
    <MainWeatherCard />
    <StatsRow />
    <ForecastList />
    <SunTimes />
  </div>
</template>

<script setup>
import ForecastList from './components/ForecastList.vue';
import MainWeatherCard from './components/MainWeatherCard.vue';
import SearchBar from './components/SearchBar.vue';
import StatsRow from './components/StatsRow.vue';
import SunTimes from './components/SunTimes.vue';

import { ref, onMounted, onUnmounted } from 'vue';

const stars = ref([]);

const generateStars = () => {
  const colors = ['#ffffff', '#fff4ea', '#eaf4ff']; 
  const tempStars = [];
  for (let i = 0; i < 1000; i++) {
    const isLarge = Math.random() > 0.7;
    const size = isLarge ? '3px' : '1.5px';
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    tempStars.push({
      style: {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        backgroundColor: color,
        boxShadow: isLarge ? `0 0 5px ${color}` : 'none', 
        '--d': `${3 + Math.random() * 5}s`,
        '--o': `${0.3 + Math.random() * 0.5}`,
        animationDelay: `${Math.random() * 5}s`,
        width: size,
        height: size
      }
    });
  }
  stars.value = tempStars;
};

onMounted(() => {
  generateStars();
});
</script>

<style scoped>

</style>
