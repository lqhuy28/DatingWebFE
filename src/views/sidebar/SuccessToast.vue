    <template>
    <head>
        <!-- FontAwesome CDN -->
        <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />
    </head>
    <div v-if="isToastVisible" class="toast">
        <div class="toast-content">
        <i class="fas fa-solid fa-check check"></i>

        <div class="message">
            <span class="text text-1">Success</span>
            <span class="text text-2">Login successfully</span> <!-- Cập nhật hiển thị thông điệp -->
        </div>
        </div>

        <i class="fa-solid fa-xmark close"></i>

        <div class="progress"></div>
    </div>
    </template>

<script>
export default {
  name: "SuccessToast",
  props: {
    message: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isToastVisible: true
    };
  },
  methods: {
    showToast() {
      this.isToastVisible = true;
      setTimeout(() => {
        this.isToastVisible = false;
      }, 5000);
    }
  }
};
</script>

    <style>
    template {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f2f2f2;
    }

    .toast {
    position: absolute;
    top: 25px;
    right: 30px;
    border-radius: 12px;
    background: #fff;
    padding: 20px 35px 20px 25px;
    box-shadow: 0 5px 10px #0000001a;
    border-left: 6px solid #00ff33;
    overflow: hidden;
    }

    .toast .toast-content {
    display: flex;
    align-items: center;
    }

    .toast-content .check {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 35px;
    width: 35px;
    background-color: #00ff33;
    color: #fff;
    font-size: 20px;
    border-radius: 50%;
    }

    .toast-content .message {
    display: flex;
    flex-direction: column;
    margin: 0 20px;
    }

    .message .text {
    font-size: 20px;
    font-weight: 400;
    color: #666666;
    }

    .message .text.text-1 {
    font-weight: bold;
    color: #333;
    text-align: left;
    margin-bottom: 5px;
    }

    .toast .close {
    position: absolute;
    top: 10px;
    right: 15px;
    padding: 5px;
    cursor: pointer;
    opacity: 0.7;
    }

    .toast .close:hover {
    opacity: 1;
    }
    .toast .progress {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 3px;
    width: 100%;
    background: #ddd;
    }

    .toast .progress:before {
    content: "";
    position: absolute;
    bottom: 0;
    right: 0;
    height: 100%;
    width: 100%;
    background-color: #00ff33;
    }
    </style>
