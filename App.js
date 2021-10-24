import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Button, SafeAreaView, Text, View } from "react-native";
import AddContact from "./src/screen/AddContact";
import CarouselContacts from './src/screen/CarouselContacts';
import EditContact from './src/screen/EditContact';
import Home from './src/screen/Home';
import ListContacts from './src/screen/ListContacts';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="CarouselContacts"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ListContacts" component={ListContacts} />
        <Stack.Screen name="EditContact" component={EditContact} />
        <Stack.Screen name="AddContact" component={AddContact} />
        <Stack.Screen name="CarouselContacts" component={CarouselContacts} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;