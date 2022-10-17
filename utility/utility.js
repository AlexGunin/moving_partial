export const createColor = (red, green, blue) => `rgb(${red},${green},${blue})`;

export const calculateRelativeBrigthness = (red, green, blue) => {
  return (
    Math.sqrt(red * red * 0.299 + green * green * 0.587 + blue * blue * 0.114) /
    100
  );
};

export const getStartIndex = (x, y, width) => (y * width + x) << 2;
export const getAlpha = (x, y, width) => getStartIndex(x, y, width) + 3;
export const getMappedImage = (data, width, height, sx = 0, sy = 0) => {
  const result = [];
  for (let y = sy; y < height; y++) {
    const row = [];
    for (let x = sx; x < width; x++) {
      const startIndex = getStartIndex();
      const red = data[startIndex];
      const green = data[startIndex + 1];
      const blue = data[startIndex + 2];
      const brightness = calculateRelativeBrigthness(red, green, blue);
      row.push([brightness, createColor(red, green, blue)]);
    }
    result.push(row);
  }
  return result;
};

export const getDefaultDrawImage =
  (ctx, width, height, x = 0, y = 0) =>
  (image) =>
    ctx.drawImage(image, x, y, width, height);

export const getRandomNumInRange = (end, start = 0) => {
  return Math.floor(start + Math.random() * (end - start + 1));
};

export const calculateForceDirection = (dx, dy, distance) => {
  const forceDirectionX = dx / distance;
  const forceDirectionY = dy / distance;
  return { forceDirectionX, forceDirectionY };
};
