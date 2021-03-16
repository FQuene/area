class Action_Area {
  String name, image, color;
  Map action;
  Action_Area({this.name, this.image, this.color, this.action});

  bool checkIfInfoIsNull() {
    return [name, image, color].contains(null);
  }

  bool checkIfActionIsNull() {
    return [action].contains(null);
  }

  void wipeData() {
    this.name = "";
    this.image = "";
    this.color = "";
    this.action = {};
  }
}

class Reaction_Area {
  String name, image, color;
  Map reaction;

  Reaction_Area({this.name, this.image, this.color, this.reaction});

  void wipeData() {
    this.name = "";
    this.image = "";
    this.color = "";
    this.reaction = {};
  }

  bool checkIfInfoIsNull() {
    return [name, image, color].contains(null);
  }

  bool checkIfReactionIsNull() {
    return [reaction].contains(null);
  }
}
