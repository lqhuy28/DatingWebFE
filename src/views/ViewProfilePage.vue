<template>
  <div>
    <div class="sidebarr">
      <!-- Left Sidebar (LoveBellSidebar) -->
      <div class="sidebar-content">
        <LoveBellSidebar />

        <!-- Right Content (Profile Header and Photo Grid) -->
        <div class="content">
          <!-- Profile Header -->
          <div class="profile-header">
            <img
              :src="profileData.avatar"
              alt="Profile Image"
              class="profile-image"
            />
            <div class="profile-info">
              <h2>{{ profileData.name }} - {{ profileData.age }}</h2>
              <h5>{{ profileData.gender }}</h5>
              <p>{{ profileData.bio }}</p>
              
              <button class="edit-profile" @click="showEditProfile = true">
                Chỉnh sửa trang cá nhân
              </button>
            
            </div>
           
          </div>

          <!-- Photo Grid -->
          <div class="photo-grid">
            <div
              v-for="(photo, index) in profileData.photos"
              :key="index"
              class="photo-item"
            >
              <img
                :src="photo.url"
                alt="Photo Thumbnail"
                class="photo-thumbnail"
                @click="openPhotoModal(photo.url)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal hiển thị trang chỉnh sửa -->
    <div v-if="showEditProfile" class="modal-overlay">
      <div class="modal-content">
        <!-- Nút X để đóng modal -->
        <button class="close-button" @click="showEditProfile = false">X</button>

        <ChangeProfilePage @close="showEditProfile = false" />
      </div>
    </div>

    <!-- Modal hiển thị ảnh lớn -->
    <div v-if="showPhotoModal" class="modal-overlay">
      <div class="modal-content">
        <button class="close-button" @click="showPhotoModal = false">X</button>
        <img :src="selectedPhoto" alt="Large Photo" class="large-photo" />
      </div>
    </div>
  </div>
</template>
<script>
import LoveBellSidebar from "@/views/sidebar/LoveBellSidebar.vue";
import ChangeProfilePage from "@/views/ChangeProfilePage.vue"; // Import trang chỉnh sửa
import { getMyProfile } from "@/services/viewProfile-service.js"; // Import hàm lấy profile
// import EventBus from '@/services/event-bus.js';
export default {
  data() {
    return {
      profileData: {
        avatar: "", // Avatar URL
        name: "", // Name
        age: "", // Age
        gender: "", // Gender
        bio: "", // Bio
        photos: [], // Photos array
      },
      showEditProfile: false, // Trạng thái hiển thị modal chỉnh sửa
      showPhotoModal: false, // Trạng thái hiển thị modal ảnh lớn
      selectedPhoto: "", // Ảnh được chọn để hiển thị lớn
    };
  },
  components: {
    LoveBellSidebar,
    ChangeProfilePage, // Đăng ký component trang chỉnh sửa
  },
  async mounted() {
    try {
      // Gọi API lấy thông tin profile người dùng
      const profileResponse = await getMyProfile();
      const profile = profileResponse.data; // Lấy data từ response

      // Gán dữ liệu từ API vào profileData
      this.profileData.avatar = profile.avatar || "Unnamed User";
      this.profileData.name = profile.name || "Unnamed User";
      this.profileData.age = profile.age || "Unknown";
      this.profileData.gender = profile.gender || "Unknown";
      this.profileData.bio = profile.bio || "No bio available";
      this.profileData.photos = profile.photos || [];
      
    } catch (error) {
      console.error("Error loading profile data:", error);
    }
  },
  methods: {
    openPhotoModal(photoUrl) {
      this.selectedPhoto = photoUrl;
      this.showPhotoModal = true;
    },
  },
};
</script>
<style>
/* Các style không thay đổi */
.sidebarr {
  flex-direction: column;
  height: 100vh;
}

.edit-profile {
  position: fixed; /* Vị trí cố định cho màn hình lớn */
  right: 30px;
  top: 100px;
  z-index: 100;
}

/* CSS cho màn hình nhỏ hơn */
@media (max-width: 1500px) {
  .edit-profile {
    position: static; /* Đổi sang vị trí static để nút nằm trong dòng chảy tự nhiên của phần tử */
    margin-top: 20px; /* Thêm khoảng cách phía trên nút */
    display: block; /* Đảm bảo nút hiển thị dưới dạng block */
    width: 100%; /* Cho nút chiếm toàn bộ chiều rộng */
    text-align: center; /* Căn giữa văn bản trong nút */
  }
}

.sidebar-content {
  display: flex;
  width: 100%;
  height: 100%;
}

.content {
  flex: 5;
  padding-left: 50px;
  padding-top: 50px;
}

/* Profile Header */
.profile-header {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  padding-left: 70px;
}

.profile-image {
  width: 170px;
  height: 170px;
  border-radius: 50%;
  margin-right: 20px;
}

.profile-info {
  font-size: x-large;
}

/* Photo Grid */
.photo-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Chia ảnh thành 3 cột */
  gap: 16px; /* Tăng khoảng cách giữa các ảnh */
  max-height: 650px; /* Giới hạn chiều cao */
  overflow-y: auto; /* Thêm thanh cuộn dọc khi vượt quá chiều cao */
  padding: 0 70px; /* Căn giữa lưới ảnh */
}

.photo-item {
    position: relative;
  overflow: hidden;
  border-radius: 12px;
  transition: transform 0.3s ease;
}
.photo-item:hover {
  transform: scale(1.05);
}
.photo-thumbnail {
  width: 90%;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
  cursor: pointer;
}

.photo-title {
  margin-top: 5px;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  color: #555;
}

/* Style cho modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 12px;
  max-width: 600px;
  width: 100%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  position: relative;
}

.modal-content {
  max-height: 90vh; /* Giới hạn chiều cao modal */
  overflow-y: auto; /* Thêm thanh cuộn dọc nếu nội dung vượt quá chiều cao */
}

/* Style cho nút X (close) */
.close-button {
  position: absolute;
  top: 10px;
  right: 15px;
  background-color: transparent;
  border: none;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
}

.close-button:hover {
  color: red;
}

/* Ảnh lớn trong modal */
.large-photo {
  max-width: 100%;
  height: auto;
  border-radius: 12px;
}
</style>
