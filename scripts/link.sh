echo "Link to a local version of prestoplay-react-components"

yarn --cwd "../prestoplay-react-components" link
yarn link @castlabs/prestoplay-react-components
yarn --cwd node_modules/react link
yarn --cwd node_modules/react-dom link
yarn --cwd "../prestoplay-react-components" link react
yarn --cwd "../prestoplay-react-components" link react-dom
yarn --cwd node_modules/@castlabs/prestoplay link
yarn --cwd "../prestoplay-react-components" link @castlabs/prestoplay
