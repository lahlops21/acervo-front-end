import { Image, ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ButtonForm from "../components/ButtonForm";
import LabeledInput from "../components/LabeledInput";

export default function LoginScreen(){
    return(
       <SafeAreaView style = {styles.safeArea}>
            <ScrollView>
                <Image
                source ={require("../assets/images/logo1.png")}
                style = {styles.logo}
                />
                
                <View style = {styles.form}>
                <LabeledInput 
                label = "Email"               
                />
                <LabeledInput
                label = "Senha"               
                />
                
                </View>
                <ButtonForm
                textButton= "Entrar"
                />
                
                <TouchableOpacity style = {styles.forget}> 
                    <Text style = {styles.forgetText}>Esqueceu sua senha?</Text>
                </TouchableOpacity>
                
                <Text style = {styles.title}>Não tem cadastro? </Text>
                
                <TouchableOpacity>                        
                        <Text style = {styles.footerLink}> Fazer Cadastro!</Text>
                </TouchableOpacity>
            
            </ScrollView>    
       </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    
    form: {
        width: "100%",
        paddingHorizontal:75,
        marginBottom: 25,
        alignItems: "center"
        
    },

        title: {
        fontSize: 15,
        fontWeight:"700",
        textAlign: "center",
        color: "#6b6e71",
        paddingTop:16,
        marginBottom: 16
        },

        logo:{
        height: 124,
        width:150,
        alignSelf: "center", // centraliza a imagem dentro do conteiner
        marginBottom:74
    },
    
    safeArea : {
        flex:1,
        backgroundColor: "#fff",
        paddingTop: 47
    },

    footerLink: {
        color: "#0e73e8",
        textDecorationLine: "underline",
        fontWeight: "700",
        fontSize: 13,
        textAlign: "center"
    }

})   