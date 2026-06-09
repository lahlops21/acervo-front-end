import BeginScreen from "../screens/BeginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";
import { createNativeStackNavigator} from "@react-navigation/native-stack"

const Stack = createNativeStackNavigator();
export default function StackRoutes(){
    return(
        <Stack.Navigator inicialRouteName="BeginScreen" screenOptions={{headerShown: false}}>
            <Stack.Screen name="LoginScreen" component={LoginScreen}/>
            <Stack.Screen name="RegisterScreen" component={RegisterScreen}/>
            <Stack.Screen name="BeginScreen" component={BeginScreen}/>
        </Stack.Navigator>
    )
}
