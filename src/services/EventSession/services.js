

import apiClient from "@/services/services.js";

export default {
  getAll() {
    return apiClient.get("/eventSessions");
  },
  getAllForUser(userId) {
    return apiClient.get("/eventSessions/userTut/" + userId);
  },
  get(id) {
    return apiClient.get(`/eventSessions/${id}`);
  },
  create(data) {
    return apiClient.post("/eventSessions", data);
  },
  update(id, data) {
    return apiClient.put(`/eventSessions/${id}`, data);
  },
  delete(id) {
    return apiClient.delete(`/eventSessions/${id}`);
  },
  deleteAll() {
    return apiClient.delete(`/eventSessions`);
  },
  findByTitle(title) {
    return apiClient.get(`/eventSessions?title=${title}`);
  }
}