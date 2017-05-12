HR = \n---------------------------------------------
HEADER = ---------------------------------------------\n _____  _    _ _       _____         _____   \n|  __ \| |  | | |     / ____|  /\   |  __ \  \n| |__) | |  | | |    | (___   /  \  | |__) | \n|  ___/| |  | | |     \___ \ / /\ \ |  _  /  \n| |    | |__| | |____ ____) / ____ \| | \ \  \n|_|     \____/|______|_____/_/    \_\_|  \_\ \n\n---------------------------------------------
CHECK=\033[32m✔\033[39m

SASSLINTVER = 0.44.0
BUILD := build

build:
	@ echo "${HEADER}"

	@ echo "Installing Composer and its dependencies...${HR}\n"
	@ curl -sS https://getcomposer.org/installer | php -d detect_unicode=Off
	@ php composer.phar install
	@ echo "\n${CHECK} Done"

	@ echo "${HR}\nInstalling Homebrew...${HR}\n"
	yes '' | ruby -e "$$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
	@ echo "\n${CHECK} Done"

	@ echo "${HR}\nInstalling Ansible...${HR}\n"
	@ -brew install ansible
	@ echo "\n${CHECK} Done"

	@ echo "${HR}\nInstalling Vagrant...${HR}\n"
	@ -brew cask install vagrant
	@ echo "\n${CHECK} Done"

	@ echo "${HR}\nInstalling Virtualbox...${HR}\n"
	@ -brew cask install virtualbox
	@ echo "\n${CHECK} Done"

	@ echo "${HR}\nInstalling Ruby...${HR}\n"
	@ -brew install ruby
	@ echo "\n${CHECK} Done"

	@ echo "${HR}\nInstalling scss-lint...${HR}\n"
	@ gem install scss_lint -v ${SASSLINTVER} --no-ri --no-rdoc
	@ echo "\n${CHECK} Done"

	@ echo "${HR}\nInstalling PhantomJS...${HR}\n"
	@ -brew install phantomjs
	@ echo "\n${CHECK} Done"

	@ echo "${HR}\nInstalling ImageMagick...${HR}\n"
	@ -brew install imagemagick
	@ echo "\n${CHECK} Done"

	@ echo "${HR}\nInstalling Wraith...${HR}\n"
	@ gem install wraith --no-ri --no-rdoc
	@ echo "\n${CHECK} Done"

	@ echo "${HR}\nInstalling Node & NPM...${HR}\n"
	@ -brew install node
	@ npm install -g npm
	@ echo "\n${CHECK} Done"

	@ echo "${HR}\nInstalling Bower and its dependencies...${HR}\n"
	@ npm install -g bower
	@ bower install
	@ echo "\n${CHECK} Done"

	@ echo "${HR}\nInstalling Grunt and its libraries...${HR}\n"
	@ npm install -g grunt-cli
	@ npm install
	@ echo "\n${CHECK} Done"

	@ echo "${HR}\nInstalling Git hooks...${HR}"
	@ cp hooks/* .git/hooks/
	@ chmod -R u+x .git/hooks/*
	@ echo "\n${CHECK} Done"

	@ echo "${HR}\nCopy Proxima Nova (if available)...${HR}"
	@ mkdir -p ./fonts
	@ touch ./fonts/_config.fonts.scss
	@ cp -r ../pulsar-fonts/src/* ./fonts 2>/dev/null || :
	@ git update-index --skip-worktree fonts/_config.fonts.scss
	@ echo "\n${CHECK} Done"

	@ echo "${HR}\nCompiling the stylesheets...${HR}\n"
	@ grunt sass:dev
	@ echo "${CHECK} Done\n"

	@ echo "Run 'vagrant up' start the VM."
	@ echo "Run 'grunt' to watch for Sass changes."
	@ echo "If you have issues, check the wiki page: https://github.com/jadu/pulsar/wiki/Make-errors"
