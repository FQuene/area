import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'icons/my_icons.dart';
import 'package:flutter/services.dart';
import 'widget/widget.dart';
import 'package:http/http.dart' as http;

Future<void> _sendRegister(final email, final username, final password) async {
  var response = await http
      .post(
        "http://10.0.2.2:8080/auth/register",
        body: {
          'email': email,
          'username': username,
          'password': password,
          'accType': "normal",
        },
      )
      .then((value) => print(value))
      .catchError((onError) => print(onError));
}

class Register extends StatefulWidget {
  @override
  _RegisterState createState() => _RegisterState();
}

class _RegisterState extends State<Register> {
  final _email = TextEditingController();
  final _username = TextEditingController();
  final _password = TextEditingController();

  Widget _inputEmail() {
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
            controller: _username,
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 20,
              color: Color(0XFFEBEBD3),
              fontFamily: 'OpenSans',
            ),
            decoration: InputDecoration(
              // contentPadding: EdgeInsets.only(top: 0.0),
              hintText: 'username',
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
            // obscureText: true,
            controller: _password,
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 20,
              color: Color(0XFFEBEBD3),
              fontFamily: 'OpenSans',
            ),
            decoration: InputDecoration(
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

  Widget _registerBtn() {
    return Container(
      width: 200,
      height: 50,
      child: RaisedButton(
        onPressed: () {
          final response =
              _sendRegister(_email.text, _username.text, _password.text);
          Navigator.pushNamed(context, '/login');
        },
        elevation: 0,
        padding: EdgeInsets.all(10.0),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(30.0),
        ),
        color: Color(0xFF04724D),
        child: Text(
          "s'inscrire",
          style: TextStyle(
            color: Color(0xFFEEEEEE),
            letterSpacing: 1.5,
            fontSize: 18.0,
            fontFamily: 'Poppins',
          ),
        ),
      ),
    );
  }

  Widget _loginBtn() {
    return Column(
      children: [
        Container(
            child: GestureDetector(
          onTap: () {
            Navigator.pushNamed(context, '/login');
          },
          child:
              Text("se connecter", style: TextStyle(color: Color(0xFFEEEEEE))),
        ))
      ],
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
                      SizedBox(height: 160),
                      SvgPicture.asset(iconTitle),
                      SizedBox(height: 50),
                      _inputEmail(),
                      SizedBox(height: 20),
                      _inputUsername(),
                      SizedBox(height: 20),
                      _inputPassword(),
                      SizedBox(height: 40),
                      _registerBtn(),
                      SizedBox(height: 20),
                      _loginBtn(),
                      SizedBox(height: 100),
                      SvgPicture.asset(iconAllRightReserved)
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
