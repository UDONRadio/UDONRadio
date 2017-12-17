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
    apt-get -y --no-install-recommends install ca-certificates curl
RUN gpg --keyserver ha.pool.sks-keyservers.net --recv-keys B42F6819007F00F88E364FD4036A9C25BF357DD4
RUN curl -o /usr/local/bin/gosu -SL "https://github.com/tianon/gosu/releases/download/1.4/gosu-$(dpkg --print-architecture)" \
    && curl -o /usr/local/bin/gosu.asc -SL "https://github.com/tianon/gosu/releases/download/1.4/gosu-$(dpkg --print-architecture).asc" \
    && gpg --verify /usr/local/bin/gosu.asc \
    && rm /usr/local/bin/gosu.asc \
    && chmod +x /usr/local/bin/gosu
# Set up dependencies
RUN  apt-get -y install \
    dnsutils \
    telnet \
    build-essential \
    wget \
    curl \
    telnet \
    libmad0-dev \
    libshout3-dev \
    libvorbis-dev \
    libfdk-aac-dev \
    libid3tag0-dev \
    libmad0-dev \
    libshout3-dev \
    libasound2-dev \
    libpcre3-dev \
    libmp3lame-dev \
    libogg-dev \
    libtag1-dev \
    libssl-dev \
    libtool \
    libflac-dev \
    libogg-dev \
    libsamplerate-dev \
    libavutil-dev \
    libopus-dev \
    autotools-dev \
    autoconf \
    automake \
    ocaml-nox \
    opam \
    m4

ADD requirements.txt /usr/src/app/
RUN pip install -r requirements.txt && pip install uwsgi

RUN mkdir /etc/liquidsoap && chmod -R 755 /etc/liquidsoap
ADD entrypoint.sh /usr/local/bin/entrypoint.sh
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
