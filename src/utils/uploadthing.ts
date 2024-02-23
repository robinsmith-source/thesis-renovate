import { generateComponents } from "@uploadthing/react";
import { type ChefFileRouter } from "~/app/api/uploadthing/core";

export const { UploadButton, UploadDropzone, Uploader } =
  generateComponents<ChefFileRouter>();
