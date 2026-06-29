// Componente responsável por renderizar a aplicação principal (o projeto)
import { SafeAreaProvider } from "react-native-safe-area-context";
import Routes from "./app/routes";
import { AuthProvider } from "./app/context/authContext"; // 👈 IMPORTANTE: Ajuste o caminho exato da pasta do seu authContext se necessário

export default function App() {
    return (
        <SafeAreaProvider>
            {/*  O AuthProvider precisa abraçar as Rotas para o useContext funcionar em todas as telas */}
            <AuthProvider> 
                <Routes />
            </AuthProvider>
        </SafeAreaProvider>
    );
}
