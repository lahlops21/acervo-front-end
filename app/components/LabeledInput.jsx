import { Text, View, StyleSheet, TextInput } from "react-native";

const INPUT_BG = '#F3F3F3';
const INPUT_BORDER = '#A30CA6';
const LABEL_COLOR = '#0883A9';

export default function LabeledInput(){

return(
<View style = {styles.wrapper}>
    
    <Text style={styles.lable} >
        Nome
    </Text>
    <TextInput style ={styles.input} 
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
        fontWeight: "600"
    },

    input: {
        backgroundColor: "#f0caca",
        borderRadius: 2,
        paddingHorizontal: 14,                      // Define espaçamento interno esquerdo/direito
        paddingVertical: 12,    
        
    
    
    }


})