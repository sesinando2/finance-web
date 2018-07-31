#!/usr/bin/env bash

ng build --aot false --build-optimizer false

docker build -t finance-web-local .
