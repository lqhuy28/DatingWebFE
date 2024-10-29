<template>
  <div class="emergency-page-container">
    <!-- Sidebar -->
    <LoveBellSidebar />

    <!-- Main Content -->
    <div class="emergency-page">
      <!-- Page Header -->
      <div class="header">
        <h1>GET CURRENT LOCATION</h1>
        <button class="emergency-button" @click="getLocation">Get Location</button>
      </div>

      <!-- Location Information -->
      <p class="mt-4" v-if="location" v-html="location"></p>
      <p class="mt-4" v-if="address" v-text="address"></p>

      <!-- Map Display -->
      <div id="map" class="map" v-if="latitude && longitude"></div>

      <!-- Save Location Button -->
      <button class="save-location-button" @click="saveLocation" v-if="latitude && longitude">
        Save Location
      </button>
    </div>
  </div>
</template>

<script>
import LoveBellSidebar from "@/views/sidebar/LoveBellSidebar.vue";
import { createLocation } from '@/services/location-service';
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { ElNotification } from "element-plus";

export default {
  components: {
    LoveBellSidebar,
  },
  data() {
    return {
      location: null,
      latitude: null,
      longitude: null,
      address: null,
      map: null,
      mapInitialized: false,
    };
  },
  methods: {
    async getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => this.showPosition(position),
          (error) => this.handleError(error)
        );
      } else {
        ElNotification({
          title: 'Error',
          message: 'Geolocation is not supported by this browser.',
          type: 'error',
        });
      }
    },

    showPosition(position) {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      this.location = `Latitude: ${this.latitude}, Longitude: ${this.longitude}`;
      this.getAddress(this.latitude, this.longitude);

      this.$nextTick(() => {
        this.initMap();
      });
    },

    async getAddress(lat, lng) {
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`);
        const data = await response.json();
        if (data && data.display_name) {
          this.address = `Address: ${data.display_name}`;
        }
      } catch (error) {
        console.error("Error fetching address:", error);
      }
    },

    initMap() {
      if (this.mapInitialized) {
        this.map.setView([this.latitude, this.longitude], 13);
      } else {
        this.map = L.map("map").setView([this.latitude, this.longitude], 13);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution: '© OpenStreetMap',
        }).addTo(this.map);
        L.marker([this.latitude, this.longitude]).addTo(this.map)
          .bindPopup("You are here")
          .openPopup();
        this.mapInitialized = true;
      }
    },

    handleError(error) {
      const errorMsg = {
        [error.PERMISSION_DENIED]: "User denied the request for Geolocation.",
        [error.POSITION_UNAVAILABLE]: "Location information is unavailable.",
        [error.TIMEOUT]: "The request to get user location timed out.",
        [error.UNKNOWN_ERROR]: "An unknown error occurred.",
      };
      ElNotification({
        title: 'Error',
        message: errorMsg[error.code] || "An error occurred.",
        type: 'error',
      });
    },

    async saveLocation() {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          ElNotification({
            title: 'Error',
            message: 'User is not logged in.',
            type: 'error',
          });
          return;
        }
        const addressString = this.address.replace('Address: ', '');
        const locationData = {
          latitude: this.latitude,
          longitude: this.longitude,
          address: addressString,
          userId: userId
        };
        await createLocation(locationData);
        ElNotification({
          title: 'Success',
          message: 'Location saved successfully!',
          type: 'success',
        });
      } catch (error) {
        ElNotification({
          title: 'Error',
          message: error?.message,
          type: 'error',
        });
      }
    }
  },
};
</script>

<style scoped>
.emergency-page-container {
  display: flex;
  align-items: flex-start;
}

.emergency-page {
  flex: 1;
  padding: 30px;
  text-align: center;
  font-family: Arial, sans-serif;
}

.header h1 {
  color: #ff6699;
  font-size: 36px;
  font-weight: bold;
  margin: 10px 0;
}

.emergency-button {
  background-color: #e91e63;
  border: none;
  padding: 10px 30px;
  font-size: 16px;
  color: #fff;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.emergency-button:hover {
  background-color: #d81b60;
  transform: scale(1.05);
}

.map {
  height: 530px;
  margin-top: 20px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}

.save-location-button {
  background-color: #4caf50;
  border: none;
  padding: 10px 30px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
  border-radius: 5px;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.save-location-button:hover {
  background-color: #388e3c;
  transform: scale(1.05);
}
</style>
