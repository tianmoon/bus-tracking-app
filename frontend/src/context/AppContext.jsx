import { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Load user data từ localStorage khi component mount
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                const userData = JSON.parse(storedUser);
                setUser(userData);
                setIsAuthenticated(true);
            } catch (error) {
                console.error('Error parsing user data:', error);
                localStorage.removeItem('user');
            }
        }
    }, []);

    // Hàm login - lưu user vào state và localStorage
    const login = (userData) => {
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    // Hàm logout - xóa user khỏi state và localStorage
    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('user');
    };

    const value = {
        user,              // Thông tin user: { user_id, name, role, parent_id, identification }
        isAuthenticated,   // Trạng thái đăng nhập
        login,             // Function để login
        logout             // Function để logout
    }

    return(<AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>)
}