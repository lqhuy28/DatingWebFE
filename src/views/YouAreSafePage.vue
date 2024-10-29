<template>
  <div class="emergency-page-container">
    <!-- Sidebar -->
    <LoveBellSidebar />

    <!-- Main Content -->
    <div class="emergency-page">
      <!-- Page Header -->
      <div class="header">
        <h1>YOU ARE SAFE</h1>
        <p>WE WILL PROTECT YOU</p>
        <button class="emergency-button">Emergency Contacts</button>
      </div>

      <!-- Emergency Contact List -->
      <div class="contact-list">
        <div class="contact-card" v-for="contact in contacts" :key="contact.name">
          <div class="contact-info">
            <img :src="contact.image" :alt="contact.name" class="contact-image" />
            <h4>{{ contact.name }}</h4>
            <h2>{{ contact.phone }}</h2>
            <button class="select-button">Select</button>
          </div>
        </div>
      </div>

      <!-- Police Station Information -->
      <div class="police-section">
        <h2>Police Station</h2>
        <div v-for="station in policeStations" :key="station.id" class="police-station">
          <p>Contact: {{ station.contact }}</p>
          <p>Address: {{ station.address }}</p>
        </div>
      </div>

      <!-- Help Button -->
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
        { name: "FATHER", phone: "0902345687", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMmDbCmUZrUakXa9_kkfoIlw1yAk_lpJUpR1h7cO1SYUcsaTeeJhRrvxQ2AlpppIkeDxM&usqp=CAU" },
        { name: "MOTHER", phone: "0908445390", image: "https://static.vecteezy.com/system/resources/previews/023/063/651/original/happy-mothers-day-illustration-of-mother-and-daughter-kawaii-chibi-flat-character-vector.jpg" },
        { name: "BROTHER", phone: "0902123183", image: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/fb8ec78a-120e-4491-87ef-52175c62409b/d77cqnc-c1484e93-6851-407e-9c64-7a74a89f9e04.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2ZiOGVjNzhhLTEyMGUtNDQ5MS04N2VmLTUyMTc1YzYyNDA5YlwvZDc3Y3FuYy1jMTQ4NGU5My02ODUxLTQwN2UtOWM2NC03YTc0YTg5ZjllMDQuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.af4qz0oaAsFOKKxRVlQlmmExfPrugnMMDePdGdCKgPA" },
        { name: "SISTER", phone: "0901243183", image: "https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/bfae8f52-0040-4112-bfd1-5a8bf6f939db/width=450/00000-3205839809.jpeg" },
      ],
      policeStations: [
        { id: 1, contact: "113", address: "9 Xa Lộ Hà Nội, Hiệp Phú, Quận 9, Hồ Chí Minh" },
      ],
    };
  },
};
</script>

<style scoped>
/* Container Flexbox for sidebar and main content */
.emergency-page-container {
  display: flex;
  align-items: flex-start;
  background-color: #f8f9fa;
}

/* Main Emergency Page Styling */
.emergency-page {
  flex: 1;
  padding: 30px;
  text-align: center;
  font-family: Arial, sans-serif;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin: 20px;
}

/* Header Styles */
.header h1 {
  color: #ff6699;
  font-size: 40px;
  font-weight: bold;
  margin: 10px 0;
}

.header p {
  font-size: 18px;
  color: #555;
  margin-bottom: 20px;
}

/* Emergency Button */
.emergency-button {
  background-color: #d32f2f;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  color: #fff;
  font-weight: bold;
  border-radius: 5px;
  transition: background-color 0.3s, transform 0.3s;
}

.emergency-button:hover {
  background-color: #b71c1c;
  transform: scale(1.05);
}

/* Contact List Styles */
.contact-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
}

.contact-card {
  background-color: #e3f2fd;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 200px;
  padding: 20px;
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;
}

.contact-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
}

.contact-info h4 {
  font-size: 20px;
  margin: 10px 0;
  color: #333;
}

.contact-info h2 {
  font-size: 22px;
  color: #333;
}

.contact-image {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin: 15px 0;
  transition: transform 0.3s;
}

.contact-image:hover {
  transform: scale(1.1);
}

.select-button {
  background-color: #0288d1;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s, transform 0.3s;
}

.select-button:hover {
  background-color: #0277bd;
  transform: scale(1.05);
}

/* Police Section */
.police-section {
  text-align: left;
  margin: 40px 60px;
  animation: fadeInUp 1s;
}

.police-section h2 {
  font-size: 26px;
  color: #333;
  margin-bottom: 20px;
}

.police-station {
  background-color: #f1f1f1;
  padding: 20px;
  border-radius: 10px;
  margin: 15px;
}

/* Help Button */
.help-section {
  margin-top: 40px;
}

.help-button {
  background-color: #ff4081;
  color: #fff;
  font-size: 20px;
  padding: 15px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  display: block;
}

.help-button:hover {
  background-color: #f50057;
  transform: scale(1.1);
}

/* Keyframe Animations */
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
