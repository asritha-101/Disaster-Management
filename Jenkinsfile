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
    skipDefaultCheckout(true)
  }

  environment {
    // Keep Corepack's cache inside the Jenkins workspace on Windows agents.
    COREPACK_HOME = "${WORKSPACE}\\.corepack"
    // Use the system npm installed with Node.js on this Windows Jenkins host.
    NPM_CMD = 'C:\\Program Files\\nodejs\\npm.cmd'
  }

  stages {
    stage('Clean workspace and checkout') {
      steps {
        // Remove node_modules left by older pnpm builds before npm installs.
        deleteDir()
        checkout scm
      }
    }

    stage('Install dependencies') {
      steps {
        script {
          if (isUnix()) {
            sh 'corepack pnpm install --frozen-lockfile'
          } else {
            bat 'call "%NPM_CMD%" install --no-package-lock --no-audit --no-fund'
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
            bat 'call "%NPM_CMD%" run lint'
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
            bat 'call "%NPM_CMD%" run typecheck'
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
            bat 'call "%NPM_CMD%" run test'
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
