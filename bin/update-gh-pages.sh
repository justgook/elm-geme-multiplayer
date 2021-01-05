#!/usr/bin/env bash

set -eu
echo "Define props"
repo_uri="https://x-access-token:${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}.git"
remote_name="origin"
#main_branch="release"
target_branch="gh-pages"
build_dir="target"
temp_dir="$GITHUB_WORKSPACE/temp"

#Get last tag
git fetch --prune --unshallow
current_tag="$(git describe --abbrev=0)"
commit_msg="$(git log --oneline --format=%B -n 1 HEAD | head -n 1)"
echo "Starting build"

mkdir -p "$temp_dir"
cd "$temp_dir"
git init .
#fetch data
git remote add "$remote_name" "$repo_uri"
git fetch "$remote_name" "$target_branch"
git checkout "$target_branch"

#Clean up current snapshots (ignore error if folder not exists)
rm -rf ./*-snap >/dev/null
#Move new build
mv "$GITHUB_WORKSPACE/$build_dir" "$temp_dir/$current_tag"
#Add all file

git add .
#Update redirect url from root folder to fresh version
sed -i'' -e "s/\/[^\/]*\/browser.html/\/$current_tag\/browser.html/g" 404.html

#Commit and deploy
git config user.name "$GITHUB_ACTOR"
git config user.email "${GITHUB_ACTOR}@bots.github.com"

if ! git commit -am "Deploy: $commit_msg"; then
  echo "nothing to commit"
  exit 0
fi

git push --force-with-lease "$remote_name" "$target_branch"
