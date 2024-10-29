<template>
  <div class="login-page-container">
    <div class="white-container">
      <div class="form-container">
        <!-- Fixed header -->
        <div class="fixed-header">
          <h2>Update Profile</h2>
          <p>Please update your profile to continue using the app</p>
        </div>

        <!-- Scrollable content -->
        <div class="scrollable-content">
          <!-- Preview uploaded images -->
          <div v-if="filePreviews.length > 0" class="image-preview-container">
            <div
              v-for="(preview, index) in filePreviews"
              :key="index"
              class="image-preview"
            >
              <img :src="preview" alt="Image preview" />
            </div>
          </div>

          <!-- File upload input -->
          <div class="upload-button-container">
            <label for="upload-image" class="custom-upload-button"
              >Upload Image</label
            >
            <input
              id="upload-image"
              type="file"
              @change="handleFileUpload"
              multiple
              style="display: none"
            />
          </div>

          <!-- Name input field -->
          <div class="input-field">
            <label for="username">Name:</label>
            <input
              type="text"
              v-model="name"
              placeholder="Name"
              class="string-input"
            />
          </div>
          <!-- Phone input field -->
          <div class="input-field">
            <label for="phone">Phone:</label>
            <input
              type="text"
              v-model="phone"
              placeholder="Phone"
              class="string-input"
              @input="phone = phone.replace(/\D/g, '').slice(0, 10)"
              maxlength="10"
            />
          </div>
          <!-- Age slider field -->
          <div class="age-slider-container">
            <label for="ageRange">
              Age: <strong>{{ age }}</strong>
            </label>
            <input
              type="range"
              v-model="age"
              min="18"
              max="100"
              class="age-slider"
              id="ageRange"
              @input="updateSliderStyle"
            />
          </div>

          <!-- Bio input field -->
          <div class="input-field">
            <label for="bio">Bio:</label>
            <textarea
              v-model="bio"
              :maxlength="bioMaxLength"
              placeholder="Bio"
              class="string-input bio-textarea"
              rows="4"
            ></textarea>
            <small class="char-counter">
              Remaining characters: {{ remainingBioChars }}
            </small>
          </div>

          <!-- Gender selection -->
          <div class="gender-selection input-field">
            <label for="gender">Gender:</label>
            <div class="options">
              <button
                :class="{ selected: gender === 'MALE' }"
                @click="selectGender('MALE')"
              >
                MALE
              </button>
              <button
                :class="{ selected: gender === 'FEMALE' }"
                @click="selectGender('FEMALE')"
              >
                FEMALE
              </button>
              <button
                :class="{ selected: gender === 'OTHER' }"
                @click="selectGender('OTHER')"
              >
                OTHER
              </button>
            </div>
          </div>
          <!-- Update profile button -->
          <button @click="handleChangeProfile" class="change-profile-button">
            Update Profile
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { updateProfile } from "@/services/update-profile-service";
import { ElNotification } from "element-plus"; // Thêm import ElNotification

