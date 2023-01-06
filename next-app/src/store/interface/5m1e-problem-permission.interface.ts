import { RequestTransition } from "@/types/request-config.type";
import { _5M1ERequest } from "@/types/request.type";

export interface I5M1EProblemPermissionState {
  canSubmit: (request: _5M1ERequest) => boolean;
  canApprove: (request: _5M1ERequest) => boolean;
  canReject: (request: _5M1ERequest) => boolean;
  canCancel: (request: _5M1ERequest) => boolean;
  canSelfCancel: (request: _5M1ERequest) => boolean;
  canDelete: (request: _5M1ERequest) => boolean;
  canSelectSupporter: (request: _5M1ERequest) => boolean;
  canDoActionByGivenTransition: (
    request: _5M1ERequest,
    transition: RequestTransition
  ) => boolean;
}
