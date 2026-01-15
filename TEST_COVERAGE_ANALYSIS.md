# Test Coverage Analysis - Squares Project

## Current State
**Test Coverage: 0%**

The codebase currently has **no test files** and no testing infrastructure in place.

## Codebase Overview
- **Main file:** `app.js` (~175 lines)
- **Type:** Canvas-based geometric visualization
- **Key functionality:**
  - Mathematical transformations (rotation, coordinate calculations)
  - Canvas drawing operations
  - Interactive click handling
  - Pattern switching between two square layouts

---

## Critical Areas Requiring Test Coverage

### 1. **Mathematical Functions** (HIGH PRIORITY)
These are pure functions with deterministic output - ideal candidates for unit testing.

#### `rotate(points, theta)` - app.js:41-50
**Current Coverage:** 0%
**Risk:** High - Used throughout rendering logic

**Proposed Tests:**
- ✓ Rotate point by 0 radians (identity transformation)
- ✓ Rotate point by π/2 (90 degrees)
- ✓ Rotate point by π (180 degrees)
- ✓ Rotate point by 2π (full rotation)
- ✓ Rotate multiple points at once
- ✓ Rotate with negative angles
- ✓ Validate rotation preserves distance from origin
- ✓ Edge cases: empty array, single point

**Why Important:** Rotation errors would cascade into all visual output. This function is mathematically testable without DOM dependencies.

---

### 2. **Coordinate Calculation Functions** (HIGH PRIORITY)

#### `x_coord(i, j)` - app.js:141-146
#### `y_coord(j)` - app.js:148-150

**Current Coverage:** 0%
**Risk:** Medium - Errors cause misaligned patterns

**Proposed Tests:**
- ✓ Calculate x_coord for first column (i=0, j=0)
- ✓ Calculate x_coord with row offset (j odd vs even)
- ✓ Verify x_coord spacing consistency
- ✓ Calculate y_coord for multiple rows
- ✓ Verify y_coord spacing uses correct trigonometry
- ✓ Test with various u (scale) values
- ✓ Boundary conditions: negative indices, large indices

**Why Important:** Grid layout depends entirely on these calculations. Off-by-one errors would be immediately visible but hard to debug without tests.

---

### 3. **Drawing Functions** (MEDIUM PRIORITY)
These require DOM mocking but are testable.

#### `drawShape(ctx, x, y, u, points, fill)` - app.js:120-138

**Current Coverage:** 0%
**Risk:** Medium - Core rendering primitive

**Proposed Tests:**
- ✓ Verify ctx.beginPath() called
- ✓ Verify fillStyle set correctly
- ✓ Verify strokeStyle set for non-stroke colors
- ✓ Verify moveTo called with first point
- ✓ Verify lineTo called for each subsequent point
- ✓ Verify closePath() and fill() called
- ✓ Handle empty points array gracefully (early return)
- ✓ Verify coordinate transformation (points scaled by u and offset by x,y)

**Why Important:** This is the rendering primitive. All visual output goes through this function.

---

### 4. **Pattern Generation Functions** (MEDIUM PRIORITY)

#### `drawSquareInSquare(cHeight, cWidth, ctx)` - app.js:52-118
#### `drawSquares(cHeight, cWidth, ctx)` - app.js:140-173

**Current Coverage:** 0%
**Risk:** Low to Medium

**Proposed Tests:**
- ✓ Verify drawShape called correct number of times
- ✓ Test loop boundaries (patterns fill canvas)
- ✓ Verify row offset alternation
- ✓ Test with various canvas dimensions
- ✓ Verify scaling factor u applied correctly
- ✓ Integration test: verify pattern symmetry

**Why Important:** Complex nested loops with geometric calculations. Easy to introduce off-by-one errors or incorrect alternation logic.

---

### 5. **State Management & Interaction** (MEDIUM PRIORITY)

#### Click Handler - app.js:23-27
#### `drawUsingClickCounter()` - app.js:14-21

**Current Coverage:** 0%
**Risk:** Medium - User interaction logic

