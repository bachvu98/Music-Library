import React, { Component } from "react";
import { Button, View, Text } from "react-native";

class ConfirmScreen extends Component {
  static navigationOptions = {
    title: "Board List",
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Task Done Successfully</Text>
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate("Home")}
        />
      </View>
    );
  }
}

export default ConfirmScreen;
