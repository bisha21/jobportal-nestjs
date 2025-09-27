import { type ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth.service';
import googleAuthConfig from 'src/config/google-auth.config';
import { Strategy, StrategyOptions } from 'passport-google-oauth20';
declare const GoogleStrategy_base: new (...args: [options: import("passport-google-oauth20").StrategyOptionsWithRequest] | [options: StrategyOptions] | [options: StrategyOptions] | [options: import("passport-google-oauth20").StrategyOptionsWithRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class GoogleStrategy extends GoogleStrategy_base {
    private readonly googleConfiguration;
    private readonly authService;
    private readonly jwtService;
    constructor(googleConfiguration: ConfigType<typeof googleAuthConfig>, authService: AuthService, jwtService: JwtService);
    validate(accessToken: string, refreshToken: string, profile: any): Promise<any>;
}
export {};
