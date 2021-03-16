import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'icons/my_icons.dart';
import 'package:flutter/services.dart';

class Auth extends StatefulWidget {
  @override
  _AuthState createState() => _AuthState();
}

class _AuthState extends State<Auth> {
  Widget _buildLoginBtn() {
    return Container(
      width: 340,
      height: 54,
      child: new RaisedButton(
        onPressed: () {
          print("se connecter");
          Navigator.pushNamed(context, '/login');
        },
        padding: EdgeInsets.all(10.0),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(20.0),
        ),
        color: Color(0xFFF4D35E),
        child: Text(
          'se connecter',
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

  Widget _buildSignUpBtn() {
    return Container(
      width: 340,
      height: 54,
      child: RaisedButton(
        onPressed: () {
          print("s'inscrire");
          Navigator.pushNamed(context, '/register');
        },
        padding: EdgeInsets.all(10.0),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(20.0),
        ),
        color: Color.fromRGBO(53, 53, 66, 1),
        child: Text(
          "s'inscrire",
          style: TextStyle(
            color: Color.fromRGBO(255, 255, 255, 1),
            letterSpacing: 1.5,
            fontSize: 18.0,
            fontFamily: 'Poppins',
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
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
                      SizedBox(height: 100),
                      SvgPicture.asset(
                        iconLogo,
                        width: 280,
                      ),
                      SizedBox(height: 50),
                      SvgPicture.asset(iconTitle),
                      SizedBox(height: 50),
                      _buildLoginBtn(),
                      SizedBox(height: 20),
                      _buildSignUpBtn(),
                      SizedBox(height: 30),
                      SvgPicture.asset(iconAllRightReserved),
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
