import { AuthProvider } from './AuthProvider';

function AppProvider({ children }) {

    return(
        <AuthProvider>
            { children }
        </AuthProvider>
    );
}

export default AppProvider;