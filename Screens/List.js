import React, { Component, useEffect, useState } from 'react';
import CommonActions from '@react-navigation/native';
import {
  FlatList,
  TouchableOpacity,
  View,
  Modal,
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TextInput,
  Pressable,
} from 'react-native';

import { CurrentRenderContext } from '@react-navigation/native';
import { Button, Dialog } from 'react-native-paper';
import initfirebase from '../Config';

export default function List(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const database = initfirebase.database();
  const [item, setItem] = useState([]);
  var [visible, setVisible] = useState(false);
  const ref_profils = database.ref('profils');

  //const [data, setData ]=useState([]);

  useEffect(() => {
    data[0] = null;
    ref_profils.on('value', (datasSnapshot) => {
      let d = [];
      datasSnapshot.forEach((profil) => {
        d.push(profil.val());
      });
      setData(d);
    });
  }, []);
  /*dataSnapshot.forEach((profil)=>{
        data.push(profil.val());
        console.log(profil);
      });*/
  // });
  // }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Liste des profils</Text>
      <FlatList
        style={{ width: '100%', height: '100%' }}
        data={data}
        renderItem={({ item }) => (
          <View style={styles.view}>
            <TouchableOpacity
              onPress={() => {
                setVisible(true);
                setItem(item);
              }}
            >
              <Image
                style={{ width: 60, height: 60 }}
                source={{ uri: item.url }}
              ></Image>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                console.log('before enterin : ', item);
                props.navigation.navigate('chat', {
                  name: 'chat',
                  user: item,
                });
                // props.navigation.dispatch(
                //   CommonActions.navigate({
                //     name: 'chat',
                //     params: {
                //       user: item,
                //     },
                //   })
                // );
              }}
            >
              <Text style={{ paddingTop: 10 }}>{item.pseudo}</Text>
              <View></View>
              <Text>{item.nom}</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <Dialog
        style={{
          backgroundColor: 'White',
          borderRadius: 4,
        }}
        visible={visible}
        onDismiss={() => setVisible(false)}
      >
        <Dialog.Title style={{ color: '#009EFF' }}>
          Choose an option
        </Dialog.Title>
        <Dialog.Content>
          <View style={styles.box}>
            {item.url != null ? (
              <Image style={styles.image} source={{ uri: item.url }} />
            ) : (
              <Text>no IMG</Text>
            )}
            <View style={styles.boxContent}>
              <Text style={styles.title}>{item.nom}</Text>
              <Text style={styles.title}>{item.prenom}</Text>
              <Text style={styles.title}>{item.pseudo}</Text>
            </View>
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => setVisible(false)} title="ok"></Button>
          <Button onPress={() => alert('Cancel')} title="Cancel"></Button>
        </Dialog.Actions>
      </Dialog>
    </View>
  );
}
const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    //
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    fontFamily: 'HelveticaNeue',
    color: '#52575D',
  },
  view: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    height: 62,
    margin: 5,
    borderWidth: 1,
    borderColor: 'gray',
    height: 62,
    width: '98%',
  },
  image: {
    width: 100,
    height: 100,
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

  box: {
    padding: 20,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: '#FAF7F0',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'thistle',
    height: 150,
  },
  boxContent: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: 10,
  },
  description: {
    fontSize: 15,
    color: '#646464',
  },
  title: {
    fontSize: 18,
    color: '#151515',
  },
  userImage: {
    height: 120,
    width: 120,
    borderRadius: 60,
    alignSelf: 'center',
    borderColor: '#DCDCDC',
    borderWidth: 3,
  },
  name: {
    fontSize: 18,
    flex: 1,
    alignSelf: 'center',
    color: '#008080',
    fontWeight: 'bold',
  },
  position: {
    fontSize: 14,
    flex: 1,
    alignSelf: 'center',
    color: '#696969',
  },
  followButton: {
    marginTop: 10,
    height: 35,
    width: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: '#00BFFF',
  },
  followButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  icon: {
    height: 20,
    width: 20,
  },
});
