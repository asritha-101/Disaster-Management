# Jenkins CI setup

This repository includes a Jenkins pipeline that installs the locked pnpm dependencies and runs lint, TypeScript checks, and the existing automated test suite. It does not need the Supabase database credentials. Keep `.env.local` and all database credentials out of Jenkins and Git.

## Configure Jenkins

1. Use a Jenkins agent with Git, Java, and Node.js support. The pipeline supports both Windows and Linux agents.
2. In **Manage Jenkins → Plugins**, install **Pipeline**, **NodeJS**, and **GitHub Branch Source**.
3. In **Manage Jenkins → Tools**, add a NodeJS installation named exactly `NodeJS 22`, using Node.js 22.x.
4. Select **New Item → Multibranch Pipeline**. Name it `resilience-disaster-management`.
5. Under **Branch Sources**, add **GitHub** and select or enter `asritha-101/Disaster-Management`.
6. Set the repository script path to `Jenkinsfile`, save, and choose **Scan Multibranch Pipeline Now**.
7. In the multibranch configuration, enable periodic branch indexing (for example, every 5 minutes) if a GitHub webhook is not configured. The GitHub Branch Source plugin can also manage webhook discovery when Jenkins is reachable by GitHub.

## What happens on a push

Jenkins runs the pipeline on the checked-out commit. The pipeline stops on the first failed check and reports the result in Jenkins.

The repository is already connected to Vercel, so Vercel continues to build and deploy pushes independently. This Jenkinsfile adds CI checks; it does not gate Vercel production deploys. To make Jenkins the deployment gate or deploy through Jenkins instead, the Vercel Git integration and deployment credentials need to be deliberately reconfigured.
