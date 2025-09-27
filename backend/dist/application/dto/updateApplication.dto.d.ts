import { CreateApplicationDto } from './applyApplication.dto';
import { ApplicationStatus } from 'generated/prisma';
declare const UpdateApplicationDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateApplicationDto>>;
export declare class UpdateApplicationDto extends UpdateApplicationDto_base {
    status?: ApplicationStatus;
}
export {};
