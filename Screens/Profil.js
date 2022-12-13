import React from 'react';
import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Button,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import initfirebase from '../Config';
export default function App() {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [pseudo, setPseudo] = useState('');
  const [localImage, setLocalImage] = useState(true);
  const [image, setImage] = useState(null);
  const database = initfirebase.database();
  const storage = initfirebase.storage();
  const imageToBlob = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        reject(new TypeError('Network request Failed'));
      };
      xhr.responseType = 'blob'; //arraybuffer
      xhr.open('GET', uri, true);
      xhr.send(null);
    });
    return blob;
  };

  const uploadImage = async (blob) => {
    const ref_imgages = storage.ref().child('imageprofiles');
    //const key = ref_img.push().key;
    const ref_img = ref_imgages.child('images.jpg');
    await ref_img.put(blob);
    const url = await ref_img.getDownloadURL();
    return url;
  };
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result.assets);
    if (!result.canceled) {
      setLocalImage(false);
      setImage(result.uri);
    } else {
      alert('You did not select any image.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ alignSelf: 'center' }}>
          <View style={styles.profileImage}>
            <TouchableOpacity
              style={{ width: 300, height: 300 }}
              onPress={() => {
                pickImage();
              }}
            >
              <Image
                source={
                  localImage ? require('../assets/avatar.png') : { uri: image }
                }
                style={{ resizeMode: 'contain', height: 100, width: 200 }}
                resizeMode="center"
              ></Image>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.infoContainer}>
          <Text style={[styles.text, { fontWeight: '200', fontSize: 36 }]}>
            Julie
          </Text>
        </View>

        <TextInput
          onChangeText={(nom) => {
            setNom(nom);
          }}
          placeholder="nom"
          style={styles.textinput}
        ></TextInput>

        <TextInput
          onChangeText={(prenom) => {
            setPrenom(prenom);
          }}
          placeholder="prenom"
          style={styles.textinput}
        ></TextInput>

        <TextInput
          onChangeText={(pseudo) => {
            setPseudo(pseudo);
          }}
          placeholder="pseudo"
          style={styles.textinput}
        ></TextInput>

        <Button
          title="Save"
          onPress={async () => {
            if (image !== null) {
              /* convertir image to blob
              upload image to storage
            get url and save*/
              const blob = await imageToBlob(image);
              const url = await uploadImage(blob);
              const ref_profils = database.ref('profils');
              const key = ref_profils.push().key;
              ref_profils.child('profil' + key).set({
                nom: nom,
                prenom: prenom,
                pseudo: pseudo,
                url: url,
              });
            }
          }}
        ></Button>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  text: {
    fontFamily: 'HelveticaNeue',
    color: '#52575D',
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
  titleBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginHorizontal: 16,
  },
  profileImage: {
    paddingTop: 80,

    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: 'hidden',
  },

  infoContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 16,
  },

  textinput: {
    paddingLeft: 160,
    backgroundColor: '#0001',
    height: 50,
    width: 360,
    margin: 13,
    padding: 5,
    color: 'black',
    borderRadius: 5,
  },
});
