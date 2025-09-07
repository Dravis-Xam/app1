import { Route, BrowserRouter as Router } from 'react-router-dom';

export default function AppRouter() {
    return (
        <Router>
            {/* Define your routes here */}
            <Route path="/" element={<div>Home</div>} />
            <Route path="/login" element={<div>Login</div>} />
            <Route path="/dashboard" element={<div>Dashboard</div>} />
            <Route path="/signup" element={<div>Signup</div>} />
            <Route path="*" element={<div>404 Not Found</div>} />
        </Router>
    );
}