#!/usr/bin/env bash

ng build --prod --aot false --build-optimizer false

docker build -t finance-web .
