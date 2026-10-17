pipeline {
  agent any

  tools {
    // Configure this exact name under Manage Jenkins > Tools > NodeJS installations.
    nodejs 'NodeJS 22'
  }

  options {
    timestamps()
    timeout(time: 30, unit: 'MINUTES')
    disableConcurrentBuilds()
  }

  environment {
    // Keep Corepack's cache inside the Jenkins workspace on Windows agents.
    COREPACK_HOME = "${WORKSPACE}\\.corepack"
  }

  stages {
    stage('Install dependencies') {
      steps {
        script {
          if (isUnix()) {
            sh 'corepack pnpm install --frozen-lockfile'
          } else {
            // pnpm 11 requires a project symlink on Windows; restricted Jenkins
            // processes may not have permission to create it. npm avoids that link.
            bat 'npm install --no-package-lock'
          }
        }
      }
    }

    stage('Lint') {
      steps {
        script {
          if (isUnix()) {
            sh 'corepack pnpm lint'
          } else {
            bat 'npm run lint'
          }
        }
      }
    }

    stage('Typecheck') {
      steps {
        script {
          if (isUnix()) {
            sh 'corepack pnpm typecheck'
          } else {
            bat 'npm run typecheck'
          }
        }
      }
    }

    stage('Tests') {
      steps {
        script {
          if (isUnix()) {
            sh 'corepack pnpm test'
          } else {
            bat 'npm run test'
          }
        }
      }
    }
  }

  post {
    success {
      echo 'Jenkins checks passed. Vercel can build and deploy this commit.'
    }
    failure {
      echo 'Jenkins checks failed. Review the failed stage before merging or deploying.'
    }
  }
}
