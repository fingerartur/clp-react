echo "Unlinking"

# Unlink prestoplay-react-components from this repo
yarn unlink @castlabs/prestoplay-react-components

# Unlink this repo's libs from prestoplay-react-components
# to avoid two instances
yarn --cwd "../prestoplay-react-components" unlink react
yarn --cwd "../prestoplay-react-components" unlink react-dom
yarn --cwd "../prestoplay-react-components" unlink @castlabs/prestoplay
