#!/usr/bin/liquidsoap

# Lines starting with # are comments, they are ignored.

# Print log messages to the console,
# can also be done by passing the -v option to liquidsoap.
set("log.stdout", true)

fallback_song = single("/usr/src/app/liquidsoap/fallback.mp3")

def request_func() =
  result =
    list.hd(
      get_process_lines("python manage.py getnextsong")
    )
  request.create(result)
end

grand_mix = request.dynamic(request_func)

radio = fallback([grand_mix, fallback_song])

#output.icecast(%vorbis(quality=-0.1),
#  host="icecast",port=8000,password="hackme",
#  mount="udon.ogg",radio)
output.icecast(%mp3(bitrate=320),
  host="icecast",port=8000,password="hackme",
  mount="udon.mp3",radio)
