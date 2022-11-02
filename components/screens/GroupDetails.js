import React from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const GroupDetails = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Group Name </Text>
        <Icon name="edit" size={30} color="#000" />
      </View>
      <View style={styles.memberList}>
        <Text style={styles.memberName}>Members: </Text>
        <View style={styles.member}>
          <Text style={styles.memberName}>member1</Text>
          <Text style={styles.paidAmount}>Paid: ₹20</Text>
          <Text style={styles.dueAmount}>Due: ₹20</Text>
        </View>
        <View style={styles.member}>
          <Text style={styles.memberName}>member1</Text>
          <Text style={styles.paidAmount}>Paid: ₹20</Text>
          <Text style={styles.dueAmount}>Due: ₹20</Text>
        </View>
        <View style={styles.member}>
          <Text style={styles.memberName}>member1</Text>
          <Text style={styles.paidAmount}>Paid: ₹20</Text>
          <Text style={styles.dueAmount}>Due: ₹20</Text>
        </View>
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
    fontWeight: 'bold',
    marginBottom: 20,
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
});

export default GroupDetails;
