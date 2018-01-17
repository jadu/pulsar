const _ = require('lodash');

class PseudoRadioInputService {
    /**
     * Create pseudo radio input behaviour in the
     * absence of a name attribute
     * @param root {HTMLElement}
     * @param pseudoNameAttr
     */
    constructor (
        root,
        pseudoNameAttr
    ) {
        this.root = root;
        this.name = {
            init: 'name',
            pseudo: pseudoNameAttr
        };
    }

    /**
     * Create initial radio state for each matching input
     */
    init () {
        let id = 1;

        this.state = [].slice.call(this.root.querySelectorAll('[type="radio"]'))
            .reduce((state, input) => {
                const key = input.getAttribute(this.name.init);

                if (state[key] === undefined) {
                    id = 1;
                    state[key] = [];
                }

                input.setAttribute('data-pseudo-radio-id', id);
                state[key].push({ value: input.value, checked: input.checked });
                id++;

                return state;
            }, {});

        this.root.addEventListener('change', this.handleChange.bind(this));
    }

    /**
     * Listen for input changes and update state
     */
    handleChange (event) {
        const { target } = event;

        if (target.type === 'radio') {
            this.updateState(
                target.getAttribute(this.name.pseudo),
                target.value
            );
        }
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
     * Set the state of the radio inputs based on an external state
     * @param state {Object.<string, { value: { value: {string}, selected: {boolean}, ref: {HTMLElement} }[] }>}
     */
    setState (state) {
        Object.keys(state).forEach(input => {
            if (this.state[input] !== undefined) {
                const selected = _.find(state[input].value, i => i.selected);
                // Set state using the selected input in the state argument
                if (selected) {
                    this.updateState(input, selected.value);
                }
            }
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
