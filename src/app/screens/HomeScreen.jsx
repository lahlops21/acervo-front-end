import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import { ScrollView, View } from "react-native";

export default function HomeScreen(){
  return(
    <SafeAreaView>
      <ScrollView>
        <View>
        <Header/>
        </View>
        
        <SearchBar/>
      
      </ScrollView>
    </SafeAreaView>

  )
}