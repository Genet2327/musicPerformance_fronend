import apiClient from "@/services/services.js";

export default {
  getAll() {
    return apiClient.get("/Critiques");
  },
  getAllForUser(userId) {
    return apiClient.get("/Critiques/userTut/" + userId);
  },
  get(id) {
    return apiClient.get(`/Critiques/${id}`);
  },
  create(data) {
    return apiClient.post("/Critiques", data);
  },
  update(id, data) {
    return apiClient.put(`/Critiques/${id}`, data);
  },
  delete(id) {
    return apiClient.delete(`/Critiques/${id}`);
  },
  deleteAll() {
    return apiClient.delete(`/Critiques`);
  },
  findByTitle(title) {
    return apiClient.get(`/Critiques?title=${title}`);
  }
}