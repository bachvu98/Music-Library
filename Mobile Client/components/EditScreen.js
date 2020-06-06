import React, { Component } from 'react';
import { StyleSheet, Button, ScrollView, Text, Alert } from 'react-native';
import t from 'tcomb-form-native'; // 0.6.9
import axios from 'axios'
const Form = t.form.Form;

const User = t.struct({
  title: t.maybe(t.String),
  price: t.maybe(t.String),
  bpm: t.maybe(t.Integer),
  genre: t.maybe(t.String),
  label: t.maybe(t.String),
  release_date: t.maybe(t.Date),
  artist :t.maybe(t.String),

});

class EditBoardScreen extends Component {
  static navigationOptions = {
    title: 'Edit Song Details',
  };

  

  handleSubmit = (id) => {
    const value = this._form.getValue(); 
    axios.put('http://192.168.0.3:3000/songs/' + id,value)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
   this.props.navigation.navigate('Confirm')
  }
  
  render() {
    const id = this.props.navigation.getParam('id');
    return (
      <ScrollView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Edit</Text>
        <Form ref={ref => this._form = ref} type={User} />
        <Button
          title="Edit"
          onPress={this.handleSubmit.bind(this,id)}
        />
        <Button
          title="Cancel"
          onPress={() => this.props.navigation.goBack()}
        />
        
      
      </ScrollView>
    );
  }
}

export default EditBoardScreen;