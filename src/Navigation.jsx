import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import Pushups from "./Cameraopen.jsx";
import MutualScreen from "./MutualScreen.jsx";
const Stack = createNativeStackNavigator();
export default function Mainnavigator() {
    return (
        <NavigationContainer >
            <Stack.Navigator initialRouteName="Home" >
               
                <Stack.Screen
                    name="Home"
                    component={MutualScreen}
                    options={{ headerShown: false }}
                />
                 <Stack.Screen
                    name="simpleCam"
                    component={Pushups}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}