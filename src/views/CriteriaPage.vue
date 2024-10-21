<template>
    <div class="container">
      <!-- Sidebar -->
      <LoveBellSidebar />
  
      <!-- Phần chi tiết tiêu chí -->
      <div class="criteria-page">
        <!-- Tiêu đề -->
        <div class="header">
          <h1>YOUR CRITERIA</h1>
          <p>These criteria will make it easier for you to find objects</p>
        </div>
    
        <!-- Các ô tiêu chí -->
        <div class="criteria-grid">
          <div class="criteria-item" v-for="item in criteria" :key="item.title">
            <img :src="item.image" :alt="item.title" />
            <h3>{{ item.title }}</h3>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
    import LoveBellSidebar from "@/views/sidebar/LoveBellSidebar.vue";
  
  export default {
    data() {
      return {
        criteria: [
          {
            title: "Hobby",
            image: "https://media.vov.vn/sites/default/files/styles/large/public/2022-03/cf.png.jpg", // Thay thế bằng hình ảnh thật
          },
          {
            title: "Age",
            image: "https://media.vov.vn/sites/default/files/styles/large/public/2022-03/cf.png.jpg", // Thay thế bằng hình ảnh thật
          },
          {
            title: "Location",
            image: "https://media.vov.vn/sites/default/files/styles/large/public/2022-03/cf.png.jpg", // Thay thế bằng hình ảnh thật
          },
          {
            title: "Sexual Orientation",
            image: "https://media.vov.vn/sites/default/files/styles/large/public/2022-03/cf.png.jpg", // Thay thế bằng hình ảnh thật
          },
        ],
      };
    },
  
    components: {
      LoveBellSidebar,
    },
  };
  </script>
  
  <style scoped>
  /* Flexbox để căn chỉnh sidebar và phần chính */
  .container {
    display: flex;
    align-items: flex-start;
  }
  
  /* Sidebar chiếm 20% chiều rộng */
  .container LoveBellSidebar {
    flex: 1;
    max-width: 20%;
  }
  
  /* Phần chi tiết tiêu chí */
  .criteria-page {
    flex: 4;
    padding: 20px;
    text-align: center;
    font-family: Arial, sans-serif;
  }
  
  .header h1 {
    color: #ff33cc;
    font-size: 36px;
  }
  
  .header p {
    color: #888;
    margin-top: 10px;
    font-size: 18px;
  }
  
  .criteria-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    margin-top: 40px;
  }
  
  .criteria-item {
    position: relative;
    text-align: center;
    border-radius: 10px;
    overflow: hidden;
  }
  
  .criteria-item img {
    width: 80%;
    height: auto;
    border-radius: 10px;
  }
  
  .criteria-item h3 {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    color: #ff33cc;
    font-size: 24px;
    background-color: rgba(255, 255, 255, 0.7);
    padding: 5px 10px;
    border-radius: 5px;
  }
  </style>
  