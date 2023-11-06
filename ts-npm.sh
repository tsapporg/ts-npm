#!/bin/bash
# TODO the "install" command is default and the only action you can invoke for now.

cwd=$(pwd)
echo "Running ts-npm in $cwd, got args:"
printf '%s\n' "$*"

bin_dir=$( cd -- "$(dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd)
echo "npm bin dir: $bin_dir"

lib_dir=$(echo $bin_dir | sed s/bin/lib/g)
lib_dir="$lib_dir/node_modules/ts-npm"
echo "npm lib dir: $lib_dir"

# TODO this can not be how global install works.
cd $lib_dir
npm install $lib_dir
cd $cwd 

#npm_config_yes=true npx ts-node --project "$lib_dir/tsconfig.json" "$lib_dir/src/main.ts"
node $lib_dir/dist/index.cjs $@
npm install