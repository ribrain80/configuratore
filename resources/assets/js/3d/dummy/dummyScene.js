/**
 * Dummy Scene Class for made Vuex actions easier
 */
export default class Scene {
    constructor() {
        // # no op
    }

    /**
     * Fake method
     */
    add() {
        // # no op
    }

    /**
     * Fake method
     */
    remove() {
        // # no op
    }

    /**
     * Return an empty array istead of
     * @returns {Array}
     */
    children() {
        return [];
    }

    /**
     * @todo check if it is the right name
     * @returns {{}}
     */
    getObjectByName() {
        return {};
    }
}
