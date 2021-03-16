library my_prj.globals;

String tokenUser;

List<dynamic> allAction = [];
List<dynamic> allReaction = [];
List<dynamic> allText = [];
bool callAction = true;
bool callReaction = true;

var dataJson;

final icons = {
  "mail": "assets/Profil/iconMail.svg",
  "mobile": "assets/Profil/iconMobile.svg",
  "notifs": "assets/Profil/iconNotifs.svg",
  "spotify": "assets/Profil/iconSpotify.svg",
  "timer": "assets/Profil/iconTimer.svg",
  "twitch": "assets/Profil/iconTwitch.svg",
  "weather": "assets/Profil/iconWeather.svg",
};

final colors = {
  "mail": "0XFFD95FB7",
  "mobile": "0XFFFBC12C",
  "notifs": "0XFF229EC6",
  "spotify": "0XFF1DB954",
  "timer": "0XFFFD7272",
  "twitch": "0XFFA970FF",
  "weather": "0XFF8D8D8D",
};
