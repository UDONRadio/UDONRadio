# About
This folder is the home for the server.
It is written in Python with [Django](https://www.djangoproject.com/)
and [Django REST Framework](http://www.django-rest-framework.org/).
It exposes API endpoints intended to be used with the [client](../front)
or by the [playout engine](../liquidsoap).

```sh
back$ tree -d
.
├── media # user-uploaded files go here
├── radio # app for radio management (schedule, programs)
│   ├── management
│   │   └── commands
│   └── migrations
├── udon_back # main application (users and main URL routing to subapps).
│   └── migrations
└── upload # app for audio file upload and processing (including metadata updates).
    └── migrations

9 directories
```

User auth API endpoints are implemented by the
[Djoser](https://github.com/sunscrapers/djoser) application.  
Websockets work through [Channels](https://github.com/django/channels).


# Getting started

## Prerequisites

* `python3` > v3.4
* `ffmpeg`: not strictly required but recommended to process audio uploads.
* `redis-server`

## Starting redis-server
MacOS: `brew services start redis`  
Linux: `service redis start` or `systemctl start redis`

## Setting up environment
Follow those steps:
* `python3 -m venv env`: Create a virtual environment so system/user-wide modules do not infer.
* `source env/bin/activate`: Activate the newly created environment.
* `pip install requirements.txt`: Install required python modules.
* `python manage.py migrate`: Set up the database scheme.
* `python manage.py createsuperuser`: Create a Django superuser: follow the steps

Remember that the environment needs to be activated in each new shell for the code to work correctly.

## Running the development server
Run `python manage.py runserver`. Open a browser to http://localhost:8000/api/
and begin playing around with endpoints.

# Advanced

## Running with a reverse proxy
TODO

## Deferred tasks
Audio uploads processing is implemented through deferred tasks, with the help of
[Celery](http://www.celeryproject.org/).
Tasks are picked up by workers through the redis database.  
Run basic workers with `celery -A udon_back worker -l info`.

## Exposing Liquidsoap API endpoints
Keep in mind that those endpoints do not have any kind of authentication enabled.
They are designed to be exposed through a bridge server only visible to Liquidsoap.

To enable those endpoints, set the environment variable `LIQUIDSOAP_BRIDGE=yes`
