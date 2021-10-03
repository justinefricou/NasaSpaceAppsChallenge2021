import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';

import { LineChart } from 'react-native-chart-kit';
import moment from 'moment';

import SettingsIcon from '../assets/settings';

const DATA_SOLAR = {
  labels: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'June', 'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec'],
  datasets: [{
    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  }]
};

const DATA_CLOUD = {
  labels: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'June', 'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec'],
  datasets: [{
    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  }]
};

/*
** Component
*/

const SettingsButton = ({onPress, style}) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.settingsButton, style]}>
            <SettingsIcon width={30} height={30} />
      </TouchableOpacity>
    );
}

const GraphView = ({title, data, unit, style}) => {
    return (
        <View style={styles.graphView}>
            <Text style={styles.graphTitle}>{title}</Text>
            <LineChart
                data={data}
                width={Dimensions.get('window').width - 32}
                height={220}
                yAxisSuffix={unit}
                yAxisInterval={1}
                chartConfig={{
                    backgroundColor: "#e26a00",
                    backgroundGradientFrom: "#fb8c00",
                    backgroundGradientTo: "#ffa726",
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16
                    },
                    propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#ffa726"
                    }
                }}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 4,
                }}
            />
        </View>
    );
}

/*
** Screen
*/

const GraphsScreen = ({navigation, route}) => {
    
    const {latitude, longitude} = route.params;
    const [dataSolar, setDataSolar] = useState(null);
    const [dataCloud, setDataCloud] = useState(null);

    useEffect(() => {
        console.log("useEffect:",latitude, longitude);
        getData(longitude, latitude);
    }, []);

    const getData = (longitude, latitude) => {
        console.log("getData function: ", longitude, latitude);
        var yearStart = moment().subtract(2, 'years').format('YYYY');
        var yearEnd = moment().subtract(2, 'years').format('YYYY');

        // Solar data - kW/m^2
        fetch(`https://power.larc.nasa.gov/api/temporal/monthly/point?parameters=ALLSKY_SFC_SW_DWN&community=SB&longitude=${longitude.toString()}&latitude=${latitude.toString()}&start=${yearStart}&end=${yearStart}&format=JSON`)
            .then((response) => { console.log(response); console.log("date = ", moment(), " = ", moment().format('DD MMMM YYYY')); return response.json() })
            .then((json) => {
                console.log("json = ", json);
                console.log("json.properties.parameter.ALLSKY_SFC_SW_DWN = ", json.properties.parameter.ALLSKY_SFC_SW_DWN);
                var tabSolar = [];
                Object.values(json.properties.parameter.ALLSKY_SFC_SW_DWN).map((val) => {
                    tabSolar.push(val);
                })
                tabSolar.splice(-1);
                console.log(tabSolar);
                setDataSolar({
                    labels: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'June', 'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec'],
                    datasets: [{
                        data: tabSolar,
                    }]
                });
                return json
            })
            .catch((error) => { console.error(error) });

        // Cloud data - %
        fetch(`https://power.larc.nasa.gov/api/temporal/monthly/point?parameters=CLOUD_AMT&community=SB&longitude=${longitude.toString()}&latitude=${latitude.toString()}&start=${yearStart}&end=${yearStart}&format=JSON`)
            .then((response) => { console.log(response); console.log("date = ", moment(), " = ", moment().format('DD MMMM YYYY')); return response.json() })
            .then((json) => {
              console.log("json = ", json);
              console.log("json.properties.parameter.CLOUD_AMT = ", json.properties.parameter.CLOUD_AMT);
              var tabCloud = []
              Object.values(json.properties.parameter.CLOUD_AMT).map((val) => {
                tabCloud.push(val);
              })
              tabCloud.splice(-1);
              setDataCloud({
                labels: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'June', 'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec'],
                datasets: [{
                    data: tabCloud,
                }]
            });
              return json
            })
            .catch((error) => { console.error(error) });
        
    };

    React.useLayoutEffect(() => {
      navigation.setOptions({
        headerShown: false,
      });
    }, [navigation]);

    if (dataCloud == null || dataSolar == null)
        return <View/>;

    return (
      <View style={styles.container}>
          <SettingsButton onPress={() => navigation.navigate('GeolocationScreen')}/>
          <GraphView
              title="Solar irradiance"
              data={dataSolar}
              unit="kW/m^2"
              style={{marginBottom: 8}} />
          <GraphView
              title="Cloud amount"
              unit="%"
              data={dataCloud} />
      </View>
    );
}

const styles = StyleSheet.create({
  settingsButton: {
    height: 50,
    width: 50,
    alignSelf: 'flex-end',
    marginBottom: 8,
    marginRight: -16,
  },
  
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16
  },
  graphView: {
    flex: 1,
    width: "100%",
  },
  graphTitle: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 8
  },
});

export default GraphsScreen;