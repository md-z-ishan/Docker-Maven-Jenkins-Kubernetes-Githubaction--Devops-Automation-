pipeline {
    agent any

    environment {
        // Defines the Docker image name
        IMAGE_NAME = 'devops-simops-ecosystem'
        // API key will be passed as a secret or environment variable in Jenkins
        // VITE_GEMINI_API_KEY = credentials('gemini-api-key')
    }

    stages {
        stage('Checkout Code') {
            steps {
                echo 'Checking out the project from GitHub...'
                checkout scm
            }
        }

        stage('Build Frontend with Maven') {
            steps {
                echo 'Building React Application using Maven (frontend-maven-plugin)...'
                sh 'mvn clean install'
            }
        }

        stage('Docker Image Build') {
            steps {
                echo 'Building Docker Image...'
                // Build the image passing the build-arg
                sh 'docker build --build-arg VITE_GEMINI_API_KEY=${VITE_GEMINI_API_KEY} -t ${IMAGE_NAME}:latest .'
            }
        }

        stage('Deploy Container') {
            steps {
                echo 'Deploying Application using Docker Compose...'
                // Restart the container with the newly built image
                sh 'docker-compose down'
                sh 'docker-compose up -d'
            }
        }
    }

    post {
        success {
            echo 'Pipeline executed successfully! The Complete DevOps Ecosystem is live.'
        }
        failure {
            echo 'Pipeline failed. Please check the logs.'
        }
    }
}
