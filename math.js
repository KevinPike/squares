// Mathematical constants
export const theta = Math.PI / 6;
export const adjacent = 2;
export const opposite = adjacent * Math.tan(theta);
export const hypotenuse = Math.sqrt(adjacent * adjacent + opposite * opposite);

/**
 * Rotates a set of 2D points by a given angle
 * @param {Array<[number, number]>} points - Array of [x, y] coordinate pairs
 * @param {number} theta - Rotation angle in radians
 * @returns {Array<[number, number]>} - Rotated points
 */
export function rotate(points, theta) {
  return points.map(function(point) {
    const x = point[0];
    const y = point[1];
    return [
      x * Math.cos(theta) - y * Math.sin(theta),
      y * Math.cos(theta) + x * Math.sin(theta)
    ];
  });
}

/**
 * Calculate x coordinate for grid position
 * @param {number} i - Column index
 * @param {number} j - Row index
 * @param {number} u - Scale factor
 * @returns {number} - X coordinate
 */
export function x_coord(i, j, u) {
  if (!j) {
    j = 0;
  }
  return i * u * 2 * adjacent + (j % 2) * -adjacent * u;
}

/**
 * Calculate y coordinate for grid position
 * @param {number} j - Row index
 * @param {number} u - Scale factor
 * @returns {number} - Y coordinate
 */
export function y_coord(j, u) {
  return j * u * (hypotenuse * (1 + Math.cos(2 * theta)));
}
