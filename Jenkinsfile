node {
  stage('checkout') {
    checkout scm
  }
  stage('lint') {
    nodejs(nodeJSInstallationName: 'node') {
      sh 'npm run lint'
    }
  }
}
