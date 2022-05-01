@rem cleanup
docker-compose down

@rem build
docker build -t systems/node:latest -f Dockerfile.node .
docker build -t systems/proxy:latest -f Dockerfile.proxy .

@rem run
docker-compose up -d