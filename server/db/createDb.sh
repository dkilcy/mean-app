#!/bin/bash

#use app
mongo app --eval "db.widgets.drop()"

mongo app --eval "db.users.drop()"
mongo app --eval "db.workflowModel.drop()"
mongo app --eval "db.role.drop()"
mongo app --eval "db.workflow.drop()"

mongoimport --jsonArray --db app -c widgets < widgets.json

mongoimport --jsonArray --db app -c users < users.json
mongoimport --jsonArray --db app -c workflowModel < workflowModel.json
mongoimport --jsonArray --db app -c role < role.json
mongoimport --jsonArray --db app -c workflow < workflow.json

