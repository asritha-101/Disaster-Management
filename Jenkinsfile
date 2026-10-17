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
    // Keep Corepack's pnpm cache inside the Jenkins workspace on Windows agents.
    COREPACK_HOME = "${WORKSPACE}\\.corepack"
  }

  stages {
    stage('Install dependencies') {
      steps {
        script {
          if (isUnix()) {
            sh 'corepack pnpm install --frozen-lockfile'
          } else {
            bat 'corepack pnpm install --frozen-lockfile'
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
            bat 'corepack pnpm lint'
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
            bat 'corepack pnpm typecheck'
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
            bat 'corepack pnpm test'
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
