const { z } = require("zod");

const createCompanySchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Company name must contain at least 2 characters")
        .max(150, "Company name cannot exceed 150 characters")
});

module.exports = {
    createCompanySchema
};