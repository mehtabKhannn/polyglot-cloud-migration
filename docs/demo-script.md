# Demo Script

Follow this script to demonstrate the complete, automated Polyglot Cloud Migration pipeline.

## 1. Initial State
- Show the live URL (AWS EC2 Public IP or DNS).
- Point out the current version (e.g., "Version 1.0.0").
- Point out the hero text or a specific color/text in the frontend.
- Show the `/api/status` endpoint returning version 1.0.0.

## 2. Make a Change
- Open the codebase.
- In `frontend-js/src/App.js` or `components`, change the Version Badge from `1.0.0` to `2.0.0`.
- In `backend-dotnet/Controllers/StatusController.cs`, change the version response to `2.0.0`.
- Commit and push the changes:
  ```bash
  git add .
  git commit -m "feat: upgrade to version 2.0.0"
  git push origin main
  ```

## 3. GitHub Actions CI
- Open GitHub Actions tab.
- Show the pipeline running:
  - Checking out code.
  - Running tests (Frontend, Backend, Python).
  - Linting code.
  - Building and pushing Docker images to Docker Hub.

## 4. Jenkins CD
- Open Jenkins dashboard.
- Show the webhook triggering the build automatically.
- Walk through the pipeline stages:
  - Pulling images.
  - SSHing into the AWS EC2 instance.
  - Running `docker compose pull` and `docker compose up -d`.
  - Passing the health check.

## 5. Verification
- Refresh the live URL.
- Show the updated Version 2.0.0 on the Portfolio UI.
- Show the updated JSON from the backend API.
- Emphasize that absolutely zero manual deployment steps were taken.
