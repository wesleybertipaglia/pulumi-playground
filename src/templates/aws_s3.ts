import * as aws from "@pulumi/aws";

export const createS3Bucket = async () => {
  const bucket = new aws.s3.Bucket("playground-bucket", {
    acl: "public-read",
    website: {
      indexDocument: "index.html",
    },
  });

  return {
    bucketName: bucket.bucket,
    websiteUrl: bucket.websiteEndpoint,
  };
};
