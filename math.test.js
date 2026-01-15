import { describe, it, expect } from 'vitest';
import { theta, adjacent, opposite, hypotenuse, rotate, x_coord, y_coord } from './math.js';

describe('Mathematical Constants', () => {
  it('should have theta equal to π/6', () => {
    expect(theta).toBeCloseTo(Math.PI / 6);
  });

  it('should have adjacent equal to 2', () => {
    expect(adjacent).toBe(2);
  });

  it('should calculate opposite correctly using tan(theta)', () => {
    const expected = adjacent * Math.tan(theta);
    expect(opposite).toBeCloseTo(expected);
  });

  it('should calculate hypotenuse using Pythagorean theorem', () => {
    const expected = Math.sqrt(adjacent * adjacent + opposite * opposite);
    expect(hypotenuse).toBeCloseTo(expected);
  });

  it('should satisfy Pythagorean theorem: a² + b² = c²', () => {
    const sumOfSquares = adjacent * adjacent + opposite * opposite;
    const hypotenuseSquared = hypotenuse * hypotenuse;
    expect(sumOfSquares).toBeCloseTo(hypotenuseSquared);
  });
});

describe('rotate()', () => {
  it('should return empty array when given empty array', () => {
    const result = rotate([], Math.PI / 2);
    expect(result).toEqual([]);
  });

  it('should handle single point rotation', () => {
    const point = [[1, 0]];
    const result = rotate(point, Math.PI / 2);
    expect(result[0][0]).toBeCloseTo(0);
    expect(result[0][1]).toBeCloseTo(1);
  });

  it('should rotate point by 0 radians (identity transformation)', () => {
    const points = [[1, 2], [3, 4]];
    const result = rotate(points, 0);

    expect(result[0][0]).toBeCloseTo(1);
    expect(result[0][1]).toBeCloseTo(2);
    expect(result[1][0]).toBeCloseTo(3);
    expect(result[1][1]).toBeCloseTo(4);
  });

  it('should rotate point by π/2 (90 degrees counterclockwise)', () => {
    const points = [[1, 0]];
    const result = rotate(points, Math.PI / 2);

    expect(result[0][0]).toBeCloseTo(0, 10);
    expect(result[0][1]).toBeCloseTo(1, 10);
  });

  it('should rotate point by π (180 degrees)', () => {
    const points = [[1, 0]];
    const result = rotate(points, Math.PI);

    expect(result[0][0]).toBeCloseTo(-1, 10);
    expect(result[0][1]).toBeCloseTo(0, 10);
  });

  it('should rotate point by 2π (full rotation, returns to original)', () => {
    const points = [[1, 2]];
    const result = rotate(points, 2 * Math.PI);

    expect(result[0][0]).toBeCloseTo(1, 10);
    expect(result[0][1]).toBeCloseTo(2, 10);
  });

  it('should rotate multiple points at once', () => {
    const points = [[1, 0], [0, 1], [-1, 0], [0, -1]];
    const result = rotate(points, Math.PI / 2);

    // [1, 0] -> [0, 1]
    expect(result[0][0]).toBeCloseTo(0, 10);
    expect(result[0][1]).toBeCloseTo(1, 10);

    // [0, 1] -> [-1, 0]
    expect(result[1][0]).toBeCloseTo(-1, 10);
    expect(result[1][1]).toBeCloseTo(0, 10);

    // [-1, 0] -> [0, -1]
    expect(result[2][0]).toBeCloseTo(0, 10);
    expect(result[2][1]).toBeCloseTo(-1, 10);

    // [0, -1] -> [1, 0]
    expect(result[3][0]).toBeCloseTo(1, 10);
    expect(result[3][1]).toBeCloseTo(0, 10);
  });

  it('should rotate with negative angles (clockwise)', () => {
    const points = [[1, 0]];
    const result = rotate(points, -Math.PI / 2);

    expect(result[0][0]).toBeCloseTo(0, 10);
    expect(result[0][1]).toBeCloseTo(-1, 10);
  });

  it('should preserve distance from origin after rotation', () => {
    const points = [[3, 4]]; // distance = 5
    const originalDistance = Math.sqrt(3 * 3 + 4 * 4);

    const result = rotate(points, Math.PI / 4);
    const newDistance = Math.sqrt(result[0][0] ** 2 + result[0][1] ** 2);

    expect(newDistance).toBeCloseTo(originalDistance, 10);
  });

  it('should handle rotation of origin point', () => {
    const points = [[0, 0]];
    const result = rotate(points, Math.PI / 2);

    expect(result[0][0]).toBeCloseTo(0);
    expect(result[0][1]).toBeCloseTo(0);
  });
});

