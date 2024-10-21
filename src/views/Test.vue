<template>
    <!-- Include Font Awesome via CDN -->
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
    />
  
    <div class="notifications">
      <div
        v-for="notification in notifications"
        :key="notification.id"
        :class="['notification', notification.type]"
      >
        <i :class="iconClass(notification.type)" :style="iconStyle(notification.type)"></i>
        <span class="message">{{ notification.message }}</span>
        <button @click="closeNotification(notification.id)">×</button>
        <div :class="['progress-bar', notification.type]"></div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        notifications: [
          { id: 1, type: "success", message: "Successfully Submitted", timeout: 5000 },
          { id: 2, type: "error", message: "Please Fix The Error!", timeout: 5000 },
          { id: 3, type: "warning", message: "Invalid Input, Check Again", timeout: 5000 },
        ],
      };
    },
    mounted() {
      this.notifications.forEach((notification) => {
        setTimeout(() => {
          this.closeNotification(notification.id);
        }, notification.timeout);
      });
    },
    methods: {
      closeNotification(id) {
        this.notifications = this.notifications.filter(
          (notification) => notification.id !== id
        );
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
    },
  };
  </script>
  
  <style scoped>
  .notifications {
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
  
  .notification {
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
  
  .notification i {
    margin-right: 10px;
    font-size: 20px;
    font-weight: bold;
  }
  
  .message {
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
  .progress-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 5px;
    width: 100%;
    animation: progress 20s linear forwards;
  }
  
  /* Colors for the progress bar based on notification type */
  .success.progress-bar {
    background-color: #4caf50; /* Green progress bar for success */
  }
  
  .error.progress-bar {
    background-color: #f44336; /* Red progress bar for error */
  }
  
  .warning.progress-bar {
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
  