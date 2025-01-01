export const fetchRouteData_OLA_Api = async ( source_lat, source_long, destination_lat, destination_long) => {
  
    const response = await fetch(
      `https://api.olamaps.io/routing/v1/directions?origin=${source_lat},${source_long}&destination=${destination_lat},${destination_long}&api_key=${process.env.OLA_API_KEY}`,
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
export const feach_DistanceMatrix_OLA_Api = async(lat,long,destinations)=>{

   const response =  await fetch(
    `/routing/v1/distanceMatrix?origins=${lat},${long}&destinations=${destinations}&mode=driving`,
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