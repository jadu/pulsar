# Use an official PHP runtime as a parent image
FROM php:8.1-apache

# Install required system dependencies
RUN apt-get update && \
    apt-get install -y curl git unzip && \
    rm -rf /var/lib/apt/lists/*

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Install Node.js and npm
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash - && \
    apt-get install -y nodejs

# Set the working directory
WORKDIR /var/www/html

# Copy the application files into the container
COPY . /var/www/html

# Use user's NPM credentials
COPY ~/.npmrc /root/.npmrc

# Install Composer and npm dependencies
RUN composer install --no-dev && npm install

# Command to run when the container starts
CMD ["php", "-a"]