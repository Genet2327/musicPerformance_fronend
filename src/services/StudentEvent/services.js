import apiClient from "@/services/services.js";

export default { 
  getAll() {
    return apiClient.get(`/studentEvent`);
  },
  getUserAll(eventId) {
    return apiClient.get(`/studentEvent/user/${eventId}`);
  },
}