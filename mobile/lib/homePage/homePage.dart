import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:custom_switch/custom_switch.dart';
import 'getJson.dart';
import 'selectDate.dart';
import 'getActionReaction.dart';
import 'valid_cancel.dart';
import 'global.dart' as globals;
import 'package:http/http.dart' as http;
import 'dart:convert';

class HomePage extends StatefulWidget {
  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  List<Widget> _children = [];
  bool isChecked = false;
  var data_timer = Get_date_hour();
  var cancel_valide = Cancel_valide();
  var action = Action_Area();
  var reaction = Reaction_Area();
  List tmpAction = ["Twitch", "action", "value"];
  List tmpReaction = ["Twitter", "Reaction", "value"];

  @override
  void initState() {
    super.initState();
    asyncMethod();
  }

  Future asyncMethod() async {
    globals.dataJson = await parseJson("assets/Profil/action_reaction.json");
    print("ALORS C AVANT");
    var data = await _getDataUser();
    print("ALORS C APRES");
    print(data);
    for (var service in data) {
      setState(() {
        _children.add(
          _showWidget(
              [
                service["actionService"],
                service["actionDes"],
                service["actionParams"]
              ],
              [
                service["reactionService"],
                service["reactionDes"],
                service["reactionParams"]
              ],
              int.parse(
                  globals.colors["${service["reactionService"].toString()}"]),
              globals.icons["${service["actionService"].toString()}"],
              globals.icons["${service["reactionService"].toString()}"],
              service["enabled"],
              service["id"]),
        );
      });
    }
  }

  Future<dynamic> _getDataUser() async {
    try {
      var res = await http.get(
        "http://10.0.2.2:8080/users/areas",
        headers: (<String, String>{
          'Authorization': "Bearer " + globals.tokenUser,
        }),
      );
      final data = json.decode(res.body).cast<dynamic>();
      return data;
    } catch (err) {
      print(err);
      throw err;
    }
  }

  Widget _header() {
    return Row(
      children: [
        SizedBox(width: 30),
        Container(
            child: GestureDetector(
          onTap: () {},
          child: Text("services",
              style: TextStyle(
                color: Color(0xFFEEEEEE),
              )),
        )),
        SizedBox(width: 30),
        Container(
            child: GestureDetector(
          onTap: () {
            Navigator.pushNamed(context, '/auth');
          },
          child: Text("déconnexion",
              style: TextStyle(
                color: Color(0xFFEEEEEE),
              )),
        )),
        Spacer(),
        Container(
            child: GestureDetector(
          onTap: () {},
          child: Text("",
              style: TextStyle(
                color: Color(0xFFEEEEEE),
                fontWeight: FontWeight.bold,
              )),
        )), // SvgPicture.asset(iconProfile),
        SizedBox(width: 20),
      ],
    );
  }

  Widget _eachApp(_name, _icon, _color, data) {
    return Container(
      height: 50,
      width: 50,
      child: GestureDetector(
        onTap: () {
          if (action.checkIfActionIsNull()) {
            action.name = _name;
            action.image = _icon;
            action.color = _color;
            _popupAction2(context, data["name"], data["actions"]);
          } else {
            reaction.name = _name;
            reaction.image = _icon;
            reaction.color = _color;
            _popupReaction2(context, data["name"], data["reactions"]);
          }
        },
        child: Container(
          decoration: BoxDecoration(
            color: Color(int.parse(_color)),
            borderRadius: BorderRadius.circular(20.0),
          ),
          child: Stack(
            alignment: Alignment.bottomLeft,
            children: [
              Positioned(
                top: 10.5,
                left: 10,
                child: SvgPicture.asset(_icon),
              )
            ],
          ),
        ),
      ),
    );
  }

  _popupAction(context, json) {
    for (var i in json) {
      if (i["actions"].length != 0 && globals.callAction) {
        globals.allAction.add(i);
      }
    }
    showDialog(
        // barrierDismissible: false,
        context: context,
        builder: (BuildContext context) =>
            _selectAction(context, globals.allAction, json));
  }

  _showLogo(i) {
    return Row(children: [
      SizedBox(width: 10),
      _eachApp(i["name"], i["image"], i["color"], i),
    ]);
  }

