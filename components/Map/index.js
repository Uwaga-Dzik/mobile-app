import React, {Fragment, useEffect, useState} from "react";
import MapView, {PROVIDER_GOOGLE, Marker, Circle} from "react-native-maps";
import * as Location from "expo-location";
import {StyleSheet, Text, View, ActivityIndicator, Image} from "react-native";
import device from "../../utils/device";

const GEOLOCATION_OPTIONS = {enableHighAccuracy: true, distanceInterval: 10};

const Map = () => {
    const [location, setLocation] = useState({
        latitude: 0,
        longitude: 0,
    });
    const [errorMsg, setErrorMsg] = useState(null);
    const [showMap, setShowMap] = useState(false);
    const [currentRegion, setCurrentRegion] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    });
    const [markers, setMarkers] = useState([]);

    useEffect(() => {
        (async () => {
            let {status} = await Location.requestPermissionsAsync();
            if (status !== "granted") {
                setErrorMsg("Permission to access location was denied");
            }

            let location = await Location.getCurrentPositionAsync();
            setLocation(location.coords);
            const newRegion = Object.assign(
                {
                    latitudeDelta: 0.007,
                    longitudeDelta: 0.007,
                },
                location.coords
            );

            setCurrentRegion(newRegion);
            setShowMap(true);
        })();

        let removeLocationSubscriber;
        Location.watchPositionAsync(GEOLOCATION_OPTIONS, locationChanged).then(
            (res) => {
                removeLocationSubscriber = res.remove;
            }
        );

        return () => {
            removeLocationSubscriber();
        };
    }, []);

    const onMapPress = (event) => {
        let newMarkers = [...markers];
        newMarkers.push(
            {
                coords: {latitude: event.coordinate.latitude, longitude: event.coordinate.longitude},
                title: `Marker ${markers.length + 1}`,
                description: `Desc ${markers.length + 1}`,
            },
        );
        setMarkers(newMarkers);
    };


  const onMapPress = (event) => {
    let newMarkers = [...markers];
    newMarkers.push({
      coords: {
        latitude: event.coordinate.latitude,
        longitude: event.coordinate.longitude,
      },
      title: `Marker ${markers.length + 1}`,
      description: `Desc ${markers.length + 1}`,
    });
    setMarkers(newMarkers);
  };

    const locationChanged = (location) => {
        setLocation(location.coords);
    };


    const onRegionChangeComplete = (newRegion) => {
        // console.log("onRegionChangeComplete");
        // setCurrentRegion(newRegion);
    };

    if (showMap) {
        return (
            <MapView
                followsUserLocation={true}
                showsUserLocation={true}
                provider={PROVIDER_GOOGLE}
                onRegionChangeComplete={onRegionChangeComplete}
                style={{width: "100%", height: "100%", position: "relative"}}
                region={currentRegion}
                onPress={e => onMapPress(e.nativeEvent)}>
                {markers.map((marker, index) => (
                    <Fragment key={index}>
                        <Circle center={{
                            latitude: marker.coords.latitude,
                            longitude: marker.coords.longitude,
                        }} radius={100} key={"circle_" + index} fillColor={"rgba(197, 197, 197, 0.5)"} strokeWidth={0}
                        />


  if (showMap) {
    return (
      <MapView
        followsUserLocation={true}
        showsUserLocation={true}
        provider={PROVIDER_GOOGLE}
        onRegionChangeComplete={onRegionChangeComplete}
        style={{ width: "100%", height: "100%", position: "relative" }}
        region={currentRegion}
        onPress={(e) => onMapPress(e.nativeEvent)}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.coords}
            title={marker.title}
            description={marker.description}
          >
            <Image
              source={require("../../assets/logo/logo.png")}
              style={{ height: 50, width: 50 }}
            />
          </Marker>
        ))}
      </MapView>
    );
  } else
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          animating={true}
          color="#F9650C"
          size={80}
          style={styles.activityIndicator}
        />
      </View>
    );
};

const styles = StyleSheet.create({
    map: {
        height: device.height,
        position: "absolute",
        width: device.width,
    },
    containerNoLocation: {
        alignItems: "center",
        height: device.height,
        justifyContent: "center",
        position: "absolute",
        width: device.width,
    },
    textLocationNeeded: {
        fontSize: 16,
        marginBottom: 16,
    },
    loadingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        position: "relative",
        width: '100%',
        height: '100%'
    },
    activityIndicator: {
        width: 100,
        height: 100,
        paddingBottom: 350
    }
});

export default Map;
