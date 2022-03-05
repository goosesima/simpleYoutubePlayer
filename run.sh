#!/bin/sh
export LD_PRELOAD=/opt/nwjs/libffmpeg.so
# ./nw --nwapp=.
./nw --ozone-platform-hint=auto --nwapp=.