  _selectAction(BuildContext context, json, jsonComplet) {
    return Scaffold(
      backgroundColor: Colors.transparent,
      body: Center(
        child: Container(
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(10),
            color: Color(0xFF272635),
          ),
          height: 400,
          width: 380,
          child: Stack(
            children: [
              Container(
                alignment: Alignment(-0.75, -0.9),
                child: Text("ACTION",
                    style: TextStyle(
                        fontStyle: FontStyle.italic,
                        fontSize: 40,
                        color: Colors.white,
                        fontWeight: FontWeight.bold)),
              ),
              Container(
                alignment: Alignment(1, -1),
                child: IconButton(
                  icon: Icon(
                    Icons.do_not_disturb,
                    color: Colors.red,
                  ),
                  onPressed: () {
                    setState(() {
                      globals.callAction = false;
                    });
                    reaction.wipeData();
                    action.wipeData();
                    Navigator.pushNamed(context, "/homePage");
                  },
                ),
              ),
              Container(
                alignment: Alignment(-0.5, -0.4),
                child: Row(
                  children: [for (var i in globals.allAction) _showLogo(i)],
                ),
              )
            ],
          ),
        ),
      ),
    );
  }

  _popupAction2(context, service, data) {
    showDialog(
        // barrierDismissible: false,
        context: context,
        builder: (BuildContext context) =>
            _chooseAction(context, service, data));
  }

  _chooseAction(BuildContext context, service, data) {
    return Scaffold(
      backgroundColor: Colors.transparent,
      body: Center(
        child: Container(
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(10),
            color: Color(0xFF272635),
          ),
          height: 400,
          width: 380,
          child: Stack(
            children: [
              Container(
                alignment: Alignment(-0.75, -0.9),
                child: Text("ACTION - " + service,
                    style: TextStyle(
                        fontStyle: FontStyle.italic,
                        fontSize: 40,
                        color: Colors.white,
                        fontWeight: FontWeight.bold)),
              ),
              Container(
                alignment: Alignment(0, 0),
                child: Column(
                  children: [
                    SizedBox(height: 100),
                    // Text(data[0]["action"])
                    for (var i in data) chooseTrigger(context, i)
                  ],
                ),
              )
            ],
          ),
        ),
      ),
    );
  }

  chooseTrigger(context, i) {
    Future<dynamic> asyncMethod2(dataTimer, context, i) async {
      for (var paramType in i["params"]) {
        switch (paramType["type"]) {
          case "calendar":
            {
              var tmp = await dataTimer.getDate(context);
              paramType["value"] = tmp;
              if (action.checkIfActionIsNull()) {
                action.action = i;
              } else {
                reaction.reaction = i;
              }
              // paramType["value"] = "";
            }
            break;
          case "time":
            {
              var tmp = await dataTimer.getTime(context);
              paramType["value"] = tmp;
              if (action.checkIfActionIsNull()) {
                action.action = i;
              } else {
                reaction.reaction = i;
              }
              // paramType["value"] = "";
            }
            break;
          case "text":
            {
              print("action ==> ");
              print(action.action);
              print("reaction ==> ");
              print(reaction.reaction);
              if (action.checkIfActionIsNull()) {
                print("TExT POUR ACTION");
                await _popupText(context, paramType, i, false);
              } else {
                print("TExT POUR REACTION");
                await _popupText(context, paramType, i, true);
              }
            }
            break;
        }
      }
      if (reaction.checkIfReactionIsNull()) {
        _popupReaction(context, globals.dataJson);
      } else {
        _popupValidation(context);
      }
    }

    return Column(
      children: [
        Container(
          width: 300,
          height: 54,
          child: RaisedButton(
            onPressed: () {
              asyncMethod2(data_timer, context, i);
            },
            padding: EdgeInsets.all(10.0),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(20.0),
            ),
            color: Colors.white,
            child: Text(
              i["name"],
              style: TextStyle(
                color: Color(0xFF272635),
                letterSpacing: 1.5,
                fontSize: 12.0,
                fontFamily: 'Poppins',
              ),
            ),
          ),
        ),
        SizedBox(height: 20),
      ],
    );
  }

  _popupReaction(context, json) {
    for (var i in json) {
      if (i["reactions"].length != 0 && globals.callReaction) {
        globals.allReaction.add(i);
      }
    }
    showDialog(
        // barrierDismissible: false,
        context: context,
        builder: (BuildContext context) => _selectReaction(context));
  }

  _selectReaction(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.transparent,
      body: Center(
        child: Container(
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(10),
            color: Color(0xFF272635),
          ),
          height: 400,
          width: 380,
          child: Stack(
            children: [
              Container(
                alignment: Alignment(-0.75, -0.9),
                child: Text("REACTION",
                    style: TextStyle(
                        fontStyle: FontStyle.italic,
                        fontSize: 40,
                        color: Colors.white,
                        fontWeight: FontWeight.bold)),
              ),
              Container(
                alignment: Alignment(1, -1),
                child: IconButton(
                  icon: Icon(
                    Icons.do_not_disturb,
                    color: Colors.red,
                  ),
                  onPressed: () {
                    setState(() {
                      globals.callReaction = false;
                    });
                    reaction.wipeData();
                    action.wipeData();
                    Navigator.pushNamed(context, "/homePage");
                  },
                ),
              ),
              Container(
                alignment: Alignment(-0.5, -0.4),
                child: Row(
                  children: [
                    for (var i in globals.allReaction) _showLogo(i)
                    // checkLogo(globals.allReaction),
                    // for (var i in globals.allReaction) _showLogo(i)
                  ],
                ),
              )
            ],
          ),
        ),
      ),
    );
  }

  _popupText(context, paramType, i, bool checkTurn) async {
    await showDialog(
        context: context,
        builder: (BuildContext context) =>
            _selectText(context, paramType, i, checkTurn));
  }

  _selectText(BuildContext context, paramType, i, bool checkTurn) {
    TextEditingController tmp = new TextEditingController();
    return Scaffold(
      backgroundColor: Colors.transparent,
      body: Center(
        child: Container(
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(10),
            color: Color(0xFF272635),
          ),
          height: 400,
          width: 380,
          child: Stack(
            children: [
              Container(
                alignment: Alignment(-0.75, -0.9),
                child: Text("${paramType["name"]}",
                    style: TextStyle(
                        fontStyle: FontStyle.italic,
                        fontSize: 30,
                        color: Colors.white,
                        fontWeight: FontWeight.bold)),
              ),
              Container(
                alignment: Alignment(-0.5, -0.4),
                child: Column(
                  children: [
                    SizedBox(height: 100),
                    Expanded(
                      child: TextField(
                        controller: tmp,
                        textAlign: TextAlign.center,
                        style: TextStyle(color: Colors.white),
                      ),
                    ),
                    Expanded(
                      child: ButtonTheme(
                        minWidth: 50.0,
                        height: 75.0,
                        child: RaisedButton(
                          onPressed: () async {
                            paramType["value"] = tmp.text;
                            for (var count in i["params"]) {
                              print("count =>");
                              print(count);
                              print("____");
                              print(checkTurn);
                              if (checkTurn == false) {
                                action.action = i;
                              } else {
                                reaction.reaction = i;
                              }
                              if (count["value"].toString().isEmpty) {
                                if (checkTurn == false) {
                                  await _popupText(context, count, i, false);
                                } else {
                                  await _popupText(context, count, i, true);
                                }
                              }
                            }
                            if (reaction.checkIfReactionIsNull()) {
                              _popupReaction(context, globals.dataJson);
                            } else {
                              print(action.action);
                              print(reaction.reaction);
                              _popupValidation(context);
                            }
                          },
                          padding: EdgeInsets.all(10.0),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(20.0),
                          ),
                          color: Color(0xFFF4D35E),
                          child: Text(
                            'valider',
                            style: TextStyle(
                              color: Color(0xFF272635),
                              letterSpacing: 1.5,
                              fontSize: 18.0,
                              fontFamily: 'Poppins',
                            ),
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              )
            ],
          ),
        ),
      ),
    );
  }

  _popupReaction2(context, service, data) async {
    await showDialog(
        // barrierDismissible: false,
        context: context,
        builder: (BuildContext context) =>
            _chooseReaction(context, service, data));
  }

  _chooseReaction(BuildContext context, service, data) {
    return Scaffold(
      backgroundColor: Colors.transparent,
      body: Center(
        child: Container(
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(10),
            color: Color(0xFF272635),
          ),
          height: 400,
          width: 380,
          child: Stack(
            children: [
              Container(
                alignment: Alignment(-0.75, -0.9),
                child: Text("Reaction - " + service,
                    style: TextStyle(
                        fontStyle: FontStyle.italic,
                        fontSize: 40,
                        color: Colors.white,
                        fontWeight: FontWeight.bold)),
              ),
              Container(
                alignment: Alignment(0, 0),
                child: Column(
                  children: [
                    SizedBox(height: 100),
                    for (var i in data) chooseTrigger(context, i),
                  ],
                ),
              )
            ],
          ),
        ),
      ),
    );
  }

  _popupValidation(context) {
    showDialog(
        // barrierDismissible: false,
        context: context,
        builder: (BuildContext context) => _valided(context));
  }

  _valided(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.transparent,
      body: Center(
        child: Container(
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(10),
            color: Color(0xFF272635),
          ),
          height: 450,
          width: 380,
          child: Stack(
            children: [
              Container(
                alignment: Alignment(-0.75, -0.9),
                child: Text("RECAPITULATIF",
                    style: TextStyle(
                        fontStyle: FontStyle.italic,
                        fontSize: 40,
                        color: Colors.white,
                        fontWeight: FontWeight.bold)),
              ),
              Container(
                alignment: Alignment(0, 0),
                child: Column(children: [
                  SizedBox(height: 90),
                  Container(
                    child: Row(
                      children: [
                        SizedBox(width: 30),
                        _eachApp(action.name, action.image, action.color, []),
                        SizedBox(width: 10),
                        Text(
                          "${action.name}",
                          style: TextStyle(
                            color: Colors.white,
                            fontWeight: FontWeight.bold,
                            fontSize: 20,
                          ),
                        ),
                      ],
                    ),
                  ),
                  Container(
                    child: Row(
                      children: [
                        SizedBox(width: 90),
                        Text(
                          "${action.action["name"]}",
                          style: TextStyle(
                            color: Colors.white,
                          ),
                        ),
                      ],
                    ),
                  ),
                  Container(
                    child: Row(
                      children: [
                        SizedBox(width: 90),
                        Text(
                          "${action.action["params"][0]["value"]}",
                          style: TextStyle(
                            color: Colors.white,
                          ),
                        ),
                      ],
                    ),
                  ),
                  SizedBox(height: 50),
                  Container(
                    child: Row(
                      children: [
                        SizedBox(width: 30),
                        _eachApp(
                            reaction.name, reaction.image, reaction.color, []),
                        SizedBox(width: 10),
                        Text(
                          "${reaction.name}",
                          style: TextStyle(
                            color: Colors.white,
                            fontWeight: FontWeight.bold,
                            fontSize: 20,
                          ),
                        ),
                      ],
                    ),
                  ),
                  Container(
                    child: Row(
                      children: [
                        SizedBox(width: 90),
                        Text(
                          "${reaction.reaction["name"]}",
                          overflow: TextOverflow.ellipsis,
                          style: TextStyle(
                            color: Colors.white,
                          ),
                        ),
                      ],
                    ),
                  ),
                  Container(
                    child: Row(
                      children: [
                        SizedBox(width: 90),
                        Text(
                          "${reaction.reaction["params"][0]["value"]}",
                          style: TextStyle(
                            color: Colors.white,
                          ),
                        ),
                      ],
                    ),
                  ),
                  SizedBox(height: 30),
                  Container(
                    child: Row(
                      children: [
                        SizedBox(width: 30),
                        cancel_valide.buildCancelBtn(context, reaction, action),
                        SizedBox(width: 20),
                        cancel_valide.buildValideBtn(context, reaction, action),
                      ],
                    ),
                  ),
                ]),
              )
            ],
          ),
        ),
      ),
    );
  }

  Widget _createLink(BuildContext context) {
    return Row(
      children: [
        SizedBox(width: 45),
        Container(
          width: 160,
          height: 50,
          child: RaisedButton(
            onPressed: () {
              // print(globals.dataJson.length());
              // for (var i in globals.dataJson) _popupAction(context, i);
              print("DATA JSON ==> ");
              print(globals.dataJson);
              _popupAction(context, globals.dataJson);
            },
            color: Color(0xFF04724D),
            padding: EdgeInsets.all(10.0),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(30.0),
            ),
            child: Row(
              children: <Widget>[
                Align(
                  alignment: Alignment.centerLeft,
                  child: Icon(
                    Icons.control_point_rounded,
                    color: Colors.white,
                  ),
                ),
                Align(
                    alignment: Alignment.center,
                    child: Text(
                      "  crée un area",
                      style: TextStyle(
                          color: Color(0xFFEEEEEE),
                          letterSpacing: 1,
                          fontSize: 15.0,
                          fontFamily: "Poppins"),
                    ))
              ],
            ),
          ),
        ),
      ],
    );
  }

  Future<void> _deleteService(id) async {
    try {
      var res = await http.delete(
        "http://10.0.2.2:8080/users/delete-area/${id}",
        headers: (<String, String>{
          'Authorization': "Bearer " + globals.tokenUser,
        }),
      );
      print(res);
    } catch (err) {
      print(err);
      throw err;
    }
  }

  Future<void> _sendStatus(id, bool status) async {
    try {
      var res = await http.post("http://10.0.2.2:8080/users/area-on-off'",
          headers: (<String, String>{
            'Authorization': "Bearer " + globals.tokenUser,
          }),
          body: {
            'status': status.toString(),
            'id': id.toString(),
          });
      print("reussi");
      print(res);
    } catch (err) {
      print("error");
      print(err);
      throw err;
    }
  }

  Future<void> _callStatus(id, bool status) async {
    await _sendStatus(id, status);
  }

  Widget _showWidget(List action, List reaction, int color, String logoAction,
      String logoReaction, bool value, dynamic id) {
    bool status = value;
    return Row(
      children: [
        Container(
          height: 200,
          width: 311,
          child: Stack(
            children: [
              Container(
                alignment: Alignment(-0.8, 0), // X Y
                child: Text(
                  "${action[0]}\n\n${reaction[0]}",
                  textScaleFactor: 1.75,
                  style: TextStyle(
                    color: Colors.white,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
              Container(
                alignment: Alignment(-0.72, 0.7), // X Y
                child: Text(
                  "${action[1]}\n${action[2]}\n\n\n${reaction[1]}\n${reaction[2]}",
                  style: TextStyle(
                    color: Colors.white,
                  ),
                ),
              ),
              Container(
                alignment: Alignment(-0.8, -0.8),
                child: SizedBox(
                  width: 65,
                  height: 25,
                  child: CustomSwitch(
                    activeColor: Colors.greenAccent,
                    value: status,
                    onChanged: (value) {
                      setState(() {
                        status = value;
                        print("Id : ");
                        print(id);
                        print("Status : ");
                        print(status);

                        _callStatus(id, status);
                        // _sendStatus(id.toString(), status);
                      });
                    },
                  ),
                ),
              ),
              Container(
                alignment: Alignment(1, -0.9),
                child: IconButton(
                  icon: Icon(
                    Icons.delete,
                    color: Colors.white,
                  ),
                  onPressed: () {
                    _deleteService(id.toString());
                    setState(() {
                      Navigator.pushNamed(context, "/homePage");
                    });
                    // reaction.wipeData();
                    // action.wipeData();
                    // Navigator.pushNamed(context, "/homePage");
                  },
                ),
              ),
              Container(
                  alignment: Alignment(0.9, 0.0),
                  child: SvgPicture.asset(logoAction)),
              Container(
                  alignment: Alignment(0.9, 0.8),
                  child: SvgPicture.asset(logoReaction)),
            ],
          ),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(10),
            color: Color(color),
          ),
        ),
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: Color(0xFF272635),
        body: Stack(
          alignment: AlignmentDirectional.topCenter,
          children: [
            Container(
              height: double.infinity,
              child: Center(
                child: Column(
                  children: [
                    SizedBox(height: 30),
                    _header(),
                    SizedBox(height: 60),
                    _createLink(context),
                    SizedBox(height: 40),
                    new Expanded(
                      child: new Center(
                        child: GridView.count(
                          childAspectRatio: 1.8 / 1,
                          primary: false,
                          padding: const EdgeInsets.all(50),
                          crossAxisSpacing: 10,
                          mainAxisSpacing: 10,
                          crossAxisCount: 1,
                          children: <Widget>[
                            for (var i in _children) i,
                          ],
                        ),
                      ),
                    )
                  ],
                ),
              ),
            ),
          ],
        ));
  }
}
