<template>
  <div class="change-password-page-container">
    <div class="change-password-white-container">
      <!-- Logo section -->
      <div class="change-password-logo-container">
        <div class="change-password-logo">
          <img :src="require('@/assets/lovebell.jpg')" alt="Logo" />
          <h1>LOVE-BELL</h1>
        </div>
      </div>

      <!-- Form section -->
      <div class="change-password-form-container">
        <h2>Change Your Password</h2>
        <p>Please update your password to continue using the app</p>

        <!-- Current Password input field -->
        <input
          type="password"
          v-model="oldPassword"
          placeholder="Current Password"
          class="change-password-input"
        />

        <!-- New Password input field -->
        <input
          type="password"
          v-model="newPassword"
          placeholder="New Password"
          class="change-password-input"
        />

        <!-- Confirm Password input field -->
        <input
          type="password"
          v-model="confirmPassword"
          placeholder="Confirm New Password"
          class="change-password-input"
        />

        <p v-if="passwordMismatch" class="change-password-error">
          New password and confirmation do not match.
        </p>

        <!-- Change password button -->
        <button @click="handleChangePassword" class="change-password-button">
          Change Password
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { changePassword } from '@/services/change-password-service';
import { ElNotification } from "element-plus"; // Thêm import ElNotification

export default {
  data() {
    return {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      email: '', // Get email from localStorage
      passwordMismatch: false,
    };
  },
  methods: {
    async handleChangePassword() {
      // Check if the new password and confirm password match
      if (this.newPassword !== this.confirmPassword) {
        this.passwordMismatch = true;
        ElNotification({
          title: "Error",
          message: "New password and confirmation do not match.",
          type: "error",
        });
        return;
      }

      // Get email from localStorage, if email is missing show an error
      const email = localStorage.getItem('email');
      console.log(localStorage.getItem('email'));

      if (!email) {
        ElNotification({
          title: "Error",
          message: "Email is missing. Please log in again.",
          type: "error",
        });
        return;
      }

      try {
        const response = await changePassword(email, this.oldPassword, this.newPassword);
        
        ElNotification({
          title: response.status === 200 ? "Success" : "Error",
          message: response.message,
          type: response.status === 200 ? "success" : "error",
        });

        // Redirect to home page after successful password change
        if (response.status === 200) {
          this.$router.push('/');
        }
      } catch (error) {
        ElNotification({
          title: "Error",
          message: error.message,
          type: "error",
        });
      }
    }
  },
  mounted() {
    // When component is mounted, check if email is saved
    this.email = localStorage.getItem('userEmail');
  }
};
</script>

<style scoped>
body {
  background-color: #ffb3c1;
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  animation: fadeInBackground 2s ease-in-out;
}

.change-password-page-container {
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  gap: 20px;
  background-color: #ff85a1;
  animation: slideInUp 1.5s ease-in-out;
}

.change-password-logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  margin-right: 20px;
  animation: bounce 2s infinite;
}

.change-password-white-container {
  display: flex;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 50px;
  animation: slideInUp 1.2s ease-in-out;
}

.change-password-logo img {
  width: 300px;
  height: auto;
  margin-bottom: 40px;
  animation: zoomIn 1.5s ease;
}

h1 {
  color: #ff4d95;
  font-size: 36px;
  margin: 10px 0;
  text-align: center;
  animation: fadeInText 1.5s ease;
}

.change-password-form-container {
  width: 100%;
  max-width: 400px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  animation: fadeInText 2s ease-in-out;
}

h2 {
  color: #ff4d95;
  font-size: 30px;
  text-align: center;
  animation: slideInFromLeft 1.5s ease;
}

p {
  color: #999;
  text-align: center;
  margin-bottom: 20px;
}

.change-password-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-size: 16px;
  animation: fadeInText 1.2s ease-in-out;
}

.change-password-input:focus {
  box-shadow: 0 0 8px rgba(255, 77, 149, 0.5);
  border: 1px solid #ff4d95;
  animation: pulse 0.5s infinite;
}

.change-password-error {
  color: red;
  text-align: center;
  margin-bottom: 20px;
  animation: shake 0.8s ease;
}

.change-password-button {
  width: 100%;
  padding: 15px;
  margin-bottom: 5px;
  background-color: #ff4d95;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  animation: bounceIn 1s ease;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.change-password-button:hover {
  background-color: #ed94b8;
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(255, 77, 149, 0.3);
}

/* CSS Animations */
@keyframes fadeInBackground {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideInUp {
  from {
    transform: translateY(100px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes fadeInText {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes zoomIn {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

@keyframes shake {
  0%, 100% {
    transform: translateX(0);
  }
  25%, 75% {
    transform: translateX(-10px);
  }
  50% {
    transform: translateX(10px);
  }
}

@keyframes bounceIn {
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes slideInFromLeft {
  from {
    transform: translateX(-200px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

</style>
