node {
  stage('checkout') {
    checkout scm
  }
  stage('npm install') {
    nodejs(nodeJSInstallationName: 'nodejs6') {
      sh 'npm install'
    }
  }
}
