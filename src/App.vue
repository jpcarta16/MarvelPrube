<template>
  <div id="app">
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
      colors: ['#4b0908', '#6a0c0b', '#aa0505', '#fbca03', '#b97d10'],
      currentIndex: 0,
      currentColor: '#e62429', // Rojo de Marvel inicial
    };
  },
  mounted() {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.colors.length;
      this.currentColor = this.colors[this.currentIndex];
    }, 1500);
  },
};
</script>

<style scoped>
/* Estilos para los elementos del menú de navegación */
.navbar-nav .nav-link {
  color: #fff;
  /* Texto blanco */
  font-weight: bold;
  /* Añadido para enfatizar los elementos */
  transition: color 0.3s;
  /* Efecto de transición al pasar el cursor */
  margin-right: 20px;
  /* Espacio entre elementos */
}

/* Estilos de hover para los elementos del menú */
.navbar-nav .nav-link:hover {
  color: #f0f0f0;
  /* Color de texto al pasar el cursor */
}

/* Estilos para el botón de hamburguesa (para dispositivos móviles) */
.navbar-toggler-icon {
  background-color: #fff;
}

/* Estilos para el botón de hamburguesa al pasar el cursor */
.navbar-toggler:hover .navbar-toggler-icon {
  background-color: #f0f0f0;
}

.color-transition {
  transition: background-color 1s ease-in-out;
}
</style>
