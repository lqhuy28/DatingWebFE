import {createRouter, createWebHistory} from "vue-router";
import LoginPage from "../views/LoginPage.vue";
import RegisterPage from "@/views/RegisterPage.vue";
import ForgotPasswordPage from "@/views/ForgotPasswordPage.vue";
import HomePage from "../views/HomePage.vue";
import CafePage from "../views/CafePage.vue";
import CriteriaPage from "../views/CriteriaPage.vue";
import YouAreSafePage from "../views/YouAreSafePage.vue";
import MapPage from "../views/MapPage.vue";
import ChattingPage from "../views/ChattingPage.vue";
import ChangePassFirstLogin from "@/views/ChangePassFirstLogin.vue";
import EditProfilePage from "@/views/EditProfilePage.vue";
import UpdateProfileFirstLogin from "@/views/UpdateProfileFirstLogin.vue";
import ViewProfilePage from "@/views/ViewProfilePage.vue";
import NotificationPage from "@/views/NotificationPage.vue";
import SuccessToast from "@/views/Test.vue";
import AdminDashboard from "@/views/admin/AdminDashboard.vue";
import Home from "@/views/admin/Home.vue";
import ManageCafes from "@/views/admin/ManageCafes.vue";
import ManageUsers from "@/views/admin/ManageUsers.vue";
import ManageContacts from "@/views/admin/ManageContacts.vue";
import ManageMatches from "@/views/admin/ManageMatches.vue";
import ManagePayments from "@/views/admin/ManagePayments.vue";
import GetLocation from "@/views/GetLocation.vue";
import ManageSubscriptionPlans from "@/views/admin/ManageSubscriptionPlans.vue";
import PackagePremiumPage from "@/views/PackagePremiumPage.vue";
import ManageMaps from "@/views/admin/ManageMaps.vue";
import ManageStatistics from "@/views/admin/ManageStatistics.vue";
import ManageUserSubscriptions from "@/views/admin/ManageUserSubscriptions.vue";
import LikedBy from "@/views/LikedBy.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: LoginPage, // Trang Login sẽ là trang mặc định
  },
  {
    path: "/changePassFirstLogin",
    name: "ChangePassFirstLogin",
    component: ChangePassFirstLogin,
  },
  {
    path: "/forgotPasswordPage",
    name: "ForgotPasswordPage",
    component: ForgotPasswordPage,
  },
  {
    path: "/registerPage",
    name: "Register",
    component: RegisterPage,
  },
  {
    path: "/youAreSafePage",
    name: "youAreSafePage",
    component: YouAreSafePage,
  },
  {
    path: "/chattingPage",
    name: "chattingPage",
    component: ChattingPage,
  },
  {
    path: "/homePage",
    name: "homePage",
    component: HomePage,
  },
  {
    path: "/cafePage",
    name: "cafePage",
    component: CafePage,
  },
  {
    path: "/criteriaPage",
    name: "criteriaPage",
    component: CriteriaPage,
  },
  {
    path: "/editProfilePage",
    name: "editProfilePage",
    component: EditProfilePage,
  },
  {
    path: "/updateProfileFirstLogin",
    name: "updateProfileFirstLogin",
    component: UpdateProfileFirstLogin,
  },
  {
    path: "/mapPage",
    name: "mapPage",
    component: MapPage,
  },
  {
    path: "/profile",
    name: "profile",
    component: ViewProfilePage,
  },
  {
    path: "/notification",
    name: "notification",
    component: NotificationPage,
  },
  {
    path: "/getLocation",
    name: "getLocation",
    component: GetLocation,
  },
  {
    path: "/a",
    name: "a",
    component: SuccessToast,
  },
  {
    path: "/packagePremiumPage",
    name: "packagePremiumPage",
    component: PackagePremiumPage,
  },
  {
    path: "/likedBy",
    name: "likedBy",
    component: LikedBy,
  },
  {
    path: '/admin',
    name: 'AdminDashboard',
    component: AdminDashboard,
    children: [
      {
        path: '',
        component: Home,
        // meta: { breadcrumb: 'Home' }
      },  // Default to Home
      {
        path: 'home',
        component: Home,
        meta: { breadcrumb: 'Home' }
      }, // Explicit Home route
      {
        path: 'cafes',
        component: ManageCafes, // Đường dẫn đến component quản lý quán cafe,
        meta: { breadcrumb: 'Manage Cafes' }
      },
      {
        path: 'users',
        component: ManageUsers, // Đường dẫn đến component quản lý users,
        meta: { breadcrumb: 'Manage Users' }
      },
      {
        path: 'contacts',
        component: ManageContacts, // Đường dẫn đến component quản lý contacts,
        meta: { breadcrumb: 'Manage Contacts' }
      },
      {
        path: 'matches',
        component: ManageMatches, // Đường dẫn đến component quản lý matches,
        meta: { breadcrumb: 'Manage Matches' }
      },
      {
        path: 'payments',
        component: ManagePayments, // Đường dẫn đến component quản lý payments,
        meta: { breadcrumb: 'Manage Payments' }
      },
      {
        path: 'subscriptionplans',
        component: ManageSubscriptionPlans, // Đường dẫn đến component quản lý Packages,
        meta: { breadcrumb: 'Manage SubscriptionPlans' }
      },
      {
        path: 'usersubscriptions',
        component: ManageUserSubscriptions, // Đường dẫn đến component quản lý Statistics,
        meta: { breadcrumb: 'Manage UserSubscriptions' }
      },
      {
        path: 'maps',
        component: ManageMaps, // Đường dẫn đến component quản lý Maps,
        meta: { breadcrumb: 'Manage Maps' }
      },
      {
        path: 'statistics',
        component: ManageStatistics, // Đường dẫn đến component quản lý Statistics,
        meta: { breadcrumb: 'Manage Statistics' }
      },
    ],
  }];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