**Proposed Tests:**
- ✓ Initial state: clickCounter = 0, u = 15
- ✓ Click increments clickCounter
- ✓ Click updates u using correct formula
- ✓ Even clickCounter calls drawSquares
- ✓ Odd clickCounter calls drawSquareInSquare
- ✓ Verify u oscillation pattern over multiple clicks
- ✓ Test u calculation: `u += 5 * Math.cos(Math.PI * (clickCounter % 4) / 3)`

**Why Important:** State bugs could break interactivity or cause unexpected visual changes.

---

### 6. **Constants & Configuration** (LOW PRIORITY)

#### Constants - app.js:33-39

**Current Coverage:** 0%
**Risk:** Low

**Proposed Tests:**
- ✓ Verify theta = π/6
- ✓ Verify adjacent = 2
- ✓ Verify trigonometric relationships correct
  - opposite = adjacent × tan(theta)
  - hypotenuse = √(adjacent² + opposite²)
- ✓ Validate hypotenuse calculation

**Why Important:** Foundational constants. Errors here affect all rendering.

---

## Recommended Testing Strategy

### Phase 1: Foundation (Immediate Priority)
1. Set up testing infrastructure
   - Install Jest or Vitest
   - Configure for browser environment
   - Set up canvas mocking (@testing-library/canvas)
2. Test mathematical functions
   - `rotate()`
   - Trigonometric constant calculations
3. Test coordinate functions
   - `x_coord()`
   - `y_coord()`

### Phase 2: Core Rendering (Next Priority)
1. Mock canvas context
2. Test `drawShape()` with mock verification
3. Test state management
   - Click handler logic
   - `drawUsingClickCounter()` branching

### Phase 3: Integration (Final Priority)
1. Test `drawSquares()` and `drawSquareInSquare()`
2. Visual regression testing (consider canvas snapshots)
3. End-to-end interaction tests

---

## Testing Infrastructure Needs

### Required Dependencies
```json
{
  "devDependencies": {
    "jest": "^29.x",
    "jest-canvas-mock": "^2.x",
    "@testing-library/jest-dom": "^6.x"
  }
}
```

### Alternative: Vitest (Recommended for modern projects)
```json
{
  "devDependencies": {
    "vitest": "^1.x",
    "jsdom": "^23.x",
    "canvas": "^2.x"
  }
}
```

### Test File Structure
```
squares/
├── app.js
├── app.test.js          # Unit tests for pure functions
├── canvas.test.js       # Canvas drawing tests
├── integration.test.js  # Pattern generation tests
└── index.html
```

---

## Coverage Goals

### Realistic Short-term Goals
- **Week 1:** 60% coverage (math functions + coordinate calculations)
- **Week 2:** 75% coverage (add drawing functions)
- **Week 3:** 85% coverage (add pattern generation)

### Long-term Target
- **90%+ coverage** for pure functions
- **70%+ coverage** for DOM-dependent code
- **Overall: 80%+ coverage**

---

## Risks of Current 0% Coverage

1. **Refactoring Risk:** Any code changes could introduce bugs
2. **Regression Risk:** No safety net when adding features
3. **Documentation Gap:** Tests serve as executable documentation
4. **Trigonometry Errors:** Complex math is untested and unvalidated
5. **Browser Compatibility:** No verification across environments

---

## Quick Wins

These tests would be easiest to implement and provide immediate value:

1. **`rotate()` function** - Pure function, no DOM dependencies
2. **Trigonometric constants** - Simple validation
3. **`x_coord()` and `y_coord()`** - Pure functions with clear expected outputs
4. **`drawShape()` empty points guard** - Edge case handling

---

## Conclusion

The squares project has **zero test coverage**, leaving 175 lines of complex geometric and canvas code completely untested. The highest priority is testing the mathematical foundation (rotation, coordinates, constants) as these are pure functions that cascade errors throughout the system.

**Immediate Action Items:**
1. Set up Jest/Vitest
2. Write tests for `rotate()` function
3. Write tests for coordinate calculations
4. Mock canvas and test `drawShape()`
5. Add integration tests for pattern generation

With a systematic approach, the project could reach 80% coverage within 2-3 weeks.
