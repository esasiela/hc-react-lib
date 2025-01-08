#!/bin/sh

# Function to print usage
print_usage() {
    echo "Usage: $0 [-b|--build] [-r|--run]"
    echo "  -b, --build   Build the Docker image"
    echo "  -r, --run     Run the Docker container"
    echo "  PUBLIC_URL defaults to /"
}

# Check for arguments
if [ $# -eq 0 ]; then
    print_usage
    exit 1
fi

# default PUBLIC_URL to / if not set
: "${PUBLIC_URL:=/}"

# Parse arguments
case "$1" in
    -b|--build)
        docker build -t hc-home-app --build-arg PUBLIC_URL=$PUBLIC_URL --file docker/Dockerfile .
        echo "built with PUBLIC_URL [${PUBLIC_URL}]"
        ;;
    -r|--run)
        # -e REACT_APP_CONTEXT_ROOT=$PUBLIC_URL \
        docker rm -f hc-home-app 2>/dev/null || true && \
        docker run -d \
          --name hc-home-app \
          -p 8080:80 \
          -e HC_CONFIG_ENABLED=true \
          -e HC_CONFIG_HC_ENV=dev \
          -e HC_CONFIG_HC_NODE=docker \
          -e HC_CONFIG_LOGIN_API_URL=http://localhost:8081 \
          hc-home-app
        ;;
    *)
        echo "Invalid argument: $1"
        print_usage
        exit 1
        ;;
esac
