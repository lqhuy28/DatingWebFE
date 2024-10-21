<template>
  <div class="app-wrapper">
    <!-- Sidebar component -->
    <LoveBellSidebar />

    <!-- Main content area (Radar and information) -->
    <div class="main-content">
      <!-- Page Title (same row as sidebar) -->
      <div class="page-title">
        <h2>LOVE BELL RADAR</h2>
      </div>
      <div class="content-map">
        <div class="radar-section">
          <div class="radar">
            <!-- Radar scanning line (always show when scanning) -->
            <div v-if="isScanning" class="scan-line"></div>

            <!-- Users displayed on the radar (show after the first round of scanning) -->
            <div v-if="showUsers">
              <div
                class="user"
                v-for="user in users"
                :key="user.id"
                :style="getUserPosition(user)"
                @click="showProfile(user)"
              ></div>
            </div>

            <!-- Center dot (your position) -->
            <div class="center-dot"></div>
          </div>
        </div>

        <!-- Information and button section -->
        <div class="info-section">
          <div class="info">
            <h3>Looking for someone?</h3>
            <p>{{ users.length }} users are close to you, let's find them !!</p>
            <p>Within {{ range }}m</p>
            <p>
              Make sure to look and check, then decide whether you should catch
              up with them!
            </p>
          </div>
          <button
            class="scan-btn"
            @click="startScanning"
            :disabled="isScanning"
          >
            {{ isScanning ? "Scanning..." : "Re-scanning" }}
          </button>

          <!-- Profile Popup (conditional rendering) -->
          <div v-if="selectedUser" class="modal-overlay-map"      >
            <div class="modal-content full-image-modal" @click.stop>
              <button class="close-button" @click="closeProfile">
                <i class="fas fa-times"></i>
              </button>
              <h2>{{ currentProfile.name }} - {{ currentProfile.age }}</h2>
              <p>{{ currentProfile.bio }}</p>
              <div class="images-wrapper">
                <div class="image-item" v-for="(image, index) in currentProfile.images" :key="index">
                  <img :src="image" :alt="'Photo ' + (index + 1)" class="profile-image-full" />
                  <span class="image-label">Photo {{ index + 1 }}</span>
                </div>
              </div>
              <div class="action-buttons-modal">
                <button class="button dislike-button" @click="dislike">
                  <i class="fas fa-times"></i>
                </button>
                <button class="button super-like-button" @click="superLike">
                  <i class="fas fa-star"></i>
                </button>
                <button class="button like-button" @click="like">
                  <i class="fas fa-heart"></i>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoveBellSidebar from "@/views/sidebar/LoveBellSidebar.vue";

export default {
  components: {
    LoveBellSidebar,
  },
  data() {
    return {
      range: 500, // Distance range
      users: [], // Store user positions
      isScanning: false, // Controls scanning animation
      showUsers: false, // Controls when to show the users
      selectedUser: null, // Stores the user clicked for profile display
      showInfo: true,
      currentProfile: {
        name: 'Le Quang Huy',
        age: 22,
        bio: 'This is a sample bio for you.',
        images: [
          'https://via.placeholder.com/200x200.png?text=Photo+1',
          'https://via.placeholder.com/200x200.png?text=Photo+2',
          'https://via.placeholder.com/200x200.png?text=Photo+3'
        ]
      }
    };
  },
  mounted() {
    this.randomizeUsers(); // Initialize random user positions when the app loads
  },
  methods: {
    getUserPosition(user) {
      // Convert user position to percentage of radar area
      const left = user.x * 100 + "%";
      const top = user.y * 100 + "%";
      return { left, top };
    },
    randomizeUsers() {
      // Create random user positions (x, y between 0 and 1)
      this.users = Array.from({ length: 6 }, () => ({
        id: Math.random().toString(36).substring(7), // Generate random ID
        x: Math.random(), // Random x position (0 to 1)
        y: Math.random(), // Random y position (0 to 1),
      }));
    },
    startScanning() {
      // Start scanning, enable the animation
      this.isScanning = true;
      this.showUsers = false; // Hide users initially
      this.selectedUser = null; // Hide any active profile

      // Randomize user positions
      this.randomizeUsers();

      // After 4 seconds (1 round of 4s animation), show users
      setTimeout(() => {
        this.showUsers = true; // Show users after 1 round
      }, 4000); // 1 round of scanning

      // After 8 seconds (2 rounds of 4s animation each), stop scanning
      setTimeout(() => {
        this.isScanning = false;
      }, 8000); // 2 rounds (4 seconds each round)
    },
    showProfile(user) {
      // Set the selected user to display their profile
      this.selectedUser = user;
    },
    closeProfile() {
      // Close the profile popup
      this.selectedUser = null;
    },
    getRandomDistance() {
      // Returns a random distance for user profile (for demo purposes)
      return Math.floor(Math.random() * 500) + 1;
    },
    closeModal() {
      this.showInfo = false;
    },
    dislike() {
      alert("Disliked!");
    },
    superLike() {
      alert("Super Liked!");
    },
    like() {
      alert("Liked!");
    }
  },
};
</script>

