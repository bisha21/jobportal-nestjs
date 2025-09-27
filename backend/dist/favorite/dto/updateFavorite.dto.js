"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateFavoriteDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const createFavoriteJob_dto_1 = require("./createFavoriteJob.dto");
class UpdateFavoriteDto extends (0, mapped_types_1.PartialType)(createFavoriteJob_dto_1.CreateFavoriteDto) {
}
exports.UpdateFavoriteDto = UpdateFavoriteDto;
//# sourceMappingURL=updateFavorite.dto.js.map