#!/bin/bash

# Expand the template conf file with environment variables
python3 << EOF
import os
with open("/config/icecast.xml.template", "r") as src:
    with open("/config/icecast.xml", "w") as dst:
        dst.write(src.read().format(**os.environ))
EOF

chown icecast2 /config/icecast.xml
# Hand over to icecast
su icecast2 -c "/usr/bin/icecast2 -c /config/icecast.xml"
