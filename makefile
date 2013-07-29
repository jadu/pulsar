HR = \n---------------------------------------------
HEADER = ---------------------------------------------\n _____  _    _ _       _____         _____   \n|  __ \| |  | | |     / ____|  /\   |  __ \  \n| |__) | |  | | |    | (___   /  \  | |__) | \n|  ___/| |  | | |     \___ \ / /\ \ |  _  /  \n| |    | |__| | |____ ____) / ____ \| | \ \  \n|_|     \____/|______|_____/_/    \_\_|  \_\ \n\n---------------------------------------------
CHECK=\033[32m✔\033[39m

BUILD := build

build:
	@ echo "${HEADER}"
	@ echo "Installing front-end dependencies...${HR}"
	@ echo "Installing Sass..."
		@ gem install sass
		@ gem install --version "~> 0.9" rb-fsevent
	@ echo "\n${CHECK} Done"

	@ echo "${HR}\nInstalling front-end libraries...${HR}"
	@ bower install
	@ echo "\n${CHECK} Done\n"

	@ echo "Use 'make start' to watch for Sass changes"

clean:
	@ echo "${HEADER}"
	@ echo "Removing front-end libraries...${HR}"
	@ rm -rf libs/*
	@ echo "\n${CHECK} Done\n"

start:
	@ echo "${HEADER}"
	@ echo "Start watching Sass directories...${HR}"
	@ sudo sass --watch stylesheets:css
