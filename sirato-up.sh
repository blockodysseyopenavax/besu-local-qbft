cd sirato-free/docker-compose

# besu network rpc endpoint (currently bootnode's rpc connected to host)
# see https://github.com/web3labs/sirato-free/tree/master/docker-compose#readme
case $(uname -s) in
  Linux*) RPC_HOST=172.16.239.1;;
  Darwin*) RPC_HOST=host.docker.internal;;
  *) RPC_HOST=host.docker.internal;;
esac
NODE_ENDPOINT=http://${RPC_HOST}:8545
# sirato port (default 80)
PORT=80
# run sirato
NODE_ENDPOINT=${NODE_ENDPOINT} PORT=${PORT} docker compose up -d