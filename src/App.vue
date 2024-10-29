<script setup>
import { RouterLink, RouterView } from 'vue-router';
import './assets/common.scss';
import './assets/element-ui.scss';
import Snowflakes from "@/views/layout/Snowflakes.vue";
import Footer from "@/views/layout/AppFooter.vue"; // Import Footer
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/homePage"></RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
  <Snowflakes></Snowflakes>

  <!-- Thêm Footer vào đây -->
  <Footer></Footer>
</template>
