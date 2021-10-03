import React, {useState} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity
} from 'react-native';

import Geolocation from '@react-native-community/geolocation';

import LeftArrow from '../assets/goBack';

Geolocation.setRNConfiguration("whenInUse");

/*
** Component
*/

const GoBackButton = ({onPress, style}) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.goBackButton, style]}>
            <LeftArrow width={35} height={35} />
      </TouchableOpacity>
    );
}

const InputText = ({placeholder, defaultValue, onChangeText, style}) => {
    return (
      <TextInput
          placeholderTextColor="gray"
          placeholder={placeholder}
          defaultValue={defaultValue}
          onChangeText={onChangeText}
          keyboardType="numeric"
          style={[styles.inputContainer, style]}
      />
    );
}

/*
** Screen
*/

const GeolocationScreen = ({navigation}) => {

    const [inputLatitude, setInputLatitude] = useState("");
    const [inputLongitude, setInputLongitude] = useState("");
    const [inputCoordinatesSaved, setInputCoordinatesSaved] = useState(false); 

    const [disableGeolocationBtn, setDisableGeolocationBtn] = useState(false);
    const [geolocationDone, setGeolocationDone] = useState(false);
    const [coordinates, setCoordinates] = useState({latitude: 0, longitude: 0});

    async function onConfirmCoordinates() {
      navigation.navigate('GraphsScreen', {latitude: parseFloat(inputLatitude), longitude: parseFloat(inputLongitude)});
    }
  
    function handleGeolocationSucess(position) {
      setGeolocationDone(true);
      setDisableGeolocationBtn(false);
      console.log("GeolocationScreen:", position);
      navigation.navigate('GraphsScreen', {latitude: position.coords.latitude, longitude: position.coords.longitude});
    }
  
    function handleGeolocationError(error) {
      alert('Geolocation failed.');
      console.log(error);
      setDisableGeolocationBtn(false);
    }
    
    function onPressGeolocalize() {
        setDisableGeolocationBtn(true);
        Geolocation.getCurrentPosition(
          handleGeolocationSucess,
          handleGeolocationError,
          {timeout: 10000},
        );
    }

    function isconfirmBtnDisabled() {
        if (!inputLatitude || !inputLongitude)
            return (true);
        return (false);
    }

    React.useLayoutEffect(() => {
        navigation.setOptions({
          headerShown: false,
        });
      }, [navigation]);

  return (
    <View style={styles.mainContainer}>

        <GoBackButton onPress={() => navigation.navigate('GraphsScreen', coordinates)}/>

        {/* Manual input */}
        <View style={[styles.sectionContainer, {marginBottom: 16}]}>
            <Text style={styles.title}>
                {"Enter your coordinates below:"}
            </Text>
            <InputText
                placeholder="Latitude"
                defaultValue={inputLatitude}
                onChangeText={(t) => {setInputLatitude(t); setInputCoordinatesSaved(false)}}
                style={[{marginBottom: 8}, inputCoordinatesSaved ? {backgroundColor: '#A6E358'} : null]}/>
            <InputText
                placeholder="Longitude"
                defaultValue={inputLongitude}
                displayIcon={inputCoordinatesSaved}
                onChangeText={(t) => {setInputLongitude(t); setInputCoordinatesSaved(false)}}
                style={inputCoordinatesSaved ? {backgroundColor: '#A6E358'} : null} />
            <TouchableOpacity
                disabled={isconfirmBtnDisabled()}
                onPress={onConfirmCoordinates}
                style={[styles.confirmButton, {marginBottom: 8}]}>
                <Text style={styles.buttonText}>{"Confirm"}</Text>
            </TouchableOpacity>
        </View>

        {/* Device's geolocation */}
        <View style={styles.sectionContainer}>
            <Text style={styles.title}>
            {"Or use your device's geolocation:"}
            </Text>
            <TouchableOpacity
                disabled={disableGeolocationBtn}
                onPress={onPressGeolocalize}
                style={[styles.geolocalizeButton, {marginBottom: 8}]}>
                <Text style={styles.buttonText}>
                    {"Geolocate me"}
                </Text>
            </TouchableOpacity>
        </View>

    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 4,
    paddingHorizontal: 8,
    width: "100%"
  },
  checkIcon: {
    width: 20,
    height: 20,
  },

  goBackButton: {
    height: 50,
    width: 50,
    alignSelf: 'flex-start',
    marginBottom: 8,
    marginLeft: -8
  },
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16
  },
  sectionContainer: {
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 4,
    padding: 8
  },
  title: {
    fontSize: 18,
    marginBottom: 16
  },
  confirmButton: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 8,
    backgroundColor: 'gray'
  },
  buttonText: {
    textAlign: 'center',
    color: "white",
    fontSize: 15
  },
  geolocalizeButton: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: 'gray'
  },
  text: {

  }
});

export default GeolocationScreen;