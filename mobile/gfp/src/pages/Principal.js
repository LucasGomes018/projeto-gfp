import { Text, View } from "react-native";
import Estilos, { corTextos } from "../styles/Estilos";

export default function Principal({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ ...Estilos.titulo }}>Tela Principal</Text>
    </View>
  );
}
