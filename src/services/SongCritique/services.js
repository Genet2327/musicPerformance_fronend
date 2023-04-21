import apiClient from "@/services/services.js";

export default {
  getAll() {
    return apiClient.get("/songCritiques");
  },
  getAllBySongId(songId) {
    return apiClient.get(`/songCritiques/bySongId/${songId}`);
  },
  getOneBySongId(songId, userId) {
    return apiClient.get(`/songCritiques/bySongId/${songId}/${userId}`);
  },
  get(id) {
    return apiClient.get(`/songCritiques/${id}`);
  },
  create(data) {
    return apiClient.post("/songCritiques", data);
  },
  update(id, data) {
    return apiClient.put(`/songCritiques/${id}`, data);
  },
  delete(id) {
    return apiClient.delete(`/songCritiques/${id}`);
  },
};
