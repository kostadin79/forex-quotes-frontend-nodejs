const mt4zmqBridge = require('mt4-zmq-bridge');
const async = require('async');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');


let zmqBridge;
const updatePeriod = 2000;
const quotesContainer = {
    EURUSD: {
        rates: []
    },
    GBPUSD: {
        rates: []
    },
    USDJPY: {
        rates: []
    },
    EURGBP: {
        rates: []
    }
};

return new Promise((resolve, reject) => {
    const socketIsReady = () => {
        if (zmqBridge.reqConnected && zmqBridge.pullConnected) {
            resolve()
        }
    };
    zmqBridge = mt4zmqBridge.connect('tcp://172.16.14.109:5555', 'tcp://172.16.14.109:5556');
    zmqBridge.reqSocket.on('connect', socketIsReady);
    zmqBridge.pullSocket.on('connect', socketIsReady);
}).then(() => {
    const codes = ['USDJPY', 'EURUSD', 'GBPUSD', 'EURGBP'];
    
    setInterval(() => {
        async.eachSeries(codes, (value, callback) => {
            zmqBridge.request(mt4zmqBridge.REQUEST_RATES, value)
                .then((res) => {
                    if (quotesContainer[value].rates.length > 1) {
                        quotesContainer[value].rates.shift()
                    }
                    quotesContainer[value].rates.push(res[0]);
                    callback()
                })
        })
    }, updatePeriod);

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    const port = process.env.PORT || 8080;
    const router = express.Router();
    router.use((req, res, next) => {
        if (quotesContainer[codes[0]].rates.length < 2) {
            return res.status(404).send({
                message: "Wait!"
            })
        }
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.setHeader('Access-Control-Allow-Methods', 'GET');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        console.log('In the middleware something is happening-->');
        next()
    });
    router.get('/', (req, res) => {
        res.json(quotesContainer)
    });
    app.use('/rates', router);
    app.listen(port);
    console.log('Magic happens on port ' + port)
    //close  socket
    //     zmqBridge.reqSocket.close()
    //     zmqBridge.pullSocket.close()
}, err => {
    console.log('error:', err)
});
