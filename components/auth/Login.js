import React, { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import firebase from "firebase";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onSignIn() {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        //console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <View>
      <TextInput
        placeholder="Email"
        onChangeText={(email) => setEmail(email)}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />
      <Button onPress={onSignIn} title="Sign In" />
    </View>
  );
}
