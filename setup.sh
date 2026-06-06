#!/bin/bash

################################################################################
# Secure To-Do Application - Ubuntu Setup Script
# This script installs all prerequisites and configures the system
################################################################################

set -e

YELLOW='\033[1;33m'
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}════════════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}  Secure To-Do Application - Ubuntu Setup${NC}"
echo -e "${BLUE}════════════════════════════════════════════════════════════════${NC}\n"

# Check if running on Ubuntu/Debian
if ! grep -q "Ubuntu\|Debian" /etc/os-release; then
    echo -e "${RED}✗ This script is designed for Ubuntu/Debian systems${NC}"
    exit 1
fi

echo -e "${YELLOW}Step 1: Updating system packages...${NC}"
sudo apt-get update
sudo apt-get upgrade -y

echo -e "${YELLOW}Step 2: Installing Docker...${NC}"
if ! command -v docker &> /dev/null; then
    sudo apt-get install -y apt-transport-https ca-certificates curl software-properties-common
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
    sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
    sudo apt-get update
    sudo apt-get install -y docker-ce docker-ce-cli containerd.io
    sudo systemctl start docker
    sudo systemctl enable docker
    echo -e "${GREEN}✓ Docker installed${NC}"
else
    echo -e "${GREEN}✓ Docker already installed${NC}"
fi

echo -e "${YELLOW}Step 3: Installing Docker Compose...${NC}"
if ! command -v docker-compose &> /dev/null; then
    sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
    echo -e "${GREEN}✓ Docker Compose installed${NC}"
else
    echo -e "${GREEN}✓ Docker Compose already installed${NC}"
fi

echo -e "${YELLOW}Step 4: Installing Node.js and npm...${NC}"
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt-get install -y nodejs
    echo -e "${GREEN}✓ Node.js installed${NC}"
else
    echo -e "${GREEN}✓ Node.js already installed${NC}"
fi

echo -e "${YELLOW}Step 5: Installing Git...${NC}"
if ! command -v git &> /dev/null; then
    sudo apt-get install -y git
    echo -e "${GREEN}✓ Git installed${NC}"
else
    echo -e "${GREEN}✓ Git already installed${NC}"
fi

echo -e "${YELLOW}Step 6: Setting up Docker permissions for current user...${NC}"
if ! groups $USER | grep -q docker; then
    sudo usermod -aG docker $USER
    echo -e "${GREEN}✓ User added to docker group (restart terminal for changes to take effect)${NC}"
else
    echo -e "${GREEN}✓ User already in docker group${NC}"
fi

echo -e "${YELLOW}Step 7: Verifying Docker socket...${NC}"
if [ -S /var/run/docker.sock ]; then
    echo -e "${GREEN}✓ Docker socket available${NC}"
else
    echo -e "${RED}✗ Docker socket not found${NC}"
    exit 1
fi

echo -e "${YELLOW}Step 8: Building backend application...${NC}"
cd "$(dirname "$0")"
if [ -d "backend" ]; then
    cd backend
    npm install --legacy-peer-deps
    npm run build
    cd ..
    echo -e "${GREEN}✓ Backend built successfully${NC}"
else
    echo -e "${RED}✗ Backend directory not found${NC}"
    exit 1
fi

echo -e "${YELLOW}Step 9: Verifying docker-compose.yml...${NC}"
if [ -f "docker-compose.yml" ]; then
    echo -e "${GREEN}✓ docker-compose.yml found${NC}"
else
    echo -e "${RED}✗ docker-compose.yml not found${NC}"
    exit 1
fi

echo -e "\n${BLUE}════════════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}✓ Setup completed successfully!${NC}"
echo -e "${BLUE}════════════════════════════════════════════════════════════════${NC}\n"

echo -e "${YELLOW}Next steps:${NC}"
echo -e "  1. Run: ${BLUE}./start.sh${NC}"
echo -e "  2. Wait for services to start (2-3 minutes)"
echo -e "  3. Access the application:"
echo -e "     - Frontend: ${BLUE}http://localhost:3000${NC}"
echo -e "     - Backend API: ${BLUE}http://localhost:3001/api${NC}"
echo -e "     - Grafana: ${BLUE}http://localhost:3002${NC}"
echo -e "     - Jenkins: ${BLUE}http://localhost:8080${NC}"
echo -e "     - Mailhog (emails): ${BLUE}http://localhost:8025${NC}\n"

echo -e "${YELLOW}Admin credentials:${NC}"
echo -e "  Email: ${BLUE}admin@example.com${NC}"
echo -e "  Password: ${BLUE}admin123${NC}\n"

echo -e "${YELLOW}For help, run: ${BLUE}./help.sh${NC}\n"
