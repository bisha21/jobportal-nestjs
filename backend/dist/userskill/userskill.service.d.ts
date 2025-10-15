import { DatabaseService } from 'src/database/database.service';
import { CreateUserSkillDto } from './dto/createUserSkill.dto';
import { UpdateUserSkillDto } from './dto/updateUserSkill.dto';
export declare class UserSkillService {
    private readonly prisma;
    constructor(prisma: DatabaseService);
    createUserSkill(userId: number, createUserSkillDto: CreateUserSkillDto): Promise<{
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
    getUserSkills(userId: number): Promise<{
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
