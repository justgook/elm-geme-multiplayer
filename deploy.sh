#!/usr/bin/env bash

set -eu

repo_uri="https://x-access-token:${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}.git"
remote_name="origin"
#main_branch="release"
target_branch="gh-pages"
build_dir="target"
temp_dir="$GITHUB_WORKSPACE/temp"

#Get last tag
current_tag="$(git describe --abbrev=0)"

mkdir -p "$temp_dir/$current_tag"
cd "$temp_dir"
git init .

#fetch data
git remote add "$remote_name" "$repo_uri"
git fetch "$remote_name" "$target_branch"
git checkout "$target_branch"

#Clean up current snapshots
rm -rf ./*-snap

#Move new build
mv "$GITHUB_WORKSPACE/$build_dir" "$temp_dir/$current_tag"

#Update redirect url
sed -i'' -e "s/\/[^\/]*\/browser.html/\/$current_tag\/browser.html/g" 404.html

#Commit and deploy
git config user.name "$GITHUB_ACTOR"
git config user.email "${GITHUB_ACTOR}@bots.github.com"
git commit -am "Deploy: $(git log --oneline --format=%B -n 1 HEAD | head -n 1)"
if [ $? -ne 0 ]; then
    echo "nothing to commit"
    exit 0
fi

git remote set-url "$remote_name" "$repo_uri" # includes access token
git push --force-with-lease "$remote_name" "$target_branch"