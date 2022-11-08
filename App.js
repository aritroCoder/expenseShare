import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Custom Components
import LoginWithGoogle from './components/screens/LoginWithGoogle';
import GroupsList from './components/screens/GroupsList';
import GroupDetails from './components/screens/GroupDetails';
import EditGroup from './components/screens/EditGroup';
import EditExistingGroup from './components/screens/EditExistingGroup';

//constants Initailization
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          options={{headerShown: false}}
          component={LoginWithGoogle}
        />
        <Stack.Screen
          name="Groups"
          options={{headerShown: false}}
          component={GroupsList}
        />
        <Stack.Screen
          name="GroupDetails"
          options={{headerShown: false}}
          component={GroupDetails}
        />
        <Stack.Screen
          name="EditGroup"
          options={{headerShown: false}}
          component={EditGroup}
        />
        <Stack.Screen
          name="EditExistingGroup"
          options={{headerShown: false}}
          component={EditExistingGroup}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;


// keytool -genkeypair -v -storetype PKCS12 -keystore expenseShare.keystore -alias expenseShare -keyalg RSA -keysize 2048 -validity 10000
// password for key generation: 'password'