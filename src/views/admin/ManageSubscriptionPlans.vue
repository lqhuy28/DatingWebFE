<template>
  <div>
    <h1>Manage Subscription Plans</h1>

    <!-- Table for displaying SubscriptionPlans -->
    <table border="1" style="width: 100%; border-collapse: collapse;">
      <thead>
      <tr>
        <th>ID</th>
        <th>Subscription Plan Name</th>
        <th>Description</th>
        <th>Price</th>
        <th>Duration (Days)</th>
        <th>Image</th>
        <th style="width: 160px">Operations</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="sp in subscriptionPlans" :key="sp.planId">
        <td>{{ sp?.planId }}</td>
        <td>{{ sp.name }}</td>
        <td>{{ sp.description || '-' }}</td>
        <td>{{ sp?.price != null ? `${formatCurrency(sp.price)}` : '-' }}</td>
        <td>{{ sp.duration != null ? sp.duration : '-' }}</td>
        <td><img :src="sp.imageUrl" alt="Plan Image" width="50" /></td>
        <td width="200px">
          <el-button type="primary" @click="openDetailModal(sp)">View Details</el-button>
          <el-button type="warning" @click="openEditModal(sp)">Edit</el-button>
        </td>
      </tr>
      </tbody>
    </table>

    <!-- Modal for viewing and editing subscriptionPlan details -->
    <el-dialog v-model="isDetailModalVisible" :title="isEditing ? 'Edit Subscription Plan' : 'Subscription Plan Details'" width="50%">
      <div>
        <el-form label-position="top" :model="selectedSubscriptionPlan">
          <!-- Row 1: Plan ID and Plan Name -->
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="ID">
                <el-input v-model="selectedSubscriptionPlan.planId" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Subscription Plan Name">
                <el-input v-model="selectedSubscriptionPlan.name" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <!-- Row 2: Description (editable in edit mode) -->
          <el-row>
            <el-col :span="24">
              <el-form-item label="Description">
                <el-input :rows="2" type="textarea" v-model="selectedSubscriptionPlan.description" :disabled="!isEditing"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <!-- Row 3: Price and Duration (editable in edit mode) -->
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="Price">
                <el-input v-model="selectedSubscriptionPlan.price" :disabled="!isEditing"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Duration (Days)">
                <el-input v-model="selectedSubscriptionPlan.duration" :disabled="!isEditing"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <!-- Other details are view-only -->
          <!-- Row 4: Like Limit and Watch Like -->
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="Like Limit">
                <el-switch v-model="selectedSubscriptionPlan.hasLikeLimit" disabled></el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Watch Like">
                <el-switch v-model="selectedSubscriptionPlan.hasWatchLike" disabled></el-switch>
              </el-form-item>
            </el-col>
          </el-row>

          <!-- Row 5: Show Priority and View Profile -->
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="Show Priority">
                <el-switch v-model="selectedSubscriptionPlan.hasShowPriority" disabled></el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="View Profile">
                <el-switch v-model="selectedSubscriptionPlan.hasViewProfile" disabled></el-switch>
              </el-form-item>
            </el-col>
          </el-row>

          <!-- Row 6: Image (view-only) -->
          <el-row>
            <el-col :span="24">
              <el-form-item label="Image">
                <img :src="selectedSubscriptionPlan.imageUrl" alt="Plan Image" width="100" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>

      <span class="dialog-footer">
        <el-button v-if="!isEditing" type="warning" @click="enableEditing">Edit</el-button>
        <el-button v-if="isEditing" type="success" @click="saveChanges">Save</el-button>
        <el-button type="danger" @click="closeDetailModal">Close</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getAllSubscriptionPlans, updateSubscriptionPlan } from '@/services/admin/admin-subscriptionPlan-service';
import { ElMessage } from 'element-plus';

// Variables for holding subscription plans and modal state
const subscriptionPlans = ref([]);
const isDetailModalVisible = ref(false);
const isEditing = ref(false);
const selectedSubscriptionPlan = ref({});

// Fetch subscription plans when the component is mounted
onMounted(async () => {
  await fetchSubscriptionPlans();
});

// Fetch all subscription plans from the server
const fetchSubscriptionPlans = async () => {
  try {
    const response = await getAllSubscriptionPlans();
    subscriptionPlans.value = response;
  } catch (error) {
    ElMessage.error('Failed to fetch subscription plans. Please try again later.');
  }
};

// Function to open the detail modal for viewing or editing
const openDetailModal = (sp) => {
  selectedSubscriptionPlan.value = { ...sp };
  isDetailModalVisible.value = true;
  isEditing.value = false;
};

// Function to open the edit modal with pre-filled data
const openEditModal = (sp) => {
  openDetailModal(sp);
  isEditing.value = true;
};

// Function to close the modal
const closeDetailModal = () => {
  isDetailModalVisible.value = false;
  isEditing.value = false;
};

// Function to enable editing
const enableEditing = () => {
  isEditing.value = true;
};

// Function to save changes
const saveChanges = async () => {
  try {
    await updateSubscriptionPlan(selectedSubscriptionPlan.value);
    ElMessage.success('Subscription plan updated successfully');
    await fetchSubscriptionPlans(); // Refresh the list
    closeDetailModal();
  } catch (error) {
    ElMessage.error('Failed to update the subscription plan. Please try again.');
  }
};

// Format currency in VND
const formatCurrency = (amount) => {
  return amount.toLocaleString('vi-VN') + ' VNĐ';
};
</script>
