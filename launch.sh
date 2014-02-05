#!/bin/bash
# Launch server in specified mode
if [ $1 = "dev" ]; then
	PORT = 81 nodemon app.js
else
	nodemon app.js