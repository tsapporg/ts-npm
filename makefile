install:
	if [ -d ../ts-npm ]; then \
		npm install -g ../ts-npm; \
	else \
		npm install -g tsapporg/ts-npm; \
	fi;

	ts-npm install

tests:
	make package

	node ./dist/index.cjs --action=install \
		--absolute-path-to-dependencies=$(shell pwd)/.npm

	node ./dist/index.cjs --action=install \
		--absolute-path-to-dependencies=$(shell pwd)/

package:
	npx shx rm -rf ./dist
	npx tsc --project ./config/tsconfig.package.json
	npx esbuild ./src/index.ts \
		--platform=node --bundle --target=node18 --outfile=./dist/index.cjs

superclean:
	npx shx rm -f ./dist
	npx shx rm -f ./package-lock.json
	npx shx rm -f ./package.json
	npx shx rm -rf node_modules
	find ./packages -name "node_modules" -type d -prune -exec rm -rf '{}' +
