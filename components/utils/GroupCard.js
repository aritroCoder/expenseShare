import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';

const GroupCard = (props) => {
  return (
    <Pressable
      style={styles.infoCard}
      onPress={() =>
        props.navigator.navigate('EditExistingGroup', {
          index: props.index,
          group: props.group,
        })
      }>
      <Text style={styles.groupName}> {props.name} </Text>
      <View style={styles.twoGroups}>
        <View style={styles.membersSection}>
          {props.members.map((member, index) => (
            <Text style={styles.membersName} key={index}>
              {member.name}
            </Text>
          ))}
        </View>
        <View style={styles.duesSection}>
          {props.members.map((member, index) => (
            <Text style={styles.duesName} key={index}>
              {parseInt(member.paid)-parseInt(member.due)>=0?"to get ₹"+(parseInt(member.paid)-parseInt(member.due)):"to pay ₹"+(parseInt(member.due)-parseInt(member.paid))}
            </Text>
          ))}
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  infoCard: {
    height: 200,
    backgroundColor: '#B9E0FF',
    borderRadius: 10,
    margin: 10,
    flexDirection: 'column',
    padding: 10,
  },
  twoGroups: {
    flexDirection: 'row',
  },
  membersSection: {
    flexDirection: 'column',
    height: '100%',
    backgroundColor: '#8D9EFF',
    flex: 1,
    padding: 10,
    borderRadius: 10,
  },
  duesSection: {
    flexDirection: 'column',
    height: '100%',
    backgroundColor: '#6C4AB6',
    flex: 1,
    padding: 10,
    borderRadius: 10,
  },
  membersName: {
    fontSize: 15,
    color: '#393E46',
  },
  duesName: {
    fontSize: 15,
    color: 'white',
  },
  groupName: {
    fontSize: 20,
    color: '#001253',
  },
});

export default GroupCard;
