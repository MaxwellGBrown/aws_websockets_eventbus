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

3. Deploy the socket connection & outbound communication service

   ```
   aws cloudformation deploy --template-file notification_template.yaml --stack-name example-event-notification --capabilities CAPABILITY_IAM
   ```

4. Deploy any number of echoing event listeners

   
   ```
   aws cloudformation deploy --template-file echo_template.yaml --stack-name example-event-handler --capabilities CAPABILITY_IAM --parameter-overrides Message=Hello
   ```

5. Deploy the SQS -> Lambda Quote-of-the-day listener

   ```
   aws cloudformation deploy --template-file sqs_template.yaml --stack-name example-event-sqs --capabilities CAPABILITY_IAM
   ```

6. Run the React client application to communicate with the deployed Websocket API

   ```
   cd client
   npm install
   npm run start
   ```
