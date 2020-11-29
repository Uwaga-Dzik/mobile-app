import React, { useState } from "react";
import { TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import MainButton from "../../components/MainButton";
import * as Location from "expo-location";

import Map from "../../components/Map";
import styled from "styled-components";
import MarkerDialog from "../../components/MarkerDialog";
import FormModal from "../../components/FormModal";

const StyledButtonContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  position: absolute;
  bottom: 17.5%;
  z-index: 2;
  margin-left: 0.25%;
`;

const StyledDialogContainer = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 17.5%;
  z-index: 3;
`;

const Home = () => {
  const [isBoar, setIsBoar] = useState(false);
  const [isFootPrints, setIsFootPrint] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState({});
  const [showMarkerDialog, setShowMarkerDialog] = useState(false);

  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [markers, setMarkers] = useState([]);
  const [id, setId] = useState(null);

  const fetchMarkers = (
    latitude = location.latitude,
    longitude = location.longitude
  ) => {
    API.get(`/report/${latitude}/${longitude}/1000`)
      .then((res) => {
        setMarkers(res.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleSendReport = async (isTracks = false) => {
    const locationObject = {
      latitude: location.latitude,
      longitude: location.longitude,
    };

    const data = await Location.reverseGeocodeAsync(location);

    API.post("/report", {
      is_tracks: isTracks ? 1 : 0,
      latitude: locationObject.latitude,
      longitude: locationObject.longitude,
      country: data[0].country,
      voivodeship: data[0].region,
      subregion: data[0].subregion,
      disctrict: data[0].disctrict,
      city: data[0].city,
      street: data[0].street,
    })
      .then((resp) => {
        fetchMarkers(locationObject.latitude, locationObject.longitude);
        setId(resp.data.report.id);
        alert("Zgłoszenie dodane poprawne");
      })
      .catch(() => {
        alert("Niestety nie udało się dodać zgłoszenia");
      });
  };

  return (
    <View>
      <Map
        location={location}
        setLocation={setLocation}
        markers={markers}
        setMarkers={setMarkers}
        onMarkerClick={(marker) => setSelectedMarker(marker)}
        selectedMarker={selectedMarker}
        showMarkerDialog={showMarkerDialog}
        setShowMarkerDialog={(show) => setShowMarkerDialog(show)}
      />
      <FormModal
        isBoar={isBoar}
        setIsBoar={setIsBoar}
        isFootPrints={isFootPrints}
        setIsFootPrint={setIsFootPrint}
        id={id}
        fetchMarkers={fetchMarkers}
      />
      <StyledButtonContainer>
        <TouchableOpacity
          onPress={() => {
            setIsBoar(true);
            handleSendReport();
          }}
        >
          <MainButton
            isGreen={true}
            text={"Widzę"}
            hasIcon={true}
            isBoar={true}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setIsFootPrint(true);
            handleSendReport(true);
          }}
        >
          <MainButton
            isGreen={false}
            text={"Widzę"}
            hasIcon={true}
            isBoar={false}
          />
        </TouchableOpacity>
      </StyledButtonContainer>

      {showMarkerDialog ? (
        <StyledDialogContainer>
          <MarkerDialog
            marker={selectedMarker}
            onCloseClicked={() => setShowMarkerDialog(false)}
          />
        </StyledDialogContainer>
      ) : null}
    </View>
  );
};

export default Home;
