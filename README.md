# UdonRadio :computer: :radio:

## About
The project is split in 3 main parts:
- `back` contains the Django project. It is responsible for handling REST requests from the website, processing media files, and feeding Liquidsoap with informations on what tracks to play, and when.
- `front` contains the website. That is a simple React app that makes queries to the `back` server.
- `liquidsoap` contains the Liquidsoap scripts that generate the actual audio stream. It exposes a telnet port so we can control it from the Django backend.

This repository also contains:
- a docker-compose file for quick deployment
- the http server configuration
- configuration files templates (for secrets)
- dockerized icecast2

## Getting started
Playout is not required to start developing on the Django backend or on the website. Head to those repositories for guidance.
However if you wish to run liquidsoap scripts, you will need:
- a Django backend running with the `LIQUIDSOAP_BRIDGE` environment variable set to `yes`.
- a running Icecast server.
- Liquidsoap obviously, a recent version is prefered.
Adjust your Icecast settings in the `./liquidsoap/main.liq` file accordingly. Beware not to use port 8000 already bound by the Django backend.
Then you can just run `liquidsoap ./liquidsoap/main.liq` and head over to `http://localhost:<your-icecast-port>/udon.mp3` :)

## Production

Installing and configuring docker-compose, Docker and NginX is out of the scope of that section. We will assume everything works already.
We chose not to embed NginX as a service to be able to serve several websites easily on the host.

- Copy the `.template` files and strip this extension. Edit secrets and configuration variables accordingly.

- Link `nginx.conf` to your enabled-sites directory and restart NginX.

- Start docker services: `docker-compose up -d`

- Inside the `back` container, (`docker-compose exec gosu udon_back bash`) type the following:
```
   python3 manage.py migrate # create database tables
   python3 manage.py collectstatic # collect django static files
   python3 manage.py createsuperuser # Finally create superuser
   exit
```
