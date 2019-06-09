FROM python:3-stretch
ENV PYTHONUNBUFFURED 1
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# Add package repo
RUN echo "deb http://deb.debian.org/debian stable main contrib non-free" > /etc/apt/sources.list

# Pillow dependencies & Liquidsoap & Gosu script
RUN apt-get update && \
    apt-get install -y --reinstall libjpeg62-turbo-dev libjpeg-turbo-progs \
        zlib1g-dev ffmpeg && \
    apt-get -y --no-install-recommends install ca-certificates curl openssh-server

# Install gosu script
RUN gpg \
      --batch \
      --keyserver ha.pool.sks-keyservers.net \
      --recv-keys B42F6819007F00F88E364FD4036A9C25BF357DD4 && \
    curl \
      -o /usr/local/bin/gosu \
      -SL "https://github.com/tianon/gosu/releases/download/1.4/gosu-$(\
        dpkg --print-architecture)" && \
    curl \
      -o /usr/local/bin/gosu.asc \
      -SL "https://github.com/tianon/gosu/releases/download/1.4/gosu-$(\
        dpkg --print-architecture).asc" && \
    gpg \
      --verify /usr/local/bin/gosu.asc && \
    rm /usr/local/bin/gosu.asc && chmod +x /usr/local/bin/gosu

ADD requirements.txt /usr/src/app/
RUN pip install -r requirements.txt && pip install uwsgi

ADD entrypoint.sh /usr/local/bin/entrypoint.sh
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["uwsgi", "--chdir=/usr/src/app", "--module=udon_back.wsgi:application", "--socket=0.0.0.0:8000"]
