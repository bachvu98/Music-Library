import React, { Component } from "react";
import { StyleSheet, Button, ScrollView, Text, Alert } from "react-native";
import t from "tcomb-form-native"; // 0.6.9
import axios from "axios";
import qs from "qs";
const Form = t.form.Form;

const User = t.struct({
  title: t.maybe(t.String),
  price: t.maybe(t.String),
  bpm: t.maybe(t.Integer),
  genre: t.maybe(t.String),
  label: t.maybe(t.String),
  release_date: t.maybe(t.Date),
  artist: t.maybe(t.String),
});

class AddScreen extends Component {
  static navigationOptions = {
    title: "Add New Song",
  };

  handleSubmit = () => {
    const value = this._form.getValue();
    axios.post("http://192.168.0.3:3000/songs/", value)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    this.props.navigation.navigate("Confirm");
  };

  render() {
    return (
      <ScrollView
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <Form ref={(ref) => (this._form = ref)} type={User} />
        <Button title="Add!" onPress={this.handleSubmit} />
        <Button title="Cancel" onPress={() => this.props.navigation.goBack()} />
      </ScrollView>
    );
  }
}

export default AddScreen;
