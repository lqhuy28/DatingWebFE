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
  </div>
</template>

<script>
import { registerUser } from "@/services/register-service"; // Import your API service
import { ElNotification } from "element-plus"; // Thêm import ElNotification

export default {
  name: "LovebellRegisterPage",
  data() {
    return {
      email: ''
    };
  },
  methods: {
    async signUpWithEmail() {
      if (!this.email) {
        ElNotification({
          title: "Error",
          message: "Please enter a valid email.",
          type: "error",
        });
        return;
      }

      try {
        // Call the registerUser function from the service
        const response = await registerUser(this.email);
        ElNotification({
          title: "Success",
          message: `${response.message} Please check email to get password`,
          type: "success",
        });
      } catch (error) {
        ElNotification({
          title: "Error",
          message: `${error.message}`,
          type: "error",
        });
      }
    },
    signUpWithGoogle() {
      ElNotification({
        title: "Notice",
        message: "Signing up with Google",
        type: "warning",
      });
    },
    signUpWithPhoneNumber() {
      ElNotification({
        title: "Notice",
        message: "Signing up with Phone Number",
        type: "warning",
      });
    },
    signUpWithFacebook() {
      ElNotification({
        title: "Notice",
        message: "Signing up with Facebook",
        type: "warning",
      });
    },
    goToLogin() {
      this.$router.push('/');
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
  animation: bounce 2s infinite; /* Bounce animation for logo */
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
  animation: fadeInText 1.5s ease; /* Fade-in animation */
}

.lovebell-form-container {
  width: 100%;
  max-width: 400px; /* Kích thước tối đa cho phần form */
  padding: 20px;
  background-color: #fff; /* Màu nền của phần form */
  border-radius: 10px; /* Bo góc cho phần form */
  animation: zoomIn 1.2s ease; /* Zoom-in effect */
}

.lovebell-form-container h2 {
  color: #ff4d95;
  font-size: 30px;
  text-align: center;
  margin-left: 20px;
  animation: fadeInText 1.5s ease;

}

.lovebell-form-container p {
  color: #999;
  text-align: center;
  margin-bottom: 20px;
  margin-left: 20px;
}
/* Input fields */
.lovebell-email-input {
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 16px;
  transition: box-shadow 0.3s ease;
}

.lovebell-email-input:focus {
  box-shadow: 0 0 8px rgba(255, 77, 149, 0.5);
  border: 1px solid #ff4d95;
}

/* Button styles */
.lovebell-sign-up-email-button,
.lovebell-google-login-button,
.lovebell-phone-login-button,
.lovebell-facebook-login-button {
  width: 100%;
  padding: 15px;
  margin-bottom: 10px;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.lovebell-sign-up-email-button {
  background-color: #ff4d95;
  transition: background-color 0.3s ease;
}

.lovebell-sign-up-email-button:hover {
  background-color: #ed94b8;
  transform: translateY(-3px); /* Lift effect on hover */
  box-shadow: 0 8px 16px rgba(255, 77, 149, 0.3);
}

/* Google login button */
.lovebell-google-login-button {
  background-color: #d0d0d0;
  color: #555;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lovebell-google-login-button:hover {
  background-color: #e5e5e5;
}

/* Phone login button */
.lovebell-phone-login-button {
  background-color: #333;
}

.lovebell-phone-login-button:hover {
  background-color: #555;
}

/* Facebook login button */
.lovebell-facebook-login-button {
  background-color: #3b5998;
}

.lovebell-facebook-login-button:hover {
  background-color: #4b6bbd;
}

/* "Already have account" section */
.lovebell-already-have-account {
  color: #999;
  font-size: 14px;
  text-align: center;
  margin-top: 15px;
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

/* Separator styling */
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

/* Terms & Conditions */
.lovebell-terms {
  color: #999;
  text-align: center;
  font-size: 12px;
  margin-top: 20px;
}

.lovebell-terms a {
  color: #ff4d95;
  text-decoration: none;
  transition: color 0.3s ease;
}

.lovebell-terms a:hover {
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
    transform: translateY(20px);
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
</style>
