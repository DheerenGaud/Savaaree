export const fetchRouteData_OLA_Api = async ( source_lat, source_lng, destination_lat, destination_lng) => {
  
    const response = await fetch(
      `https://api.olamaps.io/routing/v1/directions?origin=${source_lat},${source_lng}&destination=${destination_lat},${destination_lng}&api_key=${process.env.OLA_API_KEY}`,
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
export const feach_DistanceMatrix_OLA_Api = async(lat1,lng1,lat2,lng2)=>{

   const response =  await fetch(
    `https://api.olamaps.io//routing/v1/distanceMatrix?origins=${lat1},${lng1}&destinations=${lat2},${lng2}&mode=driving&api_key=${process.env.OLA_API_KEY}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
  const data = await response.json();
  return data;
} 
