import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { CurrentRenderContext } from '@react-navigation/native';
import initFirebase from '../../Config';
import { Button, Dialog } from 'react-native-paper';

export default function List(props) {
  const database = initFirebase.database();
  const ref = database.ref('profils');

  const [data, setdata] = useState([]);
  const [item, setItem] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    ref.on('value', (datasSnapshot) => {
      let d = [];
      datasSnapshot.forEach((profil) => {
        d.push(profil.val());
      });
      setdata(d);
    });
  }, []);

  console.log('************');
  console.log(data.length);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Liste Des Profils</Text>
      <FlatList
        data={data}
        style={{ width: '100%', height: '100%' }}
        renderItem={({ item }) => (
          <View style={styles.view}>
            <TouchableOpacity
              style={{ width: 50, height: 50 }}
              onPress={() => {
                setVisible(true), setItem(item);
              }}
            >
              <Image
                style={{ width: 50, height: 50 }}
                source={{ uri: item.url }}
                resizeMode="center"
              ></Image>
            </TouchableOpacity>
            <View>
              <Text
                style={{ fontSize: 20, fontWeight: 'bold', marginLeft: '20%' }}
                onPress={() => {
                  props.navigation.replace('chat');
                }}
              >
                {item.pseudo}
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  marginLeft: '25%',
                }}
              >
                {item.nom + ' ' + item.prenom}
              </Text>
            </View>
          </View>
        )}
      ></FlatList>
      <Dialog
        style={{
          backgroundColor: 'white',
          borderRadius: 8,
        }}
        visible={visible}
        onDismiss={() => setVisible(false)}
      >
        <Dialog.Title style={{ color: 'red' }}>Profil</Dialog.Title>
        <Dialog.Content>
          <View>
            <Image
              style={{ width: 100, height: 100 }}
              source={{ uri: item.url }}
              resizeMode="center"
            ></Image>

            <View>
              <Text
                style={{ fontSize: 20, fontWeight: 'bold', marginLeft: '50%' }}
                onPress={() => {
                  props.navigation.replace('chat');
                }}
              >
                {'Pseudo :' + item.pseudo}
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  marginLeft: '50%',
                }}
              >
                {'Nom & Prénom :' + item.nom + ' ' + item.prenom}
              </Text>
            </View>
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => setVisible(false)} title="ok"></Button>
        </Dialog.Actions>
      </Dialog>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignment: CurrentRenderContext,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    alignSelf: 'center',
    margin: 20,
  },
  view: {
    height: 62,
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '90%',
    borderWidth: 2,
    borderColor: 'black',
    margin: 5,
    alignSelf: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    alignSelf: 'right',
  },
});
