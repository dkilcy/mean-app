#!/bin/bash

#use app
mongo app --eval "db.widgets.drop()"
mongo app --eval "db.users.drop()"

mongoimport --jsonArray --db app -c widgets < widgets.json
mongoimport --jsonArray --db app -c users < users.json


