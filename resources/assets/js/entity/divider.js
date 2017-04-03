export default class Divider {
    constructor(category,subCategory,realWidth,realHeight,computedWidth,computedHeight,orientation,tmpImg) {
        this.category = category;
        this.subCategory = subCategory;
        this.realWidth = realWidth;
        this.realHeight = realHeight;
        this.computedWidth = computedWidth;
        this.computedHeight = computedHeight;
        this.x = 0;
        this.y = 0;
        this.orientation = orientation;
        this.id = new Date();   //we can be sure that at the same time only one object can be dragged on the canvas container so it is unique
        this.sku = "asap";
        this.tmpImg = tmpImg;
       // this.realImg = "";
        this.realImg = "http://lorempixel.com/output/nature-q-c-640-480-8.jpg";  //FAKE just for check
    }

    get readyFor3D() {
        return this.sku!="";
    }

    get image() {
        return (this.readyFor3D)?this._calcRealImg:this.tmpImg;
    }

    get area() {
        return this._calcArea()
    }


    //PRIVATE
    _calcArea() {
        return this.realWidth * this.realHeight;
    }

    _calcRealImg() {
        if (!this.realImg) {
            this.realImg="path to image SKU + Orientation";
        }
        return this.realImg;
    }


}