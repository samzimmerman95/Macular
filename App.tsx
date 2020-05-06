import React from "react";
import { StyleSheet, Text, View } from "react-native";
import RootStack from "./navigation/navigation";
import ErrorCatcher from "./src/ErrorCatcher";
import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyA21S3yw24KueoeR_tmZzFe-mknAJNwccI",
  authDomain: "macular-8e95f.firebaseapp.com",
  databaseURL: "https://macular-8e95f.firebaseio.com",
  projectId: "macular-8e95f",
  storageBucket: "macular-8e95f.appspot.com",
  messagingSenderId: "295446126603",
  appId: "1:295446126603:web:d2f6494f7ec0743df3e70e",
  measurementId: "G-WQ4BFQFJB5",
};

// firebase.initializeApp(firebaseConfig)

export default class App extends React.Component<any, any> {
  render() {
    return (
      <ErrorCatcher>
        <RootStack />
      </ErrorCatcher>
    );
  }
}
