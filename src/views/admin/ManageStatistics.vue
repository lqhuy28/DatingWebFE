<template>
  <div class="chart-container">
    <h2>Statistics of Packages Sold</h2>

    <el-select v-model="selectedType" @change="fetchStats" placeholder="Select Statistics Type">
      <el-option label="Monthly" value="monthly"></el-option>
      <el-option label="Quarterly" value="quarterly"></el-option>
      <el-option label="Yearly" value="yearly"></el-option>
    </el-select>

    <!-- Chart for Subscription Stats -->
    <div id="subscription-chart" ref="subscriptionChartRef" style="width: 100%; height: 400px;"></div>

    <h2>Package Price Statistics</h2>

    <el-select v-model="selectedPriceType" @change="fetchPriceStats" placeholder="Select Price Statistics Type">
      <el-option label="Monthly Price" value="monthly"></el-option>
      <el-option label="Quarterly Price" value="quarterly"></el-option>
      <el-option label="Yearly Price" value="yearly"></el-option>
    </el-select>

    <!-- Chart for Package Price Stats -->
    <div id="price-chart" ref="priceChartRef" style="width: 100%; height: 400px;"></div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { getSubscriptionStats, getRevenueStats } from '@/services/admin/admin-subscription-service';
import * as echarts from 'echarts';

export default {
  name: 'SubscriptionStats',
  setup() {
    const subscriptionChartRef = ref(null);
    const priceChartRef = ref(null);
    const subscriptionChartInstance = ref(null);
    const priceChartInstance = ref(null);
    const selectedType = ref('monthly');
    const selectedPriceType = ref('monthly');
    const subscriptionChartTitle = ref('Number of Packages Sold by Month');
    const priceChartTitle = ref('Package Prices by Month');
    const chartOptions = ref({});
    const priceChartOptions = ref({});

    // Fetch subscription stats
    const fetchStats = async () => {
      try {
        const stats = await getSubscriptionStats(selectedType.value);
        const years = stats.map(item => item.year);
        const periods = stats.map(item => item.period);
        const counts = stats.map(item => item.count);

        // Prepare data for the chart
        const xAxisData = years.map((year, index) => {
          const period = periods[index] !== null ? periods[index] : ''; // Set to empty string if null
          return period ? `${year}-${period}` : year.toString(); // Format as "YYYY-period" or just "YYYY"
        });

        subscriptionChartTitle.value = `Number of Packages Sold by ${capitalize(selectedType.value)}`;

        chartOptions.value = {
          title: {
            text: subscriptionChartTitle.value,
          },
          tooltip: {},
          legend: {
            data: ['Quantity'],
          },
          xAxis: {
            type: 'category',
            data: xAxisData,
          },
          yAxis: {
            type: 'value',
          },
          series: [{
            name: 'Quantity',
            type: 'line',
            data: counts,
          }],
        };

        // Initialize the subscription chart
        if (!subscriptionChartInstance.value) {
          subscriptionChartInstance.value = echarts.init(subscriptionChartRef.value);
        }
        subscriptionChartInstance.value.setOption(chartOptions.value); // Set the options properly

      } catch (error) {
        console.error('Error fetching subscription stats:', error);
      }
    };

    const fetchPriceStats = async () => {
      try {
        const stats = await getRevenueStats(selectedPriceType.value);
        const years = stats.map(item => item.year);
        const periods = stats.map(item => item.period);
        const prices = stats.map(item => item.totalRevenue);

        // Prepare data for the chart
        const xAxisData = years.map((year, index) => {
          const period = periods[index] !== null ? periods[index] : ''; // Set to empty string if null
          return period ? `${year}-${period}` : year.toString(); // Format as "YYYY-period" or just "YYYY"
        });

        priceChartTitle.value = `Package Prices by ${capitalize(selectedPriceType.value)}`;

        priceChartOptions.value = {
          title: {
            text: priceChartTitle.value,
          },
          tooltip: {},
          legend: {
            data: ['Price'],
          },
          xAxis: {
            type: 'category',
            data: xAxisData,
          },
          yAxis: {
            type: 'value',
          },
          series: [{
            name: 'Price',
            type: 'line',
            data: prices,
          }],
        };

        // Initialize the price chart
        if (!priceChartInstance.value) {
          priceChartInstance.value = echarts.init(priceChartRef.value);
        }
        priceChartInstance.value.setOption(priceChartOptions.value); // Set the options properly

      } catch (error) {
        console.error('Error fetching package price stats:', error);
      }
    };

    const capitalize = (str) => {
      return str.charAt(0).toUpperCase() + str.slice(1); // Capitalize the first letter
    };

    const resizeCharts = () => {
      if (subscriptionChartInstance.value) {
        try {
          subscriptionChartInstance.value.resize(); // Resize subscription chart
        } catch (error) {
          console.error('Error resizing subscription chart:', error);
        }
      }
      if (priceChartInstance.value) {
        try {
          priceChartInstance.value.resize(); // Resize price chart
        } catch (error) {
          console.error('Error resizing price chart:', error);
        }
      }
    };

    onMounted(() => {
      fetchStats(); // Fetch subscription data on mount
      fetchPriceStats(); // Fetch price data on mount
      window.addEventListener('resize', resizeCharts); // Listen for resize events

      // Initialize the charts after data is fetched
      // Initialization code is now included in fetch functions, so it's not needed here

      // Cleanup when component unmounts
      return () => {
        window.removeEventListener('resize', resizeCharts);
        if (subscriptionChartInstance.value) {
          subscriptionChartInstance.value.dispose(); // Dispose subscription chart instance
        }
        if (priceChartInstance.value) {
          priceChartInstance.value.dispose(); // Dispose price chart instance
        }
      };
    });

    return {
      subscriptionChartRef,
      priceChartRef,
      selectedType,
      selectedPriceType,
      fetchStats,
      fetchPriceStats,
      subscriptionChartTitle,
      priceChartTitle,
      chartOptions,
      priceChartOptions
    };
  },
};
</script>

<style>
.chart-container {
  padding: 20px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin: 20px;
  transition: box-shadow 0.3s ease;
}

.chart-container:hover {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

h2 {
  font-size: 24px;
  color: #333333;
  margin-bottom: 15px;
  text-align: center;
}

.el-select {
  width: 100%;
  max-width: 300px;
  margin: 0 auto 20px;
}

.el-option {
  font-size: 16px;
}

#subscription-chart,
#price-chart {
  width: 100%;
  height: 400px;
  border-radius: 8px;
  background-color: #f5f5f5;
  border: 1px solid #e0e0e0;
}
</style>
