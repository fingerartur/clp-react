echo "Initializing yarn links"

yarn --cwd "../prestoplay-react-components" link

yarn --cwd node_modules/react link
yarn --cwd node_modules/react-dom link
yarn --cwd node_modules/@castlabs/prestoplay link
