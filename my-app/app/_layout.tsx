import { Stack, Tabs } from "expo-router";
import { Ionicons } from '@expo/vector-icons';

export default function RootLayout() {
  return (
    <Stack screenOptions={{  }}>
      <Stack.Screen name="index" options={{  headerShown: false,  statusBarTranslucent:true }} />
      <Stack.Screen name="info" options={{ headerShown:true, title:"", statusBarColor:'rgb(0, 63, 82)' , headerTransparent:true }} />
    </Stack>
  
  );
}
