#!/bin/bash
#构建最新版本的docker镜像
BUILD_TAG=`cat package.json | jq -r '.version'` docker compose build