
import apiClient from "@/services/services.js";

export default {
  getAllSongByUserId(userId) {
    return apiClient.get(`/songs/allsong/${userId}`);
  }, 
  getAll() {
    return apiClient.get("/songs");
  },
  getAllSignUpIdr(signUpId) {
    return apiClient.get(`/songs/SignUpId/${signUpId}`);
  }, 
  getAllSongForUser(userId) {
    return apiClient.get(`/songs/allByUserId/${userId}`);
  }, 
  get(id) {
    return apiClient.get(`/songs/${id}`);
  },
  create(data) {
    return apiClient.post("/songs", data);
  },
  update(id, data) {
    return apiClient.put(`/songs/${id}`, data);
  },
  delete(id) {
    return apiClient.delete(`/songs/${id}`);
  },
  deleteAll() {
    return apiClient.delete(`/songs`);
  },
  findByTitle(title) {
    return apiClient.get(`/songs?title=${title}`);
  }
}