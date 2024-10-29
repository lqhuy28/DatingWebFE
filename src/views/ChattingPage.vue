<template>
  <div class="custom-chat-app">
    <LoveBellSidebar />

    <!-- Sidebar -->
    <div class="custom-sidebar-chat">
      <div class="custom-profile">
        <h3 class="custom-profile-name">{{ profileName }}</h3>
      </div>
      <ul class="custom-contact-list">
        <li
          v-for="contact in contacts"
          :key="contact.targetUserId"
          class="custom-contact-item"
          @click="selectContact(contact)"
        >
          <img
            :src="contact.targetUserAvatar"
            alt="Contact Image"
            class="custom-contact-avatar"
          />
          <div class="custom-contact-info">
            <span class="custom-contact-name">{{ contact.targetUserName }}</span>
            <span class="custom-contact-message">{{ contact.lastMessage }}</span>
          </div>
        </li>
      </ul>
    </div>

    <!-- Chat Window -->
    <div class="custom-chat-window">
      <div v-if="selectedContact" class="custom-chat-header">
        <img
          :src="selectedContact.targetUserAvatar"
          alt="Profile"
          class="custom-chat-avatar"
        />
        <h3>{{ selectedContact.targetUserName }}</h3>
        <div class="custom-chat-controls">
          <button class="custom-chat-control-button" @click="callUser">
            <span class="material-icons">phone</span>
          </button>
          <button class="custom-chat-control-button" @click="videoCallUser">
            <span class="material-icons">videocam</span>
          </button>
          <button class="custom-chat-control-button" @click="viewInfo">
            <span class="material-icons">info</span>
          </button>
        </div>
      </div>
      <div v-if="selectedContact" class="custom-chat-content" ref="chatContent">
        <div
          class="custom-message"
          v-for="(message, index) in selectedContact.messages"
          :key="index"
          :class="{
            'custom-my-message': message.sender === 'me',
            'custom-other-message': message.sender !== 'me',
          }"
        >
          <img
            v-if="message.sender !== 'me'"
            :src="selectedContact.targetUserAvatar"
            class="custom-chat-avatar"
            alt="Profile"
          />
          <p>{{ message.text }}</p>
        </div>
      </div>

      <div v-if="selectedContact" class="custom-chat-input">
        <input v-model="newMessage" placeholder="Nhắn tin..." />
        <button @click="sendMessage">Gửi</button>
      </div>
    </div>
  </div>
</template>

<script>
import { Stomp } from "@stomp/stompjs";

import LoveBellSidebar from "@/views/sidebar/LoveBellSidebar.vue";
import {
  getMatchesForUser,
  getMessagesForMatch,
  sendMessageToMatch,
} from "@/services/match-service"; // Import API gửi tin nhắn

