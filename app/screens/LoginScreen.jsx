import { ScrollView, StyleSheet, View } from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import ButtonForm from "../components/ButtonForm";


export default function LoginScreen() {

return(
     <SafeAreaView style = {styles.safeArea}>
        <ScrollView>
            <View style = {styles.form}>
                <ButtonForm
                textButton= "Login"
                
                />
            </View>
        </ScrollView>
     </SafeAreaView>

)


}

const styles = StyleSheet.create({





})