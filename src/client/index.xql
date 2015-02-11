xquery version "3.0";

declare namespace admin = "http://exist-db.org/xquery/admin-interface";

declare namespace request = "http://exist-db.org/xquery/request";
declare namespace session = "http://exist-db.org/xquery/session";
declare namespace util = "http://exist-db.org/xquery/util";
declare namespace xdb = "http://exist-db.org/xquery/xmldb";


declare option exist:serialize "method=html5 media-type=text/html";

declare function admin:loginScreen() as element() {
	<html>
		<head>
			<title>RS-Dokumentenserver-Login</title>
		</head>
		<body>
			<div class="content">
				<div class="guide">
					<div class="userinfo">
					  Gegenwärtig eingeloggt als: {xdb:get-current-user()}
					</div>
				</div>


				<div class="panel">
				<p>Einloggen zum Strauss-Dokumentenserver</p>
				<form action="/index.xql" method="post">
					<table class="login" cellpadding="5">
						<tr>
							<th colspan="2" align="left">Bitte anmelden</th>
						</tr>
						<tr>
							<td align="left">Benutzername:</td>
							<td>
								<input name="user" type="text" size="20"/>
							</td>
						</tr>
						<tr>
							<td align="left">Passwort:</td>
							<td>
								<input name="pass" type="password" size="20"/>
							</td>
						</tr>
						<tr>
							<td colspan="2" align="left">
								<input type="submit" value="Login"/>
							</td>
						</tr>
					</table>
					{
						for $param in request:get-parameter-names()
						return
							if ( $param = ("user","pass") ) 
							then
							  ()
							else 
							  <input type="hidden" name="{$param}" value="{request:get-parameter($param, ())}"/>
					}
				</form>
				</div>
			</div>
		</body>
	</html>
};


declare function admin:extJS() as element() {
	<html xmlns="http://www.w3.org/1999/xhtml">
		<head>
			<meta charset="UTF-8"/>
			<title>RSW</title>

			<script type="text/javascript" src="prefs.js"></script>
			
			<script type="text/javascript" src="resources/bower_components/jquery/dist/jquery.min.js"></script>
			<script type="text/javascript" src="resources/js/jquery.wheelzoom.js"></script>
			
			<script type="text/JavaScript" src="resources/bower_components/meisnippetviewer/build/meisnippetviewer.min.js"></script>
			
			<link rel="stylesheet" href="resources/Zen-all.css"/>
			<script type="text/javascript" src="app.js"></script>
		</head>
		<body></body>
	</html>
};

declare function admin:extJS1() as element() {
	<html xmlns="http://www.w3.org/1999/xhtml">
		<head>
			<title>adb</title>
			<script type="text/javascript">
				location.replace("/fs/ahlsen/ext1/build/rsga/production/index.html" + window.location.search);
			</script>
		</head>
		<body>
		</body>
	</html>
};




(: ***************************************** :)
(: ****************** main ***************** :)
(: ***************************************** :)


let $userParam := request:get-parameter("user", ())
let $passwdParam := request:get-parameter("pass", ())
let $wait := util:wait(1000)


let $isLoggedIn := 
	if(xdb:get-current-user() eq "guest") then
  (
    (: is this a login attempt? :)
    if ($userParam and not(empty($passwdParam))) then
    (
      if ($userParam = ("", "guest")) then false()
      (: prevent the guest user from accessing the admin webapp :)
      else
      (
        (: try and log the user in :)
   			(:let $s := session:create()
        let $su := session:set-current-user($userParam, $passwdParam):)
        xdb:login( "/", $userParam, $passwdParam, true() )
        
      )
    )
    else false()
    (: prevent the guest user from accessing the admin webapp :)
  )
  else
  (
    (: if we are already logged in, are we logging out - i.e. set permissions back to guest :)
    if (request:get-parameter("logout",())) then
    (
      let $null  := xdb:login("/db", "guest", "guest") 
      let $inval := session:invalidate()
      return false()
    )
    else true() (: we are already logged in and we are not the guest user :)
  )


(:return 
	if ($isLoggedIn)
	then
		admin:extJS()
	else
		admin:loginScreen()
:)
let $serviceMode := 
	<html>
		<head>
			<title>Außer Betrieb</title>
		</head>
		<body>
			<h1>Außer Betrieb</h1>
		</body>
	</html>

return admin:extJS()