export default {
  components: {
    LoveBellSidebar,
  },
  data() {
    return {
      profileName: "Message",
      contacts: [],
      selectedContact: null,
      newMessage: "",
      userId: null,
      token: localStorage.getItem("userToken"),
      currentUserId: null,
      stompClient: null, // Đối tượng WebSocket client
    };
  },
  methods: {
    async getMatchesForUser() {
      try {
        const contactsData = await getMatchesForUser();
        this.contacts = contactsData;
      } catch (error) {
        console.error("Error loading contacts:", error.message);
      }
    },
    async selectContact(contact) {
      this.selectedContact = contact;
      const token = this.token;
      if (!token || typeof token !== "string" || token === "1") {
        console.error("Token không hợp lệ:", token);
        alert("Vui lòng đăng nhập lại.");
        return;
      }

      try {
        const messages = await getMessagesForMatch(contact.matchId, token);
        this.selectedContact.messages = messages.map((message) => ({
          text: message.content,
          time: message.createdAt,
          sender: message.senderId === this.currentUserId ? "me" : "them",
        }));

        // Kết nối WebSocket và đăng ký topic mới
        this.connectWebSocket();
        this.subscribeToMessages(contact.matchId);
      } catch (error) {
        console.error("Error loading messages:", error);
        alert("Không thể tải tin nhắn.");
      }
    },
    async sendMessage() {
      if (
        !this.newMessage ||
        typeof this.newMessage !== "string" ||
        this.newMessage.trim() === ""
      ) {
        alert("Nội dung tin nhắn không hợp lệ. Vui lòng nhập lại.");
        return;
      }

      try {
        const token = localStorage.getItem("userToken");
        if (!token || typeof token !== "string" || token === "1") {
          console.error("Token không hợp lệ:", token);
          alert("Vui lòng đăng nhập lại.");
          return;
        }

        if (this.stompClient && this.stompClient.connected) {
          // Gửi tin nhắn qua WebSocket
          const messageRequest = {
            matchId: this.selectedContact.matchId,
            content: this.newMessage,
            senderId: this.currentUserId,
          };
          this.stompClient.send(
            "/app/sendMessage",
            {},
            JSON.stringify(messageRequest)
          );
        } else {
          // Nếu WebSocket không hoạt động, gửi qua REST API như dự phòng
          const sentMessage = await sendMessageToMatch(
            this.selectedContact.matchId,
            this.newMessage,
            token
          );

          // Thêm tin nhắn vào giao diện chat
          this.selectedContact.messages.push({
            text: sentMessage.content,
            time: sentMessage.createdAt,
            sender: "me",
          });
        }

        // Reset input sau khi gửi tin nhắn
        this.newMessage = "";
      } catch (error) {
        console.error("Error sending message:", error);
        alert(
          `Không thể gửi tin nhắn: ${
            error.response?.data?.message || error.message
          }`
        );
      }
    },

    connectWebSocket() {
      if (!this.stompClient) {
        const headers = {
          Authorization: `Bearer ${this.token}`,
          Origin: "http://localhost:8081",
        };
        this.stompClient = Stomp.over(new WebSocket("ws://localhost:8081/ws"));

        this.stompClient.connect(
          headers,
          () => {
            console.log("WebSocket connected successfully.");
            if (this.selectedContact) {
              this.subscribeToMessages(this.selectedContact.matchId);
            }
          },
          (error) => {
            console.error("WebSocket connection error:", error);
          }
        );
      } else if (this.stompClient.connected && this.selectedContact) {
        // Đăng ký lại khi có selectedContact mới
        this.subscribeToMessages(this.selectedContact.matchId);
      }
    },

    subscribeToMessages(matchId) {
      if (this.stompClient && this.stompClient.connected) {
        if (this.subscription) {
          this.subscription.unsubscribe(); // Hủy đăng ký khỏi topic cũ trước khi đăng ký mới
        }

        this.subscription = this.stompClient.subscribe(
          `/topic/messages/${matchId}`,
          (message) => {
            console.log("WebSocket message received:", message.body); // LOG để kiểm tra tin nhắn

            if (message.body) {
              const receivedMessage = JSON.parse(message.body);
              if (receivedMessage.matchId === matchId) {
                // Cập nhật selectedContact.messages
                const updatedMessages = [
                  ...this.selectedContact.messages,
                  {
                    text: receivedMessage.content,
                    time: receivedMessage.createdAt,
                    sender:
                      receivedMessage.senderId === this.currentUserId
                        ? "me"
                        : "them",
                  },
                ];
                this.$set(this.selectedContact, "messages", updatedMessages);

                // Cuộn xuống cuối khi có tin nhắn mới
                this.$nextTick(() => {
                  const chatContent = this.$refs.chatContent;
                  if (chatContent) {
                    chatContent.scrollTop = chatContent.scrollHeight;
                  }
                });
              }
            }
          }
        );
      }
    },

    callUser() {
      alert("Đang gọi điện...");
    },
    videoCallUser() {
      alert("Đang thực hiện cuộc gọi video...");
    },
    viewInfo() {
      alert("Hiển thị thông tin người dùng...");
    },
  },

  async mounted() {
    const token = this.token;
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        this.currentUserId = payload.userId;
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
    await this.getMatchesForUser();
  },
};
</script>

<style scoped>
/* General Layout for Chat App */
.custom-chat-app {
  display: flex;
  height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #f5f7fa; /* Light background */
}

