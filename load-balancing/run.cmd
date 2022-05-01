@rem cleanup
docker-compose down

@rem build
docker build -t systems/loadbal-server:latest -f Dockerfile.node .
docker build -t systems/loadbalencer:latest -f Dockerfile.loadbalencer .

@rem run
docker-compose up -d