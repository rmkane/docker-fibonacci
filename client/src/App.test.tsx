import { describe, it, expect } from "vitest";

// Source:
// https://www.robinwieruch.de/vitest-react-testing-library/

describe("something truthy and falsy", () => {
  it("true to be true", () => {
    expect(true).toBe(true);
  });

  it("false to be false", () => {
    expect(false).toBe(false);
  });
});
