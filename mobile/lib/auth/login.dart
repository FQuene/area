import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'icons/my_icons.dart';
import 'package:flutter/services.dart';
import 'widget/widget.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'dart:async';
import '../homePage/global.dart' as globals;
import '../homePage/getJson.dart';

class Login extends StatefulWidget {
  @override
  _LoginState createState() => _LoginState();
}

class _LoginState extends State<Login> {
  final _email = TextEditingController();
  final _password = TextEditingController();

  Future<dynamic> _sendLogin(final email, final password) async {
    print("1");
    try {
      var res = await http.post(
        "http://10.0.2.2:8080/auth/login",
        body: {
          'email': email,
          'password': password,
        },
      );
      Map tmp = json.decode(res.body);
      globals.tokenUser = tmp["access_token"].toString();
      print(res.statusCode);
      if (res.statusCode == 201) {
        Navigator.pushNamed(context, '/homePage');
      }
    } catch (err) {
      print(err);
      throw err;
    }
  }

  Widget _inputUsername() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: <Widget>[
        Container(
          alignment: Alignment.center,
          decoration: kBoxDecorationStyle,
          height: 40.0,
          width: 350.0,
          child: TextField(
            controller: _email,
            keyboardType: TextInputType.emailAddress,
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 20,
              color: Color(0XFFEBEBD3),
              fontFamily: 'OpenSans',
            ),
            decoration: InputDecoration(
              // contentPadding: EdgeInsets.only(top: 0.0),
              hintText: 'email',
              hintStyle: TextStyle(
                fontSize: 20.0,
                color: Color(0XFFEBEBD3),
                fontFamily: 'OpenSans',
              ),
            ),
          ),
        ),
      ],
    );
  }

  Widget _inputPassword() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: <Widget>[
        Container(
          alignment: Alignment.center,
          decoration: kBoxDecorationStyle,
          height: 40.0,
          width: 350.0,
          child: TextField(
            obscureText: true,
            controller: _password,
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 20,
              color: Color(0XFFEBEBD3),
              fontFamily: 'OpenSans',
            ),
            decoration: InputDecoration(
              // contentPadding: EdgeInsets.only(top: 0.0),
              hintText: 'password',
              hintStyle: TextStyle(
                fontSize: 20.0,
                color: Color(0XFFEBEBD3),
                fontFamily: 'OpenSans',
              ),
            ),
          ),
        ),
      ],
    );
  }

  Widget _connextionBtn() {
    return Row(
      children: <Widget>[
        SizedBox(width: 40),
        Container(
          width: 200,
          height: 50,
          child: RaisedButton(
            onPressed: () async {
              var token = await _sendLogin(_email.text, _password.text);
            },
            padding: EdgeInsets.all(10.0),
            elevation: 0,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(30.0),
            ),
            color: Color(0xFF04724D),
            child: Text(
              'connexion',
              style: TextStyle(
                color: Color(0xFFEEEEEE),
                letterSpacing: 1.5,
                fontSize: 18.0,
                fontFamily: 'Poppins',
              ),
            ),
          ),
        ),
        SizedBox(width: 40),
        Container(
          width: 100,
          height: 50,
          child: RaisedButton(
            onPressed: () {
              print('Google');
            },
            elevation: 0,
            padding: EdgeInsets.all(10.0),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(30.0),
            ),
            color: Color(0xFFEEEEEE),
            child: (SvgPicture.asset(iconGoogle)),
          ),
        )
      ],
    );
  }

  Widget _registerBtn() {
    return Column(
      children: [
        Container(
            child: GestureDetector(
          onTap: () {
            Navigator.pushNamed(context, '/register');
          },
          child: Text("s'inscrire", style: TextStyle(color: Color(0xFFEEEEEE))),
        ))
      ],
    );
  }

  Widget _reservedText() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      mainAxisSize: MainAxisSize.max,
      mainAxisAlignment: MainAxisAlignment.end,
      children: [SvgPicture.asset(iconAllRightReserved)],
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: false,
      body: AnnotatedRegion<SystemUiOverlayStyle>(
        value: SystemUiOverlayStyle.dark,
        child: GestureDetector(
          onTap: () => FocusScope.of(context).unfocus(),
          child: Stack(
            children: <Widget>[
              Container(
                height: double.infinity,
                width: double.infinity,
                decoration: BoxDecoration(
                  color: Color(0xFF272635),
                ),
              ),
              Container(
                height: double.infinity,
                child: Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.start,
                    children: <Widget>[
                      SizedBox(height: 200),
                      SvgPicture.asset(iconTitle),
                      SizedBox(height: 50),
                      _inputUsername(),
                      SizedBox(height: 40),
                      _inputPassword(),
                      SizedBox(height: 50),
                      _connextionBtn(),
                      SizedBox(height: 20),
                      _registerBtn(),
                      SizedBox(height: 90),
                      _reservedText(),
                    ],
                  ),
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}
