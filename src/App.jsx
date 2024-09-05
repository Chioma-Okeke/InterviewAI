import AuthProvider from "./contexts/AuthContext";
import { PageRoutes } from "./Routes";

function App() {
    return (
        <AuthProvider>
            <div className="selection:bg-[#51e651] selection:text-white selection:font-medium">
                <PageRoutes />
            </div>
        </AuthProvider>
    );
}

export default App;
