# Troubleshooting

## Docker Compose Issues
- **Ports already in use:** If port 3000, 5000, or 6379 are used, stop other running containers (`docker ps` and `docker stop <id>`) or local services.
- **Backend cannot reach Redis:** Ensure you are using the docker network DNS (`redis:6379`) instead of `localhost:6379` in the backend connection string.

## Terraform AWS Issues
- **Permission denied:** Ensure your AWS user has full EC2/VPC permissions or AdministratorAccess.
- **SSH timeout:** Make sure port 22 is open in the security group and your IP is allowed. The Terraform script handles this by allowing 0.0.0.0/0 for demo purposes.

## Jenkins Pipeline Failures
- **SSH Key issues:** Ensure the Jenkins credential for `aws-ssh-key` contains the raw PEM file content and is configured correctly in the SSH Pipeline plugin.
- **Docker permission denied:** The EC2 user (usually `ubuntu`) must be in the `docker` group. The `user_data` script in Terraform automatically handles this, but it may require a restart or re-login.

## Swarm Deployment
- If services remain in "Pending" state, it may be due to low resources on the VM. Ensure the EC2 instance is at least `t2.medium` if possible, though `t2.micro` should run this lightweight stack.
