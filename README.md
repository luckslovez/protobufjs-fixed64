protobuf.js version: 7.1.2

I have a proto message with a single field `fixed64`. For certain numbers, there is a missmatch between the encoded and decoded objects.

I've created [this repo](https://github.com/luckslovez/protobufjs-fixed64) as reference, to execute it just run
```sh
$ npm i
$ node index.js
```
It contains an `awesome.proto` and `index.js` files. 

```proto
// awesome.proto
syntax = "proto3";
package awesomepackage;

message AwesomeMessage {
  fixed64 awesome_num = 1;
}
```
```js
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
```
Why is there a missmatch in `awesomeNum`? Is that expected? What am I missing?

In case it is of any help, this is how the generated `AwesomeMessage#encode` looks like:
```js
(function anonymous(Writer,types,util
) {
return function AwesomeMessage$encode(m,w){
  if(!w)
  w=Writer.create()
  if(m.awesomeNum!=null&&Object.hasOwnProperty.call(m,"awesomeNum"))
  w.uint32(9).fixed64(m.awesomeNum)
  return w
}
})
```
Should not that `uint32` be an `uint64`?

Any help will be much appreciated! Thanks for this awesome library!

