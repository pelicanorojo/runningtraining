#!/bin/sh
    set -euo pipefail # exit if error, undefined variable or pipeline failured

    # Signal first run point 0
    echo "** ** Checking signal file first_start0 ..."
    if [ ! -f /aux/first_start0 ]; then
        ./compose-setup/pgusers-init.sh
        touch /aux/first_start0
        echo "** ** Done initialization and signal file first_start0 creation ..."
    else
        echo "** ** Already exists signal file first_start0 ..."
    fi

    # Start Postgres manually and run init.sql on (default entrypoint)
    /usr/local/bin/docker-entrypoint.sh postgres &
    PG_PID=$!  # Capture its Process ID

    wait_for_socket() {
        while ! pg_isready -h localhost -U "${POSTGRES_USER}" >/dev/null 2>&1; do
            echo "Waiting for PostgreSQL socket to be ready..."
            sleep 4
        done
        echo "PostgreSQL socket is ready."
    }

    check_table_exists() {
        local table_exists=$(psql -h localhost -U "${POSTGRES_USER}" -d "${POSTGRES_DB}" -t -c "
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_schema = 'public' 
                AND table_name = 'dontdropthisinittable'
            );" | tr -d '[:space:]')
        
        [[ "$table_exists" == "t" ]] && return 0 || return 1
    }

    wait_for_socket

    echo "Checking for table existence..."
    for i in {1..10}; do  # Timeout after 50 seconds
        if check_table_exists; then
            echo "Table public.dontdropthisinittable found!"
            break
        fi
        sleep 5
    done



    # Signal first run point 1
    echo "** ** Checking signal file first_start1 ..."
    if [ ! -f /aux/first_start1 ]; then
        rm -f /temporal/init.sql
        touch /aux/first_start1
        echo "** ** Done initialization and signal file first_start1 creation ..."
    else
        echo "** ** Already exists signal file first_start1 ..."
    fi

    # # Keep the container running
    wait $PG_PID
