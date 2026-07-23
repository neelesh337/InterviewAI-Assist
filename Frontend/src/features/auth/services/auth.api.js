import axios from 'axios';

// no due to repeative things we can make axios instance and fixed axios with them

const api = axios.create({
    baseURL: "https://interviewai-assist-337.onrender.com/api/auth",
    credentials: true
})

export async function Register({ username, email, password }) {
    try {
        const response = await api.post(
            '/register',
            { username, email, password }
        )

        return response.data;
    } catch (err) {
        console.log(err);
    }
}

export async function Login({ email, password }) {
    try {
        const response = await api.post(
            '/login',
            { email, password }
        )

        return response.data;
    } catch (err) {
        console.log(err);
    }
}

export async function Logout() {
    try {
        const response = await api.post(
            '/logout'
        )

        return response.data;
    } catch (err) {
        console.log(err);
    }
}

// this is without instance => , it take user data after login and pass as context (and refresh page when user data change using useEffect)
export async function GetMe() {
    try {
        const response = await axios.get(
            'http://localhost:3000/api/auth/get-me',
            { withCredentials: true }
        )

        return response.data;
        
    } catch (error) {
        console.log(error);
    }
}
