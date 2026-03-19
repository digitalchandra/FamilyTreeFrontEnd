import ApiService from "../api/ApiService";
import TokenService from "../utils/TokenService";

class AuthService {

    static async register(data) {
        return ApiService.post("/auth/register", data);
    }

    static async login(data) {
        const response = await ApiService.API.post("/auth/login", data);
    
        if (response.data.token) {
            TokenService.setToken(response.data.token);
        }
    
        return response.data;
    }

    // forgot password
    static async forgotPassword(email) {
        return ApiService.post("/auth/forgot-password", { email });
    }

    // reset password
    static async resetPassword(data) {
        return ApiService.post("/auth/reset-password", data);
    }

    static logout() {
        TokenService.removeToken();
    }
}

export default AuthService;