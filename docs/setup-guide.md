# Setup Guide

## Local Development (Docker Compose)

1. Ensure Docker Desktop is installed and running.
2. Clone this repository.
3. From the root directory, run:
   ```bash
   docker compose up --build
   ```
4. Access the applications:
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:5000/swagger`

## Local Development (Docker Swarm)

1. Initialize Swarm mode:
   ```bash
   docker swarm init
   ```
2. Deploy the stack:
   ```bash
   export DOCKER_USERNAME=your_dockerhub_username
   docker stack deploy -c docker-stack.yml polyglot-app
   ```
3. Check services:
   ```bash
   docker service ls
   ```

## Infrastructure (Terraform AWS)

1. Install Terraform and AWS CLI.
2. Configure AWS credentials (`aws configure`).
3. Navigate to `infra/` directory.
4. Run:
   ```bash
   terraform init
   terraform validate
   terraform plan
   terraform apply
   ```
5. Note the outputs (`instance_public_ip` and `instance_public_dns`).

## CI/CD Pipeline Setup

**GitHub Actions:**
- Add `DOCKER_USERNAME` and `DOCKER_PASSWORD` to your GitHub Repository Secrets.

**Jenkins:**
- Install Docker Pipeline and SSH Pipeline plugins.
- Add credentials: `docker-username`, `docker-password`, `aws-ec2-ip`, `aws-ssh-key`.
- Connect the repository to Jenkins via Webhooks.
