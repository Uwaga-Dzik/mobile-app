export function navigateToRegion(latitude, longtitude) {
  return {
    type: "NAVIGATE_TO_REGION",
    payload: { lat: latitude, lng: longtitude },
  };
}
