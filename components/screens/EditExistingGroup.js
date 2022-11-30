import React, { Fragment } from 'react';
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

    // only save if total amount paid === total amount to pay
    let totalPaid = 0;
    let totalToPay = 0;
    members.forEach(member => {
      totalPaid += parseInt(member.paid);
      totalToPay += parseInt(member.due);
    });

    if (totalPaid !== totalToPay) {
      // if not equal
      ToastAndroid.show(
        'Total amount paid and total amount to pay must be equal',
        ToastAndroid.SHORT,
      );
      return;
    }

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
          onPress={() =>
            setMembers([...members, {defaultName: 'member', paid: 0, due: 0}])
          }>
          <Icon name="plus" size={30} color="#038cfc" />
          {/* <Text style={{color: '#60a7e0', marginLeft: 15, fontSize: 17}}>
            Add
          </Text> */}
        </Pressable>
        <Pressable
          android_ripple={{color: '#78b3e3'}}
          style={styles.saveBtn}
          onPress={() => handleSave()}>
          <Icon name="save" size={30} color="#038cfc" />
        </Pressable>
        <Pressable
          onPress={() => removeGroup()}
          android_ripple={{color: '#fc5603'}}
          style={{alignItems: 'center', marginTop: 20,left:10,bottom:5}}
          hitSlop={10}>
          <Icon name="trash" size={30} color="#fc3503" />
        </Pressable>
      </View>
    </ScrollView>

    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCDDB0',
    //marginTop: 20,
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
    //marginBottom: 10,
    color:'#001253',
    fontWeight:"bold",
    borderBottomWidth: 1,

  },
  memberList: {
    marginTop: 20,
    
  },
  memberName: {
    fontSize: 25,
    marginBottom: 10,
    color:'#001253',
    fontWeight:"bold"
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
    right:0,
    top:10
  },
  buttonContainer: {
    
    flexDirection: 'row',
    justifyContent: 'space-around',
    // position:'absolute',
    // margin: 16,
    // right: 10,
    // top:170,
    // bottom:0,
  },
  addBtn: {    
    bottom:0,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    height:'100%',
    
    
    justifyContent: 'space-between',
  },
  saveBtn: {
    padding: 15,
    allignItem:"center",
    
  },
});

export default EditExistingGroup;
