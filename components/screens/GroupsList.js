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
import { CurrentRenderContext } from '@react-navigation/native';

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
      if (onAuthCalled) {
        console.log('Prevented a error call to onAuthStateChanged');
        console.log(user);
        setGroups([]);
        setUserName(user.displayName);
        setUid(user.uid);
        getData(user.uid);
        return null;
      }
      if (user) {
        setUid(user.uid);
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
    <Pressable
          android_ripple={{color: '#052b7d'}}
          onPress={() => signOut()}
          style={styles.logoutBtn}>
          <Icon name="user" size={40} color="#3057ab" />
          <Text style={styles.logouttext}>Logout</Text>
    </Pressable>
      <View style={styles.container}>
      <View style={styles.circle}>
        <Text style={styles.title}>
          {userName ? 'Welcome,\n' + userName : 'Welcome User'}
        </Text>
      </View>
      <View style={styles.circle2}>
        <Pressable
          android_ripple={{color: '#052b7d'}}
          style={styles.addBtn}
          onPress={() => addGrpHandler()}>
          <Icon name="plus" size={30} color="#3057ab" />
          <Text style={{color: '#3057ab', fontSize: 15}}>Add group</Text>
        </Pressable>
        </View>

      <Text style={styles.groupheader}>Your Groups</Text>
      
      {groups.length === 0 ? (
        <Text style={{textAlign: 'center', marginTop: 60}}>
          Wow, so empty!
        </Text>
      ) : (
        groups.map((group, index) => {
          return (
            <GroupCard navigator={navigation} key={index} index={index} group={group} name={group.name} members={group.members} />
          );
        })
      )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex:1,
    backgroundColor: '#FCDDB0',
    
    
  },
  title: {
    top:110,
    color:'white',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign:'center',
    marginBottom: 20,
    
  },
  logoutBtn: {
    top:10,
    flexDirection:'row',
    justifyContent: 'flex-end',
    
    // marginBottom: 20,
    padding: 10,
    // backgroundColor:'coral'
  },
  logouttext:{
    color:"#3057ab",
    fontWeight:"bold",
    

  },
  navSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addBtn: {
    top:10,
    // backgroundColor: 'green',
    padding: 10,
    alignItems: 'center',
    marginBottom:20
  },
  circle:{
    flex:1,
    left:30,
    backgroundColor:'coral',
    height:300,
    width:300,
    borderRadius:150,
    top:10,  

  },
  
  circle2:{
    flex:1,
    left:30,
    backgroundColor:'coral',
    height:100,
    width:100,
    borderRadius:50,
    bottom:40,
  },
  groupheader:{    
    flexDirection:"row",
    color:'#001253',
    fontSize: 30,
    fontWeight: 'bold',  
   textAlign:"center"

  }

});

export default GroupsList;
