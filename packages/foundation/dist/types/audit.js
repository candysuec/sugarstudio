export var AuditEventType;
(function (AuditEventType) {
    AuditEventType["BRAND_CREATED"] = "BRAND_CREATED";
    AuditEventType["BRAND_UPDATED"] = "BRAND_UPDATED";
    AuditEventType["DRIFT_DETECTED"] = "DRIFT_DETECTED";
    AuditEventType["SOP_GENERATED"] = "SOP_GENERATED";
    AuditEventType["TASK_ENQUEUED"] = "TASK_ENQUEUED";
    AuditEventType["TASK_COMPLETED"] = "TASK_COMPLETED";
    AuditEventType["TASK_FAILED"] = "TASK_FAILED";
    AuditEventType["USER_LOGIN"] = "USER_LOGIN";
    AuditEventType["USER_LOGOUT"] = "USER_LOGOUT";
    AuditEventType["SYSTEM_HEALTH_CHECK"] = "SYSTEM_HEALTH_CHECK";
    // Add more event types as needed
})(AuditEventType || (AuditEventType = {}));
