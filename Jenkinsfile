pipeline {
    agent any

    environment {
        DOCKER_USERNAME = credentials('docker-username')
        DOCKER_PASSWORD = credentials('docker-password')
        AZURE_VM_IP = credentials('azure-vm-ip')
        SSH_KEY = credentials('azure-ssh-key')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Pull Docker Images') {
            steps {
                sh '''
                    echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin
                    docker pull $DOCKER_USERNAME/polyglot-frontend:latest
                    docker pull $DOCKER_USERNAME/polyglot-backend:latest
                    docker pull $DOCKER_USERNAME/polyglot-worker:latest
                '''
            }
        }

        stage('Deploy to Azure VM') {
            steps {
                sshagent(['azure-ssh-key']) {
                    sh '''
                        # Copy production compose file to server
                        scp -o StrictHostKeyChecking=no deploy/docker-compose.prod.yml ubuntu@${AZURE_VM_IP}:~/docker-compose.yml
                        
                        # Execute deployment
                        ssh -o StrictHostKeyChecking=no ubuntu@${AZURE_VM_IP} "
                            export DOCKER_USERNAME=${DOCKER_USERNAME}
                            docker compose pull
                            docker compose up -d
                        "
                    '''
                }
            }
        }

        stage('Health Check') {
            steps {
                sleep 15
                sh '''
                    curl -f http://${AZURE_VM_IP}:3000 || exit 1
                    curl -f http://${AZURE_VM_IP}:5000/api/status || exit 1
                '''
            }
        }
    }

    post {
        success {
            echo "Deployment Successful! The application is live."
        }
        failure {
            echo "Deployment Failed. Please check the logs."
        }
    }
}
