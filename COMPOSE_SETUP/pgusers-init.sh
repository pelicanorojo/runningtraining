#!/bin/sh

# Simple script to process init.sql template
set -euo pipefail # exit if error, undefined variable or pipeline failured

echo "Processing init.sql template..."

# Load environment variables from .env file
if [ -f /config/.env ]; then
    set -a
    . /config/.env
    set +a
    echo "Loaded variables from root .env file"
else
    echo "Warning: .env file not found at /config/.env"
fi

# Validate required variables, if some empty or unset => exit
if [ -z "$APP_DB_NAME" ] || [ -z "$POSTGRES_MIGRATION_USER" ] || [ -z "$POSTGRES_APP_USER" ]; then
    echo "ERROR: Missing required environment variables"
    echo "  APP_DB_NAME: $([ -n "$APP_DB_NAME" ] && echo "OK" || echo "EMPTY")"
    echo "  POSTGRES_MIGRATION_USER: $([ -n "$POSTGRES_MIGRATION_USER" ] && echo "OK" || echo "EMPTY")"
    echo "  POSTGRES_APP_USER: $([ -n "$POSTGRES_APP_USER" ] && echo "OK" || echo "EMPTY")"
    exit 1
fi

echo "Using configuration:"
echo "  APP_DB_NAME"
echo "  POSTGRES_MIGRATION_USER"
echo "  POSTGRES_APP_USER"

# Process template - replace variables
sed \
    -e "s/\${APP_DB_NAME}/$APP_DB_NAME/g" \
    -e "s/\${POSTGRES_MIGRATION_USER}/$POSTGRES_MIGRATION_USER/g" \
    -e "s/\${POSTGRES_MIGRATION_PASSWORD}/$POSTGRES_MIGRATION_PASSWORD/g" \
    -e "s/\${POSTGRES_APP_USER}/$POSTGRES_APP_USER/g" \
    -e "s/\${POSTGRES_APP_PASSWORD}/$POSTGRES_APP_PASSWORD/g" \
    /compose-setup/init.sql.template > /temporal/init.sql

# Verify file was created
if [ ! -f /temporal/init.sql ]; then
    echo "ERROR: Failed to create init.sql"
    exit 1
fi

chmod 644 /temporal/init.sql

echo "Successfully generated init.sql"
echo "Generated file:"
echo "---------------"
## yes Claude, lets log the credentials.... cat /temporal/init.sql
echo "---------------"