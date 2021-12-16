const model = (windSpeed, windDirection, movementDirection) => {
  const angleDifference = Math.abs(movementDirection - windDirection)
  if (angleDifference > 180) {
    angleDifference - 180
  }
  const calculationAngleRadians = (180 - angleDifference) * Math.PI / 180
  const optimalSpeed = Math.round(Math.cos(calculationAngleRadians) * windSpeed * 100) / 100
  if (optimalSpeed >= 0) {
    return optimalSpeed
  } else {
    return false;
  }
}

export default model;
