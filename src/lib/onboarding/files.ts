/** Proposal, contract and other onboarding files: PDF, Word, Excel or a photo. */
export const CLIENT_FILE_TYPES: Record<string, string> = {
  "application/pdf": "pdf",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
};
export const CLIENT_FILE_MAX = 20 * 1024 * 1024;
export const CLIENT_FILE_KINDS = { proposal: "Proposal", contract: "Signed contract (engagement letter)", other: "Other" } as const;
export type ClientFileKind = keyof typeof CLIENT_FILE_KINDS;
