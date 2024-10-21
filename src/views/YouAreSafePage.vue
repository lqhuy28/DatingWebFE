<template>
    <div class="emergency-page-container">
      <!-- Sidebar -->
      <LoveBellSidebar />
  
      <!-- Nội dung chính của trang -->
      <div class="emergency-page">
        <!-- Tiêu đề trang -->
        <div class="header">
          <h1>YOU ARE SAFE</h1>
          <p>WE WILL PROTECT YOU</p>
          <button class="emergency-button">Emergency contacts</button>
        </div>
  
        <!-- Danh sách liên hệ khẩn cấp -->
        <div class="contact-list">
          <div class="contact-card" v-for="contact in contacts" :key="contact.name">
            <div class="contact-info">
              <h4>{{ contact.name }}</h4>
              <h2>{{ contact.phone }}</h2>
              <img :src="contact.image" :alt="contact.name" class="contact-image" />
              <button class="select-button">Select</button>
            </div>
          </div>
        </div>
  
        <!-- Thông tin đồn cảnh sát -->
        <div class="police-section">
          <h2>Police station</h2>
          <div v-for="station in policeStations" :key="station.id" class="police-station">
            <p>Contact: {{ station.contact }}</p>
            <p>Address: {{ station.address }}</p>
          </div>
        </div>
  
        <!-- Nút yêu cầu trợ giúp -->
        <div class="help-section">
          <button class="help-button">I NEED HELP!</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import LoveBellSidebar from "@/views/sidebar/LoveBellSidebar.vue"; 
  export default {
    components: {
      LoveBellSidebar,
    },
    data() {
      return {
        contacts: [
          {
            name: "FATHER",
            phone: "0902345687",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMmDbCmUZrUakXa9_kkfoIlw1yAk_lpJUpR1h7cO1SYUcsaTeeJhRrvxQ2AlpppIkeDxM&usqp=CAU",
          },
          {
            name: "MOTHER",
            phone: "0908445390",
            image: "https://static.vecteezy.com/system/resources/previews/023/063/651/original/happy-mothers-day-illustration-of-mother-and-daughter-kawaii-chibi-flat-character-vector.jpg",
          },
          {
            name: "BROTHER",
            phone: "0902123183",
            image: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/fb8ec78a-120e-4491-87ef-52175c62409b/d77cqnc-c1484e93-6851-407e-9c64-7a74a89f9e04.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2ZiOGVjNzhhLTEyMGUtNDQ5MS04N2VmLTUyMTc1YzYyNDA5YlwvZDc3Y3FuYy1jMTQ4NGU5My02ODUxLTQwN2UtOWM2NC03YTc0YTg5ZjllMDQuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.af4qz0oaAsFOKKxRVlQlmmExfPrugnMMDePdGdCKgPA",
          },
          {
            name: "SISTER",
            phone: "0901243183",
            image: "https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/bfae8f52-0040-4112-bfd1-5a8bf6f939db/width=450/00000-3205839809.jpeg",
          },
        ],
        policeStations: [
          {
            id: 1,
            contact: "113",
            address: "9 Xa Lộ Hà Nội, Hiệp Phú, Quận 9, Hồ Chí Minh",
          },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  /* Container Flexbox để chứa sidebar và phần chính */
  .emergency-page-container {
    display: flex;
    align-items: flex-start;
  }
  
  .emergency-page {
    flex: 1;
    padding: 20px;
    text-align: center;
    font-family: Arial, sans-serif;
  }
  
  .header h1 {
    color: #ff33cc;
    font-size: 48px;
    font-weight: bold;
    margin: 10px 0px;
  }
  
  .header p {
    font-size: 20px;
    color: #777;
    margin-bottom: 20px;
  }
  
  .emergency-button {
    background-color: #ff0000;
    border: 2px solid #000;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    color: #fff;
    font-weight: bold;
  }
  
  .contact-list {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 30px;
  }
  
  .contact-card {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 200px;
    padding: 20px 0px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  
  .contact-info {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  
  .contact-info h4 {
    font-size: 18px;
    margin-bottom: 10px;
    color: #fff;
  }
  
  .contact-info h2 {
    font-size: 24px;
    margin-bottom: 15px;
  }
  
  .contact-image {
    width: 100px;
    height: 100px;
    margin: 10px auto;
  }
  
  .select-button {
    background-color: #000;
    color: #fff;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
  }
  
  .police-section {
    text-align: left;
    margin: 40px 100px 0px 100px;
  }
  
  .police-section h2 {
    font-size: 28px;
    margin-bottom: 20px;
  }
  .police-section p {
    font-size: 18px;
    margin-bottom: 5px;
  }
  
  .police-station {
    background-color: #f7f7f7;
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 10px;
  }
  
  .help-section {
    margin-top: 50px;
  }
  
  .help-button {
    background-color: #ff33cc;
    color: #fff;
    font-size: 24px;
    padding: 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    display: block;
  }
  
  /* Styling cho Sidebar (nếu có) */
  .sidebar {
    flex: 0 0 250px; /* Cố định chiều rộng cho sidebar */
    padding: 20px;
    background-color: #f5f5f5;
    border-right: 1px solid #ddd;
  }
  </style>
  