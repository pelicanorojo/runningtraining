#!/bin/bash

# Management script for Docker Compose setup
# Run from project root: ./COMPOSE_SETUP/manage.sh [command]
# chmod 700 manage.sh
# chmod 655 postgre-init.sh
# chmod 644 pgusers-init.sh init.sql.template
# TODO: general devlop permissions
# TODO: general container users and permissions
set -euo pipefail # exit if error, undefined variable or pipeline failured

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

info() { echo -e "${GREEN}[INFO]${NC} $1"; }
warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
error() { echo -e "${RED}[ERROR]${NC} $1"; }

# Get to project root (one level up from COMPOSE_SETUP)
#cd "$(dirname "$0")/.."

# Check if we're in the right directory
if [ ! -f "docker-compose.yml" ] || [ ! -f "../.env" ]; then
    error "docker-compose.yml or ../.env not found"
    exit 1
fi

# Load environment variables from .env file
if [ -f ../.env ]; then
    set -a
    . ../.env #POSIX source
    set +a
    echo "Loaded variables from root .env file"
else
    echo "Warning: .env file not found at .env"
fi

# Setup directories and permissions
setup() {
    info "Setting up directories..."
    mkdir -p ${POSTGRE_DATA}/easydrop
    mkdir -p ${COMPOSE_BASE}/aux
    mkdir -p ${COMPOSE_BASE}/temporal
    
    if [ -f "${COMPOSE_BASE}/postgre-init.sh" ]; then
        #TODO: create a user, and set the permissions for this user.
        #TODO, check each file, report if some missed
        chmod 655 ${COMPOSE_BASE}/postgre-init.sh
        chmod 655 ${COMPOSE_BASE}/pgusers-init.sh
        chmod 644 ${COMPOSE_BASE}/init.sql.template    
        #chmod +x ${COMPOSE_BASE}/postgre-init.sh
        info "Made postgre-init.sh executable"
    else
        echo "Wasnt found the scripts postgre-init.sh, pgusers-init.sh and init.sql.template"    
    fi
    
    info "Setup complete"
    info "Directory structure:"
    echo "  ./docker-compose.yml"
    echo "  ./.env"
    echo "  ${POSTGRE_DATA}/easydrop (persistent data)"
    echo "  ${COMPOSE_BASE}/manage.sh"
    echo "  ${COMPOSE_BASE}/postgre-init.sh"
    echo "  ${COMPOSE_BASE}/pgusers-init.sh"
    echo "  ${COMPOSE_BASE}/init.sql.template"
    echo "  ${COMPOSE_BASE}/temporal/ (temporary processed SQL)"
    echo "  ${COMPOSE_BASE}/aux/ (aux signaling files first_start[n])"
}

# Start full stack
start() {
    info "Starting full stack..."
    docker-compose up -d
    info "Stack started"
}

# Stop services
stop() {
    info "Stopping services..."
    docker-compose down
}

# TODO: Check DB connection with migrator and app user

# Clean everything
clean() {
    info "Cleaning up..."
    docker-compose down -v
    docker volume prune -f
    
    # Ask about postgres-data directory
    if [ -d ${POSTGRE_DATA} ] && [ "$(ls -A ${POSTGRE_DATA} 2>/dev/null)" ]; then
        echo ""
        read -p "Do you want to clean the postgres-data directory, aux and temporal content? (y/N): " -n 1 -r
        echo ""
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            echo ""
            read -p "Confirm you want to clean the postgres-data directory, aux and temporal content? (y/N): " -n 1 -r
            echo ""
            if [[ $REPLY =~ ^[Yy]$ ]]; then
                rm -rf ${POSTGRE_DATA}/*
                rm -rf ${COMPOSE_BASE}/aux/*
                rm -rf ${COMPOSE_BASE}/temporal/*
                info "postgres-data directory cleaned"
            else
                warn "postgres-data, aux and temporal directory content kept (contains persistent data), cause no confirmation"
            fi
        else
            warn "postgres-data, aux and temporal directory content kept (contains persistent data)"
        fi
    fi

    #TODO: clean temporal
    #TODO: clean aux
    
    info "Cleanup complete"
}

# Show help
help() {
    echo "Usage: $0 [command]"
    echo ""
    echo "Commands:"
    echo "  setup    - Create directories and set permissions"
    echo "  clean    - Clean up volumes and containers"
   ## do on setup echo "  init     - Run only the init container"
    echo "  start    - Start the full stack (includes auto-cleanup)"
    echo "  stop     - Stop services"
   ## echo "  check    - Show generated SQL status"
   ## echo "  connect  - Connect to database"
    echo "  help     - Show this help"
    echo ""
    echo "Security: init.sql is automatically removed after PostgreSQL starts"
    echo "Note: This script automatically changes to project root directory"
}

case "${1:-}" in
    setup) setup ;;
    #init) init ;;
    clean) clean ;;
    start) start ;;
    stop) stop ;;
    ##check) check ;;
    ##connect) connect ;;
    help|--help|-h|"") help ;;
    *) error "Unknown command: $1"; help; exit 1 ;;
esac
