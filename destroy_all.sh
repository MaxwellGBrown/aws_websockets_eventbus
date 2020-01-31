declare -A LANGUAGES
LANGUAGES=(
  ["English"]="Hello"
  ["French"]="Bonjour"
  ["Spanish"]="Hola"
)
for language in "${!LANGUAGES[@]}"; do
aws cloudformation delete-stack --stack-name "example-event-handler-$language"
done

aws cloudformation delete-stack --stack-name example-event-sqs
aws cloudformation delete-stack --stack-name example-event-websocket
aws cloudformation delete-stack --stack-name example-event-bus
