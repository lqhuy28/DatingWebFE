<template>
  <div>
    <h1>Manage Cafes</h1>

    <!-- Row chứa nút Add New Cafe và ô tìm kiếm -->
    <el-row class="mb-4">
      <el-col :span="18">
        <!-- Nút thêm quán cafe -->
        <el-button type="success" @click="showAddModal">Add New Cafe</el-button>
      </el-col>

      <el-col :span="6">
        <el-input
            v-model="searchQuery"
            placeholder="Search by Cafe Name, Address or Description"
            clearable
            @input="filterCafes"
        >
          <template #prepend>
            <el-button :icon="Search" />
          </template>
        </el-input>
      </el-col>
    </el-row>

    <table>
      <thead>
      <tr>
        <th>ID</th>
        <th>Cafe Name</th>
        <th>Address</th>
        <th>Description</th>
        <th>Price Range</th>
        <th>Status</th>
        <th style="width: 220px">Operations</th>
      </tr>
      </thead>
      <tbody>
      <!-- Lặp qua danh sách cafes đã được lọc -->
      <tr v-for="cafe in filteredCafes" :key="cafe.cafeId">
        <td>{{ cafe.cafeId }}</td>
        <td>{{ cafe.name }}</td>
        <td>{{ cafe.address }}</td>
        <td>{{ cafe.bio }}</td>
        <td>{{ formatCurrency(cafe.priceRangeMin) }} - {{ formatCurrency(cafe.priceRangeMax) }}</td>
        <td>{{ cafe.status }}</td>
        <td>
          <el-button type="warning" @click="setCafeToEdit(cafe)">Edit</el-button>
          <el-button type="danger" @click="removeCafe(cafe.cafeId)">
            {{ cafe.status === 'INACTIVE' ? 'Activate' : 'Deactivate' }}
          </el-button>
        </td>
      </tr>
      </tbody>
    </table>

    <!-- Dialog for adding a new cafe -->
    <el-dialog v-model="isAddModalVisible" title="Add New Cafe">
      <div>
        <el-form label-position="top">
          <!-- Cafe Name -->
          <el-form-item label="Cafe Name (*)">
            <el-input v-model="newCafe.name" placeholder="Enter cafe name"></el-input>
          </el-form-item>

          <!-- Address -->
          <el-form-item label="Address (*)">
            <el-input v-model="newCafe.address" placeholder="Enter address"></el-input>
          </el-form-item>

          <!-- Bio -->
          <el-form-item label="Description (*)">
            <el-input v-model="newCafe.bio" type="textarea" placeholder="Enter description"></el-input>
          </el-form-item>

          <!-- Price Range Row -->
          <el-row :gutter="20">
            <!-- Price Range (Min) -->
            <el-col :span="12">
              <el-form-item label="Price Range (Min)">
                <el-input v-model="newCafe.priceRangeMin" type="number" placeholder="Minimum price">
                  <template #append>VNĐ</template>
                </el-input>
              </el-form-item>
            </el-col>

            <!-- Price Range (Max) -->
            <el-col :span="12">
              <el-form-item label="Price Range (Max)">
                <el-input v-model="newCafe.priceRangeMax" type="number" placeholder="Maximum price">
                  <template #append>VNĐ</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>

      <!-- Footer Buttons -->
      <span class="dialog-footer">
        <el-button type="success" @click="addCafe">Add</el-button>
        <el-button type="danger" @click="isAddModalVisible = false">Cancel</el-button>
      </span>
    </el-dialog>

    <!-- Dialog for updating cafe details -->
    <el-dialog v-model="isEditModalVisible" title="Edit Cafe">
      <div>
        <el-form label-position="top">
          <!-- Cafe Name -->
          <el-form-item label="Cafe Name (*)">
            <el-input v-model="cafeToEdit.name" placeholder="Enter cafe name"></el-input>
          </el-form-item>

          <!-- Address -->
          <el-form-item label="Address (*)">
            <el-input v-model="cafeToEdit.address" placeholder="Enter address"></el-input>
          </el-form-item>

          <!-- Bio -->
          <el-form-item label="Description">
            <el-input v-model="cafeToEdit.bio" type="textarea" placeholder="Enter description"></el-input>
          </el-form-item>

          <!-- Price Range -->
          <el-form-item label="Price Range (Min)">
            <el-input v-model="cafeToEdit.priceRangeMin" type="number" placeholder="Minimum price"></el-input>
          </el-form-item>

          <el-form-item label="Price Range (Max)">
            <el-input v-model="cafeToEdit.priceRangeMax" type="number" placeholder="Maximum price"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span class="dialog-footer">
        <el-button type="warning" @click="updateCafeDetails">Edit</el-button>
        <el-button type="danger" @click="isEditModalVisible = false">Cancel</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { ElMessage, ElNotification } from 'element-plus';
