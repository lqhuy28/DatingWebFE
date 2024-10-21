<template>
  <div class="lovebell-login-page-container">
    <div class="lovebell-white-container">
      <!-- Logo section -->
      <div class="lovebell-logo-container">
        <div class="lovebell-logo">
          <img :src="require('@/assets/lovebell.jpg')" alt="Logo" />
          <h1>LOVE-BELL</h1>
        </div>
      </div>

      <!-- Form section -->
      <div class="lovebell-form-container">
        <!-- Create account text -->
        <h2>Create an account</h2>
        <p>Enter your email to sign up for this app</p>

        <!-- Email input field -->
        <input type="email" v-model="email" placeholder="email@domain.com" class="lovebell-email-input" />

        <!-- Sign up with email button -->
        <button @click="signUpWithEmail" class="lovebell-sign-up-email-button">Sign up with email</button>

        <!-- Already have an account? Log in link -->
        <p class="lovebell-already-have-account">
          Already have an account?
          <a @click="goToLogin" class="lovebell-login-link">Log in</a>
        </p>

        <!-- OR separator -->
        <div class="lovebell-separator">
          <hr class="lovebell-line">
          <span>OR</span>
          <hr class="lovebell-line">
        </div>

        <!-- Sign in options -->
        <button @click="signUpWithGoogle" class="lovebell-google-login-button">
          <svg width="20" height="20" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" style="margin-right: 10px;">
            <path fill="#4285F4" d="M24 9.5c3.14 0 5.99 1.09 8.25 2.85l6.15-6.15C34.8 3.04 29.6 0 24 0 14.76 0 7 5.83 3.68 14.23l7.14 5.65C12.68 12.09 17.9 9.5 24 9.5z"/>
            <path fill="#34A853" d="M46.74 24.5c0-1.66-.15-3.25-.44-4.79H24v9.09h12.8c-.58 3.05-2.35 5.64-4.96 7.37v6.1h8.01c4.68-4.31 7.39-10.66 7.39-17.77z"/>
            <path fill="#FBBC05" d="M10.82 28.73c-1.48-.88-2.78-2.01-3.78-3.37l-7.14 5.65C4.96 37.95 9.85 42 16 42c4.76 0 8.74-1.57 11.66-4.23l-6.93-5.42c-1.28.86-2.9 1.38-4.73 1.38-3.64 0-6.73-2.41-7.98-5.7z"/>
            <path fill="#EA4335" d="M24 48c6.4 0 11.78-2.12 15.71-5.76l-7.39-5.76c-2.06 1.38-4.69 2.21-8.32 2.21-6.09 0-11.31-3.59-13.53-8.72l-7.14 5.65C7 42.17 14.76 48 24 48z"/>
          </svg>
          LOG IN WITH GOOGLE
        </button>

        <button @click="signUpWithPhoneNumber" class="lovebell-phone-login-button">
          LOG IN WITH PHONE NUMBER
        </button>

        <button @click="signUpWithFacebook" class="lovebell-facebook-login-button">
          LOG IN WITH FACEBOOK
        </button>

        <!-- Terms of Service and Privacy Policy -->
        <p class="lovebell-terms">
          By clicking continue, you agree to our
          <a href="#">Terms of Service</a> and
          <a href="#">Privacy Policy</a>
        </p>
      </div>
    </div>
    
    <!-- Notifications -->
    <div class="lovebell-notifications" v-if="notifications.length > 0">
      <div v-for="notification in notifications" :key="notification.id" :class="['lovebell-notification', notification.type]">
        <i :class="iconClass(notification.type)" :style="iconStyle(notification.type)"></i>
        <span class="lovebell-message">{{ notification.message }}</span>
        <button @click="closeNotification(notification.id)">×</button>
        <div :class="['lovebell-progress-bar', notification.type]"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { registerUser } from "@/services/register-service"; // Import your API service

export default {
  name: "LovebellRegisterPage",
  data() {
    return {
      email: '',
      notifications: []
    };
  },
  methods: {
    async signUpWithEmail() {
      if (!this.email) {
        this.addNotification("Please enter a valid email.", "error");
        return;
      }

      try {
        // Call the registerUser function from the service
        const response = await registerUser(this.email);
        this.addNotification(`${response.message} Please check email to get password`, "success");
      } catch (error) {
        this.addNotification(`${error.message}`, "error");
      }
    },
    signUpWithGoogle() {
      this.addNotification('Signing up with Google', "warning");
    },
    signUpWithPhoneNumber() {
      this.addNotification('Signing up with Phone Number', "warning");
    },
    signUpWithFacebook() {
      this.addNotification('Signing up with Facebook', "warning");
    },
    goToLogin() {
      this.$router.push('/');
    },
    addNotification(message, type) {
      this.notifications = [{ id: Date.now(), type, message, timeout: 5000 }];
      setTimeout(() => {
        this.closeNotification(this.notifications[0]?.id);
      }, 5000);
    },
    closeNotification(id) {
      this.notifications = this.notifications.filter(notification => notification.id !== id);
    },
    iconClass(type) {
      switch (type) {
        case "success":
          return "fas fa-check-circle"; // Font Awesome success icon
        case "error":
          return "fas fa-exclamation-circle"; // Font Awesome error icon
        case "warning":
          return "fas fa-exclamation-triangle"; // Font Awesome warning icon
        default:
          return "";
      }
    },
    iconStyle(type) {
      switch (type) {
        case "success":
          return "color: #4caf50"; // Green icon
        case "error":
          return "color: #f44336"; // Red icon
        case "warning":
          return "color: #ff9800"; // Yellow icon
        default:
          return "color: #000";
      }
    },
    progressBarStyle(timeout) {
      return {
        animation: `progress ${timeout}ms linear forwards`,
        'animation-fill-mode': 'forwards'
      };
    }
  }
};
</script>

