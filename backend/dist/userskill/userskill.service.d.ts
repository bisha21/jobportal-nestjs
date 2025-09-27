import { DatabaseService } from 'src/database/database.service';
import { CreateUserSkillDto } from './dto/createUserSkill.dto';
import { UpdateUserSkillDto } from './dto/updateUserSkill.dto';
export declare class UserSkillService {
    private readonly prisma;
    constructor(prisma: DatabaseService);
    createUserSkill(userId: number, createUserSkillDto: CreateUserSkillDto): Promise<{
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
        skill: string;
        userId: number;
    }>;
    getUserSkills(userId: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        skill: string;
        userId: number;
    }[]>;
    updateUserSkill(skillId: number, updateUserSkillDto: UpdateUserSkillDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        skill: string;
        userId: number;
    }>;
    deleteUserSkill(skillId: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        skill: string;
        userId: number;
    }>;
}
