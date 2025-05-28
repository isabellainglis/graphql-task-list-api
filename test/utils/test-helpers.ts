import { ExecutionResult } from "graphql";

export function unwrapResult(res: {
  body: { kind: string; [key: string]: any };
}): ExecutionResult {
  if (res.body.kind === "single") {
    return res.body.singleResult;
  }
  throw new Error("Only single results supported in tests");
}
