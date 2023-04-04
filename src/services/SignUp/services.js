

import apiClient from "@/services/services.js";

export default {
  getAll() {
    return apiClient.get("/signUp");
  },
  create(data) {
    return apiClient.post("/signUp", data);
  },
  update(id, data) {
    return apiClient.put(`/signUp/${id}`, data);
  },
  delete(id) {
    return apiClient.delete(`/signUp/${id}`);
  }
}