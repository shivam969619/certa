const { z } = require("zod");

const createVendorSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2)
        .max(150),

    email: z
        .string()
        .trim()
        .email(),

    country: z
        .string()
        .trim()
        .min(2)
        .max(100),

    industryType: z
        .string()
        .trim()
        .max(100)
        .optional(),

    address: z
        .string()
        .trim()
        .max(250)
        .optional()
});

const updateVendorStatusSchema = z.object({
    status: z.enum([
        "Pending",
        "Under Review",
        "Approved",
        "Rejected",
        "Suspended"
    ])
});

module.exports = {
    createVendorSchema,
    updateVendorStatusSchema
};