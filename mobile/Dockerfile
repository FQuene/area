FROM cirrusci/flutter

COPY . /client_mobile_area

WORKDIR /client_mobile_area

RUN flutter pub get

RUN flutter build apk

CMD ["sleep","3600"]