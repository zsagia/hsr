node {
  stage('checkout') {
    checkout scm
  }
  stage('npm install') {
    nodejs(nodeJSInstallationName: 'nodejs') {
      sh 'npm install'
    }
  }
}
