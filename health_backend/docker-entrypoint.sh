#!/bin/bash
set -e

echo "Waiting for Postgres..."
while ! pg_isready -h "$DATABASE_HOST" -p "$DATABASE_PORT" -U "$DATABASE_USERNAME" > /dev/null 2>&1; do
  sleep 1
done
echo "Postgres is ready!"

# Run database setup safely
echo "Running migrations..."
bundle exec rails db:migrate 2>/dev/null || bundle exec rails db:setup

echo "Starting Rails server..."
exec bundle exec rails server -b 0.0.0.0 -p ${PORT:-3000}
