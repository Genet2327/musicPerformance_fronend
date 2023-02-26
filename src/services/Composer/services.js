import apiClient from "@/services/services.js";

export default {
  getAll() {
    return apiClient.get("/Composer");
  },
  getAllForUser(userId) {
    return apiClient.get("/Composer/userTut/" + userId);
  },
  get(id) {
    return apiClient.get(`/Composer/${id}`);
  },
  create(data) {
    return apiClient.post("/Composer", data);
  },
  update(id, data) {
    return apiClient.put(`/Composer/${id}`, data);
  },
  delete(id) {
    return apiClient.delete(`/Composer/${id}`);
  },
  deleteAll() {
    return apiClient.delete(`/Composer`);
  },
  findByTitle(title) {
    return apiClient.get(`/Composer?title=${title}`);
  }
}