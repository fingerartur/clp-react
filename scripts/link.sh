echo "Link to a local version of prestoplay-react-components"

# Link prestoplay-react-components into this repo
yarn link @castlabs/prestoplay-react-components

# Link this repo's libs into prestoplay-react-components
# to avoid two instances
yarn --cwd "../prestoplay-react-components" link react
yarn --cwd "../prestoplay-react-components" link react-dom
yarn --cwd "../prestoplay-react-components" link @castlabs/prestoplay