/* Sidebar Chat Styling */
.custom-sidebar-chat {
  width: 400px;
  background-color: #fafafa;
  border-right: 1px solid #e6e6e6;
  overflow-y: auto;
  padding: 10px;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  transition: all 0.3s ease;
}

.custom-profile {
  padding: 15px;
  margin-left: 20px;
  text-align: left;
  font-size: 30px;
  font-weight: bold;
  border-bottom: 1px solid #e6e6e6;
  color: #ff6699;
  border-radius: 10px;
  animation: slideIn 0.5s ease-in-out;
}

.custom-contact-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.custom-contact-item {
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #e6e6e6;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s ease, transform 0.3s ease;
}

.custom-contact-item:hover {
  background-color: #e3f2fd;
  transform: translateX(5px); /* Slight movement on hover */
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
}

.custom-contact-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
  transition: transform 0.3s ease;
}

.custom-contact-avatar:hover {
  transform: scale(1.1); /* Enlarge on hover */
}

/* Contact Info */
.custom-contact-info {
  display: flex;
  flex-direction: column;
}

.custom-contact-name {
  font-weight: bold;
  margin-left: 10px;
  color: #333;
}

.custom-contact-message {
  font-size: 14px;
  color: #888;
}

/* Chat Window Styling */
.custom-chat-window {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  margin: 50px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.05);
  animation: fadeIn 0.8s ease;
}

.custom-chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: #0073e6;
  color: white;
  border-bottom: 1px solid #e6e6e6;
  animation: slideDown 0.5s ease;
}

.custom-chat-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 15px;
}

/* Chat Content */
.custom-chat-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 20px;
  overflow-y: auto;
  max-height: 70vh;
}

.custom-chat-content::-webkit-scrollbar {
  width: 6px;
}

.custom-chat-content::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}

.custom-chat-content::-webkit-scrollbar-track {
  background-color: #f1f1f1;
}

/* Message Bubbles */
.custom-message {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  max-width: 70%;
  word-wrap: break-word;
  transition: transform 0.2s ease;
}

.custom-other-message {
  justify-content: flex-start;
}

.custom-my-message {
  justify-content: flex-end;
  align-self: flex-end;
  background-color: #3897f0;
  color: white;
  border-radius: 15px 15px 15px 15px;
  max-width: fit-content;
  animation: popIn 0.4s ease;
}

.custom-message p {
  margin: 0;
  padding: 10px;
  background-color: #f1f1f1;
  border-radius: 15px 15px 15px 0;
  display: inline-block;
  width: auto;
}

.custom-my-message p {
  background-color: #3897f0;
  color: white;
  display: inline-block;
  width: auto;
  max-width: fit-content;
}

.custom-other-message p {
  background-color: #f1f1f1;
}

/* Input Area */
.custom-chat-input {
  display: flex;
  padding: 10px;
  border-top: 1px solid #e6e6e6;
  background: #fafafa;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
}

.custom-chat-input input {
  flex: 1;
  padding: 15px;
  border: 1px solid #e6e6e6;
  border-radius: 20px;
  margin-right: 10px;
  font-size: 16px;
  transition: border 0.3s ease;
}

.custom-chat-input input:focus {
  border-color: #3897f0;
}

.custom-chat-input button {
  background-color: #3897f0;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;
}

.custom-chat-input button:hover {
  background-color: #0073e6;
  transform: translateY(-2px); /* Lift button on hover */
}

/* Chat Control Buttons */
.custom-chat-controls {
  display: flex;
  gap: 5px;
}

.custom-chat-control-button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: white;
  transition: color 0.3s ease, transform 0.2s ease;
}

.custom-chat-control-button:hover {
  color: #e0e0e0;
  transform: scale(1.1); /* Slightly enlarge on hover */
}

.material-icons {
  font-size: 24px;
}

/* Keyframe Animations */
@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

@keyframes slideDown {
  0% { opacity: 0; transform: translateY(-20px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes slideIn {
  0% { opacity: 0; transform: translateX(-50px); }
  100% { opacity: 1; transform: translateX(0); }
}

@keyframes popIn {
  0% { opacity: 0; transform: scale(0.8); }
  100% { opacity: 1; transform: scale(1); }
}

</style>

