import {Pressable, View, Text, StyleSheet} from "react-native"

const BG_BUTTON = "#A30CA6";
const TEXT_PRIMARY = "#FFF"


export default function ButtonForm ({textButton}) {
    return (
        <View style = {styles.button}>
            <Pressable style = {styles.button}>
                <Text style = {styles.title}>
                    {textButton ? textButton: "Não Informado"}
                </Text>
            </Pressable>
        </View>
    )
}


const styles = StyleSheet.create({

button: {
    backgroundColor: BG_BUTTON,
    borderRadius: 2,
    marginHorizontal: 80,
    paddingVertical: 8,
    alignItems: "center",
    
},

title: {
    color: TEXT_PRIMARY,
    justifyContent: "center",
    fontWeight: "700",
    fontSize: 17
}


})