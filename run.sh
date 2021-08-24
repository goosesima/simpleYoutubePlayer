#!/bin/sh
LIBVA_DRIVER_NAME=iHD DISPLAY=:0 ./nw & disown && kill -KILL $$
