import React from 'react';
import { View, Text, StyleSheet, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Member = ()=>{
    return (
      <View style={styles.member}>
        <TextInput style={styles.memberName} defaultValue="member1"></TextInput>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          <Text style={styles.paidAmount}>Paid:</Text>
          <TextInput keyboardType='numeric' style={styles.paidAmount} defaultValue="₹20" />
        </View>


        <Icon name="trash" size={20} color="#fc3503" />
      </View>
    );
}

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
    fontSize: 20,
    marginLeft: 10,
    color: 'green',
  },
  dueAmount: {
    fontSize: 15,
    marginLeft: 10,
    color: 'red',
  },
});

export default Member;