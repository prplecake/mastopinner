const ACTION_BAR_SELECTORS = [
    'div.status__action-bar'
];

class MastoPinnerUI {
    constructor(status, { send }) {
        this.status = status;
        this.actions = { send };
        this.render();
    }

    render() {
        this.actionBar = this.status.querySelector(ACTION_BAR_SELECTORS);

        // define node to insert
        let nodeHtml = `<button id="mastopinner-button"
            aria-label="Save to Pinboard"
            title="Save to Pinboard" class="status__action-bar-button thumb-tack-icon icon-button"
            tabindex="0">
            <i role="img" class="fa fa-thumb-tack fa-fw" aria-hidden="true"></i>
        </button>`;

        // insert the node
        let b = this.actionBar.querySelector('button#mastopinner-button');
        if (b == null) {
            this.actionBar.insertAdjacentHTML(
                'beforeend',
                nodeHtml
            );
            let c = this.actionBar.querySelector('button#mastopinner-button');
            c.style.fontSize = "18px";
            c.style.width = "23.1429px";
            c.style.height = "23.1429px";
            c.style.lineHeight = "18px";
            c.style.marginLeft = "18px";
        }

        // add event listener
        //console.log(this.status.classList.contains('mastopinner-rendered'));
        if (!this.status.classList.contains('mastopinner-rendered')) {
            this.actionBar.querySelector('#mastopinner-button').addEventListener('click', this._mastoPinnerButtonClicked.bind(this));
        }

        this.status.classList.add('mastopinner-rendered');
    }

    // Events

    _mastoPinnerButtonClicked() {
        this.status.url = this.status.querySelector('a.status__relative-time').href;
        this.status.actor = this.status.querySelector('span.display-name__account').textContent;
        this.status.content = this.status.querySelector('div.status__content__text').innerText;
        let status = {
            url: this.status.url,
            actor: this.status.actor,
            description: this.status.content
        };
        this.actions.send(status);
    }

}