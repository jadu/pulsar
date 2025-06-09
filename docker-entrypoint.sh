#!/bin/bash
set -e

# Only run these commands if we're starting Apache
if [ "$1" = 'apache2-foreground' ]; then
    echo "Running initial setup..."
    
    # Check if composer.json exists and run composer install
    if [ -f "composer.json" ]; then
        echo "Installing PHP dependencies..."
        composer install --no-interaction --optimize-autoloader
    fi
    
    # Check if package.json exists and run npm install
    if [ -f "package.json" ]; then
        echo "Installing Node.js dependencies..."
        npm install --omit=optional --ignore-scripts
        
        # Run grunt build if available
        if [ -f "Gruntfile.js" ] || [ -f "gruntfile.js" ]; then
            echo "Running grunt build..."
            grunt build
        else
            echo "No Gruntfile found, skipping grunt build."
        fi
    fi
    
    echo "Setup complete, starting Apache..."
fi

# Execute the passed command
exec "$@" 