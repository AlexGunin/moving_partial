// const scannedImage = ctx.getImageData(0, 0, WIDTH, HEIGHT);
// ctx.putImageData(scannedImage, 0, 0);

const indexColor = {
  red: 0,
  green: 1,
  blue: 2,
  opacity: 3,
};

const directions = {
  more: "more",
  less: "less",
};

const changeColor = (data, color, value, directionKey) => {
  const index = indexColor[color];
  for (let i = index; i < data.length; i += 4) {
    if (directionKey === directions.more) {
      data[i] += value;
    } else {
      data[i] -= value;
    }
  }
};

const changeOpacity = (data, value, directionKey) =>
  changeColor(data, "opacity", value, directionKey);

const sepiaFilter = (data) => {
  for (let i = 0; i < data.length; i += 4) {
    const [red, green, blue] = data.slice(i, i + 4);
    const average = (red + green + blue) / 3;
    data[i] = data[i + 1] = data[i + 2] = average;
  }
};
