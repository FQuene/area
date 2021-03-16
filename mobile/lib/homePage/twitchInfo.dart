import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class Twitch {
  String streamer;
  Twitch({this.streamer});

  Future getStreamer(context) async {
    final TextEditingController streamer = new TextEditingController();
    TextField(
      controller: streamer,
      textAlign: TextAlign.center,
      style: TextStyle(
        fontSize: 20,
        color: Color(0XFFEBEBD3),
        fontFamily: 'OpenSans',
      ),
      decoration: InputDecoration(
        // contentPadding: EdgeInsets.only(top: 0.0),
        hintText: "streamer's name",
        hintStyle: TextStyle(
          fontSize: 20.0,
          color: Color(0XFFEBEBD3),
          fontFamily: 'OpenSans',
        ),
      ),
    );
  }
}
