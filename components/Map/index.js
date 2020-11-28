import React, { Fragment, useEffect, useState, useRef } from "react";
import MapView, { Marker, Circle } from "react-native-maps";
import * as Location from "expo-location";
import { StyleSheet, Text, View, ActivityIndicator, Image } from "react-native";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as mapActions from "../../redux/actions/MapActions";

const Map = (props) => {
  const [showMap, setShowMap] = useState(false);
  const [currentRegion, setCurrentRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const mapRef = useRef();


    useEffect(() => {
        (async () => {

            let {status} = await Location.requestPermissionsAsync();
            if (status !== "granted") {
                alert("Permission to access location was denied");
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

        // setup location subscriber
        // let removeLocationSubscriber;
        // Location.watchPositionAsync(GEOLOCATION_OPTIONS, locationChanged).then(
        //     (res) => {
        //         removeLocationSubscriber = res.remove;
        //     }
        // );

        // return () => {
        //     removeLocationSubscriber();
        // };
    }, []);

    useEffect(() => {
        if (props.map.lat !== 0 && props.map.lng !== 0) {
            animateToRegion(props.map.lat, props.map.lng, 100);
        }
    }, [props.map]);

  const fetchMarkers = () => {
    // fetch markers
    API.get(
      `/report/${props.location.latitude}/${props.location.longitude}/1000`
    )
      .then((res) => {
        props.setMarkers(res.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onMapReady = () => {
    fetchMarkers();
  };

    const onMapPress = (event) => {
        API.post('/report', {
            latitude: event.coordinate.latitude,
            longitude: event.coordinate.longitude,
        }).then(() => {
            fetchMarkers();
        }).catch((e) => {
            console.log(e);
            alert("Wystąpił błąd podczas pobierania zgłoszeń");
        })
    };

    const locationChanged = (location) => {
        setLocation(props.location.coords);
    };

    const onRegionChangeComplete = (newRegion) => {
        // console.log("onRegionChangeComplete");
        // setCurrentRegion(newRegion);
    };

  const animateToRegion = (latitude, longitude, TIME = 500) => {
    const newRegion = {
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 0.007,
      longitudeDelta: 0.007,
    };

    mapRef.current.animateToRegion(newRegion, TIME);
  };

    const onMarkerPress = (event, marker) => {
        animateToRegion(marker.latitude - 0.0015, marker.longitude, 500);

            if (props.showMarkerDialog && props.selectedMarker.id === marker.id) {
                props.setShowMarkerDialog(false);
            } else {
                props.onMarkerClick(marker);
                props.setShowMarkerDialog(true);
            }
    };

  if (showMap) {
    return (
      <MapView
        ref={mapRef}
        onMapReady={() => onMapReady()}
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsPointsOfInterest={false}
        pitchEnabled={false}
        toolbarEnabled={false}
        rotateEnabled={false}
        // onRegionChangeComplete={onRegionChangeComplete}
        style={{ width: "100%", height: "100%", position: "relative" }}
        region={currentRegion}
        moveOnMarkerPress={false}
        // onPress={(e) => onMapPress(e.nativeEvent)}
      >
        {props.markers.map((marker, index) => (
          <Fragment key={index}>
            <Circle
              center={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              radius={100}
              key={"circle_" + index}
              fillColor={"rgba(197, 197, 197, 0.5)"}
              strokeColor={"rgba(197, 197, 197, 0.5)"}
              strokeWidth={1}
            />

            <Marker
              onPress={(e) => onMarkerPress(e.nativeEvent, marker)}
              key={"marker_" + index}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              anchor={{ x: 0.5, y: 0.5 }}
              title={` ul. ${marker.street ? marker.street : ""}, ${
                marker.city ? marker.city : ""
              }`}
            >
              {console.log(marker.report.is_tracks)}
              {marker.report.is_tracks !== 0 ? (
                <Image
                  source={require("../../assets/footprints/footprints.png")}
                  style={{ height: 80, width: 80 }}
                />
              ) : (
                <Image
                  source={require("../../assets/logo/logo.png")}
                  style={{ height: 80, width: 80 }}
                />
              )}
            </Marker>
          </Fragment>
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
    height: "100%",
    position: "absolute",
    width: "100%",
  },
  textLocationNeeded: {
    fontSize: 16,
    marginBottom: 16,
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    width: "100%",
    height: "100%",
  },
  activityIndicator: {
    width: 100,
    height: 100,
    paddingBottom: 350,
  },
});

const mapStateToProps = (state) => {
  return {
    map: state.map,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    mapActions: bindActionCreators(mapActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
