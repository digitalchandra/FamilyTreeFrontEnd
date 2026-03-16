import axios from "axios";
import CryptoJS from "crypto-js";

class ApiService {

  static BASE_URL = "http://localhost:5000/api";
  static ENCRYPTION_KEY = "chandra@2026";

  // Axios instance
  static API = axios.create({
    baseURL: this.BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Encrypt data
  static encrypt(data) {
    const text = typeof data === "string" ? data : JSON.stringify(data);
    return CryptoJS.AES.encrypt(text, this.ENCRYPTION_KEY).toString();
  }

  // Decrypt data
  static decrypt(data) {
    const bytes = CryptoJS.AES.decrypt(data, this.ENCRYPTION_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  // Register
  static async registerUser(registerData) {
    const response = await this.API.post("/auth/register", registerData);
    return response.data;
  }

  // Login
  static async loginUser(loginData) {
    const response = await this.API.post("/auth/login", loginData);
    return response.data;
  }

}

export default ApiService;