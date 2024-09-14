#!/bin/bash

# Check if .env.example file exists
if [ ! -f .env.example ]; then
  echo ".env.example file not found!"
  exit 1
fi

# Read the content of .env.example
env_content=$(cat .env.example)

# Write the content to .env file
echo "$env_content" > .env

docker network create platform

docker volume create pg_data

docker volume create redis_data



# Run docker-compose to instantiate the service
docker-compose up -d
