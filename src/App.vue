<template>
  <div id="app" :style="{ backgroundImage: 'url(' + currentBackground + ')' }">
    <!-- Barra de navegación mejorada -->
    <nav class="navbar navbar-expand-lg navbar-dark color-transition" :style="{ backgroundColor: currentColor }">
      <div class="container">
        <!-- Logo de tu aplicación -->
        <router-link to="/" class="navbar-brand">
          <img src="../public/MarvelLogo2.png" alt="Marvel Logo" style="width: 200px;">
        </router-link>
        <!-- Botón de hamburguesa para dispositivos móviles -->
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <!-- Menú de navegación -->
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ml-auto">
            <!-- Elementos del menú -->
            <li class="nav-item">
              <router-link to="/allcharacters" class="nav-link">Characters</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/allcomics" class="nav-link">Comics</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/allseries" class="nav-link">Series</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      backgrounds: [
        '/background1.jpg',
        '/background2.jpg',
        '/background3.jpg',
      ],
      currentIndex: 0,
      currentBackground: '/background1.jpg', // Fondo inicial
      colors: ['#4b0908', '#6a0c0b', '#aa0505', '#fbca03', '#b97d10'],
      currentIndexColor: 0,
      currentColor: '#e62429', // Rojo de Marvel inicial
    };
  },
  mounted() {
    // Cambia el fondo cada 3 segundos
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.backgrounds.length;
      this.currentBackground = this.backgrounds[this.currentIndex];
    }, 3000);

    // Cambia el color de la barra de navegación cada 1.5 segundos
    setInterval(() => {
      this.currentIndexColor = (this.currentIndexColor + 1) % this.colors.length;
      this.currentColor = this.colors[this.currentIndexColor];
    }, 1500);
  },
};
</script>

<style scoped>
/* Resto de tus estilos */
</style>
