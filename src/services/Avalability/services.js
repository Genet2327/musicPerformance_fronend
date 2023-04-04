

import apiClient from "@/services/services.js";

export default {
  getOneByUser(userId, eventId) {
    return apiClient.get("/avalability/user/" + userId + "/event/" + eventId);
  },
  getAll() {
    return apiClient.get("/avalability");
  },
  getAllForUser(userId) {
    return apiClient.get("/avalability/userTut/" + userId);
  },
  get(id) {
    return apiClient.get(`/avalability/${id}`);
  },
  create(data) {
    return apiClient.post("/avalability", data);
  },
  update(id, data) {
    return apiClient.put(`/avalability/${id}`, data);
  },
  delete(id) {
    return apiClient.delete(`/avalability/${id}`);
  },
  deleteAll() {
    return apiClient.delete(`/avalability`);
  },
  findByTitle(title) {
    return apiClient.get(`/avalability?title=${title}`);
  }
}