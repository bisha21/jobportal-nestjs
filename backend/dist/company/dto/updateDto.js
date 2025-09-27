"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCompanyDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const createDto_1 = require("./createDto");
class UpdateCompanyDto extends (0, mapped_types_1.PartialType)(createDto_1.CreateCompanyDto) {
}
exports.UpdateCompanyDto = UpdateCompanyDto;
;
//# sourceMappingURL=updateDto.js.map