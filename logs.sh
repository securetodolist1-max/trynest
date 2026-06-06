#!/bin/bash

################################################################################
# Secure To-Do Application - Logs Script
# View logs for all services or specific service
################################################################################

YELLOW='\033[1;33m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}════════════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}  Service Logs${NC}"
echo -e "${BLUE}════════════════════════════════════════════════════════════════${NC}\n"

cd "$(dirname "$0")"

if [ -z "$1" ]; then
    echo -e "${YELLOW}Usage:${NC}"
    echo -e "  ${BLUE}./logs.sh [service]${NC}\n"
    echo -e "${YELLOW}Available services:${NC}"
    echo -e "  - backend"
    echo -e "  - frontend"
    echo -e "  - postgres"
    echo -e "  - jenkins"
    echo -e "  - grafana"
    echo -e "  - mailhog"
    echo -e "  - all (default)\n"
    echo -e "${YELLOW}Examples:${NC}"
    echo -e "  ${BLUE}./logs.sh backend${NC}"
    echo -e "  ${BLUE}./logs.sh postgres${NC}\n"
    
    echo -e "${YELLOW}Recent logs from all services:${NC}\n"
    docker-compose logs --tail=50
else
    echo -e "${YELLOW}Logs for: ${BLUE}$1${NC}\n"
    docker-compose logs --tail=100 -f "$1"
fi
