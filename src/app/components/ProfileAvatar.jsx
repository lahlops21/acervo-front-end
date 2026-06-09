import { TouchableOpacity, Text, StyleSheet } from "react-native";


export default function ProfileAvatar({isLogged, initials, onPress}){
return (

    <TouchableOpacity onPress={onPress} styles = {styles.container}>
        {isLogged ? 
        ( <Text styles = {styles.text}> {initials} </Text> ) : (

        <Text styles = {styles.text}> 👽 </Text>
            
        )}

    </TouchableOpacity>

);

}

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#8a5cf6', // O roxo lindo do seu layout
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  }
});