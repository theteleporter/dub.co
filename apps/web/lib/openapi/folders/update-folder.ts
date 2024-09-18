import { openApiErrorResponses } from "@/lib/openapi/responses";
import z from "@/lib/zod";
import {
  folderSchema,
  updateFolderBodySchema,
} from "@/lib/zod/schemas/folders";
import { ZodOpenApiOperationObject } from "zod-openapi";

export const updateFolder: ZodOpenApiOperationObject = {
  operationId: "updateFolder",
  "x-speakeasy-name-override": "update",
  "x-speakeasy-max-method-params": 2,
  summary: "Update a folder",
  description: "Update a folder in the workspace.",
  requestParams: {
    path: z.object({
      id: z.string().describe("The ID of the folder to update."),
    }),
  },
  requestBody: {
    content: {
      "application/json": {
        schema: updateFolderBodySchema,
      },
    },
  },
  responses: {
    "200": {
      description: "The updated folder.",
      content: {
        "application/json": {
          schema: folderSchema,
        },
      },
    },
    ...openApiErrorResponses,
  },
  tags: ["Folders"],
  security: [{ token: [] }],
};