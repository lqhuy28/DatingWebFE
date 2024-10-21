<template>
    <div class="profile-container">
      <!-- Header -->
      <div class="header">
        <button class="back-button" @click="goBack">←</button>
        <h2>Profile</h2>
      </div>
  
      <!-- Profile Image Section -->
      <div class="profile-image-section">
        <img :src="profileImage" alt="Profile Image" class="profile-image" />
        <a href="#" class="edit-profile-image" @click="editProfileImage">Edit profile image</a>
      </div>
  
      <!-- Profile Info Section -->
      <div class="profile-info">
        <div class="profile-row">
          <label>Name</label>
          <span @click="editField('name')">{{ user.name }}</span>
        </div>
  
        <div class="profile-row">
          <label>Username</label>
          <span @click="editField('username')">{{ user.username }}</span>
        </div>
  
        <div class="profile-row">
          <label>Email</label>
          <span @click="editField('email')">{{ user.email }}</span>
        </div>
  
        <div class="profile-row">
          <label>Links</label>
          <div class="links">
            <p v-for="link in user.links" :key="link">{{ link }}</p>
            <a href="#" @click="addLink">+ Add link</a>
          </div>
        </div>
  
        <div class="profile-row">
          <label>Bio</label>
          <span @click="editField('bio')">{{ user.bio }}</span>
        </div>
  
        <!-- Gender Section -->
        <div class="profile-row">
          <label>Gender</label>
          <div class="gender-options">
            <button :class="{'selected': user.gender === 'male'}" @click="setGender('male')">male</button>
            <button :class="{'selected': user.gender === 'female'}" @click="setGender('female')">female</button>
            <button :class="{'selected': user.gender === 'other'}" @click="setGender('other')">other</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "ProfilePage",
    data() {
      return {
        profileImage: 'https://via.placeholder.com/100', // Đường dẫn tới ảnh đại diện
        user: {
          name: "Helena Hills",
          username: "@helenahills",
          email: "helenahills@gmail.com",
          links: [
            "Instagram.com/helenahills",
            "facebook.com/helenahills"
          ],
          bio: "A description of this user.",
          gender: "female", // Giá trị mặc định
        }
      };
    },
    methods: {
      goBack() {
        this.$router.go(-1); // Quay lại trang trước
      },
      editProfileImage() {
        alert("Edit profile image clicked");
        // Logic để thay đổi ảnh đại diện
      },
      editField(field) {
        alert(`Edit ${field} clicked`);
        // Logic để chỉnh sửa từng trường thông tin
      },
      addLink() {
        alert("Add link clicked");
        // Logic để thêm liên kết
      },
      setGender(gender) {
        this.user.gender = gender;
      }
    }
  };
  </script>
  
  <style scoped>
  
  </style>
  