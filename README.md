# forex-quotes-frontend-nodejs

Forex realtime quotes for website.

This projects is based on [node-mt4-zmq-bridge](https://github.com/bonnevoyager/node-mt4-zmq-bridge) node.js library.

It's a Node.js and [MetaTrader 4](https://www.metatrader4.com/) communication bridge with [ZeroMQ](http://zeromq.org/).

### Installation

1. Install [mql-zmq](https://github.com/dingmaotu/mql-zmq) on MT4

2. Install [MetaTrader 4 Bridge](https://github.com/bonnevoyager/MetaTrader4-Bridge) on MT4

3. Install [node-mt4-zmq-bridge](https://github.com/BonneVoyager/node-mt4-zmq-bridge/) on Node.js

```
      npm install --save mt4-zmq-bridge
```

### Usage

Change  URL to REQ server  and  URL to PULL server with your own
###### Example
```js
const zmqBridge = mt4zmqBridge.connect('tcp://127.0.0.1:5555', 'tcp://127.0.0.1:5556');
```

Run server.js on node.js






