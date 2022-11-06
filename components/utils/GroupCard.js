import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';

const GroupCard = (props) => {
  return (
    <Pressable
      style={styles.infoCard}
      onPress={() => props.navigator.navigate('EditExistingGroup', {index: props.index, group: props.group})}>
      <Text style={styles.groupName}> {props.name} </Text>
      <View style={styles.twoGroups}>
        <View style={styles.membersSection}>
          <Text style={styles.membersName}> Group Members: </Text>
          {props.members.map((member, index) => (
            <Text style={styles.membersName} key={index}>
              {member.name}
            </Text>
          ))}
        </View>
        <View style={styles.duesSection}>
          <Text style={styles.duesName}> My dues </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  infoCard: {
    height: 200,
    backgroundColor: 'red',
    borderRadius: 10,
    margin: 10,
    flexDirection: 'column',
  },
  twoGroups: {
    flexDirection: 'row',
  },
  membersSection: {
    flexDirection: 'column',
    height: '100%',
    backgroundColor: 'blue',
    flex: 1,
  },
  duesSection: {
    flexDirection: 'column',
    height: '100%',
    backgroundColor: 'green',
    flex: 1,
  },
  membersName: {
    fontSize: 15,
    color: 'white',
  },
  duesName: {
    fontSize: 20,
    color: 'white',
  },
  groupName: {
    fontSize: 20,
    color: 'white',
  },
});

export default GroupCard;
