
if [[ ! "1.0.0-betza.1" =~ ^[0-9]+\.[0-9]+\.[0-9]+-beta.[0-9]+$ ]]; then
  echo "Invalid tag"
  exit 1
fi

echo "valid tag"
