#!/bin/bash -e

set -ue

sleep 1

zellij action go-to-tab-name run
zellij action write-chars "just dev"
zellij action write 13

zellij action go-to-tab-name setup
zellij action close-tab

zellij action go-to-tab-name root
