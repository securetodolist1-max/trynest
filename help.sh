#!/bin/bash

################################################################################
# Secure To-Do Application - Help & Documentation
################################################################################

YELLOW='\033[1;33m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

clear

echo -e "${BLUE}╔════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║                 Secure To-Do Application Guide                 ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════════╝${NC}\n"

echo -e "${CYAN}📋 QUICK START${NC}\n"
echo -e "  1. ${BLUE}./setup.sh${NC}     - Install all prerequisites (run once)"
echo -e "  2. ${BLUE}./start.sh${NC}     - Start all services"
echo -e "  3. Open browser to ${BLUE}http://localhost:3000${NC}\n"

echo -e "${CYAN}🎯 MAIN COMMANDS${NC}\n"
echo -e "  ${BLUE}./start.sh${NC}       - Start all services"
echo -e "  ${BLUE}./stop.sh${NC}        - Stop all services"
echo -e "  ${BLUE}./restart.sh${NC}     - Restart all services"
echo -e "  ${BLUE}./status.sh${NC}      - Check service status"
echo -e "  ${BLUE}./logs.sh${NC}        - View service logs\n"

echo -e "${CYAN}🌐 ACCESS POINTS${NC}\n"
echo -e "  Frontend:      ${BLUE}http://localhost:3000${NC}"
echo -e "  Backend API:   ${BLUE}http://localhost:3001/api${NC}"
echo -e "  Grafana:       ${BLUE}http://localhost:3002${NC} (admin/admin)"
echo -e "  Jenkins:       ${BLUE}http://localhost:8080${NC}"
echo -e "  Mailhog:       ${BLUE}http://localhost:8025${NC} (Email testing)\n"

echo -e "${CYAN}👤 TEST CREDENTIALS${NC}\n"
echo -e "  Admin Email:   ${BLUE}admin@example.com${NC}"
echo -e "  Admin Password: ${BLUE}admin123${NC}"
echo -e "  Note: Admin login bypasses OTP, goes directly to dashboard\n"

echo -e "${CYAN}📧 EMAIL SETUP${NC}\n"
echo -e "  - Uses real Gmail SMTP (${BLUE}kyletaborada3@gmail.com${NC})"
echo -e "  - OTP codes sent to your email during registration"
echo -e "  - Check Mailhog at ${BLUE}http://localhost:8025${NC} for test emails\n"

echo -e "${CYAN}🔧 USEFUL DOCKER COMMANDS${NC}\n"
echo -e "  docker-compose ps              - List running containers"
echo -e "  docker-compose exec backend npm run build  - Rebuild backend"
echo -e "  docker system df               - Check disk usage"
echo -e "  docker-compose logs -f         - Follow all logs\n"

echo -e "${CYAN}🐛 TROUBLESHOOTING${NC}\n"
echo -e "  ${YELLOW}Issue: Port 3000 already in use${NC}"
echo -e "    → ${BLUE}sudo lsof -i :3000${NC}"
echo -e "    → ${BLUE}kill -9 <PID>${NC}\n"

echo -e "  ${YELLOW}Issue: Docker daemon not running${NC}"
echo -e "    → ${BLUE}sudo systemctl start docker${NC}\n"

echo -e "  ${YELLOW}Issue: Permission denied${NC}"
echo -e "    → ${BLUE}sudo chmod +x *.sh${NC}\n"

echo -e "  ${YELLOW}Issue: Services won't start${NC}"
echo -e "    → ${BLUE}./logs.sh backend${NC} to check errors"
echo -e "    → ${BLUE}./stop.sh && ./start.sh${NC} to restart\n"

echo -e "${CYAN}📁 PROJECT STRUCTURE${NC}\n"
echo -e "  backend/          - NestJS API"
echo -e "  frontend/         - React frontend"
echo -e "  docker-compose.yml - Service configuration"
echo -e "  Jenkinsfile       - CI/CD pipeline\n"

echo -e "${CYAN}🚀 PIPELINE STAGES${NC}\n"
echo -e "  1. Code checkout"
echo -e "  2. Backend build & test"
echo -e "  3. Frontend build & test"
echo -e "  4. Docker image build"
echo -e "  5. Security scan"
echo -e "  6. Deploy"
echo -e "  7. Health check\n"

echo -e "${CYAN}💡 TIPS${NC}\n"
echo -e "  • Admin login instant (no OTP)"
echo -e "  • Regular users need OTP to login"
echo -e "  • Grafana shows system metrics"
echo -e "  • Jenkins runs automated tests"
echo -e "  • All services restart automatically after reboot\n"

echo -e "${CYAN}📞 SUPPORT${NC}\n"
echo -e "  Check logs: ${BLUE}./logs.sh <service>${NC}"
echo -e "  Check status: ${BLUE}./status.sh${NC}"
echo -e "  Stop all: ${BLUE}./stop.sh${NC}\n"

echo -e "${BLUE}════════════════════════════════════════════════════════════════${NC}\n"
