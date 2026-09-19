const express = require("express");

const router = express.Router();

const vendorController =
    require("../controllers/VendorsController");


/*
    Company APIs
*/

// POST /api/v1/companies
router.post(
    "/companies",
    vendorController.createCompany
);


/*
    Vendor APIs
*/

// POST /api/v1/companies/:companyId/vendors
router.post(
    "/companies/:companyId/vendors",
    vendorController.createVendor
);

// GET /api/v1/companies/:companyId/vendors
router.get(
    "/companies/:companyId/vendors",
    vendorController.getVendors
);

// GET /api/v1/vendors/:vendorId
router.get(
    "/vendors/:vendorId",
    vendorController.getVendor
);

// PATCH /api/v1/vendors/:vendorId/status
router.patch(
    "/vendors/:vendorId/status",
    vendorController.updateVendorStatus
);


module.exports = router;