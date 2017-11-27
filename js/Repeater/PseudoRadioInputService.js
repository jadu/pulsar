class PseudoRadioInputService {
    /**
     * Create pseudo radio input behaviour in the
     * absence of a name attribute
     * @param root {HTMLElement}
     * @param pseudoName {string}
     */
    constructor (
        root,
        pseudoName
    ) {
        this.root = root;
        this.name = {
            init: 'name',
            pseudo: pseudoName
        };
    }

    /**
     * Create initial radio state for each matching input
     */
    init () {
        let index = 1;

        this.state = [].slice.call(this.root.querySelectorAll('[type="radio"]'))
            .reduce((state, input) => {
                const key = input.getAttribute(this.name.init);

                if (state[key] === undefined) {
                    index = 1;
                    state[key] = [];
                }

                input.setAttribute('data-pseudo-radio-id', index);
                state[key].push({ value: input.value, checked: input.checked });
                index++;

                return state;
            }, {});

        this.listen();
    }

    /**
     * Listen ofr input changes and update state
     */
    listen () {
        this.root.addEventListener('change', event => {
            const { target } = event;

            if (target.type === 'radio') {
                this.updateState(
                    target.getAttribute(this.name.pseudo),
                    target.value
                );
            }
        });
    }

    /**
     * Update state as a result of an input
     * @param name
     * @param value
     */
    updateState (name, value) {
        this.state[name] = this.state[name].map(radio => {
            const checked = value === undefined ? radio.checked : radio.value === value;
            const input = this.root.querySelectorAll(
                `[${this.name.pseudo}="${name}"][value="${radio.value}"]`
            );

            // update state object
            radio.checked = checked;
            // update DOM
            [].slice.call(input).forEach(i => i.checked = checked);

            return radio;
        });
    }

    /**
     * Refresh a radio group based on the internal state
     */
    refresh () {
        Object.keys(this.state).forEach(group => {
            this.updateState(group);
        });
    }
}

module.exports = PseudoRadioInputService;
