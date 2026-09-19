const { z } = require("zod");

const createComplianceCheckSchema = z.object({
    checkType: z
        .string()
        .trim()
        .min(2)
        .max(100),

    status: z.enum([
        "Passed",
        "Failed",
        "Pending"
    ])
});

module.exports = {
    createComplianceCheckSchema
};