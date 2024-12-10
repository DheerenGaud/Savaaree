export const fetchRouteData = async (sorce_lat,sorce_long,destination_lat,destination_long) => {
    const response = await fetch(
      `https://api.olamaps.io/routing/v1/directions?origin=${sorce_lat},${sorce_long}&destination=${destination_lat},${destination_long}&api_key=${process.env.REACT_APP_OLA_API_KEY}`,
      {
        method: "POST",
        headers: {
          "X-Request-Id": "XXX",
        },
      }
    );
    const data = await response.json();
    return data;
  };