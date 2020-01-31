aws cloudformation deploy --template-file eventbus_template.yaml --stack-name example-event-bus --capabilities CAPABILITY_IAM
aws cloudformation deploy --template-file api_template.yaml --stack-name example-event-websocket --capabilities CAPABILITY_IAM
aws cloudformation deploy --template-file notification_template.yaml --stack-name example-event-notification --capabilities CAPABILITY_IAM

declare -A MESSAGES
MESSAGES=(
  ["Foo"]="Foo"
  ["Bar"]="Bar"
  ["Baz"]="Baz"
)
for message in "${!MESSAGES[@]}"; do
aws cloudformation deploy --template-file event_template.yaml --stack-name "example-event-handler-$message" --capabilities CAPABILITY_IAM --parameter-overrides  Message="${MESSAGES[$message]}"
done

aws cloudformation deploy --template-file sqs_template.yaml --stack-name example-event-sqs --capabilities CAPABILITY_IAM
