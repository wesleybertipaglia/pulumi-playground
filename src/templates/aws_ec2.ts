import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";

export async function createEC2Instance() {
  const config = new pulumi.Config();

  const instanceType = config.get("instanceType") || "t2.micro";
  const ami = config.get("ami") || "ami-0c55b159cbfafe1f0";
  const keyName = config.get("keyName");

  const vpc = await aws.ec2.getVpc({ default: true });
  const subnet = await aws.ec2.getSubnet({
    filters: [{ name: "vpc-id", values: [vpc.id] }],
  });

  const secGroup = new aws.ec2.SecurityGroup("ec2-secgrp", {
    vpcId: vpc.id,
    description: "Allow SSH access",
    ingress: [
      {
        protocol: "tcp",
        fromPort: 22,
        toPort: 22,
        cidrBlocks: ["0.0.0.0/0"],
      },
    ],
    egress: [
      {
        protocol: "-1",
        fromPort: 0,
        toPort: 0,
        cidrBlocks: ["0.0.0.0/0"],
      },
    ],
  });

  const server = new aws.ec2.Instance("playground-ec2", {
    instanceType,
    ami,
    subnetId: subnet.id,
    vpcSecurityGroupIds: [secGroup.id],
    keyName: keyName || undefined,
    tags: {
      Name: "PulumiPlaygroundEC2",
    },
  });

  return {
    publicIp: server.publicIp,
    publicDns: server.publicDns,
    instanceId: server.id,
  };
}
