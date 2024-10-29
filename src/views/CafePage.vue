<template>
  <div class="container_cafe">
    <!-- Sidebar -->
    <LoveBellSidebar />

    <!-- Cafe Details Section -->
    <div class="cafe-details">
      <!-- Related Places Section -->
      <div class="related-places">
        <h2>RELATED DATING PLACE</h2>
        <div class="places-grid">
          <div v-for="place in paginatedPlaces" :key="place.cafeId" class="place-card">
            <img :src="place.imageUrl" :alt="place.name" class="place-image" />
            <div class="place-info">
              <h3>{{ place.name }}</h3>
              <p>{{ place.address }}</p>
              <p class="price">{{ formatPriceRange(place.priceRangeMin, place.priceRangeMax) }}</p>
              <button class="view-button" @click="viewDetails(place)">View Details</button>
            </div>
          </div>
        </div>

        <!-- Pagination Controls -->
        <div class="pagination">
          <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
          <span>Page {{ currentPage }} of {{ totalPages }}</span>
          <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
        </div>
      </div>
    </div>

    <!-- Modal Popup for cafe details -->
    <div v-if="selectedPlace" class="modal-overlay">
      <div class="modal-content">
        <span class="close-button" @click="closeModal">&times;</span>
        <h2>{{ selectedPlace.name }}</h2>
        <img :src="selectedPlace.imageUrl" :alt="selectedPlace.name" class="modal-image" />
        <p><strong>Address:</strong> {{ selectedPlace.address }}</p>
        <p><strong>Price Range:</strong> {{ formatPriceRange(selectedPlace.priceRangeMin, selectedPlace.priceRangeMax) }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import LoveBellSidebar from "@/views/sidebar/LoveBellSidebar.vue";
import { getAllCafes } from "@/services/cafe-service";

export default {
  components: {
    LoveBellSidebar,
  },
  data() {
    return {
      cafesPerPage: 5,
      currentPage: 1,
      selectedPlace: null,
      relatedPlaces: [],
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.relatedPlaces.length / this.cafesPerPage);
    },
    paginatedPlaces() {
      if (!this.relatedPlaces || this.relatedPlaces.length === 0) return [];
      const start = (this.currentPage - 1) * this.cafesPerPage;
      const end = start + this.cafesPerPage;
      return this.relatedPlaces.slice(start, end);
    },
  },
  methods: {
    viewDetails(place) {
      this.selectedPlace = place;
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    closeModal() {
      this.selectedPlace = null;
    },
    async fetchCafes() {
      try {
        const cafes = await getAllCafes();
        this.relatedPlaces = cafes;
      } catch (error) {
        console.error(error.message);
      }
    },
    formatPriceRange(min, max) {
      return `${min} VND - ${max} VND`;
    },
  },
  mounted() {
    this.fetchCafes();
  },
};
</script>

<style scoped>
/* Container for Sidebar and Main Content */
.container_cafe {
  display: flex;
  align-items: flex-start;
  background-color: #f8f8f8;
}

/* Cafe Details Section */
.cafe-details {
  overflow-y: scroll;
  height: calc(100vh - 56px);
  flex: 4;
  padding: 30px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Related Places Title */
.related-places h2 {
  text-align: center;
  margin-bottom: 40px;
  animation: fadeIn 1s ease;
  font-weight: bold;
  color: #ff6699;
  font-size: 36px;
}

/* Grid for Places */
.places-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

/* Individual Place Card */
.place-card {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.4s ease, box-shadow 0.4s ease;
  text-align: center;
  cursor: pointer;
}

.place-card:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

/* Place Image */
.place-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
  transition: opacity 0.3s;
}

.place-info {
  padding: 15px;
}

/* Place Info Text */
.place-info h3 {
  font-size: 20px;
  color: #333;
}

.place-info p {
  font-size: 14px;
  color: #777;
  margin: 5px 0;
}

/* Price Styling */
.place-info .price {
  color: #ff4081;
  font-size: 16px;
  font-weight: bold;
  margin-top: 10px;
}

/* View Button */
.view-button {
  background-color: #ff4081;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 10px;
}

.view-button:hover {
  background-color: #ff80ab;
}

/* Pagination Controls */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
}

.pagination button {
  background-color: #e91e63;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 0 10px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.pagination button:hover {
  background-color: #f06292;
  transform: scale(1.05);
}

.pagination button:disabled {
  background-color: #ddd;
  cursor: not-allowed;
}

.pagination span {
  font-size: 18px;
  color: #333;
}

/* Modal Popup Styling */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fadeIn 0.5s ease;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  text-align: center;
  position: relative;
  animation: slideDown 0.6s ease;
}

.modal-image {
  width: 100%;
  height: auto;
  border-radius: 5px;
  margin-bottom: 20px;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}

/* Keyframe Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideDown {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
