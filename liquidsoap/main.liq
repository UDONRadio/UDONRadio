#!/usr/bin/liquidsoap

# BASE CONFIG

def env_get (name, default)
	value = getenv(name)
	if value != "" then value else default end
end

ls_bridge_host = env_get("LIQUIDSOAP_BRIDGE_HOST", "ls-bridge")
ls_bridge_port = int_of_string(env_get("LIQUIDSOAP_BRIDGE_PORT", "8000"))
ls_bridge_url = "http://#{ls_bridge_host}:#{string_of(ls_bridge_port)}"
icecast_host = env_get("ICECAST_HOST", "icecast")
icecast_port = int_of_string(env_get("ICECAST_PORT", "8000"))
input_harbor_port = int_of_string(env_get("LS_INPUT_HARBOR_PORT", "8000"))

liquidsoap_debug = getenv("LIQUIDSOAP_DEBUG") != ""

fallback_song = mksafe(single("fallback.mp3"))

# JINGLES

jingles = playlist("jingles.m3u")

# GRAND MIX

def request_func() =
  rep = http.get("#{ls_bridge_url}/api/radio/song/next/")
  meta = fst(rep)
  data = snd(rep)
  next = string.sub(data, start=1, length=(string.length(data) - 2))
  request.create(next)
end
grand_mix = request.dynamic(request_func)

# LIVE

if liquidsoap_debug
then
  set("harbor.bind_addr", "127.0.0.1")
else
  set("harbor.bind_addr", "0.0.0.0")
  set("harbor.ssl.certificate", "TODO")
  set("harbor.ssl.private_key", "TODO")
end
harbor_func = if liquidsoap_debug then input.harbor else input.harbor.ssl end

def auth (login, password) =
  postdata = '{"password":"#{password}", "user":"#{login}"}'
  headers = [("Content-Type", "application/json")]
  rep = http.post(
    headers=headers,
    data=postdata,
    "#{ls_bridge_url}/api/radio/live/connect/"
  )
  meta = fst(rep)
  data = snd(rep)
  status_msg = snd(fst(meta))
  status_code = snd(fst(fst(meta)))
  if status_code != 200
  then
    log("input.harbor connection rejected for user '#{login}': #{status_msg}, #{data}")
    false
  else
    true
  end
end

def harbor_disconnect () =
  ignore(http.post("#{ls_bridge_url}/api/radio/live/disconnect/"))
end

def live_on_start () =
  harbor_disconnect()
end

live = strip_blank(
  harbor_func(
    port=input_harbor_port,
    auth=auth,
    on_disconnect=harbor_disconnect,
    "live"
))

# LAYOUT

execute = fun (func) -> func()
def on_start_all () =
  list.iter(execute, [live_on_start])
end
def on_shutdown_all () = 
  list.iter(execute, [])
end
on_start(on_start_all)
on_shutdown(on_shutdown_all)

auto_radio = rotate(weights=[1,3], [jingles, grand_mix])
radio = fallback(track_sensitive=false, [live, auto_radio])
s = fallback([radio, fallback_song])

output.icecast(%mp3(bitrate=320),
  host="#{icecast_host}",port=icecast_port,password="hackme",
  mount="udon.mp3", s)
