import { hashPassword } from "utils";

describe("Password Test", () => {
  it("Should generate hashed string", async () => {
    const hashed = await hashPassword("123");
    expect(hashed).not.toBeNull();
    expect(hashed).not.toBeUndefined();
  });
});
