node {
  stage('checkout') {
    checkout scm
  }
  stage('npm install') {
    nodejs(nodeJSInstallationName: 'nodejs7') {
      sh 'npm install'
    }
  }
}
