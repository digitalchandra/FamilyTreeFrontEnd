import axios from "axios";
import TokenService from "../utils/TokenService";

class ApiService {

  // ================= BASE CONFIG =================
  static BASE_URL = "https://chandrastha.com.np/api";

  static API = axios.create({
    baseURL: this.BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // ================= REQUEST INTERCEPTOR =================
  // Attach token automatically
  static initializeInterceptors() {
    this.API.interceptors.request.use(
      (config) => {
        const token = TokenService.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // ================= RESPONSE INTERCEPTOR =================
    this.API.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response) {
          console.error("API Error:", error.response.data);

          // Handle unauthorized
          if (error.response.status === 401) {
            console.warn("Unauthorized! Logging out...");
            TokenService.removeToken();
            window.location.href = "/login";
          }
        } else {
          console.error("Network Error:", error.message);
        }

        return Promise.reject(error);
      }
    );
  }

  // ================= AUTH APIs =================
  static async registerUser(data) {
    const response = await this.API.post("/auth/register", data);
    return response.data;
  }

  static async loginUser(data) {
    const response = await this.API.post("/auth/login", data);

    // Save token
    if (response.data.token) {
      TokenService.setToken(response.data.token);
    }

    return response.data;
  }

  static async forgetPassword(data){
    const response = await this.API.get("/auth/forgot-password");
    return response.data;
  }

  // ================= FAMILY APIs =================
  static async getFamilyTree() {
    const response = await this.API.get("/person/tree");
    return response.data;
  }

  static async addPerson(data) {
    const response = await this.API.post("/person/add", data);
    return response.data;
  }

  static async updatePerson(id, data) {
    const response = await this.API.post(`/person/update/${id}`, data);
    return response.data;
  }

  static async deletePerson(id) {
    const response = await this.API.delete(`/person/delete/${id}`);
    return response.data;
  }
  
}

//  IMPORTANT: Initialize interceptors ONCE
ApiService.initializeInterceptors();

export default ApiService;