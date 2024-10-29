<template>
  <div class="criteria-container">
    <!-- Sidebar -->
    <LoveBellSidebar />

    <!-- Criteria Section -->
    <div class="criteria-page">
      <!-- Header -->
      <div class="criteria-header">
        <h1>YOUR CRITERIA</h1>
        <p>These criteria will make it easier for you to find objects</p>
      </div>

      <!-- Criteria Cards -->
      <div class="criteria-grid">
        <div class="criteria-item" v-for="item in criteria" :key="item.title">
          <img :src="item.image" :alt="item.title" class="criteria-image" />
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
          image:
            "https://media.vov.vn/sites/default/files/styles/large/public/2022-03/cf.png.jpg",
        },
        {
          title: "Age",
          image:
            "https://media.vov.vn/sites/default/files/styles/large/public/2022-03/cf.png.jpg",
        },
        {
          title: "Location",
          image:
            "https://media.vov.vn/sites/default/files/styles/large/public/2022-03/cf.png.jpg",
        },
        {
          title: "Sexual Orientation",
          image:
            "https://media.vov.vn/sites/default/files/styles/large/public/2022-03/cf.png.jpg",
        },
        {
          title: "Orientation",
          image:
            "https://media.vov.vn/sites/default/files/styles/large/public/2022-03/cf.png.jpg",
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
/* Flexbox layout for sidebar and main content */
.criteria-container {
  display: flex;
  align-items: flex-start;
  background-color: #f8f8f8;
}

/* Criteria Section */
.criteria-page {
  flex: 4;
  padding: 40px;
  text-align: center;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  animation: criteria-fadeIn 1s ease;
}

/* Header Styling */
.criteria-header h1 {
  color: #e91e63;
  font-size: 42px;
  margin-bottom: 10px;
  animation: criteria-slideDown 1s ease;
  font-weight: bold;
}

.criteria-header p {
  color: #666;
  font-size: 18px;
  margin-top: 10px;
}

/* Criteria Grid */
.criteria-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 30px;
  margin-top: 40px;
}

/* Criteria Card Styling */
.criteria-item {
  position: relative;
  text-align: center;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  background-color: #fff;
}

.criteria-item:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.criteria-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px 10px 0 0;
  transition: opacity 0.3s ease;
}

.criteria-item h3 {
  color: #e91e63;
  font-size: 24px;
  background-color: rgba(255, 255, 255, 0.85);
  padding: 10px;
  border-radius: 0 0 10px 10px;
  margin: 0;
  transition: background-color 0.3s;
}

.criteria-item:hover h3 {
  background-color: #ffebee;
}

/* Animations */
@keyframes criteria-fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes criteria-slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
