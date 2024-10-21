<template>
  <div class="admin-home dashboard-card">
    <h2>Welcome to the Admin Dashboard!</h2>

    <div class="stats-grid">
      <el-card class="stat-card" shadow="hover" @click="navigateTo('/admin/users')">
        <el-icon class="stat-icon" color="#f56c6c">
          <User />
        </el-icon>
        <div class="stat-content">
          <h3>Users</h3>
          <p>{{ userCount }} users</p>
        </div>
      </el-card>

      <el-card class="stat-card" shadow="hover" @click="navigateTo('/admin/cafes')">
        <el-icon class="stat-icon" color="#67c23a">
          <CoffeeCup />
        </el-icon>
        <div class="stat-content">
          <h3>Cafes</h3>
          <p>{{ cafeCount }} cafes</p>
        </div>
      </el-card>

      <el-card class="stat-card" shadow="hover" @click="navigateTo('/admin/contacts')">
        <el-icon class="stat-icon" color="#e6a23c">
          <ChatLineRound />
        </el-icon>
        <div class="stat-content">
          <h3>Contacts</h3>
          <p>{{ contactCount }} contacts</p>
        </div>
      </el-card>

      <el-card class="stat-card" shadow="hover" @click="navigateTo('/admin/matches')">
        <el-icon class="stat-icon" color="#409eff">
          <Money />
        </el-icon>
        <div class="stat-content">
          <h3>Matches</h3>
          <p>{{ matchCount }} matches</p>
        </div>
      </el-card>
    </div>

    <!-- Combined Chart Section -->
    <div id="statistics-chart" class="chart-container"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { User, CoffeeCup, ChatLineRound, Money } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import { getAllCafes } from '@/services/admin/admin-cafe-service';
import { getAllContactForms } from '@/services/admin/admin-contact-service';
import { getAllUsers } from '@/services/admin/admin-user-service';
import { getAllMatches } from '@/services/admin/admin-match-service';
import * as echarts from 'echarts'; // Import ECharts

// State variables
const userCount = ref(0);
const cafeCount = ref(0);
const contactCount = ref(0);
const matchCount = ref(0);

const router = useRouter();

// Fetch statistics data
const fetchStats = async () => {
  try {
    const users = await getAllUsers();
    userCount.value = users.length;
    const contacts = await getAllContactForms();
    contactCount.value = contacts.length;
    const cafes = await getAllCafes();
    cafeCount.value = cafes.length;
    const matches = await getAllMatches();
    matchCount.value = matches.length;
    renderChart();
  } catch (error) {
    console.error('Error fetching statistics:', error.message);
  }
};

// Navigation function
const navigateTo = (path) => {
  router.push(path);
};

// Render the combined chart
const renderChart = () => {
  const chartDom = document.getElementById('statistics-chart');
  const myChart = echarts.init(chartDom);

  const colors = ['#f56c6c', '#67c23a', '#e6a23c', '#409eff'];

  const option = {
    title: {
      text: 'Statistics Overview'
    },
    tooltip: {},
    xAxis: {
      type: 'category',
      data: ['Users', 'Cafes', 'Contacts', 'Matches']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Count',
        type: 'bar',
        data: [userCount.value, cafeCount.value, contactCount.value, matchCount.value],
        itemStyle: {
          color: (params) => {
            return colors[params.dataIndex];
          }
        }
      }
    ]
  };

  myChart.setOption(option);
};

// Fetch stats and render chart when the component is mounted
onMounted(() => {
  fetchStats();
});
</script>

<style scoped>
.admin-home {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.dashboard-card {
  background-color: #fff;
  border-radius: 16px;
  text-align: center;
}

h2 {
  font-size: 2.4em;
  color: #304156;
  margin-bottom: 20px;
}

p {
  font-size: 1.1em;
  color: #6b7280;
  margin-bottom: 30px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); /* Make each card at least 250px wide and expand */
  gap: 20px; /* Space between the cards */
  width: 100%;
  margin-top: 20px;
}

.stat-card {
  padding: 20px;
  border-radius: 12px;
  background: linear-gradient(135deg, #fef5f5, #fff);
  transition: transform 0.3s ease;
  min-width: 250px;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.stat-card:hover {
  transform: translateY(-10px);
}

.stat-icon {
  font-size: 3em;
  margin-bottom: 10px;
  margin-right: 0 !important;
}

.stat-content h3 {
  font-size: 1.8em;
  color: #2c3e50;
  margin-bottom: 5px;
}

.stat-content p {
  font-size: 1em;
  color: #7f8c8d;
}

.chart-container {
  width: 100%;
  height: 400px;
  margin-top: 30px;
}
</style>
