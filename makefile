install:
	if [ -d ../ts-npm ]; then \
		npm install -g ../ts-npm; \
	else \
		npm install -g tsapporg/ts-npm; \
	fi;

	ts-npm install