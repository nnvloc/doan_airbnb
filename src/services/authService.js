import jwt from 'jsonwebtoken';
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

class AuthenticateService {
  generateJWTToken(info) {
    return jwt.sign(info, JWT_SECRET_KEY);
  }
}

export default new AuthenticateService();