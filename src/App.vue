<template>
  <div id="app">
    <header>
      <!-- Barra de navegación de Bootstrap -->
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
          <router-link to="/" class="navbar-brand">
            <img src="../public/MarvelLogo2.png" alt="Marvel Logo" style="width: 200px;">
          </router-link>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ml-auto">
              <li class="nav-item active">
                <router-link to="/allcharacters" class="nav-link">Characters</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/allcomics" class="nav-link">Comics</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/series" class="nav-link">Series</router-link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style scoped>
/* Estilos específicos para este componente */
/* Puedes agregar estilos globales aquí si es necesario */
</style>
