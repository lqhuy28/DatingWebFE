<template>
    <div class="layout-container">
      <!-- Sidebar -->
      <LoveBellSidebar /> <!-- Sidebar component without custom CSS -->
  
      <!-- Main content -->
      <div class="subscription-container">
        <h2 class="subscription-header">Gói Đăng Ký của tôi</h2>
        <hr>
        <!-- Grid for the Subscription Packages -->
        <div class="subscription-grid">
          <div></div> <!-- Empty cell for top-left corner -->
          <div class="package-header plus-header">LoveBell Plus</div>
          <div class="package-header gold-header">LoveBell Gold</div>
          <div class="package-header platinum-header">LoveBell Platinum</div>
  
          <!-- Feature Rows -->
          <div class="feature-title">Thích không giới hạn</div>
          <div class="package-feature">
            <span class="material-icons">check_circle</span>
          </div>
          <div class="package-feature">
            <span class="material-icons">check_circle</span>
          </div>
          <div class="package-feature">
            <span class="material-icons">check_circle</span>
          </div>
  
          <div class="feature-title">Xem ai Thích bạn</div>
          <div class="package-feature locked">
            <span class="material-icons">lock</span>
          </div>
          <div class="package-feature">
            <span class="material-icons">check_circle</span>
          </div>
          <div class="package-feature">
            <span class="material-icons">check_circle</span>
          </div>
  
          <div class="feature-title">Lượt Thích ưu tiên</div>
          <div class="package-feature locked">
            <span class="material-icons">lock</span>
          </div>
          <div class="package-feature locked">
            <span class="material-icons">lock</span>
          </div>
          <div class="package-feature">
            <span class="material-icons">check_circle</span>
          </div>
  
          <div class="feature-title">Quay lại không giới hạn</div>
          <div class="package-feature">
            <span class="material-icons">check_circle</span>
          </div>
          <div class="package-feature">
            <span class="material-icons">check_circle</span>
          </div>
          <div class="package-feature">
            <span class="material-icons">check_circle</span>
          </div>
  
          <div class="feature-title">1 lượt Tăng tốc miễn phí mỗi tháng</div>
          <div class="package-feature locked">
            <span class="material-icons">lock</span>
          </div>
          <div class="package-feature locked">
            <span class="material-icons">lock</span>
          </div>
          <div class="package-feature">
            <span class="material-icons">check_circle</span>
          </div>
  
          <!-- Pricing Buttons -->
          <div></div> <!-- Empty cell for spacing -->
          <div class="price-button pink">Có giá từ 31.500 đ</div>
          <div class="price-button gold">Có giá từ 50.400 đ</div>
          <div class="price-button black">Có giá từ 93.600 đ</div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import LoveBellSidebar from "@/views/sidebar/LoveBellSidebar.vue";
  
  export default {
    data() {
      return {
        selectedPackage: 'plus', // default package
      };
    },
    components: {
      LoveBellSidebar,
    },
  };
  </script>
  
  <style scoped>
/* Layout container to place sidebar and content side by side */
.layout-container {
  display: flex;
  flex-direction: row; /* Sidebar and main content aligned horizontally */
  align-items: flex-start; /* Align both items at the top */
}

/* Sidebar styling */
.sidebar {
  width: 250px; /* Fixed width for sidebar */
  padding: 20px;
}

/* Main content styles */
.subscription-container {
  flex-grow: 1; /* Allow main content to take remaining space */
  padding: 20px;
}

.subscription-header {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
  padding: 20px;
}

.subscription-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 10px;
  justify-items: center;
  align-items: center;
}

.package-header {
  font-weight: bold;
  padding: 20px;
  border-radius: 20px;
  color: black;
  font-size: 18px;
  text-align: center;
  width: 60%;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Creates a soft shadow for 3D effect */
  transition: transform 0.3s ease; /* Adds slight animation on hover */
}

.package-header:hover {
  transform: translateY(-5px); /* Creates a lifting effect when hovering */
}

/* 3D-like gradient styles */
.plus-header {
  background: linear-gradient(135deg, #ffccf9 0%, #ffb6c1 100%);
  box-shadow: 0 4px 15px rgba(255, 182, 193, 0.5); /* Adds more shadow for 3D depth */
}

.gold-header {
  background: linear-gradient(135deg, #ffd700 0%, #fffacd 100%);
  box-shadow: 0 4px 15px rgba(255, 215, 0, 0.5); /* Gold gradient with soft shadows */
}

.platinum-header {
  background: linear-gradient(135deg, #d3d3d3 0%, #f0f0f0 100%);
  box-shadow: 0 4px 15px rgba(192, 192, 192, 0.5); /* Silver/gray gradient with shadow */
}

.feature-title {
  font-weight: bold;
  text-align: left;
  font-size: 18px;
  padding: 20px;
}

.package-feature {
  font-size: 18px;
}

.locked {
  color: gray;
}

.material-icons {
  font-size: 30px; /* Change size if needed */
  color: #4caf50; /* Adjust color to green for check marks */
}

.locked .material-icons {
  color: gray; /* Gray color for locked items */
}

/* Pricing button common styles */
.price-button {
  padding: 15px;
  border-radius: 25px;
  font-weight: bold;
  color: white;
  text-align: center;
  width: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); /* Adds soft shadow for depth */
}

/* Button hover effect to enhance 3D feel */
.price-button:hover {
  transform: translateY(-5px); /* Lifts button on hover */
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2); /* Deepens shadow on hover */
}

/* Specific styles for each button */
.pink {
  background: linear-gradient(135deg, #ff70a1, #ff4081);
  box-shadow: 0 4px 15px rgba(255, 64, 129, 0.4);
}

.gold {
  background: linear-gradient(135deg, #ffd700, #ffcc00);
  box-shadow: 0 4px 15px rgba(255, 204, 0, 0.4);
}

.black {
  background: linear-gradient(135deg, #2c2c2c, #3a3a3a);
  box-shadow: 0 4px 15px rgba(58, 58, 58, 0.4);
}
  </style>
  