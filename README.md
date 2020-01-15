# Parse Cloud Code
If you are using this library, make sure the [@aacassandra/parse-lib](https://github.com/aacassandra/parse-lib) has installed on your project

## Usage
On your parse server, you must install this plugin:

``` npm i @aacassandra@parse-cloud-code```

next, on your cloud code file, for example my cloud code file available in ./cloud/main.js

paste this code in your main.js file

``` 
var ParseCloud = require("@aacassandra/parse-cloud-code");

Parse.Cloud.define("cloud", async request => {
  return new Promise(resolve => {
    ParseCloud(Parse, request, callback => {
      resolve(callback);
    });
  });
});
```

## Example Call Function
on your project, don't forget to installing [@aacassandra/parse-lib](https://github.com/aacassandra/parse-lib) and 
```
export { ParseCloudUpdateUser, ParseCloudUpdate } from '@aacassandra/parse-lib'

and follow function code suggestion (vscode recommended) for more available parameter
```

