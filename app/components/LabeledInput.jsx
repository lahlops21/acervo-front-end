import { StyleSheet, Text, TextInput, View } from "react-native";

const INPUT_BG = '#f5f5f5';
const INPUT_BORDER = '#771161';
const LABEL_COLOR = '#0883A9';

export default function LabeledInput({label, ...rest}){

return(
    <View style = {styles.wrapper}>   
        
        <Text style={styles.lable} >
            {label? label: "Não informado"}
        </Text> 
        
        <TextInput 
        style ={styles.input}  
        placeholderTextColor= "#b5b5b5"
        {...rest}  
        />
    
    </View>

)
}

const styles = StyleSheet.create({

    wrapper: {
        width: "100%"
    },

    lable: {
        color: LABEL_COLOR, 
        fontSize: 14,
        fontWeight: "600",
        marginBottom: 6
    },

    input: {
        backgroundColor: INPUT_BG,
        borderRadius: 2,
        paddingHorizontal: 14,                      // Define espaçamento interno esquerdo/direito
        paddingVertical: 12,   
        marginBottom: 10, 
        borderColor: INPUT_BORDER, 
        borderRadius: 3,
        paddingHorizontal: 14,
        paddingVertical: 12,
        borderWidth: 1,
        shadowColor: '#000',  
        textShadowOffset: {width:1, height: 2},
        shadowOpacity: 0.08,
        shadowRadius:6,
        fontSize:14,
        color: "#222" 
    
    }


})