[![GitHub CI](https://github.com/prplecake/mastopinner/actions/workflows/main.yml/badge.svg)](https://github.com/prplecake/mastopinner/actions/workflows/main.yml)
[![Mozilla Add-on](https://img.shields.io/amo/users/mastopinner)](https://addons.mozilla.org/en-US/firefox/addon/mastopinner/)
[![CodeFactor](https://www.codefactor.io/repository/github/prplecake/mastopinner/badge)](https://www.codefactor.io/repository/github/prplecake/mastopinner)

# MastoPinner

This extension adds a thumb-tack button to the Mastodon web UI
allowing you to easily save a status to your pinboard account.

Right now the extension saves the status text as the bookmark title,
trimming to the length limit, if necessary. If there's more, the status
will be saved in the description.

Get the extension for [Firefox][amo].

[amo]:https://addons.mozilla.org/en-US/firefox/addon/mastopinner/

* **Works in the vanilla web UI**
* **Works in the glitch-soc web UI**

## Known Issues

* Thumb-tack icon doesn't know up on single post views ([#7](https://github.com/prplecake/mastopinner/issues/7))
* Fails to save posts that just contain an image ([#10](https://github.com/prplecake/mastopinner/issues/10))
* New lines don't translate to spaces in bookmark title ([#13](https://github.com/prplecake/mastopinner/issues/13))

[See more](https://github.com/prplecake/mastopinner/issues)

## Contributing

### Building

1. Clone the repository
2. `cd mastopinner && make`

### Live reloading

Using Firefox Developer Edition:

```text
make run-firefox
```

This will create a temporary profile and target [Firefox Developer Edition][0].

Using Chrome:

```text
make run-chrome
```

[0]: https://www.mozilla.org/en-US/firefox/developer/

## License

This extension is licensed under the terms of the AGPL v3 license.
(See LICENSE)
