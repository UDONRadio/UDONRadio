FROM savonet/liquidsoap-full

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ADD . /usr/src/app
RUN chown -R opam:opam /usr/src/app
USER opam
CMD ["liquidsoap", "main.liq"]
