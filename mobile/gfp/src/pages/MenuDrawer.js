import { createDrawerNavigator } from "@react-navigation/drawer";
import Principal from "./Principal";
import AntDesign from "@expo/vector-icons/AntDesign";

const Drawer = createDrawerNavigator();

export default function MenuDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerActiveBackgroundColor: "#2C3E50",
        drawerActiveTintColor: "#fff",
        drawerInactiveTintColor: "#34495e",
        drawerStyle: {
          backgroundColor: "#ecf0f1",
          width: 200,
          borderTopRightRadius: 20,
          borderBottomRightRadius: 20,
          elevation: 5, // Sombra no Android
        },
        drawerLabelStyle: {
          fontSize: 18,
          fontWeight: "bold",
          fontFamily: "Arial",
        },
        headerStyle: {
          backgroundColor: "#2C3E50",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontSize: 22,
          fontWeight: "bold",
        },
      }}
    >
      <Drawer.Screen
        name="Principal"
        component={Principal}
        options={{
          title: "Principal",
          drawerIcon: ({ size, color }) => (
            <AntDesign name="home" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
