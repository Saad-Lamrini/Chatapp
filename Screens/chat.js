import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Alert,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import React, { useState, useEffect, Profiler } from 'react';
import initfirebase from '../Config';

export default function Chat(navigation) {
  var [email, setEmail] = useState([]);
  var [text, setText] = useState([]);
  var [typingId, setTypingId] = useState('');
  var [receiver, setReceiver] = useState('');
  var [sender, setSender] = useState('');
  var [typing, setTyping] = useState(false);

  var database = initfirebase.database();
  var connectedRef = database.ref('chats');
  var connectedRef1 = database.ref('typing');

  useEffect(() => {
    setReceiver(navigation.route.params.user.email);
    if (initfirebase.auth().currentUser !== null) {
      //console.log(database.auth().currentUser.providerData.email)
      setSender(initfirebase.auth().currentUser.providerData[0].email);
    }
    console.log('******************');

    console.log(navigation.route.params.user);
    console.log('******************');

    connectedRef.on('value', (snapshot) => {
      let d = snapshot.val();
      setTyping(false);
      setEmail(
        Object.keys(d).map((val) => {
          if (
            d[val].email !=
            initfirebase.auth().currentUser.providerData[0].email
          ) {
            return {
              message: d[val].message,
              receiver: d[val].receiver,
              sender: d[val].sender,
            };
          }
        })
      );
    });

    connectedRef1.on('value', (snapshot) => {
      let d = snapshot.val();
      console.log(d);
      if (d != null) {
        Object.keys(d).map((val) => {
          if (
            d[val].uid != initfirebase.auth().currentUser.providerData[0].email
          ) {
            setTyping(true);
          }
        });
      }
    });
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title1}>Discussion</Text>
      <FlatList
        data={email}
        renderItem={({ item, index }) => (
          <View>
            {item.sender === receiver ? (
              <View
                style={{
                  backgroundColor: '#0078fe',
                  padding: 10,
                  marginLeft: '45%',
                  borderRadius: 5,

                  marginTop: 5,
                  marginRight: '5%',
                  maxWidth: '50%',
                  alignSelf: 'flex-end',
                  borderRadius: 20,
                }}
                key={item.uid}
              >
                <Text style={{ fontSize: 16, color: '#fff' }} key={1}>
                  {item.message}
                </Text>

                <View style={styles.rightArrow}></View>
                <View style={styles.rightArrowOverlap}></View>
              </View>
            ) : (
              <View
                style={{
                  backgroundColor: '#dedede',
                  padding: 10,
                  borderRadius: 5,
                  marginTop: 5,
                  marginLeft: '5%',
                  maxWidth: '50%',
                  alignSelf: 'flex-start',

                  borderRadius: 20,
                }}
                key={1}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: '#000',
                    justifyContent: 'center',
                  }}
                  key={1}
                >
                  {' '}
                  {item.message}
                </Text>
                <View style={styles.leftArrow}></View>
                <View style={styles.leftArrowOverlap}></View>
              </View>
            )}
            {typing == true && index + 1 == email.length ? (
              <View
                style={{
                  backgroundColor: '#0078fe',
                  padding: 10,
                  marginLeft: '45%',
                  borderRadius: 5,

                  marginTop: 5,
                  marginRight: '5%',
                  maxWidth: '50%',
                  alignSelf: 'flex-end',
                  borderRadius: 20,
                }}
                key={item.uid}
              >
                <Text style={{ fontSize: 16, color: '#fff' }} key={1}>
                  is Typing...
                </Text>

                <View style={styles.rightArrow}></View>
                <View style={styles.rightArrowOverlap}></View>
              </View>
            ) : null}
          </View>
        )}
      ></FlatList>

      <TextInput
        style={styles.testInput2}
        placeholder="Password"
        id="password"
        onFocus={() => {
          console.log('focus');
          const ref_profils = database.ref('typing');
          const key = ref_profils.push().key;
          let id = 'typing' + key;

          database.ref('typing').child(id).set({
            uid: initfirebase.auth().currentUser.providerData[0].email,
          });
          setTypingId(id);
          // t()
        }}
        onBlur={() => {
          database.ref('typing').child(typingId).remove();
          // t()
        }}
        onChangeText={(text) => {
          setText(text);
        }}
      />
      <Button
        title="Submit"
        style={styles.btn}
        onPress={() => {
          const ref_profils = database.ref('chats');
          const key = ref_profils.push().key;
          console.log({
            sender: sender,
            message: text,
            receiver: receiver,
          });
          database
            .ref('chats')
            .child('chat' + key)
            .set({
              sender: sender,
              message: text,
              receiver: receiver,
            });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },
  title1: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  view: {
    height: 62,
    width: '90%',
  },
  image: {
    width: 100,
    height: 100,
  },

  box: {
    padding: 20,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: 'white',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'thistle',
    borderRadius: 50,
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
  rightArrow: {
    position: 'absolute',
    backgroundColor: '#0078fe',
    //backgroundColor:"red",
    width: 20,
    height: 25,
    bottom: 0,
    borderBottomLeftRadius: 25,
    right: -10,
  },

  rightArrowOverlap: {
    position: 'absolute',
    backgroundColor: '#eeeeee',
    //backgroundColor:"green",
    width: 20,
    height: 35,
    bottom: -6,
    borderBottomLeftRadius: 18,
    right: -20,
  },

  /*Arrow head for recevied messages*/
  leftArrow: {
    position: 'absolute',
    backgroundColor: '#dedede',
    //backgroundColor:"red",
    width: 20,
    height: 25,
    bottom: 0,
    borderBottomRightRadius: 25,
    left: -10,
  },

  leftArrowOverlap: {
    position: 'absolute',
    backgroundColor: '#eeeeee',
    //backgroundColor:"green",
    width: 20,
    height: 35,
    bottom: -6,
    borderBottomRightRadius: 18,
    left: -20,
  },
});
