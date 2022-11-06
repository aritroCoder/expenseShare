import React, {useState} from 'react';
import { View, Text, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes
} from '@react-native-google-signin/google-signin';

const LoginWithGoogle = ({navigation}) => {
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {

    auth().onAuthStateChanged((user)=>{
      // console.log(user);
      if(user) navigation.navigate('Groups');
    });

    GoogleSignin.configure({
      scopes: ['email'],
      webClientId:
        '525802998247-81n7o4k807pkkffc17csed0ijmk413pk.apps.googleusercontent.com',
      offlineAccess: true,
    });
  }, []);

  signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    } catch (error) {
      console.error(error);
    }
  };

  async function onGoogleButtonPress() {
    setLoading(true);
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // console.log("Signed in with Google");
    setLoading(false);
    navigation.navigate('Groups');
    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  return (
    <View style={styles.container}>
      <GoogleSigninButton
        style={{width: 192, height: 48}}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={onGoogleButtonPress}
      />
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoginWithGoogle;
