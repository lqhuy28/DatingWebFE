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
          <!-- File upload input -->
          <div class="input-field">
            <label for="files">Upload Photos:</label>
            <input type="file" @change="handleFileUpload" multiple />
          </div>
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
              type="number"
              v-model="phone"
              placeholder="Phone"
              class="string-input"
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

          <!-- Error message -->
          <p v-if="profileError" class="profile-error">{{ profileError }}</p>

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

        alert(response.message);

        if (response.status === 200) {
          this.$router.push("/homePage");
        }
      } catch (error) {
        this.profileError = error.message;
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
  max-height: calc(80vh - 80px); /* Adjusts the height to ensure content doesn't overflow */
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

/* Profile error styling */
.profile-error {
  color: red;
  text-align: center;
  margin-bottom: 20px;
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
  background: linear-gradient(90deg, #ff4d95 0%, #ccc 0%); /* Default background */
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
  color: red;
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

/* Image preview styling */
.image-preview-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 images per row */
  gap: 15px; /* Gap between the images */
  margin-top: 15px;
}

.image-preview img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border: 1px solid #ddd;
  border-radius: 5px;
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