describe('x_coord()', () => {
  it('should calculate x coordinate for first column at (0, 0)', () => {
    const result = x_coord(0, 0, 15);
    expect(result).toBe(0);
  });

  it('should calculate x coordinate with even row (no offset)', () => {
    const u = 10;
    const result = x_coord(3, 0, u);
    const expected = 3 * u * 2 * adjacent;
    expect(result).toBeCloseTo(expected);
  });

  it('should calculate x coordinate with odd row (negative offset)', () => {
    const u = 10;
    const result = x_coord(3, 1, u);
    const expected = 3 * u * 2 * adjacent - adjacent * u;
    expect(result).toBeCloseTo(expected);
  });

  it('should alternate offset between even and odd rows', () => {
    const u = 10;
    const evenRow = x_coord(2, 0, u);
    const oddRow = x_coord(2, 1, u);

    expect(oddRow).toBeCloseTo(evenRow - adjacent * u);
  });

  it('should handle j parameter defaulting to 0 when undefined', () => {
    const u = 10;
    const withZero = x_coord(2, 0, u);
    const withUndefined = x_coord(2, undefined, u);

    expect(withUndefined).toBe(withZero);
  });

  it('should scale with u parameter', () => {
    const base = x_coord(2, 0, 1);
    const scaled = x_coord(2, 0, 10);

    expect(scaled).toBeCloseTo(base * 10);
  });

  it('should handle large column indices', () => {
    const result = x_coord(100, 0, 15);
    const expected = 100 * 15 * 2 * adjacent;
    expect(result).toBeCloseTo(expected);
  });
});

describe('y_coord()', () => {
  it('should return 0 for first row (j=0)', () => {
    const result = y_coord(0, 15);
    expect(result).toBe(0);
  });

  it('should calculate y coordinate using hypotenuse and trigonometry', () => {
    const u = 10;
    const j = 5;
    const expected = j * u * (hypotenuse * (1 + Math.cos(2 * theta)));
    const result = y_coord(j, u);

    expect(result).toBeCloseTo(expected);
  });

  it('should have consistent spacing between rows', () => {
    const u = 10;
    const y0 = y_coord(0, u);
    const y1 = y_coord(1, u);
    const y2 = y_coord(2, u);

    const spacing1 = y1 - y0;
    const spacing2 = y2 - y1;

    expect(spacing2).toBeCloseTo(spacing1);
  });

  it('should scale with u parameter', () => {
    const base = y_coord(5, 1);
    const scaled = y_coord(5, 10);

    expect(scaled).toBeCloseTo(base * 10);
  });

  it('should produce positive y values for positive rows', () => {
    const result = y_coord(5, 10);
    expect(result).toBeGreaterThan(0);
  });

  it('should handle large row indices', () => {
    const result = y_coord(100, 15);
    expect(result).toBeGreaterThan(0);
    expect(Number.isFinite(result)).toBe(true);
  });

  it('should use correct trigonometric formula with 2*theta', () => {
    const u = 10;
    const j = 3;
    // The formula includes cos(2*theta), verify it's calculated correctly
    const expectedSpacing = u * (hypotenuse * (1 + Math.cos(2 * theta)));
    const result = y_coord(j, u);

    expect(result).toBeCloseTo(j * expectedSpacing);
  });
});
