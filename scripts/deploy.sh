echo "Deploying to GitHub pages...";
git branch -D gh-pages;
git checkout -b gh-pages;
react-scripts build;
cp -r build/* .;
git add .;
git commit -m "Deploy";
git push --force;
git checkout main;
