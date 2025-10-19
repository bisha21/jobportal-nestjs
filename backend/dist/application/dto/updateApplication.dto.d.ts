import { ApplicationStatus } from '../../../generated/prisma';
import { CreateApplicationDto } from './applyApplication.dto';
declare const UpdateApplicationDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateApplicationDto>>;
export declare class UpdateApplicationDto extends UpdateApplicationDto_base {
    status?: ApplicationStatus;
}
export {};
