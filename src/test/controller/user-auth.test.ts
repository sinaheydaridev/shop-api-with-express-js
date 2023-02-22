import App from "app";
import supertest from "supertest";
import User from "models/user.model";
import { mongoConnect, mongoClose, mongoDrop } from "internal/database";
import { hashPassword } from "utils";
import { Gender } from "enums";

describe("User Auth Controller", () => {
  let app: App;

  beforeAll(async () => {
    app = new App();
    await mongoConnect();
    await mongoDrop();
  });

  afterAll(async () => {
    await mongoClose();
  });

  it("POST /login (status:200)", async () => {
    const user = await User.create({
      email: "test2@test.com",
      username: "superuser2",
      password: await hashPassword("12345678"),
      mobileNumber: "1234567890",
      birthYear: 1950,
      skillSet: [],
      gender: Gender.Male,
      isVerifyEmail: true,
      profileImage: "upload",
    });

    const body = {
      email: user.email,
      password: "12345678",
    };

    const response = await supertest(app.getHttp())
      .post("/auth/login")
      .send(body);
    expect(response.status).toBe(200);
    expect(response.body.token).not.toBeNull();
  });
});

// expect(undefined).toBeTruthy(); // این میاد چک میکنه مقداری که بهش میدیم مخالف تعریف نشده باشه
