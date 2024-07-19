import { Router } from "express";
import { check } from "express-validator";
import { 
    createRequest,
    getMyRequest,
    getAllRequests,
    getRequestsPending,
    getRequestsAccepted,
    getRequestsRejected,
    acceptRequest,
    rejectRequest,
    pendingRequest  
} from "./request.controller.js";
import { validateJWT } from "../../middlewares/validate-jwt.js";
import { validateFields } from "../../middlewares/validate-fields.js";

const router = Router();

router.post(
    "/create",
    [
        validateJWT,
        check("message", "message is required").not().isEmpty(),
        validateFields,
    ],
    createRequest
);

router.put(
    "/accept/:id",
    [
        validateJWT,
        check("id", "id is required").isMongoId(),
        validateFields,
    ],
    acceptRequest
);

router.put(
    "/reject/:id",
    [
        validateJWT,
        check("id", "id is required").isMongoId(),
        validateFields,
    ],
    rejectRequest
);

router.put(
    "/pending/:id",
    [
        validateJWT,
        check("id", "id is required").isMongoId(),
        validateFields,
    ],
    pendingRequest
);

router.get(
    "/my-request",
    validateJWT,
    getMyRequest
);

router.get(
    "/all",
    validateJWT,
    getAllRequests
);

router.get(
    "/pending",
    validateJWT,
    getRequestsPending
);

router.get(
    "/accepted",
    validateJWT,
    getRequestsAccepted
);

router.get(
    "/rejected",
    validateJWT,
    getRequestsRejected
);

export default router;