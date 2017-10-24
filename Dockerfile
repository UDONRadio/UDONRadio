FROM python:3
ENV PYTHONUNBUFFURED 1
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# Pillow dependencies
RUN apt-get update && apt-get install -y --reinstall libjpeg62-turbo-dev libjpeg-turbo-progs zlib1g-dev

ADD requirements.txt /usr/src/app/
RUN pip install -r requirements.txt && pip install uwsgi
