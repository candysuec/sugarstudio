export var WorkflowStatus;
(function (WorkflowStatus) {
    WorkflowStatus["PENDING"] = "PENDING";
    WorkflowStatus["IN_PROGRESS"] = "IN_PROGRESS";
    WorkflowStatus["COMPLETED"] = "COMPLETED";
    WorkflowStatus["FAILED"] = "FAILED";
    WorkflowStatus["CANCELLED"] = "CANCELLED";
})(WorkflowStatus || (WorkflowStatus = {}));
