import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, Text } from 'react-native';
import { RootStackParamList } from '../App';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Group from './Group';
import List from './List';
import Profil from './Profil';

const Tab = createMaterialBottomTabNavigator();

function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // width: 100,
      }}
    >
      <Text>Home!</Text>
    </View>
  );
}

function GroupScreen() {
  return <View></View>;
}
function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}
export default function Home(props) {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Group" component={Group} />
      <Tab.Screen name="List" component={List} />
      <Tab.Screen name="Profil" component={Profil} />
    </Tab.Navigator>
  );
}
