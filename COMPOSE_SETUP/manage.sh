#!/bin/bash
##
 # @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 # @Date: 2025-08-19T09:00:41-03:00
 # @Last modified by: Pablo Benito <pelicanorojo>
 # @Last modified time: 2025-08-21T02:44:40-03:00
 ##

# Management script for Docker Compose setup
# chmod 700 manage.sh
# TODO: general devlop permissions
# TODO: general container users and permissions
# TODO: enhance package.json scripts, flow there etc
set -euo pipefail # exit if error, undefined variable or pipeline failured

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

info() { echo -e "${GREEN}[INFO]${NC} $1"; }
warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
error() { echo -e "${RED}[ERROR]${NC} $1"; }

# Check if we're in the right directory
if [ ! -f "docker-compose.yml" ] || [ ! -f ".env.local" ]; then
    error "docker-compose.yml or .env.local not found"
    exit 1
fi

# Load environment variables from .env.local file
if [ -f .env.local ]; then
    set -a
    . .env.local #POSIX source
    set +a
    echo "Loaded variables from .env.local file"
else
    echo "Warning: .env file not found at .env.local"
fi

# Setup directories and permissions
dbSetup() {
    info "Setting up directories..."
    #TODO: **** create a user, and set the permissions for this user. ***
    chmod 655 ./postgres-init.sh
    chmod 655 ./pgusers-init.sh
    chmod 644 ./init.sql.template    
    info "Made shs executable"
    
    info "Setup complete"
}

# Clean everything about db
dbClean() {
    info "Cleaning up everything about db ..."
 
    rm -rf ./aux/*
    rm -rf ./temporal/*
    
    info "Cleanup complete"
}

npmAndPrismaInstallGenerate() {
    # Docker Quick Dependencies Installation
    # Run from COMPOSE_SETUP directory
    # Only handles npm packages (OS already updated in image)

    echo "⚡ Starting npm dependencies installation..."

    # Clean install dependencies (fast)
    echo "📦 Installing npm packages..."
    docker compose --env-file .env.local exec -T nextjs npm ci # --verbose

    # Generate Prisma client
    echo "🗄️  Generating Prisma client..."
    docker compose --env-file .env.local exec -T nextjs npx prisma generate # --verbose

    echo "✅ Quick installation complete! (~20 seconds)"
    echo "💡 You can now run: npm run nx:dev"
}

# npm commands
npmCheatSheet() {
cat << 'EOF'
npm run help       # Show this help

# DB alone stuff
npm run db:setup   # creates directories and sets permissions, runs only once when create the db, leaves the db running
npm run db:start   # starts the db, for frequent start / stop after the setup, so you have the db users migrator and app user craeated
npm run db:stop    # stops the db, for frequent start / stop after the setup
npm run db:check   # checks if the db is running, useful to check if the db is running before running the app
npm run db:psql    # Connects to the db with psql, useful to check if the db is running and to run psql commands
npm run psqlHelp   # Prints a PSQL cheatsheet
npm run db:clean   # cleans up volumes and containers, use with care, removes all data

# node service alone
npm run nx:start   # starts the nextjs app, for frequent start / stop after the setup
npm run nx:stop    # stops the nextjs app, for frequent start / stop after the setup
npm run nx:setup   # runs only started the first time, installs npm packages and generates prisma client -- idenpotent both right?
npm run nx:sh      # runs a bash shell inside the nextjs container, useful to run npm commands inside the container
npm run nx:pris:mig # runs prisma migrate dev inside the nextjs container, useful to run migrations during development
npm run prismaCheatSheet # prints a prisma migrate dev/deploy cheatsheet


npm run docker:up      # starts db & nextjs

npm run docker:install # ~20 seconds (just npm packages)
npm run docker:dev     # Ready!

TIPS:
keep the same node version on the container and on the host (.nvmrc)
  so, the intelligence works well with IDEs.
EOF
}

# Show some psql commands
dbPSqlCheatSheet() {
cat << 'EOF'

PSQL CHEATSHEET
0. Connect to PostgreSQL: npm run db:psqlCS
1. List all databases: \l
2. Connect to a database: \c database_name
3. List schemas in current database: \dn
4. List tables in current schema:  \dt
5. List tables in specific schema: \dt schema_name.*
6. Show table structure (metadata): \d table_name
7. Show detailed table info: \d+ table_name
8. Basic SQL query: SELECT * FROM table_name LIMIT 10;
9. Show all sequences: \ds
10. Show all views: \dv
11. List users: \du
12. Show current user: SELECT current_user;
13. Show current database: SELECT current_database();
14. Show current schema: SELECT current_schema();
BONUS:
\x      - Toggle expanded display
\?      - Show psql help  
\q      - Quit psql
\timing - Toggle query timing
EOF
}

prismaCheatSheet() {
cat << 'EOF'
Key differences between migrate dev/deploy:
prisma migrate dev (development):

✅ Creates new migrations from schema changes
✅ Applies migrations to database
✅ Regenerates Prisma client automatically
✅ Resets database if migration history conflicts
❌ Only for development - not safe for production data

prisma migrate deploy (production):

✅ Only applies existing migrations (no new ones created)
✅ Safe for production - won't reset/lose data
✅ Fails safely if migrations conflict
❌ Doesn't generate client (run prisma generate separately)
❌ Won't create new migrations from schema changes
EOF
}

case "${1:-}" in
    dbSetup) dbSetup ;;
    dbClean) dbClean ;;
    dbPSqlCheatSheet) dbPSqlCheatSheet ;;
    npmCheatSheet) npmCheatSheet ;;
    prismaCheatSheet) prismaCheatSheet ;;
    npmAndPrismaInstallGenerate) npmAndPrismaInstallGenerate ;;
    *) error "Unknown command: $1"; help; exit 1 ;;
esac
