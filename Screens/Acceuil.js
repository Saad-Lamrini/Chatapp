import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Button, ImageBackground } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native';
import initfirebase from '../Config';
import { Link } from '@react-navigation/native';
export default function Acceuil(props) {
  const image = {
    uri: 'https://www.rawpixel.com/image/3305310/free-photo-image-brick-wall-background',
  };
  const auth = initfirebase.auth();
  const [email, setEmail] = useState('');
  const [pwd, setpwd] = useState('');
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/imageback.png')}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.view2style}>
          <Text
            style={{
              fontSize: 26,
              fontWeight: 'bold',
              color: 'black',
              marginTop: 5,
            }}
          >
            Creer compte
          </Text>
          <TextInput
            onChangeText={(email) => {
              setEmail(email);
            }}
            placeholder="Entrer l'adresse mail"
            style={styles.textinputstyle}
          ></TextInput>
          <TextInput
            secureTextEntry={true}
            onChangeText={(pwd) => {
              setpwd(pwd);
            }}
            placeholder="Entrer le mot de passe"
            style={styles.textinputstyle}
          ></TextInput>
          <TextInput
            secureTextEntry={true}
            onChange={(pwd) => {
              setpwd(pwd);
            }}
            placeholder="Confirmer le mot de passe"
            style={styles.textinputstyle}
          ></TextInput>
          <Button
            onPress={() => {
              if (email.length > 0 && email.includes('@')) {
                if (pwd.length > 6) {
                  console.log('jjgjgj');
                  auth
                    .createUserWithEmailAndPassword(email, pwd)
                    .then(() => {
                      props.navigation.replace('home');
                    })
                    .catch((erreur) => {
                      alert(erreur);
                    });
                }
              }
            }}
            title="Login"
            color="black"
            textcolor="#fff"
            accessibilityLabel="Learn more about this purple button"
          />
          <TouchableOpacity
            onPress={() => {
              props.navigation.replace('Auth');
            }}
            style={{
              marginRight: 20,
              width: '100%',
              alignItems: 'flex-end',
            }}
          >
            <Text style={{ color: 'black', paddingTop: 20, paddingRight: 10 }}>
              Vous avez deja un compte
            </Text>
          </TouchableOpacity>
        </View>
        <StatusBar style="auto" />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex hya 9aadh bsh yekhou par rapport lel ecran
    width: '100%',
    height: '100%',
    //flex: 1,
    //paddingTop: 280,
    //paddingLeft: 60,
    //backgroundColor: '#ddf0e4',
    //alignement des items
    alignItems: 'center',
    justifyContent: 'center',
  },
  textstyle: {
    backgroundColor: 'red',
  },
  view2style: {
    backgroundColor: '#9da2c8',
    height: '60%',
    width: '75%',
    marginTop: 100,
    marginLeft: 50,
    //paddingTop: 280,
    //paddingLeft: 60,
    alignItems: 'center',
    borderRadius: 10,
    //alignemeent des items dans la vue fl west
    justifyContent: 'center',
    //alignContent: 'center',
  },

  image: {
    width: '100%',
    height: '100%',
    //flex: 1,
  },
  textinputstyle: {
    backgroundColor: '#0001',
    height: 50,
    width: 220,
    margin: 13,
    padding: 5,
    color: 'black',
    borderRadius: 5,
  },
});
