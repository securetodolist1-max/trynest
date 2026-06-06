#!/bin/bash

################################################################################
# Secure To-Do Application - Stop Script
# Run this to stop all services
################################################################################

YELLOW='\033[1;33m'
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}════════════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}  Stopping Secure To-Do Application${NC}"
echo -e "${BLUE}════════════════════════════════════════════════════════════════${NC}\n"

cd "$(dirname "$0")"

echo -e "${YELLOW}Stopping all services...${NC}"
docker-compose down

echo -e "${YELLOW}Cleaning up...${NC}"
docker system prune -f

echo -e "\n${GREEN}✓ All services stopped and cleaned up${NC}\n"

echo -e "${YELLOW}To start again, run: ${BLUE}./start.sh${NC}\n"
