<template>
  <div class="lovebell-forgot-password-page-container">
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
        <h2>Forgot Password</h2>
        <p>Enter your email to reset your password</p>

        <!-- Email input field -->
        <input
          type="email"
          v-model="email"
          placeholder="email@domain.com"
          class="lovebell-email-input"
        />

        <!-- Forgot password button -->
        <button @click="sendResetLink" class="lovebell-send-reset-link-button">
          Send Reset Password
        </button>

        <!-- Back to login link -->
        <p class="lovebell-back-to-login">
          Remember your password?
          <a @click="goToLogin" class="lovebell-login-link">Back to login</a>
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
// Import dịch vụ đã tạo
import { sendResetPasswordRequest } from '@/services/forgot-password-service';

export default {
  name: 'LovebellForgotPasswordPage',
  data() {
    return {
      email: '',
      notifications: []
    };
  },
  methods: {
    async sendResetLink() {
      if (!this.email) {
        this.addNotification('Please enter your email!', 'error');
        return;
      }

      try {
        // Gọi dịch vụ gửi yêu cầu reset mật khẩu
        const response = await sendResetPasswordRequest(this.email);
        
        // Xử lý phản hồi thành công
        if (response.status === 200) {
          this.addNotification('Reset password successfully! Please check your email.', 'success');
        } else {
          this.addNotification('Error reset password!', 'error');
        }
      } catch (error) {
        // Xử lý lỗi khi gửi yêu cầu
        this.addNotification(error.message, 'error');
      }
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
/* Thay đổi màu nền của toàn bộ trang */
body {
  background-color: #ffb3c1;
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}

.lovebell-forgot-password-page-container {
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  gap: 20px;
  background-color: #ff85a1;
}

.lovebell-white-container {
  display: flex;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 50px;
}

.lovebell-form-container {
  width: 100%;
  max-width: 400px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
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

h2 {
  color: #ff4d95;
  font-size: 30px;
  text-align: center;
}

p {
  color: #999;
  text-align: center;
  margin-bottom: 20px;
}

.lovebell-email-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  margin-left: 20px;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-size: 16px;
}

.lovebell-send-reset-link-button {
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

.lovebell-send-reset-link-button:hover {
  background-color: #ed94b8;
}

.lovebell-back-to-login {
  color: #999;
  font-size: 14px;
  text-align: center;
  margin-top: 20px;
}

.lovebell-login-link {
  color: #ff4d95;
  text-decoration: none;
  cursor: pointer;
}

.lovebell-login-link:hover {
  text-decoration: underline;
}

/* Notification styles */
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
  animation: progress 5000ms linear forwards;
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
</style>
