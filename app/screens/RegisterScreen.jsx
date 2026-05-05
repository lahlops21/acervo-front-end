import { ScrollView, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LabeledInput from "../components/LabeledInput";
import ButtonForm from "../components/ButtonForm";

export default function RegisterScreen(){
    return(

        <SafeAreaView> 
            <ScrollView>
                
                <Text style = {styles.title}>Cadastro: </Text>
                <View style = {styles.form}>
                    <LabeledInput
                    label = "Nome"
                     placeholder = 'Insira seu nome: '
                    />
                    
                    <LabeledInput
                    label = "Email"
                    placeholder = 'Insira seu endereço de email: '
                    keyboardType = 'email-adress'
                    />

                    <LabeledInput
                    label = "Telefone"
                    placeholder = 'Insira seu telefone: '
                    />

                    <LabeledInput
                    label = "Endereço"
                    placeholder = 'Insira seu endereço: '
                    />

                    <View style = {styles.pass}>
                        <LabeledInput
                        label = "Senha"
                        placeholder = 'Insira sua senha: '
                        secureTextEntry = {true} 
                        />

                        <LabeledInput
                        label = "Confirme sua senha"
                        placeholder = 'Insira sua senha: '
                        secureTextEntry = {true} 
                        />
                    </View>
                   
                </View>
                
                <ButtonForm
                textButton= "Cadastrar"
                />
                <Text style = {styles.title}>Já possui cadastro? </Text>
                <TouchableOpacity>                        
                    <Text style = {styles.footerLink}> Fazer Login!</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({

form: {
    padding: 25
},

pass: {
    marginHorizontal: 36
},

title: {
    
    fontSize: 15,
    fontWeight:"700",
    textAlign: "center",
    color: "#6b6e71",
    paddingTop:16,
    marginBottom: 16
    
},

 footerLink: {
        color: "#0e73e8",
        textDecorationLine: "underline",
        fontWeight: "700",
        fontSize: 13,
        textAlign: "center"
    }

})