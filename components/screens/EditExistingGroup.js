import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import Member from '../utils/Member';

const EditExistingGroup = (props) => {
  const [members, setMembers] = React.useState([]);
  const [grpName, setGrpName] = React.useState('Group Name');
  const [uid, setUid] = React.useState(null);

  React.useEffect(() => {
    auth().onAuthStateChanged(user => {
      if (user) {
        setUid(user.uid);
        console.log('Uid = ' + user.uid);
      }
    });

    setGrpName(props.route.params.group.name);
    setMembers(props.route.params.group.members);

  }, []);

  const handleSave = () => {
    console.log(JSON.stringify(members));

    firestore()
      .collection(uid)
      .doc(props.route.params.group.id)
      .update({
        name: grpName,
        members: members,
      })
      .then(() => {
        ToastAndroid.show('Group Updated', ToastAndroid.SHORT);
        props.navigation.navigate('Groups');
      });
    props.navigation.navigate('Groups');
  };

  const removeGroup = () => {
    firestore()
      .collection(uid)
      .doc(props.route.params.group.id)
      .delete()
      .then(() => {
        ToastAndroid.show('Group Deleted. Pull down to refresh list', ToastAndroid.SHORT);
        props.navigation.navigate('Groups');
      });
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.title}
          defaultValue={grpName}
          onChangeText={text => setGrpName(text)}
        />
      </View>

      <View style={styles.memberList}>
        <Text style={styles.memberName}>Members: </Text>
        {members.map((member, index) => (
          <Member
            key={index}
            index={index}
            name={member.name}
            paid={member.paid}
            due={member.due}
            members={members}
            setMembers={setMembers}
          />
        ))}
      </View>

      <View style={styles.buttonContainer}>
        <Pressable
          android_ripple={{color: '#78b3e3'}}
          style={styles.addBtn}
          onPress={() => props.navigation.goBack()}>
          <Text style={{color: '#60a7e0', marginLeft: 0, fontSize: 37}}>
            ←
          </Text>
        </Pressable>
        <Pressable
          android_ripple={{color: '#78b3e3'}}
          style={styles.addBtn}
          onPress={() =>
            setMembers([...members, {name: 'member', paid: 0, due: 0}])
          }>
          <Icon name="plus" size={40} color="#038cfc" />
          <Text style={{color: '#60a7e0', marginLeft: 15, fontSize: 17}}>
            Add
          </Text>
        </Pressable>
        <Pressable
          android_ripple={{color: '#78b3e3'}}
          style={styles.saveBtn}
          onPress={() => handleSave()}>
          <Icon name="save" size={40} color="#038cfc" />
        </Pressable>
        <Pressable
          onPress={() => removeGroup()}
          android_ripple={{color: '#fc5603'}}
          style={{alignItems: 'center', marginTop: 20}}
          hitSlop={10}>
          <Icon name="trash" size={40} color="#fc3503" />
        </Pressable>
      </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
    borderBottomWidth: 1,
  },
  memberList: {
    marginTop: 20,
  },
  memberName: {
    fontSize: 20,
    marginBottom: 10,
  },
  member: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  paidAmount: {
    fontSize: 15,
    marginLeft: 10,
    color: 'green',
  },
  dueAmount: {
    fontSize: 15,
    marginLeft: 10,
    color: 'red',
  },
  addBtn: {
    padding: 5,
    margin: 5,
    backgroundColor: '#a2cff5',
    alignItems: 'center',
    marginHorizontal: 120,
    borderRadius: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  addBtn: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  saveBtn: {
    padding: 15,
  },
});

export default EditExistingGroup;
