HR = \n---------------------------------------------
HEADER = ---------------------------------------------\n _____  _    _ _       _____         _____   \n|  __ \| |  | | |     / ____|  /\   |  __ \  \n| |__) | |  | | |    | (___   /  \  | |__) | \n|  ___/| |  | | |     \___ \ / /\ \ |  _  /  \n| |    | |__| | |____ ____) / ____ \| | \ \  \n|_|     \____/|______|_____/_/    \_\_|  \_\ \n\n---------------------------------------------
CHECK=\033[32m✔\033[39m

BUILD := build

build:
	@ echo "${HEADER}"

	@ echo "Installing Composer and its dependencies...${HR}\n"
	@ sudo curl -sS https://getcomposer.org/installer | php -d detect_unicode=Off
	@ sudo php composer.phar install
	@ echo "\n${CHECK} Done"

	@ echo "${HR}\nInstalling Homebrew and its dependencies...${HR}\n"
	@ ruby -e "$(curl -fsSL https://raw.github.com/mxcl/homebrew/go)"
	@ brew install phantomjs
	@ echo "\n${CHECK} Done"

	@ echo "${HR}\nInstalling Bower and its dependencies...${HR}\n"
	@ sudo npm install -g bower
	@ bower install
	@ echo "\n${CHECK} Done"

	@ echo "${HR}\nInstalling Grunt and it's libraries...${HR}\n"
	@ sudo npm install -g grunt-cli
	@ npm install
	@ echo "\n${CHECK} Done"

	@ echo "${HR}\nInstalling Git hooks...${HR}"
	@ cp hooks/* .git/hooks/
	@ chmod -R u+x .git/hooks/*
	@ echo "\n${CHECK} Done\n"

	@ echo "Run 'grunt' to start the documentation server and 'grunt watch' to monitor for Sass changes."

clean:
	@ echo "${HEADER}"
	@ echo "Removing Composer packages...${HR}"
	@ rm -rf vendor/*
	@ echo "\n${CHECK} Done"

	@ echo "${HR}\nRemoving front-end libraries...${HR}"
	@ rm -rf libs/*
	@ echo "\n${CHECK} Done"

	@ echo "${HR}\nRemoving GIT hooks...${HR}"
	@ rm -rf .git/hooks/*
	@ echo "\n${CHECK} Done\n"	
