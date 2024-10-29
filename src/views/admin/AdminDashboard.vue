<template>
  <div class="admin-dashboard">
    <aside class="sidebar">
      <div class="logo-container">
        <img src="@/assets/love-bell.png" alt="Logo" class="logo" />
        <span class="logo-text">LOVE BELL</span>
      </div>
      <nav>
        <ul>
          <li @click="navigateTo('Home')">
            <el-icon><House /></el-icon> Home
          </li>
          <li @click="navigateTo('Cafes')">
            <el-icon><CoffeeCup /></el-icon> Manage Cafes
          </li>
          <li @click="navigateTo('Users')">
            <el-icon><User /></el-icon> Manage Users
          </li>
          <li @click="navigateTo('Contacts')">
            <el-icon><ChatLineRound /></el-icon> Manage Contacts
          </li>
          <li @click="navigateTo('Matches')">
            <el-icon><Money/></el-icon> Manage Matches
          </li>
          <li @click="navigateTo('Payments')">
            <el-icon><TrendCharts/></el-icon> Manage Payments
          </li>
          <li @click="navigateTo('SubscriptionPlans')">
            <el-icon><Box/></el-icon> Manage SubscriptionPlans
          </li>
          <li @click="navigateTo('UserSubscriptions')">
            <el-icon><CreditCard /></el-icon> Manage User Subscriptions
          </li>
          <li @click="navigateTo('Maps')">
            <el-icon><MapLocation/></el-icon> Manage Maps
          </li>
          <li @click="navigateTo('Statistics')">
            <el-icon><PieChart/></el-icon> Manage Statistics
          </li>
        </ul>

        <!-- Logout button at the bottom -->
        <div class="logout-button">
          <el-button type="danger" @click="logout" :icon="SwitchButton">
            Logout
          </el-button>
        </div>
      </nav>
    </aside>

    <main class="main-content">
      <Breadcrumb />
      <router-view /> <!-- Dùng router-view để hiển thị các thành phần con -->
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import {
  House,
  CoffeeCup,
  TrendCharts,
  User,
  SwitchButton,
  ChatLineRound,
  Money,
  Box,
  MapLocation,
  PieChart,
  CreditCard
} from '@element-plus/icons-vue';
import Breadcrumb from "@/views/admin/Breadcrumb.vue"; // Import Footer

const router = useRouter();

const navigateTo = (component) => {
  // Điều hướng đến trang tương ứng với tên thành phần
  router.push(`/admin/${component.toLowerCase()}`);
};

const logout = () => {
  // Clear token (or any other authentication logic)
  localStorage.clear(); // Assuming the token is stored in localStorage
  router.push('/'); // Redirect to login page
};
</script>

<style>
.admin-dashboard {
  display: flex;
  height: 100vh;
  background-color: #f4f7fa; /* Light background for main content */
}

.sidebar {
  width: 250px;
  background-color: #1f2d3d; /* Dark sidebar background */
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1); /* Add slight shadow for depth */
}

.logo-container {
  display: flex;
  align-items: center;
  margin-bottom: 30px; /* Increase bottom margin for better spacing */
}

.logo {
  width: 45px; /* Slightly bigger logo */
  height: auto;
  margin-right: 12px;
}

.logo-text {
  font-size: 1.5em; /* Increase font size */
  font-weight: bold;
  color: #ffffff;
}

.sidebar nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar nav li {
  cursor: pointer;
  margin: 15px 0; /* Increase vertical spacing */
  color: #ffffff;
  display: flex;
  align-items: center;
  padding: 10px 15px;
  gap: 10px;
  border-radius: 8px; /* Rounded corners */
  transition: background-color 0.3s ease;
}

.sidebar nav li:hover {
  background-color: #3a4a5a; /* Hover effect for better visibility */
  text-decoration: none;
  font-weight: bold;
}

.sidebar nav li.active {
  background-color: #3a4a5a; /* Indicate active item */
}

.sidebar el-icon {
  margin-right: 12px; /* Consistent spacing between icon and text */
}

.logout-button {
  margin-top: auto;
  position: absolute;
  bottom: 65px;
  left: 65px;
}

.main-content {
  flex: 1;
  padding: 40px;
  background-color: #ffffff; /* White background for main content */
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); /* Light shadow for main content */
  overflow: scroll;
}

.main-content h1 {
  color: #304156; /* Title color */
  font-size: 1.8em; /* Larger title font */
  margin-bottom: 20px; /* Spacing below titles */
}

.main-content p {
  font-size: 1em;
  color: #6b7280; /* Softer text color */
}

</style>
