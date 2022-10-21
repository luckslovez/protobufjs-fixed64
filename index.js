// index.js
const protobuf = require('protobufjs');

protobuf.load("awesome.proto", function (err, root) {
    const AwesomeMessage = root.lookupType("awesomepackage.AwesomeMessage");
    const payload = {awesomeNum: 1666189808901000000};

    const message = AwesomeMessage.create(payload);
    console.log(JSON.stringify(message)); //output: { awesomeNum: 1666189808901000000 }

    const buffer = AwesomeMessage.encode(message).finish();

    const decodedMessage = AwesomeMessage.decode(buffer);
    console.log(JSON.stringify(decodedMessage)); //output: { awesomeNum: 1666189808900999936 }
});