import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import RegisterAll from "../screens/RegisterAll";
import { createNativeStackNavigator} from "@react-navigation/native-stack"

const Stack = createNativeStackNavigator();
export default function StackRoutes(){
    return(
        <Stack.Navigator inicialRouteName="login" screenOptions={{headerShown: false}}>
            <Stack.Screen name="login" component={LoginScreen}/>
            <Stack.Screen name="regsterall" component={RegisterAll}/>
            <Stack.Screen name="registerscreen" component={RegisterScreen}/>
        </Stack.Navigator>
    )
}
