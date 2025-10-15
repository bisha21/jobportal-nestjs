import { UserSkillService } from './userskill.service';
import { CreateUserSkillDto } from './dto/createUserSkill.dto';
import { UpdateUserSkillDto } from './dto/updateUserSkill.dto';
import { type RequestWithUser } from 'src/common/guards/auth/auth.guard';
export declare class UserSkillController {
    private readonly userSkillService;
    constructor(userSkillService: UserSkillService);
    createUserSkill(createUserSkillDto: CreateUserSkillDto, req: RequestWithUser): Promise<{
        user: {
            createdAt: Date;
            updatedAt: Date;
            id: number;
            fullName: string;
            email: string;
            password: string;
            resume: string | null;
            profile: string | null;
            phoneNumber: string;
            bio: string | null;
            role: import("../../generated/prisma").$Enums.Role;
            otp: number | null;
            otpExpiry: Date | null;
        };
    } & {
        skill: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
    }>;
    getUserSkills(req: RequestWithUser): Promise<{
        skill: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
    }[]>;
    updateUserSkill(skillId: number, updateUserSkillDto: UpdateUserSkillDto): Promise<{
        skill: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
    }>;
    deleteUserSkill(skillId: number): Promise<{
        skill: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
    }>;
}
