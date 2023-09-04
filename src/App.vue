<template>
  <div id="app" :style="{ backgroundImage: 'url(' + currentBackground + ')' }">
    <nav class="navbar navbar-expand-lg navbar-dark color-transition" :style="{ backgroundColor: currentColor }">
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
      currentBackground: '/background1.jpg',
      colors: ['#4b0908', '#6a0c0b', '#aa0505', '#fbca03', '#b97d10'],
      currentIndexColor: 0,
      currentColor: '#e62429',
    };
  },
  mounted() {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.backgrounds.length;
      this.currentBackground = this.backgrounds[this.currentIndex];
    }, 3000);

    setInterval(() => {
      this.currentIndexColor = (this.currentIndexColor + 1) % this.colors.length;
      this.currentColor = this.colors[this.currentIndexColor];
    }, 1500);
  },
};
</script>

<style scoped></style>
