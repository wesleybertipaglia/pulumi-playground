import { createS3Bucket } from "../templates/aws_bucket_s3";

export const stacks: Record<string, () => Promise<any>> = {
  s3: createS3Bucket,
};
