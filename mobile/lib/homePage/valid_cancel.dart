import 'dart:convert';
import 'package:flutter/material.dart';
import 'getActionReaction.dart';
import 'package:http/http.dart' as http;
import 'global.dart' as globals;
import 'getJson.dart';

class Cancel_valide {
  var actionParams = {};
  var reactionParams = {};

  Widget buildCancelBtn(context, Reaction_Area reaction, Action_Area action) {
    return Container(
      width: 150,
      height: 54,
      child: RaisedButton(
        onPressed: () {
          globals.callAction = false;
          globals.callReaction = false;
          wipeDataJson();
          print("quitter");
          reaction.wipeData();
          action.wipeData();
          Navigator.pushNamed(context, '/homePage');
        },
        padding: EdgeInsets.all(10.0),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(20.0),
        ),
        color: Color(0xFFF4D35E),
        child: Text(
          'annuler',
          style: TextStyle(
            color: Color(0xFF272635),
            letterSpacing: 1.5,
            fontSize: 18.0,
            fontFamily: 'Poppins',
          ),
        ),
      ),
    );
  }

  Future<void> wipeDataJson() async {
    globals.dataJson = await parseJson("assets/Profil/action_reaction.json");
  }

  Future<void> _sendNewArea(Action_Area action, Reaction_Area reaction) async {
    var key;

    print(action.action);
    print('___');
    print(reaction.reaction);

    action.action["params"].asMap().forEach((index, value) => {
          key = index + 1,
          actionParams["\"${key.toString()}\""] =
              "\"${action.action["params"][index]["value"].toString()}\""
        });

    reaction.reaction["params"].asMap().forEach((index, value) => {
          key = index + 1,
          reactionParams["\"${key.toString()}\""] =
              "\"${reaction.reaction["params"][index]["value"].toString()}\""
        });

    await http
        .post(
      "http://10.0.2.2:8080/users/create-area",
      body: {
        'actionDes': action.action["name"],
        "actionId": action.action["actionId"],
        "actionParams": actionParams.toString(),
        "actionService": action.name.toLowerCase(),
        "reactionDes": reaction.reaction["name"],
        "reactionId": reaction.reaction["reactionId"],
        "reactionParams": reactionParams.toString(),
        "reactionService": reaction.name.toLowerCase(),
      },
      headers: (<String, String>{
        'Authorization': "Bearer " + globals.tokenUser,
      }),
    )
        .then((value) {
      print("Value ==> ");
      print(value.body);
    }).catchError((onError) {
      print("error => ");
      print(onError);
    });
  }

  Widget buildValideBtn(context, Reaction_Area reaction, Action_Area action) {
    return Container(
      width: 150,
      height: 54,
      child: RaisedButton(
        onPressed: () {
          globals.callAction = false;
          globals.callReaction = false;
          _sendNewArea(action, reaction);
          wipeDataJson();
          action.wipeData();
          reaction.wipeData();
          Navigator.pushNamed(context, '/homePage');
        },
        padding: EdgeInsets.all(10.0),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(20.0),
        ),
        color: Color(0xFFF4D35E),
        child: Text(
          'Valide',
          style: TextStyle(
            color: Color(0xFF272635),
            letterSpacing: 1.5,
            fontSize: 18.0,
            fontFamily: 'Poppins',
          ),
        ),
      ),
    );
  }
}
