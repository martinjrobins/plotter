# plotter

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and deploy to github pages
$ npm run generate_ghpages
$ npm run deploy

# build for production and deploy to a docker image
$ npm run generate_docker
$ docker build --tag plotter:1.0 .
$ docker run --publish 5001:5001 --env INSTANCE_ID=<instanceID> --name plot plotter:1.0
```
