import 'package:flutter/material.dart';
import 'dart:async';
import 'package:intl/intl.dart';

class Get_date_hour {
  DateTime selectedDate = DateTime.now();
  TimeOfDay selectedTime = TimeOfDay.now();

  Future<String> getDate(context) async {
    final DateTime picked = await showDatePicker(
        context: context,
        initialDate: selectedDate,
        firstDate: DateTime(2015, 8),
        lastDate: DateTime(2101));
    if (picked != null && picked != selectedDate) {
      selectedDate = picked;
    }

    String formattedDate = DateFormat('yyyy-MM-dd').format(picked);
    return formattedDate;
  }

  Future<String> getTime(BuildContext context) async {
    final TimeOfDay picker = await showTimePicker(
        context: context,
        initialTime: selectedTime,
        builder: (context, Widget child) {
          return MediaQuery(
              data:
                  MediaQuery.of(context).copyWith(alwaysUse24HourFormat: true),
              child: child);
        });
    if (picker != null && picker != selectedTime) {
      selectedTime = picker;
      var tmp = selectedTime.toString().replaceAll(new RegExp(r"\D"), "");
      var tmp1 = tmp.substring(0, 2);
      var tmp2 = tmp.substring(tmp.length - 2);
      var result = tmp1 + ":" + tmp2;
      return result;
    }
  }
}
