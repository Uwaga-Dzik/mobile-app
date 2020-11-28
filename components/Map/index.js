
import React, {Fragment, useEffect, useState, useRef} from "react";
import MapView, {PROVIDER_GOOGLE, Marker, Circle} from "react-native-maps";
import * as Location from "expo-location";
import { StyleSheet, Text, View, ActivityIndicator, Image } from "react-native";
import device from "../../utils/device";

const GEOLOCATION_OPTIONS = { enableHighAccuracy: true, distanceInterval: 10 };

const Map = (props) => {
    const [location, setLocation] = useState({
        latitude: 0,
        longitude: 0,
    });
    const [showMap, setShowMap] = useState(false);
    const [currentRegion, setCurrentRegion] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    });
    const [markers, setMarkers] = useState([]);
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

    const fetchMarkers = () => {
        // fetch markers
        API.get(`/report/${location.latitude}/${location.longitude}/1000`)
            .then((res) => {
                setMarkers(res.data.data);
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
        })
    };

    const locationChanged = (location) => {
        setLocation(location.coords);
    };

    const onRegionChangeComplete = (newRegion) => {
        // console.log("onRegionChangeComplete");
        // setCurrentRegion(newRegion);
    };

    const onMarkerPress = (event, marker) => {
        const newRegion = {
            latitude: marker.latitude - 0.002,
            longitude: marker.longitude,
            latitudeDelta: 0.007,
            longitudeDelta: 0.007
        };
        const TIME = 300;

        mapRef.current.animateToRegion(newRegion, TIME);
        setCurrentRegion(newRegion);

        setTimeout(() => {
            if (props.showMarkerDialog && props.selectedMarker.id === marker.id) {
                props.setShowMarkerDialog(false);
            } else {
                props.onMarkerClick(marker);
                props.setShowMarkerDialog(true);
            }
        }, TIME);
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
                style={{width: "100%", height: "100%", position: "relative"}}
                region={currentRegion}
                moveOnMarkerPress={false}
                // onPress={e => onMapPress(e.nativeEvent)}
                >
                {markers.map((marker, index) => (
                    <Fragment key={index}>
                        <Circle center={{
                            latitude: marker.latitude,
                            longitude: marker.longitude,
                        }} radius={100} key={"circle_" + index} fillColor={"rgba(197, 197, 197, 0.5)"} strokeWidth={0}
                        />

                        <Marker
                            onPress={e => onMarkerPress(e.nativeEvent, marker)}
                            key={"marker_" + index}
                            coordinate={{
                                latitude: marker.latitude,
                                longitude: marker.longitude
                            }}
                            anchor={{x: 0.5, y: 0.5}}
                            description={marker.report.description}>
                            <Image source={require('../../assets/logo/logo.png')} style={{height: 80, width: 80}}/>
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
                    color='#F9650C'
                    size={80}
                    style={styles.activityIndicator}/>
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
