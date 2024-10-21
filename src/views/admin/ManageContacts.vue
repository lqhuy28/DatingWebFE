<template>
  <div>
    <h1>Manage Contact Forms</h1>

    <table>
      <thead>
      <tr>
        <th>ID</th>
        <th>Full Name</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Message</th>
        <th>Submission Date</th>
        <th>Response Date</th>
        <th>Response Status</th>
        <th style="width: 120px">Operations</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="form in contactForms" :key="form.id">
        <td>{{ form.id }}</td>
        <td>{{ form.fullName }}</td>
        <td>{{ form.email }}</td>
        <td>{{ form.phoneNumber }}</td>
        <td>{{ form.message }}</td>
        <td>{{ formatSubmissionDate(form?.submissionDate) }}</td>
        <td>{{ formatSubmissionDate(form?.responseDate) }}</td>
        <td>
          <el-tag :type="getTagType(form.responseStatus)">
            {{ form.responseStatus }}
          </el-tag>
        </td>
        <td>
          <el-button
              type="primary"
              @click="openReplyModal(form)"
              :disabled="form.responseStatus === 'Responded'">
            {{ form.responseStatus === 'Responded' ? 'Replied' : 'Reply' }}
          </el-button>
        </td>

      </tr>
      </tbody>
    </table>

    <!-- Modal for replying to contact form -->
    <el-dialog title="Reply to Contact Form" v-model="isReplyModalVisible" width="600px">
      <div>
        <p><strong>Contact ID:</strong> {{ selectedForm?.id }}</p>
        <p><strong>Message:</strong> {{ selectedForm?.message }}</p>
        <el-form>
          <el-form-item label="Reply (HTML allowed)">
            <el-input type="textarea" v-model="replyMessage" rows="6" placeholder="Enter your HTML reply here"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <el-button type="warning" @click="sendReply">Send Reply</el-button>
        <el-button type="danger" @click="isReplyModalVisible = false">Cancel</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { ElMessage, ElNotification } from 'element-plus';
import {
  getAllContactForms,
  replyToContactForm as replyToContactFormAPI
} from '@/services/admin/admin-contact-service';
import { format } from 'date-fns'; // Import date-fns format function

const contactForms = ref([]);
const isReplyModalVisible = ref(false); // Controls visibility of the modal
const selectedForm = ref(null); // Stores the currently selected form
const replyMessage = ref(''); // Stores the reply message entered by the user

// Load contact forms when component is mounted
onMounted(async () => {
  await fetchContactForms();
});

// Fetch contact forms
const fetchContactForms = async () => {
  try {
    contactForms.value = await getAllContactForms();
  } catch (error) {
    ElMessage.error('Failed to fetch contact forms. Please try again later.');
  }
};

// Open reply modal and set selected form
const openReplyModal = (form) => {
  selectedForm.value = form;
  replyMessage.value = ''; // Clear previous reply
  isReplyModalVisible.value = true;
};

// Send reply
const sendReply = async () => {
  if (replyMessage.value.trim() === '') {
    ElMessage.warning('Please enter a reply message.');
    return;
  }

  try {
    await replyToContactFormAPI(selectedForm.value.id, replyMessage.value); // Call the API to send the reply
    await fetchContactForms(); // Refresh contact forms list
    ElNotification({
      title: 'Success',
      message: 'Replied to contact form successfully.',
      type: 'success',
    });
    isReplyModalVisible.value = false; // Close modal after success
  } catch (error) {
    ElNotification({
      title: 'Error',
      message: error?.message,
      type: 'error',
    });
  }
};

// Format the submission date
const formatSubmissionDate = (dateString) => {
  if (!dateString) return '-'; // Handle null or undefined dates
  return format(new Date(dateString), 'MMMM dd, yyyy HH:mm'); // Format: October 15, 2024 14:30
};

// Get tag type based on response status
const getTagType = (status) => {
  switch (status) {
    case 'Responded':
      return 'success'; // Green
    case 'Not Responded':
      return 'warning'; // Yellow
    default:
      return 'default'; // Gray
  }
};
</script>