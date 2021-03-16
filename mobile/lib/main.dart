import 'package:flutter/material.dart';
import 'auth/auth.dart';
import 'auth/login.dart';
import 'auth/register.dart';
import 'homePage/homePage.dart';

void main() => runApp(MaterialApp(
        debugShowCheckedModeBanner: false,
        initialRoute: '/auth',
        routes: {
          '/auth': (context) => Auth(),
          '/login': (context) => Login(),
          '/register': (context) => Register(),
          '/homePage': (context) => HomePage(),
        }));
