/* eslint-disable prettier/prettier */
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { type ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import googleAuthConfig from 'src/config/google-auth.config';
import { Strategy, StrategyOptions } from 'passport-google-oauth20';
import { generateAuthToken } from 'src/utils/generateAuthToken';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    @Inject(googleAuthConfig.KEY)
    private readonly googleConfiguration: ConfigType<typeof googleAuthConfig>,
    private readonly authService: AuthService,
    private readonly jwtService: JwtService, // ⬅️ inject JwtService
  ) {
    super({
      clientID: googleConfiguration.clientId!,
      clientSecret: googleConfiguration.clientSecret!,
      callbackURL: googleConfiguration.callbackUrl,
      scope: ['email', 'profile'],
    } as StrategyOptions);
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
  ): Promise<any> {
    const { emails, name, photos } = profile;
    const email = emails?.[0]?.value;

    if (!email) {
      throw new UnauthorizedException('No email found in Google profile');
    }

    // Check if user exists
    let user = await this.authService.findUserByEmail(email);

    // Create new user if not exists (use OAuth DTO)
    if (!user) {
      user = await this.authService.registerOAuthUser({
        email,
        fullName: `${name?.givenName} ${name?.familyName}`,
        profile: photos?.[0]?.value,
      });
    }

    // Generate JWT
    const token = generateAuthToken(this.jwtService, {
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      ...user,
      token,
    };
  }
}
