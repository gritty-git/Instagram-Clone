import React, { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import firebase from "firebase";

export default function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  function onSignUp() {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        console.log(res);
        firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .set({
            name,
            email,
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <View>
      <TextInput placeholder="Name" onChangeText={(name) => setName(name)} />

      <TextInput
        placeholder="Email"
        onChangeText={(email) => setEmail(email)}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />
      <Button onPress={onSignUp} title="Sign Up" />
    </View>
  );
}
