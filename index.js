module.exports = function findBestSpot(landWidth, landHeight, exploitationWidth, exploitationHeight, goldMines) {
  // Generate the land
  let land = (!landWidth || !landHeight) ? [[false]] : new Array(landWidth).fill(false).map(() => new Array(landHeight).fill(false))
  //Explain mines
  goldMines.map(mines => land[mines.x][mines.y] = true);

  const exploitationMap = [];
  const bestPoints = [];

  const exploitationLimitWidth = (exploitationWidth > landWidth) ? landWidth : exploitationWidth
  const exploitationLimitHeight = (exploitationHeight > landHeight) ? landHeight : exploitationHeight
  // Verify neighbors
  for (let x = 0; x < landWidth - exploitationLimitWidth + 1; x++) {
    for (let y = 0; y < landHeight - exploitationLimitHeight + 1; y++) {
      let amount = 0;
      // Check limits and sum
      for (let k = 0; k < exploitationLimitWidth; k++) {
        for (let l = 0; l < exploitationLimitHeight; l++) {
          if (land[x + k][y + l] !== false) {
            amount += 1;
          }
        }
      }
      exploitationMap.push({x, y, amount});
    }
  }
  //Get the most out of exploration
  const maximumMine = Math.max.apply(Math, exploitationMap.map((o) =>  o.amount));
  //Get the best points
  for (const location of exploitationMap)
    (location.amount === maximumMine) && bestPoints.push(location);

  return {
    coordinates: {
      x: bestPoints[0].x,
      y: bestPoints[0].y,
    },
    goldMines: bestPoints[0].amount
  }
}


