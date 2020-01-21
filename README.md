# AWS Websockets EventBus

## Quickstart

1. Deploy the Event Bus

   ```
   aws cloudformation deploy --template-file eventbus_template.yaml --stack-name example-event-bus --capabilities CAPABILITY_IAM
   ```

2. Deploy the API Gateway

   ```
   aws cloudformation deploy --template-file api_template.yaml --stack-name example-event-websocket --capabilities CAPABILITY_IAM \
   	--parameter-overrides \
   	  EventBusName=$(aws cloudformation describe-stacks --stack-name example-event-bus --query "Stacks[0].Outputs[?OutputKey=='EventBus'].OutputValue" --output text)
   ```

3. Deploy the Event subscriber/publisher

   
   ```
   aws cloudformation deploy --template-file event_template.yaml --stack-name example-event-handler --capabilities CAPABILITY_IAM \
   	--parameter-overrides \
   	  EventBusName=$(aws cloudformation describe-stacks --stack-name example-event-bus --query "Stacks[0].Outputs[?OutputKey=='EventBus'].OutputValue" --output text) \
   	  ConnectionsUrl=$(aws cloudformation describe-stacks --stack-name example-event-websocket --query "Stacks[0].Outputs[?OutputKey=='ConnectionsUrl'].OutputValue" --output text) \
   	  WebSocketApiArn=$(aws cloudformation describe-stacks --stack-name example-event-websocket --query "Stacks[0].Outputs[?OutputKey=='WebSocketApiArn'].OutputValue" --output text)
    ```