<style scoped>
/* Wrapper for the whole app */
.app-wrapper {
  display: flex;
  height: 100vh;
}

/* Sidebar */
.sidebar {
  width: 250px;
}

/* Main content area */
.main-content {
  display: flex;
  flex-direction: column; /* Bố trí theo cột cho tiêu đề và phần radar/info */
  flex: 1;
  padding-left: 20px; /* Thụt vào ngang với sidebar */
}

.page-title {
  display: flex;
  align-items: center;
  padding: 15px 40px;
  width: 50%; /* Nằm ngang với phần còn lại của nội dung */
}

.page-title h2 {
  font-size: 35px;
  color: #ff33cc;
  margin: 35px;
}

hr{
  border: none; /* Loại bỏ viền mặc định */
  height: 2px; /* Độ dày của hr */
  background-color: #ff66ff; /* Màu sắc */
  margin: 20px 0; /* Khoảng cách trên và dưới */
}

/* Content area below the title */
.content-map {
  display: flex;
  flex: 1;
  padding-top: 120px;
  margin-right: 100px;
}

/* Radar section */
.radar-section {
  flex: 1;
  display: flex;
  justify-content: center;
}

.radar {
  position: relative;
  width: 400px; /* Điều chỉnh kích thước radar */
  height: 400px; /* Điều chỉnh kích thước radar */
  border-radius: 50%;
  background-color: #d7f7f0;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-top: 0; /* Đảm bảo không có margin-top */
}

/* Center dot */
.center-dot {
  position: absolute;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #ff99ff;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* User dot on radar */
.user {
  position: absolute;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: #ffb6c1;
  cursor: pointer;
  transition: all 0.5s ease;
}

/* Radar scanning effect */
.scan-line {
  position: absolute;
  width: 50%;
  height: 4px;
  background-color: rgba(255, 0, 0, 0.5);
  top: 50%;
  left: 50%;
  transform-origin: 0% 0%;
  animation: rotate-scan 4s linear infinite;
}

@keyframes rotate-scan {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Information section and button */
.info-section {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.info {
  font-size: 21px;
}

.info h3{
  font-weight: bold;
  font-size: 35px;
}

.scan-btn {
  width: 30%;
  padding: 10px 20px;
  font-size: 20px;
  background-color: #ff99ff;
  border: none;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;
}

.scan-btn:disabled {
  background-color: #ddd;
}

.scan-btn:hover:not(:disabled) {
  background-color: #ff66ff;
}


/* Modal Overlay */
.modal-overlay-map {
  position: fixed;
  top: 0;
  left: 0;
  width: auto;
  height: auto;
background-color: white;  
display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  margin-left: 1000px;
  margin-top: 360px;
}

/* Modal Content */
.modal-content {
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  position: relative;
  max-width: 90%;
  max-height: 90%;
  overflow: auto;
  width: 700px;
}

/* Close Button */
.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
}

.close-button:hover {
  transform: scale(1.1);
}

.close-button:active {
  transform: scale(0.95);
}

/* Image Wrapper */
.images-wrapper {
  display: flex;
  gap: 20px;
  margin-top: 20px;
  justify-content: center;
}

.image-item {
  flex: 1;
  text-align: center;
  max-width: 200px;
}

.profile-image-full {
  width: 100%;
  height: auto;
  border-radius: 10px;
  object-fit: cover;
}

.image-label {
  margin-top: 5px;
  font-size: 14px;
}

.action-buttons-modal {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-top: 20px;
}

.button {
  position: relative;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: white;
  border: 3px solid #ddd; /* Thêm viền cho nút */
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}

.button::before {
  content: "";
  position: absolute;
  top: -3px;
  left: -3px;
  width: 66px;
  height: 66px;
  border-radius: 50%;
  background: linear-gradient(45deg, red, orange);
  z-index: -1;
}

.super-like-button::before {
  background: linear-gradient(45deg, blue, cyan);
}

.like-button::before {
  background: linear-gradient(45deg, green, lime);
}

.button:hover {
  transform: scale(1.1);
}

.button:active {
  transform: scale(0.95);
}

.button i {
  font-size: 1.5rem;
}

.dislike-button i {
  color: #ff5a5f;
}

.super-like-button i {
  color: #3498db;
}

.like-button i {
  color: #2ecc71;
}

.button:hover i {
  color: white;
}
</style>