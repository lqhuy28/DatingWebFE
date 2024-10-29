<template>
  <div>
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <h1>Manage User Subscriptions</h1>
      <!-- Search bar -->
      <el-input
          v-model="searchQuery"
          placeholder="Search by Email"
          style="width: 300px;"
          @input="filterSubscriptions"
      >
        <template #prepend>
          <el-button :icon="Search" />
        </template>
      </el-input>
    </div>

    <table>
      <thead>
      <tr>
        <th>ID</th>
        <th>User ID</th>
        <th>Email</th>
        <th>Package Name</th>
        <th>Start Date</th>
        <th>End Date</th>
        <th>Status</th>
        <th style="width: 150px">Operations</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="subscription in filteredSubscriptions" :key="subscription.id">
        <td>{{ subscription.id }}</td>
        <td>{{ subscription.userId }}</td>
        <td>{{ subscription.email }}</td>
        <td>{{ subscription.planName }}</td>
        <td>{{ formatSubmissionDate(subscription.startDate) }}</td>
        <td>{{ formatSubmissionDate(subscription.endDate) }}</td>
        <td>{{ subscription.status }}</td>
        <td>
          <el-button type="primary" @click="viewSubscriptionDetails(subscription.userId)">View Details</el-button>
        </td>
      </tr>
      </tbody>
    </table>

    <!-- Subscription Details Modal -->
    <el-dialog v-model="isDialogVisible" width="50%" title="User Subscription Details">
      <div v-if="selectedSubscription">
        <el-form label-position="top">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="User ID">
                <el-input v-model="selectedSubscription.userId" disabled />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Email">
                <el-input v-model="selectedSubscription.profileName" disabled />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="User ID">
                <el-input v-model="selectedSubscription.email" disabled />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Email">
                <el-input v-model="selectedSubscription.address" disabled />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="Status">
                <el-switch v-model="selectedSubscription.status"
                           active-value="ACTIVE"
                           inactive-value="INACTIVE"
                           disabled />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Role">
                <el-input v-model="selectedSubscription.roleName" disabled />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="Bio">
                <el-input v-model="selectedSubscription.bio" disabled />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Gender">
                <el-input v-model="selectedSubscription.gender" disabled />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="Package Name">
                <el-input v-model="selectedSubscription.subscriptionPlanName" disabled />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Subscription Status">
                <el-input v-model="selectedSubscription.subscriptionStatus" disabled />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="Start Date">
                <el-date-picker type="datetime" v-model="selectedSubscription.subscriptionStartDate" disabled />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="End Date">
                <el-date-picker type="datetime" v-model="selectedSubscription.subscriptionEndDate" disabled />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="Photos">
                <el-row :gutter="20">
                  <el-col v-for="url in selectedSubscription.photoUrls" :key="url" :span="6">
                    <el-image
                        :src="url"
                        fit="cover"
                        :preview-src-list="selectedSubscription.photoUrls"
                        lazy
                    />
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span class="dialog-footer">
    <el-button @click="isDialogVisible = false">Close</el-button>
  </span>
    </el-dialog>

  </div>
</template>

<script setup>
import {onMounted, ref, computed} from 'vue';
import {ElMessage} from 'element-plus';
import {
  getAllUserSubscriptions, getUserSubscriptionById
} from '@/services/admin/admin-subscription-service';
import {Search} from "@element-plus/icons-vue";
import {format} from "date-fns";

const subscriptions = ref([]);
const searchQuery = ref('');
const isDialogVisible = ref(false);
const selectedSubscription = ref(null);

// Computed property to filter subscriptions based on search
const filteredSubscriptions = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return subscriptions.value.filter(subscription =>
      subscription.email.toLowerCase().includes(query)
  );
});

// Load subscriptions when component is mounted
onMounted(async () => {
  await fetchSubscriptions();
});

// Fetch subscriptions
const fetchSubscriptions = async () => {
  try {
    subscriptions.value = await getAllUserSubscriptions();
    console.log("Subscriptions fetched:", subscriptions.value); // Kiểm tra dữ liệu
  } catch (error) {
    ElMessage.error('Failed to fetch subscriptions. Please try again later.');
    console.error(error); // Hiển thị lỗi nếu có
  }
};

// View subscription details
const viewSubscriptionDetails = async (userId) => {
  try {
    selectedSubscription.value = await getUserSubscriptionById(userId); // Fetch user details based on email
    isDialogVisible.value = true;
  } catch (error) {
    console.log(error)
    ElMessage.error('Failed to fetch user details.');
  }
};

// Format the date
const formatSubmissionDate = (dateString) => {
  if (!dateString) return '-'; // Handle null or undefined dates
  return format(new Date(dateString), 'MMMM dd, yyyy HH:mm'); // Format: October 15, 2024 14:30
};
</script>
