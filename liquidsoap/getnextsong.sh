#!/bin/sh

echo python manage.py getnextsong | ssh ls@ls-scheduler
