"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiFeaturesPrisma = void 0;
class ApiFeaturesPrisma {
    queryParams;
    options = {};
    constructor(queryParams) {
        this.queryParams = queryParams;
    }
    filter() {
        const queryObj = { ...this.queryParams };
        const excludedFields = ['page', 'sort', 'limit', 'fields', 'include'];
        excludedFields.forEach((el) => delete queryObj[el]);
        const where = {};
        for (const key in queryObj) {
            if (key.includes('[')) {
                const [field, operatorWithBracket] = key.split('[');
                const operator = operatorWithBracket.replace(']', '');
                if (!where[field])
                    where[field] = {};
                switch (operator) {
                    case 'contains':
                        where[field] = { contains: queryObj[key], mode: 'insensitive' };
                        break;
                    case 'startsWith':
                        where[field] = { startsWith: queryObj[key], mode: 'insensitive' };
                        break;
                    case 'endsWith':
                        where[field] = { endsWith: queryObj[key], mode: 'insensitive' };
                        break;
                    case 'gte':
                        where[field] = { gte: Number(queryObj[key]) };
                        break;
                    case 'lte':
                        where[field] = { lte: Number(queryObj[key]) };
                        break;
                }
            }
            else {
                where[key] = queryObj[key];
            }
        }
        this.options.where = where;
        return this;
    }
    sort(defaultSort) {
        if (this.queryParams.sort) {
            const sortArray = this.queryParams.sort.split(',').map((el) => {
                if (el.startsWith('-'))
                    return { [el.substring(1)]: 'desc' };
                return { [el]: 'asc' };
            });
            this.options.orderBy = sortArray;
        }
        else if (defaultSort) {
            this.options.orderBy = defaultSort;
        }
        return this;
    }
    limitFields() {
        if (this.queryParams.fields) {
            const fields = this.queryParams.fields.split(',');
            const select = {};
            fields.forEach((field) => (select[field] = true));
            this.options.select = select;
        }
        return this;
    }
    paginate(defaultLimit = 20) {
        const page = Number(this.queryParams.page) || 1;
        const limit = Number(this.queryParams.limit) || defaultLimit;
        const skip = (page - 1) * limit;
        this.options.skip = skip;
        this.options.take = limit;
        return this;
    }
    includeRelations() {
        if (this.queryParams.include) {
            const relations = this.queryParams.include.split(',');
            const include = {};
            relations.forEach((r) => (include[r] = true));
            this.options.include = include;
        }
        return this;
    }
    getOptions() {
        return this.options;
    }
}
exports.ApiFeaturesPrisma = ApiFeaturesPrisma;
//# sourceMappingURL=apiFeatures.js.map