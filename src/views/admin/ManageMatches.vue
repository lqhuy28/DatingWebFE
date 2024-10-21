<template>
  <div>
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <h1>Manage Matches</h1>

      <!-- Search bar -->
      <el-input
          v-model="searchQuery"
          placeholder="Search by User1 Email or User2 Email"
          style="width: 300px;"
          @input="filterMatches"
      >
        <template #prepend>
          <el-button :icon="Search" />
        </template>
      </el-input>
    </div>

    <table>
      <thead>
      <tr>
        <th>Match ID</th>
        <th>User 1</th>
        <th>User 2</th>
        <th>Created At</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="match in filteredMatches" :key="match.match_id">
        <td>{{ match.matchId }}</td>
        <td>
          {{ match.user1Email }}
          <span v-if="match.user1Name">- {{ match.user1Name }}</span>
        </td>
        <td>
          {{ match.user2Email }}
          <span v-if="match.user2Name">- {{ match.user2Name }}</span>
        </td>
        <td>{{ formatSubmissionDate(match.createdAt) }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import { ElMessage } from 'element-plus';
import { getAllMatches } from '@/services/admin/admin-match-service';
import { Search } from "@element-plus/icons-vue";
import {format} from "date-fns";

const matches = ref([]);
const searchQuery = ref('');

// Filter matches based on search query
const filteredMatches = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return matches.value.filter(match =>
      match.user1Email.toString().includes(query) ||
      match.user2Email.toString().includes(query)
  );
});

// Fetch matches when component is mounted
onMounted(async () => {
  await fetchMatches();
});

// Fetch all matches
const fetchMatches = async () => {
  try {
    matches.value = await getAllMatches();
  } catch (error) {
    ElMessage.error('Failed to fetch matches. Please try again later.');
  }
};

// Format the date
const formatSubmissionDate = (dateString) => {
  if (!dateString) return '-'; // Handle null or undefined dates
  return format(new Date(dateString), 'MMMM dd, yyyy HH:mm'); // Format: October 15, 2024 14:30
};
</script>
