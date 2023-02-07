

import apiClient from "@/services/services.js";

export default {
  getAll() {
    return apiClient.get("/instruments");
  },
  getAllForUser(userId) {
    return apiClient.get("/instruments/userTut/" + userId);
  },
  get(id) {
    return apiClient.get(`/instruments/${id}`);
  },
  create(data) {
    return apiClient.post("/instruments", data);
  },
  update(id, data) {
    return apiClient.put(`/instruments/${id}`, data);
  },
  delete(id) {
    return apiClient.delete(`/instruments/${id}`);
  },
  deleteAll() {
    return apiClient.delete(`/instruments`);
  },
  findByTitle(title) {
    return apiClient.get(`/instruments?title=${title}`);
  }
}