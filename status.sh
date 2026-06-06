#!/bin/bash

################################################################################
# Secure To-Do Application - Status Script
# Check the status of all services
################################################################################

YELLOW='\033[1;33m'
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}════════════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}  Service Status${NC}"
echo -e "${BLUE}════════════════════════════════════════════════════════════════${NC}\n"

cd "$(dirname "$0")"

echo -e "${YELLOW}Container Status:${NC}"
docker-compose ps

echo -e "\n${YELLOW}Checking Service Connectivity:${NC}\n"

# Check Frontend
if curl -s http://localhost:3000 > /dev/null 2>&1; then
    echo -e "  Frontend (3000):      ${GREEN}✓ Running${NC}"
else
    echo -e "  Frontend (3000):      ${RED}✗ Not responding${NC}"
fi

# Check Backend
if curl -s http://localhost:3001/api/health > /dev/null 2>&1; then
    echo -e "  Backend API (3001):   ${GREEN}✓ Running${NC}"
else
    echo -e "  Backend API (3001):   ${RED}✗ Not responding${NC}"
fi

# Check PostgreSQL
if docker-compose exec -T postgres pg_isready -U postgres &> /dev/null; then
    echo -e "  PostgreSQL (5432):    ${GREEN}✓ Running${NC}"
else
    echo -e "  PostgreSQL (5432):    ${RED}✗ Not responding${NC}"
fi

# Check Grafana
if curl -s http://localhost:3002 > /dev/null 2>&1; then
    echo -e "  Grafana (3002):       ${GREEN}✓ Running${NC}"
else
    echo -e "  Grafana (3002):       ${RED}✗ Not responding${NC}"
fi

# Check Jenkins
if curl -s http://localhost:8080 > /dev/null 2>&1; then
    echo -e "  Jenkins (8080):       ${GREEN}✓ Running${NC}"
else
    echo -e "  Jenkins (8080):       ${RED}✗ Not responding${NC}"
fi

# Check Mailhog
if curl -s http://localhost:8025 > /dev/null 2>&1; then
    echo -e "  Mailhog (8025):       ${GREEN}✓ Running${NC}"
else
    echo -e "  Mailhog (8025):       ${RED}✗ Not responding${NC}"
fi

echo -e "\n${YELLOW}Disk Usage:${NC}"
docker system df

echo -e "\n"
