[![Mozilla Add-on](https://img.shields.io/amo/users/mastopinner?style=flat-square)](https://addons.mozilla.org/en-US/firefox/addon/mastopinner/)

# MastoPinner

This extension adds a thumb-tack button to the Mastodon web UI
allowing you to easily save a status to your pinboard account.

At this time this is very much still a work in progress.

Right now the extension saves the status text as the bookmark title,
trimming to the length limit, if necessary. If there's more, the status
will be saved in the description.

This is currently only tested with the "simple" web interface.

Get the extension for [Firefox][amo].

[amo]:https://addons.mozilla.org/en-US/firefox/addon/mastopinner/

## Known Issues

* Extension continues to ask for Pinboard API token, or just doesn't
work, until the webpage is refreshed.
* Thumb-tack icon doesn't know up on single post views

## Contributing

### Building

1. Clone the repository
2. `make all`

### Live reloading

	make run

This will create a temporary profile and target [Firefox Developer Edition][0].

[0]: https://www.mozilla.org/en-US/firefox/developer/

## License

This extension is licensed under the terms of the AGPL v3 license.
(See LICENSE)
