import { createContext, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Api from '../services/Api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const navigate  = useNavigate();
    const [cookies, setCookies, removeCookies] = useCookies();

    const login = async ({email, password}) => {
        
        try {
            const res = await Api.post('/login', {
                email: email,
                password: password
            });

            setCookies('token', res.data.token);
            setCookies('email', res.data.user.email);
            setCookies('name', res.data.user.name);

            navigate('/admin');
        } catch (err) {
            // Nothing here
        }
    }

    const logout = async () => {
        try {
            await Api.post('/logout', null, {
                headers: {
                    'Authorization': `Bearer ${cookies.token}`
                }
            });

            ['token', 'name', 'email'].forEach(obj => removeCookies(obj));
            navigate('/admin/login');
        } catch (err) {
            console.log(err);
        }
    }

    const value = useMemo(
        () => ({
            cookies,
            login,
            logout
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [cookies]
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext);
}