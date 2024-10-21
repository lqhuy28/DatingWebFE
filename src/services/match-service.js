import { instance } from "./api-instance-provider";

// Hàm lấy danh sách matches cho người dùng hiện tại (dựa trên thông tin từ token)
export const getMatchesForUser = async () => {
  try {
    const token = localStorage.getItem("userToken"); // Lấy token từ localStorage
    if (!token) {
      throw new Error("Token không tìm thấy. Vui lòng đăng nhập lại.");
    }

    const response = await instance.get("matches", {
      headers: {
        Authorization: `Bearer ${token}`, // Đính kèm token vào header
      },
    });
    return response.data.data; // Trả về data nếu API trả về đúng định dạng
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: "An error occurred while fetching matches" };
  }
};

// Hàm lấy danh sách tin nhắn theo matchId
export const getMessagesForMatch = async (matchId, token) => {
  try {
    const response = await instance.get(`/messages/match/${matchId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data; // Trả về danh sách tin nhắn
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw new Error("Unable to fetch messages");
  }
};

// Hàm giải mã JWT mà không cần thư viện bên ngoài
function decodeJWT(token) {
  if (!token || typeof token !== "string") {
    console.error("Invalid token:", token);
    return null;
  }

  try {
    const base64Url = token.split(".")[1]; // Lấy phần payload từ JWT
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload); // Trả về payload dưới dạng object
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return null;
  }
}

// Hàm gửi tin nhắn đến server
export const sendMessageToMatch = async (matchId, content, token) => {
  try {
    // Giải mã token để lấy thông tin người dùng (senderId)
    const decodedToken = decodeJWT(token);
    if (!decodedToken) {
      console.error("Failed to decode token");
      alert("Token không hợp lệ. Vui lòng đăng nhập lại.");
      return;
    }
    const senderId = decodedToken.userId || decodedToken.id;
    console.log("Sending payload:", { matchId, senderId, content });

    const response = await instance.post(
      "/messages/send",
      {
        matchId,
        senderId,
        content,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data; // Trả về tin nhắn đã gửi
  } catch (error) {
    console.error(
      "Error sending message:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Unable to send message");
  }
};
