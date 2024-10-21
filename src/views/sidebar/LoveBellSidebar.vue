<template>
  <div class="lovebell-sidebar">
    <ul class="menu">
      <li class="menu-item-title">
        <span>LOVE-BELL</span>
      </li>
      
      <!-- Link to Home -->
      <li class="menu-item">
        <router-link to="/homePage" class="menu-link">
          <i class="material-icons">home</i>
          <span>Home</span>
        </router-link>
      </li>

      <!-- Link to Search -->
      <li class="menu-item">
        <router-link to="/mapPage" class="menu-link">
          <i class="material-icons">map</i>
          <span>Mapping</span>
        </router-link>
      </li>

      <!-- Link to Criteria -->
      <li class="menu-item">
        <router-link to="/criteriaPage" class="menu-link">
          <i class="material-icons">filter</i>
          <span>Criteria</span>
        </router-link>
      </li>

      <!-- Link to Notifications -->
      <li class="menu-item">
        <router-link to="/notification" class="menu-link">
          <i class="material-icons">notifications</i>
          <span>Notification</span>
        </router-link>
      </li>

      <!-- Link to Messages -->
      <li class="menu-item">
        <router-link to="/chattingPage" class="menu-link">
          <i class="material-icons">chat</i>
          <span>Message</span>
        </router-link>
      </li>

      <!-- Link to Dating Place -->
      <li class="menu-item">
        <router-link to="/cafePage" class="menu-link">
          <i class="material-icons">coffee</i>
          <span>Dating Place</span>
        </router-link>
      </li>

      <!-- Link to Safety -->
      <li class="menu-item">
        <router-link to="/youAreSafePage" class="menu-link">
          <i class="material-icons">warning</i>
          <span>You Are Safe</span>
        </router-link>
      </li>

      <!-- Link to Safety -->
      <li class="menu-item">
        <router-link to="/getLocation" class="menu-link">
          <i class="material-icons">location_on</i>
          <span>Location</span>
        </router-link>
      </li>

      <!-- Profile Link -->
      <li class="menu-item profile">
        <router-link to="/profile" class="menu-link">
          <img :src="require('@/assets/logo.png')" alt="Profile Image" class="profile-img"/>
          <span>My Profile</span>
        </router-link>
      </li>

      <!-- Link to More Options (Dropdown) -->
      <li class="menu-item see-more" @click="toggleMoreOptions">
        <i class="material-icons">menu</i>
        <span>Xem thêm</span>
      </li>

      <!-- More Options Dropdown -->
      <ul v-if="showMoreOptions" class="dropdown dropdown-reverse">
        <li class="dropdown-item">
          <router-link to="/settings" class="menu-link">
            <i class="material-icons">settings</i>
            <span>Cài đặt</span>
          </router-link>
        </li>
        <li class="dropdown-item">
          <router-link to="/activity" class="menu-link">
            <i class="material-icons">history</i>
            <span>Hoạt động của bạn</span>
          </router-link>
        </li>
        <li class="dropdown-item">
          <router-link to="/saved" class="menu-link">
            <i class="material-icons">bookmark</i>
            <span>Đã lưu</span>
          </router-link>
        </li>
        <li class="dropdown-item">
          <router-link to="/report" class="menu-link">
            <i class="material-icons">report_problem</i>
            <span>Báo cáo sự cố</span>
          </router-link>
        </li>
        <li class="dropdown-item" @click="handleLogout">
            <i class="material-icons" >logout</i>
            <span>Đăng xuất</span>
        </li>
      </ul>
    </ul>
  </div>
</template>
<script>
import { logoutUser } from '@/services/logout-service'; // Import dịch vụ logout

export default {
  name: 'LoveBellSidebar',
  data() {
    return {
      showMoreOptions: false // Trạng thái ẩn/hiện của danh sách "Xem thêm"
    };
  },
  methods: {
    toggleMoreOptions() {
      this.showMoreOptions = !this.showMoreOptions; // Thay đổi trạng thái khi nhấp vào
    },
    async handleLogout() {
      try {
        const token = localStorage.getItem('userToken'); // Lấy token từ localStorage
        if (!token) {
          alert('No token found. Please log in first.');
          return;
        }

        // Gọi API logout
        const response = await logoutUser(token);
        alert(response.message);

        if (response.status === 200) {
          // Xóa token và chuyển hướng về trang login
          localStorage.removeItem('userToken');
          localStorage.removeItem('userEmail');
          this.$router.push('/'); // Chuyển hướng người dùng về trang login hoặc trang chủ
        }
      } catch (error) {
        alert('Logout failed: ' + error.message);
      }
    }
  }
};
</script>
<style>
.lovebell-sidebar {
  background-color: #ff85a1;
  width: 300px;
  color: #000;
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100vh - 56px);
}

.menu {
  list-style-type: none;
  padding: 0;
  flex-grow: 1;
}

.menu-item {
  padding: 15px 20px;
  font-size: 20px;
  font-weight: bold;
  display: block;
  width: 100%;
  cursor: pointer;
  color: #000;
}

.profile, .see-more {
  padding: 15px 20px;
  font-size: 20px;
  font-weight: bold;
  display: block;
  width: 30%;
  cursor: pointer;
  color: #000;
}

.menu-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.menu-item i {
  font-size: 27px;
  margin-right: 15px;
  color: #000;
}

.menu-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
}

.menu-item-title {
  padding: 35px;
  margin-left: 30px;
  font-size: 30px;
  font-family: 'Billabong', cursive;
}

.profile-img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 15px;
}

@media screen and (max-height: 764px) {
  .lovebell-sidebar{
    overflow-y: scroll;
  }
}


@media screen and (min-height: 764px) {
  .profile {
    position: absolute;
    bottom: 112px;
  }

  .see-more {
    position: absolute;
    bottom: 56px;
  }
}

.material-icons {
  font-size: 24px;
  margin-right: 15px;
}

/* Dropdown list styles */
.more-options {
  list-style-type: none;
  padding-left: 20px;
  margin-top: 10px;
}

.dropdown-item {
  padding: 10px 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.dropdown-item i {
  margin-right: 15px;
  font-size: 24px;
}

/* Cách dropdown hiển thị từ dưới lên */
.dropdown-reverse {
  position: absolute;
  bottom: 260px;
  background-color: #fff;
  width: 260px;
  list-style-type: none;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  margin: 0px 20px -150px 20px;
  font-size: 18px;
  font-weight: bold;
}

.dropdown-reverse .dropdown-item {
  padding: 15px 10px;
}

.dropdown-reverse .dropdown-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>