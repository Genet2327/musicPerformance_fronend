

import apiClient from "@/services/services.js";

export default {
  getAll() {
    return apiClient.get("/composers");
  },
  getAllForUser(userId) {
    return apiClient.get("/composers/userTut/" + userId);
  },
  get(id) {
    return apiClient.get(`/composers/${id}`);
  },
  create(data) {
    return apiClient.post("/composers", data);
  },
  update(id, data) {
    return apiClient.put(`/composers/${id}`, data);
  },
  delete(id) {
    return apiClient.delete(`/composers/${id}`);
  },
  deleteAll() {
    return apiClient.delete(`/composers`);
  },
  findByTitle(title) {
    return apiClient.get(`/composers?title=${title}`);
  }
}