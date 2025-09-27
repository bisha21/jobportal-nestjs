"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserSkillDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const createUserSkill_dto_1 = require("./createUserSkill.dto");
class UpdateUserSkillDto extends (0, mapped_types_1.PartialType)(createUserSkill_dto_1.CreateUserSkillDto) {
}
exports.UpdateUserSkillDto = UpdateUserSkillDto;
//# sourceMappingURL=updateUserSkill.dto.js.map