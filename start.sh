#!/bin/bash

################################################################################
# Secure To-Do Application - Start Script
# Run this to start all services
################################################################################

YELLOW='\033[1;33m'
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}════════════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}  Starting Secure To-Do Application${NC}"
echo -e "${BLUE}════════════════════════════════════════════════════════════════${NC}\n"

cd "$(dirname "$0")"

# Check if Docker daemon is running
echo -e "${YELLOW}Checking Docker daemon...${NC}"
if ! docker ps &> /dev/null; then
    echo -e "${RED}✗ Docker daemon is not running${NC}"
    echo -e "${YELLOW}Try: sudo systemctl start docker${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Docker daemon is running${NC}\n"

# Check if containers are already running
echo -e "${YELLOW}Checking for existing containers...${NC}"
if docker-compose ps 2>/dev/null | grep -q "Up"; then
    echo -e "${YELLOW}Services appear to be already running${NC}"
    echo -e "Run ${BLUE}./status.sh${NC} to check status"
    echo -e "Run ${BLUE}./stop.sh${NC} to stop all services\n"
    exit 0
fi

echo -e "${YELLOW}Starting services...${NC}"
docker-compose up -d

echo -e "${YELLOW}Waiting for services to initialize (30 seconds)...${NC}"
sleep 30

echo -e "\n${BLUE}════════════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}✓ Application started successfully!${NC}"
echo -e "${BLUE}════════════════════════════════════════════════════════════════${NC}\n"

echo -e "${YELLOW}Access points:${NC}"
echo -e "  Frontend:     ${BLUE}http://localhost:3000${NC}"
echo -e "  Backend API:  ${BLUE}http://localhost:3001/api${NC}"
echo -e "  Grafana:      ${BLUE}http://localhost:3002${NC}"
echo -e "  Jenkins:      ${BLUE}http://localhost:8080${NC}"
echo -e "  Mailhog:      ${BLUE}http://localhost:8025${NC}\n"

echo -e "${YELLOW}Admin Login:${NC}"
echo -e "  Email:    ${BLUE}admin@example.com${NC}"
echo -e "  Password: ${BLUE}admin123${NC}\n"

echo -e "${YELLOW}Useful commands:${NC}"
echo -e "  Status:   ${BLUE}./status.sh${NC}"
echo -e "  Logs:     ${BLUE}./logs.sh${NC}"
echo -e "  Stop:     ${BLUE}./stop.sh${NC}"
echo -e "  Restart:  ${BLUE}./restart.sh${NC}\n"
