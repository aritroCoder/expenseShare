import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';

import GroupCard from '../utils/GroupCard';

let onAuthCalled = false;

const GroupsList = ({navigation}) => {
  const [userName, setUserName] = React.useState(null);
  const [uid, setUid] = React.useState(null);
  const [groups, setGroups] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const getData = uid => {
    firestore()
      .collection(uid)
      .get()
      .then(querySnapshot => {
        console.log('snapshot length = ' + querySnapshot.size);
        querySnapshot.forEach(doc => {
          setGroups(groups => [...groups, {...doc.data(), id: doc.id}]);
        });
      });
    setRefreshing(false);
  };

  React.useEffect(() => {
    auth().onAuthStateChanged(user => {
      setUid(user.uid);
      if (onAuthCalled) {
        console.log('Prevented a error call to onAuthStateChanged');
        return null;
      }
      if (user) {
        onAuthCalled = true; // so that on auth state changed is called only once
        setGroups([]);
        console.log('User is: ' + JSON.stringify(user));
        setUserName(user.displayName);
        getData(user.uid);
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
      navigation.navigate('Login');
    }
  };

  const addGrpHandler = () => {
    navigation.navigate('EditGroup');
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() =>{setGroups([]); getData(uid)}}
        />
      }
    >
      <View style={styles.navSection}>
        <Text style={styles.title}>
          {userName ? 'Welcome,\n' + userName : 'Your Groups'}
        </Text>

        <Pressable
          android_ripple={{color: '#052b7d'}}
          style={styles.addBtn}
          onPress={() => addGrpHandler()}>
          <Icon name="plus" size={30} color="#3057ab" />
          <Text style={{color: '#3057ab', fontSize: 15}}>Add group</Text>
        </Pressable>

        <Pressable
          android_ripple={{color: '#052b7d'}}
          onPress={() => signOut()}
          style={styles.logoutBtn}>
          <Icon name="user" size={30} color="#3057ab" />
          <Text style={{color: '#3057ab'}}>Logout</Text>
        </Pressable>
      </View>
      {groups.length === 0 ? (
        <Text style={{textAlign: 'center', marginTop: 60}}>
          Wow, such empty
        </Text>
      ) : (
        groups.map((group, index) => {
          return (
            <GroupCard navigator={navigation} key={index} index={index} group={group} name={group.name} members={group.members} />
          );
        })
      )}
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
