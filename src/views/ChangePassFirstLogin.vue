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
        return;
      }

      // Get email from localStorage, if email is missing show an error
      const email = localStorage.getItem('email');
      console.log(localStorage.getItem('email'));

      if (!email) {
        alert('Email is missing. Please log in again.');
        return;
      }

      try {
        const response = await changePassword(email, this.oldPassword, this.newPassword);
        alert(response.message); // Show message from the server
        console.log(email, this.oldPassword, this.newPassword);

        // Redirect to home page after successful password change
        if (response.status === 200) {
          this.$router.push('/');
        }
      } catch (error) {
        alert(error.message);
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
}

.change-password-page-container {
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  gap: 20px;
  background-color: #ff85a1;
}

.change-password-logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  margin-right: 20px;
}

.change-password-white-container {
  display: flex;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 50px;
}

.change-password-logo img {
  width: 300px;
  height: auto;
  margin-bottom: 40px;
}

h1 {
  color: #ff4d95;
  font-size: 36px;
  margin: 10px 0;
  text-align: center;
}

.change-password-form-container {
  width: 100%;
  max-width: 400px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
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

.change-password-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-size: 16px;
}

.change-password-error {
  color: red;
  text-align: center;
  margin-bottom: 20px;
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
}

.change-password-button:hover {
  background-color: #ed94b8;
}
</style>
