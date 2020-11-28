import React, {useEffect, useState} from "react";
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import {StyleSheet} from "react-native";
import device from '../../utils/device';

const GEOLOCATION_OPTIONS = {enableHighAccuracy: true, distanceInterval: 10};

const Map = () => {
    const [location, setLocation] = useState({
        latitude: 0,
        longitude: 0
    });
    const [errorMsg, setErrorMsg] = useState(null);
    const [showMap, setShowMap] = useState(false);
    const [currentRegion, setCurrentRegion] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
    });
    const markers = [
        {
            coords: {latitude: 53.4635134798977, longitude: 14.550085868686438},
            title: "test 1",
            description: "Desc 1"
        },
        {
            coords: {latitude: 53.4635134799977, longitude: 14.550085868786438},
            title: "test 2",
            description: "Desc 2"
        },
    ];

    useEffect(() => {
        (async () => {
            let {status} = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
            }

            let location = await Location.getCurrentPositionAsync();
            setLocation(location.coords);
            const newRegion = Object.assign({
                latitudeDelta: 0.007,
                longitudeDelta: 0.007,
            }, location.coords);

            setCurrentRegion(newRegion);
            // Location.reverseGeocodeAsync({
            //     latitude: 53.539668,
            //     longitude: 14.466146
            // })
            //     .then((res) => {
            //        console.log(res);
            //     })
            //     .catch((er) => {
            //         console.log(er);
            //     });
            setShowMap(true);
        })();

        let removeLocationSubscriber;
        Location.watchPositionAsync(GEOLOCATION_OPTIONS, locationChanged)
            .then((res) => {
                removeLocationSubscriber = res.remove;
            });

        return () => {
            removeLocationSubscriber();
        };
    }, []);

    const locationChanged = (location) => {
        setLocation(location.coords);
    };

    const onRegionChange = (newRegion) => {
        // console.log(currentRegion, newRegion);
        if ((Math.abs(newRegion.latitude - currentRegion.latitude) > 0.005) &&
            (Math.abs(newRegion.longitude - currentRegion.longitude) > 0.005)) {

            console.log("Fetch new markers", newRegion);
            setCurrentRegion(newRegion);
        }
    };

    if (showMap) {
        return (
            <MapView
                followsUserLocation={true}
                showsUserLocation={true}
                provider={PROVIDER_GOOGLE}
                onRegionChange={onRegionChange}
                style={{width: '100%', height: '100%', position: 'relative'}}
                region={currentRegion}>

                {markers.map((marker, index) => (
                    <Marker
                        key={index}
                        coordinate={marker.coords}
                        title={marker.title}
                        description={marker.description}
                    />
                ))}

            </MapView>
        )
    } else return null;
};

const styles = StyleSheet.create({
    map: {
        height: device.height,
        position: 'absolute',
        width: device.width
    },
    containerNoLocation: {
        alignItems: 'center',
        height: device.height,
        justifyContent: 'center',
        position: 'absolute',
        width: device.width
    },
    textLocationNeeded: {
        fontSize: 16,
        marginBottom: 16
    },
});

export default Map;
