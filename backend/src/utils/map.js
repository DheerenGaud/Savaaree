const polyline = require('polyline');

function isPathContained(path1, path2) {
  const points1 = polyline.decode(path1);
  const points2 = polyline.decode(path2);
  
  // Convert points to string representation with fixed precision
  const pointToString = point => point.map(coord => coord.toFixed(6)).join(',');
  const pointsStr1 = points1.map(pointToString).join('|');
  const pointsStr2 = points2.map(pointToString).join('|');

  if (pointsStr1 === pointsStr2) {
    return 'Paths are identical';
  }
  
  // Check if sequence of points from path2 appears in path1
  const index = pointsStr1.indexOf(pointsStr2);
  if (index !== -1) {
    return 'Path2 is contained in Path1';
  }
  
  // Check if sequence of points from path1 appears in path2
  if (pointsStr2.indexOf(pointsStr1) !== -1) {
    return 'Path1 is contained in Path2';
  }
  
  return 'Paths are distinct';
}

// Test paths
const path1 = "u`nAoc~uMeg[cij@ld^eo@tAt[kefCg|^zjArxb@wmD~xCyiDovAsf_Ahz[gwlAklHawnCoouAekv@xyZobWchq@D|aw@mahBar@dpDwMga`J_h_EqrfCiMq|dA`zbAsxArkj@u`vAjEsoqDhkbBmuoC|~SovAenYmgbBh_z@eqw@kcEkklAvnkAuwhAg_Q_gtDpo~BsiiBmrs@uhArr_BguoApeVa_@jio@";
const path2 = "u`nAoc~uMeg[cij@ld^eo@tAt[kefCg|^zjArxb@wmD~xCyiDovAsf_Ahz[gwlAklHawnCoouAekv@xyZobWchq@D|aw@mahBar@dpDwMga`J_h_";

console.log(isPathContained(path1, path2));