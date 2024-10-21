<template>
  <div class="container_cafe">
    <!-- Sidebar -->
    <LoveBellSidebar />

    <!-- Phần chi tiết cafe -->
    <div class="cafe-details">
      <!-- Phần địa điểm liên quan -->
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
import {getAllCafes} from "@/services/cafe-service"; // Import the service

export default {
  components: {
    LoveBellSidebar,
  },
  data() {
    return {
      cafesPerPage: 4,  // Số lượng quán cafe trên mỗi trang
      currentPage: 1,   // Trang hiện tại
      selectedPlace: null,  // Quán cafe được chọn để hiển thị chi tiết
      relatedPlaces: [],  // Đây sẽ là danh sách được lấy từ API
    };
  },
  computed: {
    // Tổng số trang
    totalPages() {
      return Math.ceil(this.relatedPlaces.length / this.cafesPerPage);
    },

    // Các quán cafe trên trang hiện tại
    paginatedPlaces() {
      if (!this.relatedPlaces || this.relatedPlaces.length === 0) return []; // Ensure relatedPlaces is defined and not empty
      const start = (this.currentPage - 1) * this.cafesPerPage;
      const end = start + this.cafesPerPage;
      return this.relatedPlaces.slice(start, end);
    },
  },
  methods: {
    viewDetails(place) {
      this.selectedPlace = place;  // Gán quán cafe được chọn vào `selectedPlace`
    },

    // Chuyển đến trang trước
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },

    // Chuyển đến trang tiếp theo
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },

    // Đóng modal
    closeModal() {
      this.selectedPlace = null;
    },
    async fetchCafes() {
      try {
        const cafes = await getAllCafes();  // Gọi hàm lấy tất cả các quán cafe từ API
        this.relatedPlaces = cafes;  // Gán dữ liệu vào biến relatedPlaces để hiển thị
      } catch (error) {
        console.error(error.message);
      }
    },
    formatPriceRange(min, max) {
      return `${min} VND - ${max} VND`;  // Định dạng giá cả
    },
  },
  mounted() {
    this.fetchCafes();  // Gọi API khi component được render
  },
};
</script>

<style scoped>
/* Container chứa cả sidebar và phần chính */
.container_cafe {
  display: flex;
  align-items: flex-start;
  background-color: #f5f5f5;
  overflow: hidden;
}

/* Phần chính chiếm 80% chiều rộng */
.cafe-details {
  overflow-y: scroll;
  height: calc(100vh - 56px);
  flex: 4;
  padding: 40px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.related-places {
  margin-top: 50px;
}

.related-places h2 {
  font-size: 32px;
  margin-top: -50px;
  margin-bottom: 50px;
  color: #ff33cc;
  text-align: center;
}

.places-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.place-card {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-align: center;
  width: 100%;
  height: 450px;
}

.place-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.place-image {
  width: 500px;
  height: 200px;
  object-fit: cover;
}

.place-info {
  padding: 10px;
}

.place-info h3 {
  font-size: 22px;
  color: #333;
}

.place-info p {
  font-size: 16px;
  color: #555;
  margin: 5px 0;
}

.place-info .price {
  color: #ff33cc;
  font-size: 18px;
  font-weight: bold;
  margin-top: 10px;
}

.view-button {
  background-color: #ff33cc;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.view-button:hover {
  background-color: #ff66ff;
}

/* Pagination */
.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pagination button {
  background-color: #ff33cc;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 0 10px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.pagination button:hover {
  background-color: #ff66ff;
}

.pagination button:disabled {
  background-color: #ddd;
  cursor: not-allowed;
}

.pagination span {
  font-size: 18px;
  color: #333;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  text-align: center;
  position: relative;
}

.modal-image {
  width: 100%;
  height: auto;
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
</style>
