import Drawer from '../entity/Drawer';

export default class DrawerFactory {

    constructor(scene) {
        // threejs scene
        this.scene = scene;
    }

    /**
     * Internal function router
     * @param type  DrawerType Id
     * @param width Drawer width
     * @param length Drawer lenght
     * @param depth Drawer depth
     * @param height Shoulder height
     * @returns {Drawer}
     */
    build(type,width,length,depth,height) {
        let _drawer = {};
        switch (type) {
            case 1:
                //LineaBox 4 lati
                _drawer = this._buildLb4(width,length,depth,height);
                break;
            case 2:
                _drawer = this._buildLb3(width,length,depth,height);
                break;
            case 3:
                _drawer = this._buildLb2(width,length,depth,height);
                break;
            case 4:
                _drawer = this._buildWood(width,length,depth,height);
                break;
        }
        return _drawer;
    }

    /*------------------------------------------------------------------------------------------
    *
    * INTERNAL BUILDERS
    *
    *------------------------------------------------------------------------------------------*/


    /**
     * Build a lineabox 4 lati
     * @param width
     * @param length
     * @param depth
     * @param height
     * @returns {Drawer}
     * @private
     */
    _buildLb4(width,length,depth,height) {
        let _drawer = new Drawer();

        return _drawer;
    }

    _buildLb3(width,length,depth,height) {
        let _drawer = new Drawer();

        return _drawer;
    }

    _buildLb2(width,length,depth,height) {
        let _drawer = new Drawer();

        return _drawer;
    }

    _buildWood(width,length,depth,height) {
        let _drawer = new Drawer();

        return _drawer;
    }

}