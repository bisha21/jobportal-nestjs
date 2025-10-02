import { UserSkillService } from './userskill.service';
import { CreateUserSkillDto } from './dto/createUserSkill.dto';
import { UpdateUserSkillDto } from './dto/updateUserSkill.dto';
import { type RequestWithUser } from 'src/common/guards/auth/auth.guard';
export declare class UserSkillController {
    private readonly userSkillService;
    constructor(userSkillService: UserSkillService);
    createUserSkill(createUserSkillDto: CreateUserSkillDto, req: RequestWithUser): Promise<{
        user: {
            fullName: string;
            email: string;
            password: string;
            resume: string | null;
            profile: string | null;
            phoneNumber: string;
            bio: string | null;
            otp: number | null;
            id: number;
            role: import("generated/prisma").$Enums.Role;
            otpExpiry: Date | null;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        skill: string;
    }>;
    getUserSkills(req: RequestWithUser): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        skill: string;
    }[]>;
    updateUserSkill(skillId: number, updateUserSkillDto: UpdateUserSkillDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        skill: string;
    }>;
    deleteUserSkill(skillId: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        skill: string;
    }>;
}
