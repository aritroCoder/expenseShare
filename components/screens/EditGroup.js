import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Member from '../utils/Member';

const GroupDetails = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TextInput style={styles.title} defaultValue="Group Name" />
      </View>

      <View style={styles.memberList}>
        <Text style={styles.memberName}>Members: </Text>
        <Member />
        <Member />
        <Member />
        <Member />
      </View>

      <View style={styles.buttonContainer}>
        <Pressable android_ripple={{color: '#78b3e3'}} style={styles.addBtn}>
          <Icon name="plus" size={40} color="#038cfc" />
          <Text style={{color: '#60a7e0', marginLeft: 15, fontSize: 17}}>Add members</Text>
        </Pressable>
        <Pressable android_ripple={{color: '#78b3e3'}} style={styles.saveBtn}>
          <Icon name="save" size={40} color="#038cfc" />
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
    padding: 15,
    margin: 10,
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
  }
});

export default GroupDetails;
