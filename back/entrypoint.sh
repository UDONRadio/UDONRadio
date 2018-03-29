#!/bin/bash

# Add local user and changes user

USER_ID=${LOCAL_USER_ID:-9001}

if [ ! -d "/home/udon_back" ]; then
  useradd -u $USER_ID -o -m udon_back
fi

export HOME=/home/udon_back
exec /usr/local/bin/gosu udon_back "$@"
