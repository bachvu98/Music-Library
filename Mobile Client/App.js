import React from "react";
import {StackNavigator, createAppContainer} from 'react-navigation';
import AddScreen from './components/AddScreen'
import DetailScreen from './components/DetailScreen'
import EditScreen from './components/EditScreen'
import ConfirmScreen from './components/ConfirmScreen'

import {
StyleSheet,
ScrollView,
ActivityIndicator,
FlatList,
Text,
TouchableOpacity,
Button,
RefreshControl
} from "react-native";

class HomeScreen extends React.Component {
  
static navigationOptions = ({ navigation }) => {
return {
  title: "ALL SONGS",
  headerStyle: {backgroundColor: "#fff"},
  headerTitleStyle: {textAlign: "center",flex: 1},
  height: 72,
    paddingTop: 20,
    paddingLeft: 12,
    paddingRight: 12,
    flexDirection: 'row',
 };
};


constructor(props) {
 super(props);
 this.state = {
   refreshing: false,
   loading: true,
   dataSource:[]
  };
}




componentDidMount(){
fetch("http://192.168.0.3:3000/songs")
.then(response => response.json())
.then((responseJson)=> {
  this.setState({
   loading: false,
   dataSource: responseJson
  })
})
.catch(error=>console.log(error)) //to catch the errors if any
}


FlatListItemSeparator = () => {
return (
  <ScrollView style={{
     height: .5,
     width:"100%",
     backgroundColor: 'rgb(4,4,4)',
}}
/>
);
}


render(){
 if(this.state.loading){
  return( 
    <ScrollView style={styles.loader}> 
      <ActivityIndicator size="large" color="#0c9"/>
    </ScrollView>
)}
return(
 <ScrollView style={styles.container}
    refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }>
 <FlatList
    data= {this.state.dataSource}
    ItemSeparatorComponent = {this.FlatListItemSeparator}
    renderItem={(data)=>
    <TouchableOpacity style={styles.list} 
    onPress={() => this.props.navigation.navigate('Detail',{item:data.item})}
    >
    <Text style={styles.lightText}>{data.item.title}</Text>
    <Text style={styles.lightText}>{data.item.artist}</Text>
    <Text style={styles.lightText}>{data.item.label}</Text></TouchableOpacity>}
 />
 <Button
          title="Add song"
          onPress={() => this.props.navigation.navigate('Add')}
  />
</ScrollView>
)}
}

export default StackNavigator({
  Home: {
    screen: HomeScreen,
  },
  Detail: {
    screen: DetailScreen,
  },
  Add: {
      screen: AddScreen,
  },
  Edit: {
    screen: EditScreen,
  },
  Confirm: {
    screen: ConfirmScreen,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
   },
  loader:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
   },
  list:{
    paddingVertical: 4,
    margin: 5,
    backgroundColor: "#fff"
   }
})
;