const { z } = require("zod");

const createRiskAssessmentSchema = z.object({
    financialRisk: z
        .number()
        .int()
        .min(1)
        .max(10),

    securityRisk: z
        .number()
        .int()
        .min(1)
        .max(10),

    operationalRisk: z
        .number()
        .int()
        .min(1)
        .max(10),

    overallRisk: z
        .number()
        .int()
        .min(1)
        .max(10)
});

module.exports = {
    createRiskAssessmentSchema
};