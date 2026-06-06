#!/bin/bash

################################################################################
# Secure To-Do Application - Clean Script
# Deep clean - remove all containers, volumes, and images
# WARNING: This will delete all data!
################################################################################

YELLOW='\033[1;33m'
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${RED}╔════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${RED}║                     ⚠️  WARNING ⚠️                             ║${NC}"
echo -e "${RED}║  This will DELETE all containers, volumes, and images!        ║${NC}"
echo -e "${RED}║  All database data will be lost!                              ║${NC}"
echo -e "${RED}╚════════════════════════════════════════════════════════════════╝${NC}\n"

read -p "Type 'yes' to continue: " confirm

if [ "$confirm" != "yes" ]; then
    echo -e "${YELLOW}Cancelled${NC}"
    exit 0
fi

cd "$(dirname "$0")"

echo -e "${YELLOW}Stopping services...${NC}"
docker-compose down -v

echo -e "${YELLOW}Removing all Docker containers...${NC}"
docker container prune -f

echo -e "${YELLOW}Removing all unused images...${NC}"
docker image prune -af

echo -e "${YELLOW}Removing all volumes...${NC}"
docker volume prune -f

echo -e "${YELLOW}Deep cleaning...${NC}"
docker system prune -af

echo -e "\n${GREEN}✓ Complete cleanup done!${NC}"
echo -e "${YELLOW}Run ${BLUE}./setup.sh${NC} again to reinstall\n"
