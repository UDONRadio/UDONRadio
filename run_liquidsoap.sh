#!/bin/bash
echo n | opam init
opam update
eval `opam config env`
echo y | opam install ssl opus cry flac inotify lame mad ogg fdkaac samplerate taglib vorbis xmlplaylist liquidsoap
mkdir -p /home/udon_back/.opam/system/lib/liquidsoap/var/log/liquidsoap
exec liquidsoap liquidsoap/main.liq
