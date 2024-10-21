<template>
  <el-breadcrumb separator="/">
    <!-- Home icon with a link -->
    <el-breadcrumb-item>
      <router-link to="/admin/home">
        <el-icon><House /></el-icon>
        Home
      </router-link>
    </el-breadcrumb-item>

    <!-- Dynamic breadcrumbs -->
    <el-breadcrumb-item
        v-for="(breadcrumb, index) in breadcrumbs"
        :key="index"
    >
      <router-link :to="breadcrumb.path">{{ breadcrumb.label }}</router-link>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';
import { House } from '@element-plus/icons-vue'; // Import Home icon

// eslint-disable-next-line no-unused-vars
const route = useRoute();
const router = useRouter();

// Compute breadcrumbs based on current route and its meta
const breadcrumbs = computed(() => {
  const matched = router.currentRoute.value.matched;

  // Filter out the root /admin route to avoid duplicating the home breadcrumb
  return matched
      .filter(route => route.path !== '/admin')
      .map(route => ({
        path: route.path,
        label: route.meta.breadcrumb,
      }));
});
</script>

<style scoped>
.el-breadcrumb {
  margin-bottom: 20px;
}

.el-icon {
  margin-right: 5px; /* Spacing between the icon and text */
}

.el-breadcrumb-item {
  display: flex;
  align-items: center;
}

.el-breadcrumb-item a {
  color: #1f2d3d; /* Customize link color */
  text-decoration: none;
}

.el-breadcrumb-item a:hover {
  text-decoration: underline; /* Add underline on hover */
}
</style>
