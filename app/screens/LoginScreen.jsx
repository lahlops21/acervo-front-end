import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from "react-native";
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
                <View style = {styles.registerButton}>
                    <Text style = {styles.title}>Cadastrar</Text>
                </View>

                <TouchableOpacity>
                    <Text style = {styles.noLogin}>Entrar sem login</Text>
                </TouchableOpacity>

            </View>
            
        </ScrollView>
     </SafeAreaView>

)


}

const styles = StyleSheet.create({

    registerButton: {
        backgroundColor: "#D0EFF9",
        borderRadius: 2,
        marginHorizontal: 80,
        paddingVertical: 7,
        alignItems: "center",
        marginTop: 13,
        borderColor: "#0883A9",
        borderWidth: 1

    },

    title: {
        color: "#0883A9",
        marginVertical: 2,
        alignItems: "center",
        textAlign: "center",
        paddingVertical: 6,
        fontWeight:"700",
        fontSize: 17,
        
    },

    noLogin: {
        color: "#0883A9",
        fontSize: 13,
        fontWeight: "700", // pode usar "semi-bold" ou sem aspas. Mas é melhor usar assim. 
        textDecorationLine: "underline",
        marginTop: 28,
        textAlign: "center"
    }



})