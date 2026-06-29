import BeginScreen from "../screens/BeginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import { createNativeStackNavigator} from "@react-navigation/native-stack"
import BookDetailScreen from "../screens/BookDetailScreen";
import AdminDashboardScreen from "../screens/AdminDashboardScreen";
import AddBookScreen from "../screens/AddBookScreen";
import LoanProcessScreen from "../screens/LoanProcessScreen";
import ManageCollectionScreen from "../screens/ManageCollectionScreen";
import LoansListScreen from "../screens/LoansListScreen";
import LoanDetailScreen from "../screens/LoanDetailScreen";

const Stack = createNativeStackNavigator();
export default function StackRoutes(){
    return(
        <Stack.Navigator initialRouteName="BeginScreen" screenOptions={{headerShown: false}}>
            <Stack.Screen name ="Begin" component = {BeginScreen}/>
            <Stack.Screen name ="AdminDashboard" component = {AdminDashboardScreen}/>
            <Stack.Screen name="HomeScreen" component={HomeScreen}/>
            <Stack.Screen name="LoginScreen" component={LoginScreen}/>
            <Stack.Screen name="RegisterScreen" component={RegisterScreen}/>
            <Stack.Screen name="BeginScreen" component={BeginScreen}/>
            <Stack.Screen name ="BookDetailScreen" component = {BookDetailScreen}/>
            <Stack.Screen name ="AddBook" component = {AddBookScreen}/>
            <Stack.Screen name ="LoanProcess" component = {LoanProcessScreen}/>
            <Stack.Screen name ="ManageCollection" component = {ManageCollectionScreen}/>
            <Stack.Screen name="LoansList" component={LoansListScreen} />
            <Stack.Screen name="LoanDetail" component={LoanDetailScreen} />
            
            
        </Stack.Navigator>
    )
}
