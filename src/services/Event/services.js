

import apiClient from "@/services/services.js";

export default {
 
  getAllEvents(eventSessionId) {
    return apiClient.get(`/eventSessions/${eventSessionId}/events`);
  },
  getEvent(eventSessionId, id) {
    return apiClient.get(`/eventSessions/${eventSessionId}/events/${id}`);
  },
  createEvent(eventSessionId, data) {
    return apiClient.post(`/eventSessions/${eventSessionId}/events`, data);
  },
  updateEvent(eventSessionId, id, data) {
    return apiClient.put(`/eventSessions/${eventSessionId}/events/${id}`, data);
  },
  update(id, data) {
    return apiClient.put(`/eventSessions/events/${id}`, data);
  },
  deleteEvent(eventSessionId, id) {
    return apiClient.delete(`/eventSessions/${eventSessionId}/events/${id}`);
  },
  getAllEvent(eventSessionId) {
    return apiClient.get(`/eventSessions/${eventSessionId}/events`);
  },
  getAvalableEvent(id) {
    return apiClient.get(`/eventSessions/Avalablity/${id}`);
  },
  deleteAvalability(userId, EventId){
    return apiClient.delete(`/eventSessions/Avalablity/${userId}/${EventId}`);
  }
}