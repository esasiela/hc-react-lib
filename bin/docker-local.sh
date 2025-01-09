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

# default IMAGE_NAME to hc-home-app if not set: IMAGE_NAME=ghcr.io/esasiela/hc-home-app:main
: "${IMAGE_NAME:=hc-home-app}"
: "${CONTAINER_NAME:=hc-home-app}"
: "${PORTS:=8080:80}"
: "${HC_CONFIG_ENABLED:=true}"
: "${HC_CONFIG_HC_ENV:=dev}"
: "${HC_CONFIG_HC_NODE:=docker}"
: "${HC_CONFIG_LOGIN_API_URL:=http://localhost:8081}"

# Parse arguments
case "$1" in
    -b|--build)
        docker build -t hc-home-app --build-arg PUBLIC_URL=$PUBLIC_URL --file docker/Dockerfile .
        echo "built with PUBLIC_URL [${PUBLIC_URL}]"
        ;;
    -r|--run)
        # -e REACT_APP_CONTEXT_ROOT=$PUBLIC_URL \
        echo "running with ports [${PORTS}]"
        docker rm -f ${CONTAINER_NAME} 2>/dev/null || true && \
        docker run -d \
          --name ${CONTAINER_NAME} \
          -p ${PORTS} \
          -e HC_CONFIG_ENABLED=${HC_CONFIG_ENABLED} \
          -e HC_CONFIG_HC_ENV=${HC_CONFIG_HC_ENV} \
          -e HC_CONFIG_HC_NODE=${HC_CONFIG_HC_NODE} \
          -e HC_CONFIG_LOGIN_API_URL=${HC_CONFIG_LOGIN_API_URL} \
          ${IMAGE_NAME}
        ;;
    *)
        echo "Invalid argument: $1"
        print_usage
        exit 1
        ;;
esac
