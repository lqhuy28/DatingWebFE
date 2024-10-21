<template>
  <footer class="bg-secondary py-3">
    <div class="container text-center">
      <p class="mb-0 text-light">
        © {{ currentYear }} LoveBell. – Made with ❤ in Ho Chi Minh City
      </p>
    </div>
  </footer>
</template>

<script setup>

// Lấy năm hiện tại
const currentYear = new Date().getFullYear();
</script>

<style scoped>
footer {
  position: absolute;
  width: 100%;
  bottom: 0;
}
</style>