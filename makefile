install:
	npm install
#ts-npm install

superclean:
	make clean
	npx shx rm -f ./package-lock.json
	npx shx rm -f ./package.json
	npx shx rm -rf node_modules

tests:
	make test/unit 
	make test/functional
test/unit:
	@echo 'TODO'
test/functional:
	@echo 'TODO'