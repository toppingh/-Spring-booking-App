import axios from "axios"

export default class ApiService {
    static BASE_URL = "http://localhost:4040"

    static getHeader() {
        const token = localStorage.getItem("token");
        return {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        };
    }

    // Auth

    // Register a new user
    static async registerUser(registration) {
        const response = await axios.post(`${this.BASE_URL}/auth/register`, registration);
        return response.data;
    }

    // Login a registered user
    static async loginUser(loginDetails) {
        const response = await axios.post(`${this.BASE_URL}/auth/login`, loginDetails);
        return response.data;
    }

    // Users

    // Get the user profile
    static async getAllUsers() {
        const response = await axios.get(`${this.BASE_URL}/users/all`, {
            headers: this.getHeader()
        });
        return response.data;
    }

    static async getUserProfile() {
        const response = await axios.get(`${this.BASE_URL}/users/get-logged-in-profile-info`, {
            headers: this.getHeader()
        });
        return response.data;
    }

    // Get a single user
    static async getUser(userId) {
        const response = await axios.get(`${this.BASE_URL}/users/get-by-id/${userId}`, {
            headers: this.getHeader()
        });
        return response.data;
    }

    // Get user bookings by the user id
    static async getUserBookings(userId) {
        const response = await axios.get(`${this.BASE_URL}/users/get-user-bookings/${userId}`, {
            headers: this.getHeader()
        });
        return response.data;
    }

    // To delete a user
    static async deleteUser(userId) {
        const response = await axios.delete(`${this.BASE_URL}/users/delete/${userId}`, {
            headers: this.getHeader()
        });
        return response.data;
    }


    // Room
    // Add a new rom to the database
    static async addRoom(formData) {
        const result = await axios.post(`${this.BASE_URL}/rooms/add`, formData, {
            headers: {
                ...this.getHeader(),
                "Content-Type": "multipart/form-data"
            }
        });
        return result.data;
    }

    // Get all available rooms
    static async getAllAvailableRooms() {
        const result = await axios.get(`${this.BASE_URL}/rooms/all-available-rooms`);
        return result.data;
    }

    // Get all available by dates rooms from the database with a given date and a room type
    static async getAvailableRoomsByDatedAndType(checkInDate, checkOutDate, roomType) {
        const result = await axios.get(
            `${this.BASE_URL}/rooms/available-rooms-by-date-and-type?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&roomType=${roomType}`
        );
        return result.data;
    }

    // Get all room types from the database
    static async getRoomTypes() {
        const result = await axios.get(`${this.BASE_URL}/rooms/types`);
        return result.data;
    }

    // Get all rooms from the database
    static async getAllRooms() {
        const result = await axios.get(`${this.BASE_URL}/rooms/all`);
        return result.data;
    }

    // Function get a room by the id
    static async getRoomById(roomId) {
        const result = await axios.get(`${this.BASE_URL}/rooms/room-by-id/${roomId}`);
        return result.data;
    }

    // Deletes a room by the id
    static async deleteRoom(roomId) {
        const result = await axios.delete(`${this.BASE_URL}/rooms/delete/${roomId}`, {
            headers: this.getHeader()
        });
        return result.data;
    }

    // Updates a room
    static async updateRoom(roomId, formData) {
        const result = await axios.put(`${this.BASE_URL}/rooms/update/${roomId}`, formData, {
            headers: {
                ...this.getHeader(),
                "Content-Type": "multipart/form-data"
            }
        });
        return result.data;
    }


    // Booking
    // Saves a new booking to the database
    static async bookRoom(roomId, userId, booking) {
        console.log(`UserID is ${userId}`);

        const response = await axios.post(`${this.BASE_URL}/bookings/book-room/${roomId}/${userId}`, booking, {
            headers: this.getHeader()
        });
        return response.data;
    }

    // Get all bookings from the database
    static async getAllBookings() {
        const response = await axios.get(`${this.BASE_URL}/bookings/all`, {
            headers: this.getHeader()
        });
        return response.data;
    }

    // Get booking by the confirmationCode
    static async getBookingByConfirmationCode(bookingCode) {
        const response = await axios.get(`${this.BASE_URL}/bookings/get-by-confirmation-code/${bookingCode}`);
        return response.data;
    }

    // To cancel user booking
    static async cancelBooking(bookingId) {
        const response = await axios.delete(`${this.BASE_URL}/bookings/cancel/${bookingId}`, {
            headers: this.getHeader()
        });
        return response.data;
    }


    // Authentication Checker
    static logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
    }

    static isAuthenticated() {
        const token = localStorage.getItem("token");
        return !!token;
    }

    static isAdmin() {
        const role = localStorage.getItem("role");
        return role === "ADMIN";
    }
    
    static isUser() {
        const role = localStorage.getItem("role");
        return role === "USER";
    }
}