import { instance } from "./api-instance-provider";


// Hàm để tải một hồ sơ ngẫu nhiên
export async function loadRandomProfile() {
  try {
    const response = await instance.get('/profiles/random', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('userToken')}`,
      },
    });

    // Adjust the returned profile format to match the expected output (even though it's a single object)
    if (response.data && response.data.data) {
      const profile = {
        profileId: response.data.data.profileId,
        userId: response.data.data.userId,
        name: response.data.data.name,
        age: response.data.data.age,
        bio: response.data.data.bio,
        imageUrl: response.data.data.avatar || response.data.data.imageUrl, // Adjust based on actual API response
        photos: response.data.data.photos || [],
      };

      return [profile]; // Return the profile in an array format to keep the rest of the code compatible
    } else {
      throw new Error("Invalid API response format");
    }
  } catch (error) {
    console.error("Error loading random profiles:", error);
    throw error;
  }
}


// Hàm để gọi API tải tất cả hồ sơ người dùng
export async function loadAllProfiles() {
  try {
    const response = await instance.get(`/profiles`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`, // Gửi token trong header
      },
    });
    // Đảm bảo ánh xạ đúng trường hình ảnh
    return response.data.data.map((profile) => ({
      ...profile,
      imageUrl: profile.avatar || profile.imageUrl, // Sử dụng avatar hoặc imageUrl tuỳ thuộc vào API
    }));
  } catch (error) {
    console.error("Error loading all profiles:", error);
    throw error;
  }
}