<style scoped>
body {
  background-color: #ffb3c1; /* Màu hồng nền */
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}

.lovebell-login-page-container {
  display: flex;
  height: 100vh; /* Chiều cao bằng toàn bộ trang */
  justify-content: center; /* Căn giữa nội dung */
  align-items: center; /* Căn giữa nội dung theo chiều dọc */
  gap: 20px; /* Khoảng cách giữa các phần tử */
  background-color: #ff85a1; /* Màu hồng đậm hơn */
}

.lovebell-logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff; /* Màu nền của phần logo */
  border-radius: 10px; /* Bo góc cho phần logo */
  padding: 20px; /* Thêm padding cho phần logo */
  margin-right: 20px; /* Khoảng cách bên phải */
}

.lovebell-white-container {
  display: flex;
  background-color: #fff; /* Nền trắng cho cả khung */
  border-radius: 20px; /* Bo góc cho khung */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Thêm hiệu ứng đổ bóng */
  padding: 50px; /* Padding cho khung trắng */
}

.lovebell-logo img {
  width: 300px; /* Điều chỉnh kích thước hình ảnh */
  height: auto;
  margin-bottom: 40px;
}

h1 {
  color: #ff4d95;
  font-size: 36px; /* Kích thước chữ logo */
  margin: 10px 0;
  text-align: center;
}

.lovebell-form-container {
  width: 100%;
  max-width: 400px; /* Kích thước tối đa cho phần form */
  padding: 20px;
  background-color: #fff; /* Màu nền của phần form */
  border-radius: 10px; /* Bo góc cho phần form */
}

.lovebell-form-container h2 {
  color: #ff4d95;
  font-size: 30px;
  text-align: center;
  margin-left: 20px;
}

.lovebell-form-container p {
  color: #999;
  text-align: center;
  margin-bottom: 20px;
  margin-left: 20px;

}

.lovebell-email-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  margin-left: 20px;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-size: 16px;
}

.lovebell-sign-up-email-button {
  width: 100%;
  padding: 15px;
  margin-bottom: 5px;
  background-color: #ff4d95;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

.lovebell-already-have-account {
  color: #999;
  font-size: 14px;
  text-align: center;
  margin-top: 10px;
  margin-left: 20px;

}

.lovebell-login-link {
  color: #ff4d95;
  text-decoration: none;
  cursor: pointer;
}

.lovebell-login-link:hover {
  text-decoration: underline;
}

.lovebell-separator {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 20px 0;
}

.lovebell-separator .lovebell-line {
  border: none;
  border-top: 1px solid #ccc;
  margin: 0 10px;
  flex-grow: 1;
}

.lovebell-separator span {
  color: #999;
  font-weight: bold;
  padding: 0 10px;
}

.lovebell-google-login-button, .lovebell-phone-login-button, .lovebell-facebook-login-button {
  width: 100%;
  padding: 15px;
  margin-bottom: 15px;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

.lovebell-google-login-button {
  background-color: #d0d0d0;
  color: #555;
  border: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lovebell-google-login-button img {
  margin-right: 10px;
}

.lovebell-phone-login-button {
  background-color: black;
}

.lovebell-facebook-login-button {
  background-color: #3b5998;
}

.lovebell-terms {
  color: #999;
  text-align: center;
  font-size: 12px;
  margin-top: 20px;
}

.lovebell-terms a {
  color: #ff4d95;
  text-decoration: none;
}

/* Existing styles plus notification styles */

.lovebell-notifications {
  max-width: 400px;
  position: absolute;
  top: 30px;
  right: 30px;
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  overflow: hidden;
  padding: 20px;
}

.lovebell-notification {
  display: flex;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  background-color: #fff; /* White background */
  border: 2px solid #000; /* Black border */
  position: relative;
  overflow: hidden;
}

.lovebell-notification i {
  margin-right: 10px;
  font-size: 20px;
  font-weight: bold;
}

.lovebell-message {
  color: #000; /* Black text */
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  font-size: 16px;
}

button {
  background: none;
  border: none;
  color: #000;
  font-size: 20px; /* Increase size of the close button */
  cursor: pointer;
  margin-left: 20px; /* Move close button further to the right */
}

/* Progress bar at the bottom */
.lovebell-progress-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 5px;
  width: 100%;
  animation: progress 5s linear forwards;
}

/* Colors for the progress bar based on notification type */
.success.lovebell-progress-bar {
  background-color: #4caf50; /* Green progress bar for success */
}

.error.lovebell-progress-bar {
  background-color: #f44336; /* Red progress bar for error */
}

.warning.lovebell-progress-bar {
  background-color: #ff9800; /* Yellow progress bar for warning */
}

/* Animation for progress bar countdown */
@keyframes progress {
  from {
    width: 100%;
  }
  to {
    width: 0;
  }
}

.lovebell-progress-bar {
  animation: progress 5000ms linear forwards;
  animation-fill-mode: forwards;
}
</style>
