import {View, Text, Button} from 'react-native';
import Estilos, {corTextos} from '../styles/Estilos';

export default function Login ({navigation}) {
    return (
        <View>
            <Text style={Estilos.titulo}>Tela de Login</Text>
            <Button title="Entrar" color={"#2C3E50"} onPress={() => navigation.navigate('MenuDrawer')}/>
        </View>
    )
}