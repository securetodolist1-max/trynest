#!/bin/bash

################################################################################
# Secure To-Do Application - Restart Script
# Run this to restart all services
################################################################################

YELLOW='\033[1;33m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}════════════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}  Restarting Secure To-Do Application${NC}"
echo -e "${BLUE}════════════════════════════════════════════════════════════════${NC}\n"

cd "$(dirname "$0")"

echo -e "${YELLOW}Stopping services...${NC}"
docker-compose down

echo -e "${YELLOW}Waiting 5 seconds...${NC}"
sleep 5

echo -e "${YELLOW}Starting services...${NC}"
docker-compose up -d

echo -e "${YELLOW}Waiting for services to initialize (30 seconds)...${NC}"
sleep 30

echo -e "\n${GREEN}✓ Services restarted successfully!${NC}\n"
