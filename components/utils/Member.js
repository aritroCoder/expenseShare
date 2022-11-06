import React from 'react';
import {View, Text, StyleSheet, TextInput, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Member = props => {
  const [name, setName] = React.useState(props.name);
  const [paid, setPaid] = React.useState(props.paid);
  const [due, setDue] = React.useState(props.due);

  React.useEffect(() => {
    let temp = props.members;
    temp[props.index] = {name: name, paid: paid, due: due};
    props.setMembers(temp);
  }, [name, due, paid]);

  const removeItem = () => {
    props.setMembers(props.members.filter((_, index) => index !== props.index));
    console.log('index removed: ' + props.index);
  };

  return (
    <View style={styles.member}>
      <TextInput
        style={styles.memberName}
        defaultValue={props.name}
        onChangeText={text => setName(text)}
      />

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        <Text style={styles.paidAmount}>Paid: ₹</Text>
        <TextInput
          keyboardType="numeric"
          style={styles.paidAmount}
          defaultValue={`${props.paid}`}
          onChangeText={text => setPaid(text)}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        <Text style={styles.dueAmount}>To pay: ₹</Text>
        <TextInput
          keyboardType="numeric"
          style={styles.dueAmount}
          defaultValue={`${props.due}`}
          onChangeText={text => setDue(text)}
        />
      </View>

      <Pressable
        onPress={() => removeItem()}
        android_ripple={{color: '#fc5603'}}
        hitSlop={10}>
        <Icon name="trash" size={20} color="#fc3503" />
      </Pressable>
    </View>
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
    fontSize: 20,
    marginLeft: 10,
    color: 'green',
  },
  dueAmount: {
    fontSize: 20,
    marginLeft: 10,
    color: 'red',
  },
});

export default Member;
