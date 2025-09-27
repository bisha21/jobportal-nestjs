import { VerifyOtpDto } from './verifyotp.dto';
export declare class ResetPasswordDto extends VerifyOtpDto {
    password: string;
    confirmPassword: string;
}
