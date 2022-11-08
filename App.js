import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import UsersList from './screens/UsersList';
import CreateUserScreen from './screens/CreateUserScreen';
import UserDetailScreen from './screens/UserDetailScreen';

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="UsersList" component={ UsersList } options={{ title: 'Users List' }} />
      <Stack.Screen name="CreateUserScreen" component={ CreateUserScreen } options={{ title: 'Create User' }} />
      <Stack.Screen name="UserDetailScreen" component={ UserDetailScreen } options={{ title: 'User Detail' }} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer style={ styles.container }>
      <MyStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
