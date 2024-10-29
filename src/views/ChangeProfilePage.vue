<template>
  <div class="edit-profile-page">
    <form @submit.prevent="saveProfile">
      <!-- Name -->
      <div class="form-group">
        <label for="name">Tên:</label>
        <input
          type="text"
          id="name"
          v-model="profileData.name"
          placeholder="Nhập tên của bạn"
          required
        />
      </div>

      <!-- Age -->
      <div class="form-group">
        <label for="age">Tuổi:</label>
        <input
          type="number"
          id="age"
          v-model="profileData.age"
          placeholder="Nhập tuổi"
          min="1"
          max="120"
          required
        />
      </div>

      <!-- Gender -->
      <div class="form-group">
        <label for="gender">Giới tính:</label>
        <select id="gender" v-model="profileData.gender" required>
          <option value="MALE">Nam</option>
          <option value="FEMALE">Nữ</option>
          <option value="OTHER">Khác</option>
        </select>
      </div>

      <!-- Bio -->
      <div class="form-group">
        <label for="bio">Tiểu sử:</label>
        <textarea
          id="bio"
          v-model="profileData.bio"
          placeholder="Giới thiệu bản thân..."
          :maxlength="bioMaxLength"
          required
        ></textarea>
        <small class="char-counter">Còn lại: {{ remainingBioChars }}</small>
      </div>

      <!-- Phone -->
      <div class="form-group">
        <label for="phone">Số điện thoại:</label>
        <input
          type="tel"
          id="phone"
          v-model="profileData.phone"
          placeholder="Nhập số điện thoại của bạn"
          pattern="[0-9]*"
          maxlength="15"
          @input="profileData.phone = profileData.phone.replace(/\D/g, '')"
          required
        />
      </div>

      <!-- Photos -->
      <div class="form-group">
        <label for="photos">Ảnh khác:</label>
        <div class="photos-scroll-container">
          <div
            v-for="(photo, index) in profileData.photos"
            :key="index"
            class="photo-input"
          >
            <div class="photo-wrapper">
              <img
                v-if="photo.url"
                :src="photo.url"
                alt="Ảnh khác"
                class="photo-preview"
              />
              <input
                type="file"
                @change="onFileChangePhoto($event, index)"
                accept="image/*"
              />
            </div>
            <!-- Replace the delete button with a trash icon -->
            <button
              type="button"
              class="delete-photo-button"
              @click="removePhoto(index)"
            >
              <i class="fas fa-trash"></i>
              <!-- Trash bin icon -->
            </button>
          </div>
        </div>
        <button type="button" @click="addPhoto">Thêm ảnh</button>
      </div>

      <!-- Submit Button -->
      <div class="form-group">
        <button type="submit">Lưu thay đổi</button>
      </div>

      <!-- Error Message -->
      <p v-if="profileError" class="profile-error">{{ profileError }}</p>
    </form>
  </div>
</template>

<script>
import { getMyProfile, updateProfile } from "@/services/viewProfile-service.js";

export default {
  data() {
    return {
      profileData: {
        name: "",
        phone: "",
        age: "",
        gender: "",
        bio: "",
        photos: [],
      },
      bioMaxLength: 150,
      profileError: "",
    };
  },
  computed: {
    remainingBioChars() {
      return this.bioMaxLength - this.profileData.bio.length;
    },
  },
  async mounted() {
    try {
      const profileResponse = await getMyProfile();
      const profile = profileResponse.data;

      this.profileData = {
        name: profile.name || "",
        phone: profile.phone || "",
        age: profile.age || "",
        gender: profile.gender || "",
        bio: profile.bio || "",
        photos:
          profile.photos.map((photo) => ({
            url: photo.url,
            file: null,
          })) || [],
      };
    } catch (error) {
      console.error("Error loading profile data:", error);
      this.profileError = "Không thể tải thông tin hồ sơ.";
    }
  },
  methods: {
    addPhoto() {
      this.profileData.photos.push({ url: "", file: null });
    },

    onFileChangePhoto(event, index) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.profileData.photos[index].url = e.target.result;
          this.profileData.photos[index].file = file;
        };
        reader.readAsDataURL(file);
      }
    },

    removePhoto(index) {
      this.profileData.photos.splice(index, 1);
    },

    async saveProfile() {
      try {
        const formData = new FormData();
        const updateProfileRequest = {
          name: this.profileData.name,
          phone: this.profileData.phone,
          age: this.profileData.age,
          bio: this.profileData.bio,
          gender: this.profileData.gender,
        };

        formData.append(
          "updateProfileRequest",
          JSON.stringify(updateProfileRequest)
        );
        const filesToUpload = this.profileData.photos
          .map((photo) => photo.file)
          .filter((file) => file);
        if (filesToUpload.length > 0) {
          filesToUpload.forEach((file) => {
            formData.append("files", file);
          });
        }

        const response = await updateProfile(
          this.profileData.name,
          this.profileData.phone,
          this.profileData.age,
          this.profileData.bio,
          this.profileData.gender,
          filesToUpload
        );

        if (response.status === 200) {
          this.$emit("close");
          this.$router.push("/profile");
          window.location.reload();
        }
      } catch (error) {
        console.error("Error saving profile:", error);
        this.profileError = "Đã xảy ra lỗi khi cập nhật thông tin.";
      }
    },
  },
};
</script>

<style scoped>
/* Styles cho trang chỉnh sửa profile */
.edit-profile-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

button[type="button"] {
  margin-top: 10px;
  padding: 10px;
  cursor: pointer;
  display: block;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
}

.avatar-wrapper,
.photo-wrapper {
  display: flex;
  align-items: center;
  gap: 20px;
}

.photo-input {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.delete-photo-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: #ff4b4b;
  font-size: 18px;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;
}

.delete-photo-button:hover {
  color: #cc0000;
}

.photo-preview {
  width: 150px;
  height: 150px;
  border-radius: 8px;
  object-fit: cover;
}

button[type="submit"] {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
}

.photos-scroll-container {
  max-height: 300px;
  overflow-y: auto;
  padding: 10px;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 8px;
}

button[type="submit"]:hover {
  background-color: #0056b3;
}

.char-counter {
  font-size: 12px;
  color: #666;
  text-align: right;
}

.profile-error {
  color: red;
  text-align: center;
}
</style>
