# AWS Websockets EventBus

## Quickstart

1. Deploy the Event Bus

   ```
   aws cloudformation deploy --template-file eventbus_template.yaml --stack-name example-event-bus --capabilities CAPABILITY_IAM
   ```

2. Deploy the API Gateway

   ```
   aws cloudformation deploy --template-file api_template.yaml --stack-name example-event-websocket --capabilities CAPABILITY_IAM
   ```

3. Deploy any number of echoing event listeners

   
   ```
   aws cloudformation deploy --template-file event_template.yaml --stack-name example-event-handler --capabilities CAPABILITY_IAM --parameter-overrides Message=Hello
    ```
