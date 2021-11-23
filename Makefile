default: all;

FIREFOX_VERSION = firefoxdeveloperedition

install:
	command -v npm >/dev/null 2>&1 || { echo >&2 "node and npm must be installed first. Aborting."; exit 1; }
	command -v web-ext >/dev/null 2>&1 || npm install --global web-ext
	command -v eslint >/dev/null 2>&1 || npm install --global eslint

watch_ignored = --watch-ignored *.md

browser_opts_ff = --firefox=$(FIREFOX_VERSION) --firefox-profile=web-ext --profile-create-if-missing

run-firefox:
	web-ext run --browser-console $(browser_opts_ff) $(watch_ignored)

browser_opts_chrome = --target=chromium

run-chrome:
	web-ext run --browser-console $(browser_opts_chrome) $(watch_ignored)

build:
	web-ext build --overwrite-dest --ignore-files="assets/"

test:
	eslint js/
	web-ext lint # --ignore-files

clean:
	rm web-ext-artifacts/*.zip

all: install build test

.PHONY: default install run build test all
