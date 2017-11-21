FROM python:3-stretch
ENV PYTHONUNBUFFURED 1
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# Pillow dependencies & Liquidsoap & Gosu script
RUN apt-get update && \
    apt-get install -y --reinstall libjpeg62-turbo-dev libjpeg-turbo-progs \
        zlib1g-dev ffmpeg liquidsoap && \
    apt-get -y --no-install-recommends install ca-certificates curl
RUN gpg --keyserver ha.pool.sks-keyservers.net --recv-keys B42F6819007F00F88E364FD4036A9C25BF357DD4
RUN curl -o /usr/local/bin/gosu -SL "https://github.com/tianon/gosu/releases/download/1.4/gosu-$(dpkg --print-architecture)" \
    && curl -o /usr/local/bin/gosu.asc -SL "https://github.com/tianon/gosu/releases/download/1.4/gosu-$(dpkg --print-architecture).asc" \
    && gpg --verify /usr/local/bin/gosu.asc \
    && rm /usr/local/bin/gosu.asc \
    && chmod +x /usr/local/bin/gosu

ADD requirements.txt /usr/src/app/
RUN pip install -r requirements.txt && pip install uwsgi

ADD entrypoint.sh /usr/local/bin/entrypoint.sh
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
