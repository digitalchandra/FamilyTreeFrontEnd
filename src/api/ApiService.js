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

  //family Get Family members 
  static async getFamilyTree(){
  const response = await this.API.get("/person/tree")
  return response.data;
  }
  // add family member
static async addPerson(data){
  const response = await this.API.post("/person/add", data)
  return response.data;
}

// update family member
static async updatePerson(id,data){
  const response = await this.API.put(`/person/update/${id}`, data)
  return response.data;
}

// delete family member
static async deletePerson(id){
  const response = await this.API.delete(`/person/delete/${id}`)
  return response.data;
}

}

export default ApiService;