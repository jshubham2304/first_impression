#!/bin/bash

# This script installs all necessary dependencies and then starts the development server.

# Exit immediately if a command exits with a non-zero status.
set -e

# Install npm dependencies
echo "Installing dependencies..."
npm install

# Run the development server
echo "Starting the development server..."
npm run dev
