export class LoginRequest {
  username: string;
  password: string;

  constructor(data: LoginRequest) {
    this.username = data.username;
    this.password = data.password;
  }

  public static asPayload(e: LoginRequest): LoginRequest {
    return {
      username: e.username,
      password: e.password,
    };
  }
}
