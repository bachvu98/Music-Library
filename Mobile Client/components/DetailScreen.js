import React from "react";
import { StackNavigator, createAppContainer } from "react-navigation";
import axios from "axios";

import {
  Alert,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  Button,
  RefreshControl,
} from "react-native";

class DetailScreen extends React.Component {
  static navigationOptions = {
    title: "Song Details",
  };

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      loading: true,
      dataSource: [],
    };
  }

  handleSubmit = (id) => {
    Alert.alert("Delete Song", [
      {
        text: "NO",
        onPress: () => console.warn("No Pressed"),
        style: "cancel",
      },
      {
        text: "YES",
        onPress: () =>
          axios
            .delete("http://192.168.0.3:3000/songs/" + id)
            .then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            }),
        this: props.navigation.navigate("Confirm"),
      },
    ]);
  };

  render() {
    const item = this.props.navigation.getParam("item");
    return (
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
      >
        <TouchableOpacity style={styles.list}>
          <Text style={styles.lightText}>{item.title}</Text>
          <Text style={styles.lightText}>{item.artist}</Text>
          <Text style={styles.lightText}>{item.label}</Text>
          <Text style={styles.lightText}>{item.genre}</Text>
          <Text style={styles.lightText}>{item.bpm}</Text>
          <Text style={styles.lightText}>{item.price}</Text>
        </TouchableOpacity>
        } />
        <Button
          title="Edit"
          onPress={() =>
            this.props.navigation.navigate("Edit", { id: item._id })
          }
        />
        <Button
          title="Delete"
          onPress={this.handleSubmit.bind(this, item._id)}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  list: {
    paddingVertical: 4,
    margin: 5,
    backgroundColor: "#fff",
  },
});
export default DetailScreen;
