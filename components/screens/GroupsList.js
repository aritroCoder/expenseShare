import React from 'react';
import {View, Text, StyleSheet, ScrollView, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import GroupCard from '../utils/GroupCard';

const GroupsList = ({navigation}) => {
  const [userName, setUserName] = React.useState(null);

  React.useEffect(() => {
    auth().onAuthStateChanged(user => {
      if (user) {
        setUserName(user.displayName);
      }
    });
  }, []);

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      navigation.navigate('Login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.navSection}>
        <Text style={styles.title}>
          {userName ? 'Welcome,\n' + userName : 'Your Groups'}
        </Text>

        <Pressable android_ripple={{color: '#052b7d'}} style={styles.addBtn}>
          <Icon name="plus" size={30} color="#3057ab" />
          <Text style={{color: '#3057ab', fontSize: 15}}>Add group</Text>
        </Pressable>

        <Pressable android_ripple={{color: '#052b7d'}} onPress={()=>signOut()} style={styles.logoutBtn}>
          <Icon name="user" size={30} color="#3057ab" />
          <Text style={{color: '#3057ab'}}>Logout</Text>
        </Pressable>
      </View>
      <GroupCard />
      <GroupCard />
      <GroupCard />
      <GroupCard />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 20,
    padding: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  logoutBtn: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
  },
  navSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addBtn: {
    padding: 15,
    alignItems: 'center',
  },
});

export default GroupsList;
