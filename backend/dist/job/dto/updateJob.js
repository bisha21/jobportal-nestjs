"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateJobDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const createJob_1 = require("./createJob");
class updateJobDto extends (0, mapped_types_1.PartialType)(createJob_1.CreateJobDto) {
}
exports.updateJobDto = updateJobDto;
//# sourceMappingURL=updateJob.js.map