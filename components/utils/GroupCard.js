import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const GroupsList = () => {
  return (
    <View style={styles.infoCard}>
      <Text style={styles.groupName}> Group Name </Text>
      <View style={styles.twoGroups}>
        <View style={styles.membersSection}>
          <Text style={styles.membersName}> Group Members </Text>
        </View>
        <View style={styles.duesSection}>
          <Text style={styles.duesName}> My dues </Text>
        </View>
      </View>
    </View>
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

export default GroupsList;
