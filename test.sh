#!/bin/bash
clear
fuser -k 3000/tcp
node server.js &
PID=$!
sleep .5
curl -s -d "name=name1&password=pass1&email=email" http://localhost:3000/asdf > output
sleep .5
kill $PID
echo "curl output:"
cat output