import {
  createCafe,
  getAllCafes,
  lockOrUnLock as toggleCafeStatusAPI,
  updateCafe as updateCafeAPI,
} from '@/services/admin/admin-cafe-service';
import {Search} from "@element-plus/icons-vue";

const cafes = ref([]);
const searchQuery = ref(''); // Tạo biến lưu từ khóa tìm kiếm
const filteredCafes = ref([]); // Danh sách cafes sau khi lọc

const newCafe = ref({
  name: '',
  address: '',
  bio: '',
  priceRangeMin: null,
  priceRangeMax: null,
});

const cafeToEdit = ref({
  name: '',
  address: '',
  bio: '',
  priceRangeMin: null,
  priceRangeMax: null,
});

const isAddModalVisible = ref(false);
const isEditModalVisible = ref(false);

// Load cafes when component is mounted
onMounted(async () => {
  await fetchCafes();
});

// Fetch cafes
const fetchCafes = async () => {
  try {
    cafes.value = await getAllCafes();
    filteredCafes.value = cafes.value; // Gán giá trị ban đầu cho danh sách đã lọc
  } catch (error) {
    ElMessage.error('Failed to fetch cafes. Please try again later.');
  }
};

// Hàm lọc cafes dựa trên từ khóa tìm kiếm
const filterCafes = () => {
  const query = searchQuery.value.toLowerCase();
  filteredCafes.value = cafes.value.filter(cafe => {
    return (
        cafe.name.toLowerCase().includes(query) ||
        cafe.address.toLowerCase().includes(query) ||
        cafe.bio.toLowerCase().includes(query)
    );
  });
};

// Add new cafe
const addCafe = async () => {
  if (!newCafe.value.name || !newCafe.value.address) {
    ElNotification({
      title: 'Error',
      message: 'Please enter complete information.',
      type: 'error',
    });
    return;
  }
  try {
    await createCafe(newCafe.value);
    newCafe.value = { name: '', address: '', bio: '', priceRangeMin: null, priceRangeMax: null };
    isAddModalVisible.value = false;
    await fetchCafes();
    ElNotification({
      title: 'Success',
      message: 'New cafe added successfully.',
      type: 'success',
    });
  } catch (error) {
    ElNotification({
      title: 'Error',
      message: error?.message,
      type: 'error',
    });
  }
};

// Set cafe to edit
const setCafeToEdit = (cafe) => {
  cafeToEdit.value = { ...cafe };
  isEditModalVisible.value = true;
};

// Update cafe details
const updateCafeDetails = async () => {
  if (!cafeToEdit.value.name || !cafeToEdit.value.address) {
    ElMessage.error('Please enter complete information.');
    return;
  }
  try {
    await updateCafeAPI(cafeToEdit.value.cafeId, cafeToEdit.value);
    isEditModalVisible.value = false;
    await fetchCafes();
    ElNotification({
      title: 'Success',
      message: 'Cafe details updated successfully.',
      type: 'success',
    });
  } catch (error) {
    ElNotification({
      title: 'Error',
      message: error?.message,
      type: 'error',
    });
  }
};

// Toggle cafe status (Lock/Unlock)
const removeCafe = async (id) => {
  const action = cafes.value.find(cafe => cafe.cafeId === id).status === 'INACTIVE' ? 'Activate' : 'Deactivate';
  if (confirm(`Are you sure you want to ${action} this cafe?`)) {
    try {
      await toggleCafeStatusAPI(id);
      await fetchCafes();
      ElNotification({
        title: 'Success',
        message: `Cafe successfully ${action}ed.`,
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
};

// Format currency in VND
const formatCurrency = (amount) => {
  return amount.toLocaleString('vi-VN') + ' VNĐ';
};

const showAddModal = () => {
  isAddModalVisible.value = true;
};
</script>
