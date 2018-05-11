#!/bin/bash

# Expand the template conf file with environment variables
python3 << EOF
import os

if "ICECAST_TLS_CERT" in os.environ:
    paths = "<ssl-certificate>/config/cert.pem</ssl-certificate>"
    socket = "<ssl>1</ssl>"
    os.system("cat {} {}> /config/cert.pem".format(os.environ['ICECAST_TLS_CERT'], os.environ['ICECAST_TLS_PK']))
    os.system("chown icecast2 /config/cert.pem")
else:
    paths = ""
    socket = ""

with open("/config/icecast.xml.template", "r") as src:
    with open("/config/icecast.xml", "w") as dst:
        dst.write(src.read().format(**os.environ, TLS_SOCKET_OPTS=socket, TLS_PATHS_OPTS=paths))
EOF

chown icecast2 /config/icecast.xml
# Hand over to icecast
su icecast2 -s "/bin/bash" -c "/usr/bin/icecast2 -c /config/icecast.xml"
yes > /dev/null
