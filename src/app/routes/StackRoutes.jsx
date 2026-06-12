import BeginScreen from "../screens/BeginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import { createNativeStackNavigator} from "@react-navigation/native-stack"
import BookDetailScreen from "../screens/BookDetailScreen";
import AdminDashboardScreen from "../screens/AdminDashboardScreen";
import AddBookScreen from "../screens/AddBookScreen";
import LoanProcessScreen from "../screens/LoanProcessScreen";

const Stack = createNativeStackNavigator();
export default function StackRoutes(){
    return(
        <Stack.Navigator inicialRouteName="BeginScreen" screenOptions={{headerShown: false}}>
            <Stack.Screen name ="AdminDashboard" component = {AdminDashboardScreen}/>
            <Stack.Screen name="HomeScreen" component={HomeScreen}/>
            <Stack.Screen name="LoginScreen" component={LoginScreen}/>
            <Stack.Screen name="RegisterScreen" component={RegisterScreen}/>
            <Stack.Screen name="BeginScreen" component={BeginScreen}/>
            <Stack.Screen name ="BookDetailScreen" component = {BookDetailScreen}/>
            <Stack.Screen name ="AddBook" component = {AddBookScreen}/>
            <Stack.Screen name ="LoanProcess" component = {LoanProcessScreen}/>
            
            
        </Stack.Navigator>
    )
}
