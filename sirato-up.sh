# spin up a Sirato instance connected to besu-dev
# https://github.com/web3labs/sirato-free/tree/master/docker-compose#readme

# set sirato env
case $(uname -s) in
  Linux*) RPC_HOST=172.16.239.1;;
  Darwin*) RPC_HOST=host.docker.internal;;
  *) RPC_HOST=host.docker.internal;;
esac

# run sirato
NODE_ENDPOINT="http://${RPC_HOST}:8545" PORT=8080 \
  docker compose -f sirato-free/docker-compose/docker-compose.yml up