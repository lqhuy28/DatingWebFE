<template>
  <div class="layout">
    <!-- Sidebar -->
    <LoveBellSidebar />

    <!-- Main Content -->
    <div class="profile-edit">
      <!-- Header -->
      <h1>Chỉnh sửa trang cá nhân</h1>

      <!-- Profile section -->
      <div class="profile-section">
        <img :src="require('@/assets/logo.png')" alt="Profile Picture" class="profile-img" />
        <div class="profile-info">
          <h2>{{ name }}</h2>
          <p>{{ username }}</p>
        </div>
        <button class="change-btn">Edit Image</button>
      </div>

      <!-- Form section -->
      <div class="form-section">
        <!-- Input fields -->
        <div class="input-field">
          <label for="name">Name</label>
          <input type="text" id="name" v-model="profile.name" />
        </div>

        <div class="input-field">
          <label for="username">Username</label>
          <input type="text" id="username" v-model="profile.username" />
        </div>

        <div class="input-field">
          <label for="address">Address</label>
          <input type="text" id="address" v-model="profile.address" />
        </div>

        <div class="input-field">
          <label for="phone">Phone</label>
          <input type="text" id="phone" v-model="profile.phone" />
        </div>

        <div class="input-field">
          <label for="age">Age</label>
          <input type="number" id="age" v-model="profile.age" />
        </div>

        <div class="input-field">
          <label for="email">Email</label>
          <input type="text" id="email" v-model="profile.email" />
        </div>

        <div class="input-field">
          <label for="bio">Bio</label>
          <textarea id="bio" rows="3" v-model="profile.bio"></textarea>
          <div class="char-count">{{ charCount }}</div>
        </div>

        <div class="gender-selection">
          <label for="gender">Gender</label>
          <div class="options">
            <button :class="{ selected: profile.gender === 'MALE' }" @click="selectGender('MALE')">MALE</button>
            <button :class="{ selected: profile.gender === 'FEMALE' }" @click="selectGender('FEMALE')">FEMALE</button>
            <button :class="{ selected: profile.gender === 'OTHER' }" @click="selectGender('OTHER')">OTHER</button>
          </div>
        </div>

        <div class="input-field">
          <button class="save-btn" @click="saveProfile">SAVE</button>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
  import LoveBellSidebar from "@/views/sidebar/LoveBellSidebar.vue";
  import { editUserProfile } from "@/services/editProfile-service"; // Import the API service
  
  export default {
    name: "ProfileEdit",
    data() {
      return {
        profile: {
          name: "",
          username: "",
          address: "",
          phone: "",
          age: "",
          email: "",
          bio: "",
          gender: "",
        },
        charLimit: 150,
      };
    },
    computed: {
      charCount() {
        return `${this.profile.bio.length} / ${this.charLimit}`;
      },
    },
    components: {
      LoveBellSidebar,
    },
    methods: {
  selectGender(selectedGender) {
    // Ensure the gender value is uppercase
    this.profile.gender = selectedGender.toUpperCase();  // Convert gender to uppercase before sending to backend
  },
  async saveProfile() {
    try {
      const profileData = {
        name: this.profile.name,
        age: this.profile.age,
        bio: this.profile.bio,
        gender: this.profile.gender,  // Send the updated gender
      };

      // Use profileData instead of this.profile in the API call
      await editUserProfile(this.profile.email, profileData);  // Just call the function without assigning it to a variable
      alert("Profile updated successfully!");
    } catch (error) {
      alert("Error updating profile: " + error.message);
    }
  }

},
  };
  </script>
  
  <style scoped>

  /* Layout for sidebar and main content */
  template{
    overflow-y: hidden; /* Tắt tính năng cuộn */
    width: 100%;
    height: 100%; /* Đảm bảo trang chiếm toàn bộ chiều cao */
    margin: 0; /* Xóa khoảng cách mặc định */
    padding: 0;
  }
  .layout {
    display: flex;
    height: 100vh; /* Đảm bảo layout chiếm toàn bộ chiều cao màn hình */
    overflow: hidden; /* Tắt cuộn dọc cho layout */
  }
  
  /* Sidebar */
  .sidebar {
    width: 300px;
    background-color: #ff85a1;
    position: fixed; /* Giữ sidebar cố định */
    height: 100vh; /* Độ cao toàn màn hình */
    top: 0;
    left: 0;
    overflow-y: auto; /* Nếu nội dung sidebar quá dài */
  }
  
  /* Main Profile Edit Container */
  .profile-edit {
    flex-grow: 1;
    padding: 40px;
    background-color: #f5f5f5;
    display: flex;
    flex-direction: column;
    max-width: 1000px;
    margin: auto;
    margin-left: 320px; /* Khoảng cách từ bên trái để tránh sidebar */
    height: 100vh;
    overflow-y: auto; /* Chỉ cuộn phần nội dung chính */
  }
  
  /* Header */
  h1 {
    font-size: 24px;
    margin-bottom: 30px;
  }
  
  /* Profile Section */
  .profile-section {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
  }
  
  .profile-img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
  }
  
  .profile-info {
    margin-left: 20px;
  }
  
  .profile-info h2 {
    margin: 0;
    font-size: 24px;
    font-weight: bold;
  }
  
  .profile-info p {
    margin: 5px 0px;
    font-size: 16px;
  }
  
  .change-btn {
    background-color: #0099ff;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-left: auto;
  }
  
  .change-btn:hover {
    background-color: #007ecb;
  }
  
  /* Form Section */
  .form-section {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
  }
  
  /* Input Fields */
  .input-field {
    margin-bottom: 20px;
  }
  
  .input-field label {
    display: block;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 8px;
    text-align: left;
    color: #000;
  }
  
  input[type='text'], input[type='number'],
  textarea {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 10px;
  }
  
  textarea {
    resize: none;
  }
  
  .char-count {
    font-size: 12px;
    text-align: right;
    color: #777;
  }
  
  /* Toggle Section */
  .toggle-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  input[type='checkbox'] {
    width: 40px;
    height: 20px;
    appearance: none;
    background-color: #ccc;
    border-radius: 50px;
    position: relative;
    cursor: pointer;
    outline: none;
  }
  
  input[type='checkbox']:checked {
    background-color: gold;
  }
  
  input[type='checkbox']::before {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 16px;
    height: 16px;
    background-color: #fff;
    border-radius: 50%;
    transition: 0.2s;
  }
  
  input[type='checkbox']:checked::before {
    transform: translateX(20px);
  }
  
  .gender-selection {
    font-family: Arial, sans-serif;
    margin: 20px 0px;
    text-align: left;
  
  }
  
  .gender-selection label {
    font-size: 18px;
    color: #000;
    font-weight: bold;
  }
  
  .options {
    display: inline-block;
    padding: 20px;
  }
  
  button {
    padding: 10px 20px;
    margin-right: 10px;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    font-size: 16px;
    color: white;
    transition: background-color 0.2s;
  }
  
  button.selected {
    background-color: #727272;
    color: white;
  }
  
  button:not(.selected) {
    color: black;
  }
  
  .options button:nth-child(1) {
    background-color: #ff85a1;
  }
  
  .options button:nth-child(2) {
    background-color: #00a0f6;
  }
  
  .options button:nth-child(3) {
    background-color: #25f600;
  }
  
  button:hover {
    opacity: 0.8;
  }
  
  .save-btn {
    background-color: #4CAF50; /* Màu xanh lá */
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-size: 16px;
    width: 30%;
  }
  
  .save-btn:hover {
    background-color: #45a049; /* Màu xanh lá đậm hơn khi hover */
  }
  </style>
  