node {
  stage('checkout') {
    checkout scm
  }
  stage('lint') {
    sh 'npm run lint'
  }
}
