/* eslint-disable prettier/prettier */
interface JwtConfig {
  secret: string;
  expiresIn: string;
}

const JwtConstants: JwtConfig = {
  secret: process.env.JWT_SECRET || 'supersecretkey',
  expiresIn: process.env.JWT_EXPIRES_IN || '5d',
};

export default JwtConstants;
