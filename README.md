# PoC Rendering Function

This code was used for a project work for a CAS in 2020.

# Example deployment on openwhisk
## Prerequisites
Your wsk (Apache Whisky Serverless Client) is connected to your OpenWhisk environment.
```
$ wsk -i list
Entities in namespace: default
packages
/whisk.system/messagingWeb                                             private
/whisk.system/messaging                                                shared
...
```

## Deployment

```
$ npm install
...
$ zip -r ../nodejs-getConfig.zip *
...

# -i stands for insecure, depends on your environment if needed
# the first time use "create" instead of "update"
$ wsk -i action update getRenderedConfig --kind nodejs:12 ../nodejs-getConfig.zip
...
```

## Usage
```
# use whisk auth key
export AUTH="..."
# don't forget the port
export APIHOST="192.168.64.2:31001"

curl --insecure -u $AUTH "https://$APIHOST/api/v1/namespaces/_/actions/getRenderedConfig?blocking=true&result=true" -X POST -H "Content-Type: application/json" -d '{"mysql_user": "Philipp2", "mysql_password": "blah", "site_url": "https://next.message.org", "project": "mattermost-team-edition"}'
...
```