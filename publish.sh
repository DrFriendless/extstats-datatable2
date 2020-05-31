#!/usr/bin/env bash

rm -rf dist/*
ng build extstats-datatable
cd dist/extstats-datatable
npm publish
