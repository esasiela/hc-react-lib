interface DecodedToken {
  sub: string;
  scope: string[];
}

export default class User {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  scopes: string[];

  constructor(
    username: string,
    firstname: string,
    lastname: string,
    email: string,
    authorities: string[]
  ) {
    this.username = username;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.scopes = authorities;
  }

  static fromToken(token: string): User {
    const decodedToken: DecodedToken = JSON.parse(atob(token.split('.')[1]));
    return new User(
      decodedToken.sub,
      'fNameUnimplemented',
      'lNameUnimplemented',
      'email@unimplemented.com',
      decodedToken.scope
    );
  }
}