export default {
  data() {
    return {
      name: "",
      phone: "",
      age: 50, // Default value for the slider
      bio: "",
      gender: "",
      files: [], // Tệp ảnh
      filePreviews: [], // Array to store preview URLs separately

      bioMaxLength: 150, // Max length for bio
      profileError: "", // Error message display
    };
  },
  methods: {
    selectGender(selectedGender) {
      this.gender = selectedGender.toUpperCase();
    },
    updateSliderStyle() {
      const slider = document.getElementById("ageRange");
      const percentage = ((this.age - 18) / (100 - 18)) * 100;
      slider.style.background = `linear-gradient(90deg, #ff4d95 ${percentage}%, #ccc ${percentage}%)`;
    },
    async handleChangeProfile() {
      // Kiểm tra các trường bắt buộc
      if (!this.name || !this.age || !this.bio || !this.gender) {
        this.profileError = "All fields are required.";
        ElNotification({
          title: "Error",
          message: "All fields are required.",
          type: "error",
        });
        return;
      }

      try {
        // Gọi updateProfile với FormData bao gồm thông tin và các file
        const response = await updateProfile(
          this.name,
          this.phone,
          this.age,
          this.bio,
          this.gender,
          this.files
        );

        ElNotification({
          title: response.status === 200 ? "Success" : "Error",
          message: response.message,
          type: response.status === 200 ? "success" : "error",
        });

        if (response.status === 200) {
          this.$router.push("/homePage");
        }
      } catch (error) {
        this.profileError = error.message;
        ElNotification({
          title: "Error",
          message: error.message,
          type: "error",
        });
      }
    },
    handleFileUpload(event) {
      this.files = Array.from(event.target.files); // Original file objects

      // Clear previous previews
      this.filePreviews = [];

      this.files.forEach((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => {
          // Store the preview in the separate filePreviews array
          this.filePreviews.push(reader.result);
        };
      });
    },
  },
  computed: {
    remainingBioChars() {
      return this.bioMaxLength - this.bio.length;
    },
  },
  mounted() {
    console.log("Mounted and ready");
    this.updateSliderStyle();
  },
};
</script>
<style>
.login-page-container {
  display: flex;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: #ff85a1;
  overflow: hidden;
  padding: 20px; /* Ensures padding when the screen is smaller */
  animation: fadeIn 1s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.white-container {
  display: flex;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 50px;
  max-width: 600px; /* Sets a maximum width */
  width: 100%; /* Ensures it fits within the screen */
  max-height: 90vh; /* Restricts maximum height to keep it within the viewport */
  overflow: hidden; /* Prevents the whole container from scrolling */
  margin-bottom: 50px;
}

.form-container {
  width: 100%;
  max-width: 500px;
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.fixed-header {
  text-align: center;
  background-color: #fff;
  padding: 20px;
  border-bottom: 1px solid #ddd;
  position: sticky; /* Fixes the header */
  top: 0;
  z-index: 1; /* Ensures it stays above the scrollable content */
}

.scrollable-content {
  padding: 20px;
  overflow-y: auto; /* Enables vertical scrolling */
  max-height: calc(
    80vh - 80px
  ); /* Adjusts the height to ensure content doesn't overflow */
}

.scrollable-content::-webkit-scrollbar {
  width: 8px;
}

.scrollable-content::-webkit-scrollbar-thumb {
  background-color: #ff4d95;
  border-radius: 4px;
}

.scrollable-content::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.fixed-header,
.scrollable-content {
  animation: slideInLeft 1s ease-out;
}

@keyframes slideInLeft {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.form-container h2 {
  color: #ff4d95;
  font-size: 30px;
  text-align: center;
}

.form-container p {
  color: #999;
  text-align: center;
  margin-bottom: 20px;
}

.string-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-size: 16px;
}

/* Update profile button styling */
.change-profile-button {
  width: 100%;
  padding: 15px;
  background-color: #ff4d95;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
}

.change-profile-button:hover {
  background-color: #ed94b8;
}

/* Age slider container styling */
.age-slider-container {
  width: 100%;
  margin: 20px 0;
}

.age-slider-container label {
  font-weight: bold;
}

.age-slider {
  width: 100%;
  appearance: none;
  height: 10px;
  background: linear-gradient(
    90deg,
    #ff4d95 0%,
    #ccc 0%
  ); /* Default background */
  border-radius: 5px;
  outline: none;
  transition: background 0.3s;
}

.age-slider:hover {
  opacity: 1;
}

.age-slider::-webkit-slider-thumb {
  appearance: none;
  width: 15px;
  height: 15px;
  background: #ff4d95;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid #fff; /* Add a white border to make it stand out */
  position: relative;
  z-index: 10; /* Ensure it stays above the track */
}

.age-slider::-moz-range-thumb {
  width: 15px;
  height: 15px;
  background: #ff4d95;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid #fff;
}

/* Gender selection styling */
.gender-selection {
  margin: 20px 0;
  font-size: 16px;
  font-weight: bold;
}

.gender-selection .options {
  display: flex;
  justify-content: space-around;
  gap: 15px;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.2s;
}

button.selected {
  background-color: #727272;
  color: black;
  font-weight: bold;
  animation: zoomIn 0.4s ease-in-out forwards;
}

@keyframes zoomIn {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.1);
  }
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
  transform: translateY(-5px);
  animation: bounce 0.3s ease-in-out;
}
@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

/* Bio textarea styling */
.bio-textarea {
  resize: vertical;
  font-size: 16px;
  line-height: 1.5;
  overflow-y: auto;
}

.char-counter {
  display: block;
  font-size: 10px;
  color: #666;
  text-align: right;
  margin-top: -10px;
}

.image-preview-container {
  display: flex;
  justify-content: center; /* Căn giữa theo chiều ngang */
  flex-wrap: wrap; /* Giúp các ảnh hiển thị thành nhiều dòng nếu cần */
  gap: 15px;
  margin-bottom: 15px;
}

.image-preview {
  width: 150px;
  height: 150px;
  display: flex;
  justify-content: center; /* Căn giữa nội dung bên trong (ảnh) */
  align-items: center; /* Căn giữa nội dung bên trong (ảnh) */
}

.image-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: 1px solid #ddd;
  border-radius: 50%;
}

.image-preview img:hover {
  transition: box-shadow 0.3s ease-in-out;
  box-shadow: 0 0 15px 5px rgba(255, 77, 149, 0.6);
}

.custom-upload-button {
  padding: 10px 20px;
  font-size: 14px;
  background-color: #ff4d95;
  color: white;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  transition: background-color 0.3s;
  text-align: center;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(255, 77, 149, 0.7);
  }
  70% {
    transform: scale(1.05);
    box-shadow: 0 0 15px 15px rgba(255, 77, 149, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(255, 77, 149, 0);
  }
}

.custom-upload-button:hover {
  background-color: #ed94b8;
}

.upload-button-container {
  display: flex;
  justify-content: center; /* Căn giữa theo chiều ngang */
  margin-bottom: 20px;
}

/* Upload Photos input styling */
.input-field {
  margin-bottom: 20px;
}

input[type="file"] {
  display: block;
  margin-top: 10px;
  cursor: pointer;
}

input[type="file"]::-webkit-file-upload-button {
  padding: 10px;
  font-size: 14px;
  background-color: #ff4d95;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

input[type="file"]::-webkit-file-upload-button:hover {
  background-color: #ed94b8;
}

/* Align input fields evenly */
.input-field label {
  font-weight: bold;
  display: inline-block;
  margin: 10px 0px 5px 0px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 15px;
}

.input-field input,
.input-field textarea {
  display: block;
  width: calc(100% - 20px);
  margin-left: 5px;
}
</style>
