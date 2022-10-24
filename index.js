// index.js
const protobuf = require('protobufjs');
const long = require('long');

protobuf.load("awesome.proto", function (err, root) {
    const AwesomeMessage = root.lookupType("awesomepackage.AwesomeMessage");
    const awesomeNum = long.fromString("1666189808901000000");
    const payload = {awesomeNum};

    const message = AwesomeMessage.create(payload);
    console.log(JSON.stringify(message)); //output: { awesomeNum: 1666189808901000000 }

    const buffer = AwesomeMessage.encode(message).finish();

    const decodedMessage = AwesomeMessage.decode(buffer);
    console.log(JSON.stringify(decodedMessage)); //output: { awesomeNum: 1666189808901000000 }
    // ALL GOOD! https://github.com/protobufjs/protobuf.js/issues/1827
});