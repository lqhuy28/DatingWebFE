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
  </div>
</template>

<script>
// Import dịch vụ đã tạo
import { sendResetPasswordRequest } from '@/services/forgot-password-service';
import { ElNotification } from "element-plus";

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
      ElNotification({
        title: "Error",
        message: "Please enter your email!",
        type: "error",
      });
      return;
    }

    try {
      const response = await sendResetPasswordRequest(this.email);

      if (response.status === 200) {
        ElNotification({
          title: "Success",
          message: "Reset password successfully! Please check your email.",
          type: "success",
        });
      } else {
        ElNotification({
          title: "Error",
          message: "Error reset password!",
          type: "error",
        });
      }
    } catch (error) {
      ElNotification({
        title: "Error",
        message: error.message,
        type: "error",
      });
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
body {
  background-color: #ffb3c1;
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  animation: fadeInBackground 2s ease-in-out;
}

.lovebell-forgot-password-page-container {
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  gap: 20px;
  background-color: #ff85a1;
  animation: slideInUp 1.5s ease-in-out;
}

.lovebell-white-container {
  display: flex;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 50px;
  animation: zoomIn 1.2s ease;
}

.lovebell-logo img {
  width: 300px;
  height: auto;
  margin-bottom: 40px;
  animation: bounceIn 1.5s ease;
  animation: pulse 0.8s infinite;

}

h1 {
  color: #ff4d95;
  font-size: 36px;
  margin: 10px 0;
  text-align: center;
  animation: fadeInText 1.5s ease;
}

.lovebell-form-container {
  width: 100%;
  max-width: 400px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  animation: slideInFromLeft 1.5s ease;
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
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  animation: slideInUp 1.2s ease-in-out;
}

.lovebell-send-reset-link-button:hover {
  background-color: #ed94b8;
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(255, 77, 149, 0.3);
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
  transition: color 0.3s ease;
}

.lovebell-login-link:hover {
  color: #ed94b8;
  text-decoration: underline;
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
