module("luci.controller.ariox_auth", package.seeall)

function index()
    local page = entry({"ariox", "auth_fail"}, call("action_auth_fail"), nil)
    page.sysauth = false
    page.leaf = true
end

function action_auth_fail()
    local ip = luci.http.getenv("REMOTE_ADDR") or "unknown"
    os.execute("logger -t aria2 'RPC login failed from " .. ip .. "'")
    luci.http.status(401, "Unauthorized")
    luci.http.prepare_content("text/plain")
    luci.http.write("Unauthorized")
end
