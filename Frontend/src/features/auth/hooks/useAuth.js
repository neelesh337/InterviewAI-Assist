import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { Login, Register, Logout, GetMe } from "../services/auth.api";

export const useAuth = () => {

    const context = useContext(AuthContext)
    const { user, setUser, loading, setLoading } = context


    const handleLogin = async ({ email, password }) => {
        setLoading(true)
        try {
            const data = await Login({ email, password })
            setUser(data.user)
            console.log(data.user);
        } catch (error) {

        } finally {
            setLoading(false)
        }
    }

    const handleRegister = async ({ username, email, password }) => {
        setLoading(true)
        try {
            const data = await Register({ username, email, password })
            setUser(data.user)
        } catch (err) {

        } finally {
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        setLoading(true)
        try {
            const data = await Logout()
            setUser(null)
        } catch (err) {

        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {

        const getAndSetUser = async () => {
            try {
                const data = await GetMe()
                setUser(data.user)
            } catch (err) { } finally {
                setLoading(false)
            }
        }
        getAndSetUser();

    }, [])


    return { user, loading, handleLogin, handleLogout, handleRegister };
}