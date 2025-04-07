import { createS3Bucket } from "../templates/aws_s3";
import { createEC2Instance } from "../templates/aws_ec2";

export const stacks: Record<string, () => Promise<any>> = {
  aws_s3: createS3Bucket,
  aws_ec2: createEC2Instance,
};
