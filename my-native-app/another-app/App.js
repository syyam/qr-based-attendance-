import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  LayoutAnimation,
  StatusBar,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import Dimensions from 'Dimensions';
import axios from "react-native-axios";



export default class App extends React.Component {
  state = {
    hasCameraPermission: null,
    rollNo: "Enter Roll Number Here"
  };

  componentDidMount() {
    this._requestCameraPermission();

  }

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };

  _handleBarCodeRead = result => {
    console.log("KHKHSKJ");
    console.log(this.state.rollNo);
    console.log(result.data);
      axios.post("https://api123is.herokuapp.com/updateCounter",{"data":this.state.rollNo,"title":result.data}).
      then((res)=>{
        console.log("from server");
      });
    }

  render() {
    return (
      <View style={styles.container}>
        <TextInput onChangeText={(e)=>this.setState({rollNo: e})} value={this.state.rollNo}/>
        {this.state.hasCameraPermission === null
          ? <Text>Requesting for camera permission</Text>
          : this.state.hasCameraPermission === false
              ? <Text style={{ color: '#fff' }}>
                  Camera permission is not granted
                </Text>
              : <BarCodeScanner
                  onBarCodeRead={this._handleBarCodeRead}
                  style={{
                    height: 300,
                    width: 300,
                  }}
                />}
        <StatusBar hidden />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 15,
    flexDirection: 'row',
  },
  url: {
    flex: 1,
  },
  urlText: {
    color: '#fff',
    fontSize: 20,
  },
  cancelButton: {
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 18,
  },
});
