node {
  stage('checkout') {
    checkout scm
  }
  stage('npm install') {
    sh 'npm install'
  }
  stage('lint') {
    sh 'npm run tslint'
  }
  stage('build') {
    sh 'npm run buildProd'
  }
}
