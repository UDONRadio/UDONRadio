# UdonRadio
This repository contains the http server configuration for
UdonRadio webstack and its underlying dependencies.

It also contains scripts for easy deployment, database
configuration and initialization

Install Notes:

- edit env variables in `docker-compose.yml` and paths in
`nginx.conf`

- `docker-compose up -d`

- `docker-compose exec back bash`
```
   python3 manage.py makemigrations radio upload udon_back
# make migrations accordingly
   python3 manage.py migrate
   python3 manage.py collectstatic
   exit
```

- set rights for nginx user in `back/collectstatic` and
`front/build` directories

- set up ssl certs path in `nginx.conf`

- `nginx -s reload`
