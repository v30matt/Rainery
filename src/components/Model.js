const model = (windSpeed, windDirection, movementDirection) => {
  const angleDifference = Math.abs(movementDirection - windDirection)
  if (angleDifference > 180) {
    angleDifference - 180
  }
  const calculationAngleRadians = (180 - angleDifference) * Math.PI / 180
  const optimalSpeed = Math.cos(calculationAngleRadians) * windSpeed
  return optimalSpeed
}

export default model;
