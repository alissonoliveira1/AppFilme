import { Stack, Tabs } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="user/[id]" options={{ headerShown: true, title:'' }} />
    </Stack>
  );
}
