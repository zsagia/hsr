node {
  stage('checkout') {
    checkout scm
  }
  stage('lint') {
    nodejs(nodeJSInstallationName: 'nodejs') {
      sh 'npm run lint'
    }
  }
}
