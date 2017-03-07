@extends('split.master')

@section('content')
    <section>
        <div id="images">
            <img draggable="true" src="http://i.imgur.com/8rmMZI3.jpg" width="120" height="120"></img>
            <img draggable="true" src="http://i.imgur.com/q9aLMza.png" width="120" height="120"></img>
            <img draggable="true" src="http://i.imgur.com/wMU4SFn.jpg" width="120" height="120"></img>
        </div>
        <br><hr>
        <div id="canvas-container">
            <canvas id="canvas" width="800" height="500" style="border:1px solid #ccc"></canvas>
        </div>
    </section>

    @push('jsfooter')
    <script>
        var canvas = new fabric.Canvas('canvas'),
            canvasWidth = document.getElementById('canvas').width,
            canvasHeight = document.getElementById('canvas').height,
            counter = 0,
            rectLeft = 0,
            snap = 20; //Pixels to snap

        canvas.selection = false;




        function findNewPos(distX, distY, target, obj) {
            // See whether to focus on X or Y axis
            if(Math.abs(distX) > Math.abs(distY)) {
                if (distX > 0) {
                    target.setLeft(obj.getLeft() - target.getWidth());
                } else {
                    target.setLeft(obj.getLeft() + obj.getWidth());
                }
            } else {
                if (distY > 0) {
                    target.setTop(obj.getTop() - target.getHeight());
                } else {
                    target.setTop(obj.getTop() + obj.getHeight());
                }
            }
        }

        canvas.on(['object:moving'], function (options) {
            console.log(options);
            // Sets corner position coordinates based on current angle, width and height
            options.target.setCoords();

            // Don't allow objects off the canvas
            if(options.target.getLeft() < snap) {
                options.target.setLeft(0);
            }

            if(options.target.getTop() < snap) {
                options.target.setTop(0);
            }

            if((options.target.getWidth() + options.target.getLeft()) > (canvasWidth - snap)) {
                options.target.setLeft(canvasWidth - options.target.getWidth());
            }

            if((options.target.getHeight() + options.target.getTop()) > (canvasHeight - snap)) {
                options.target.setTop(canvasHeight - options.target.getHeight());
            }

            // Loop through objects
            canvas.forEachObject(function (obj) {
                if (obj === options.target) return;

                // If objects intersect
                if (options.target.isContainedWithinObject(obj) || options.target.intersectsWithObject(obj) || obj.isContainedWithinObject(options.target)) {

                    var distX = ((obj.getLeft() + obj.getWidth()) / 2) - ((options.target.getLeft() + options.target.getWidth()) / 2);
                    var distY = ((obj.getTop() + obj.getHeight()) / 2) - ((options.target.getTop() + options.target.getHeight()) / 2);

                    // Set new position
                    findNewPos(distX, distY, options.target, obj);
                }

                // Snap objects to each other horizontally

                // If bottom points are on same Y axis
                if(Math.abs((options.target.getTop() + options.target.getHeight()) - (obj.getTop() + obj.getHeight())) < snap) {
                    // Snap target BL to object BR
                    if(Math.abs(options.target.getLeft() - (obj.getLeft() + obj.getWidth())) < snap) {
                        options.target.setLeft(obj.getLeft() + obj.getWidth());
                        options.target.setTop(obj.getTop() + obj.getHeight() - options.target.getHeight());
                    }

                    // Snap target BR to object BL
                    if(Math.abs((options.target.getLeft() + options.target.getWidth()) - obj.getLeft()) < snap) {
                        options.target.setLeft(obj.getLeft() - options.target.getWidth());
                        options.target.setTop(obj.getTop() + obj.getHeight() - options.target.getHeight());
                    }
                }

                // If top points are on same Y axis
                if(Math.abs(options.target.getTop() - obj.getTop()) < snap) {
                    // Snap target TL to object TR
                    if(Math.abs(options.target.getLeft() - (obj.getLeft() + obj.getWidth())) < snap) {
                        options.target.setLeft(obj.getLeft() + obj.getWidth());
                        options.target.setTop(obj.getTop());
                    }

                    // Snap target TR to object TL
                    if(Math.abs((options.target.getLeft() + options.target.getWidth()) - obj.getLeft()) < snap) {
                        options.target.setLeft(obj.getLeft() - options.target.getWidth());
                        options.target.setTop(obj.getTop());
                    }
                }

                // Snap objects to each other vertically

                // If right points are on same X axis
                if(Math.abs((options.target.getLeft() + options.target.getWidth()) - (obj.getLeft() + obj.getWidth())) < snap) {
                    // Snap target TR to object BR
                    if(Math.abs(options.target.getTop() - (obj.getTop() + obj.getHeight())) < snap) {
                        options.target.setLeft(obj.getLeft() + obj.getWidth() - options.target.getWidth());
                        options.target.setTop(obj.getTop() + obj.getHeight());
                    }

                    // Snap target BR to object TR
                    if(Math.abs((options.target.getTop() + options.target.getHeight()) - obj.getTop()) < snap) {
                        options.target.setLeft(obj.getLeft() + obj.getWidth() - options.target.getWidth());
                        options.target.setTop(obj.getTop() - options.target.getHeight());
                    }
                }

                // If left points are on same X axis
                if(Math.abs(options.target.getLeft() - obj.getLeft()) < snap) {
                    // Snap target TL to object BL
                    if(Math.abs(options.target.getTop() - (obj.getTop() + obj.getHeight())) < snap) {
                        options.target.setLeft(obj.getLeft());
                        options.target.setTop(obj.getTop() + obj.getHeight());
                    }

                    // Snap target BL to object TL
                    if(Math.abs((options.target.getTop() + options.target.getHeight()) - obj.getTop()) < snap) {
                        options.target.setLeft(obj.getLeft());
                        options.target.setTop(obj.getTop() - options.target.getHeight());
                    }
                }
            });

            options.target.setCoords();

            // If objects still overlap

            var outerAreaLeft = null,
                outerAreaTop = null,
                outerAreaRight = null,
                outerAreaBottom = null;

            canvas.forEachObject(function (obj) {
                if (obj === options.target) return;

                if (options.target.isContainedWithinObject(obj) || options.target.intersectsWithObject(obj) || obj.isContainedWithinObject(options.target)) {

                    var intersectLeft = null,
                        intersectTop = null,
                        intersectWidth = null,
                        intersectHeight = null,
                        intersectSize = null,
                        targetLeft = options.target.getLeft(),
                        targetRight = targetLeft + options.target.getWidth(),
                        targetTop = options.target.getTop(),
                        targetBottom = targetTop + options.target.getHeight(),
                        objectLeft = obj.getLeft(),
                        objectRight = objectLeft + obj.getWidth(),
                        objectTop = obj.getTop(),
                        objectBottom = objectTop + obj.getHeight();

                    // Find intersect information for X axis
                    if(targetLeft >= objectLeft && targetLeft <= objectRight) {
                        intersectLeft = targetLeft;
                        intersectWidth = obj.getWidth() - (intersectLeft - objectLeft);

                    } else if(objectLeft >= targetLeft && objectLeft <= targetRight) {
                        intersectLeft = objectLeft;
                        intersectWidth = options.target.getWidth() - (intersectLeft - targetLeft);
                    }

                    // Find intersect information for Y axis
                    if(targetTop >= objectTop && targetTop <= objectBottom) {
                        intersectTop = targetTop;
                        intersectHeight = obj.getHeight() - (intersectTop - objectTop);

                    } else if(objectTop >= targetTop && objectTop <= targetBottom) {
                        intersectTop = objectTop;
                        intersectHeight = options.target.getHeight() - (intersectTop - targetTop);
                    }

                    // Find intersect size (this will be 0 if objects are touching but not overlapping)
                    if(intersectWidth > 0 && intersectHeight > 0) {
                        intersectSize = intersectWidth * intersectHeight;
                    }

                    // Set outer snapping area
                    if(obj.getLeft() < outerAreaLeft || outerAreaLeft == null) {
                        outerAreaLeft = obj.getLeft();
                    }

                    if(obj.getTop() < outerAreaTop || outerAreaTop == null) {
                        outerAreaTop = obj.getTop();
                    }

                    if((obj.getLeft() + obj.getWidth()) > outerAreaRight || outerAreaRight == null) {
                        outerAreaRight = obj.getLeft() + obj.getWidth();
                    }

                    if((obj.getTop() + obj.getHeight()) > outerAreaBottom || outerAreaBottom == null) {
                        outerAreaBottom = obj.getTop() + obj.getHeight();
                    }

                    // If objects are intersecting, reposition outside all shapes which touch
                    if(intersectSize) {
                        var distX = (outerAreaRight / 2) - ((options.target.getLeft() + options.target.getWidth()) / 2);
                        var distY = (outerAreaBottom / 2) - ((options.target.getTop() + options.target.getHeight()) / 2);

                        // Set new position
                        findNewPos(distX, distY, options.target, obj);
                    }
                }
            });
        });
        canvas.on(['object:added'], function (options) {
            console.log(options);
            // Sets corner position coordinates based on current angle, width and height
            options.target.setCoords();

            // Don't allow objects off the canvas
            if(options.target.getLeft() < snap) {
                options.target.setLeft(0);
            }

            if(options.target.getTop() < snap) {
                options.target.setTop(0);
            }

            if((options.target.getWidth() + options.target.getLeft()) > (canvasWidth - snap)) {
                options.target.setLeft(canvasWidth - options.target.getWidth());
            }

            if((options.target.getHeight() + options.target.getTop()) > (canvasHeight - snap)) {
                options.target.setTop(canvasHeight - options.target.getHeight());
            }

            // Loop through objects
            var toRemove=false;
            canvas.forEachObject(function (obj) {
                if (obj === options.target) return;

                // If objects intersect
                if (options.target.isContainedWithinObject(obj) || options.target.intersectsWithObject(obj) || obj.isContainedWithinObject(options.target)) {

                    var distX = ((obj.getLeft() + obj.getWidth()) / 2) - ((options.target.getLeft() + options.target.getWidth()) / 2);
                    var distY = ((obj.getTop() + obj.getHeight()) / 2) - ((options.target.getTop() + options.target.getHeight()) / 2);

                    // Set new position
                    findNewPos(distX, distY, options.target, obj);
                   // toRemove=true;
                    //return;
                }

                // Snap objects to each other horizontally

                // If bottom points are on same Y axis
                if(Math.abs((options.target.getTop() + options.target.getHeight()) - (obj.getTop() + obj.getHeight())) < snap) {
                    // Snap target BL to object BR
                    if(Math.abs(options.target.getLeft() - (obj.getLeft() + obj.getWidth())) < snap) {
                        options.target.setLeft(obj.getLeft() + obj.getWidth());
                        options.target.setTop(obj.getTop() + obj.getHeight() - options.target.getHeight());
                    }

                    // Snap target BR to object BL
                    if(Math.abs((options.target.getLeft() + options.target.getWidth()) - obj.getLeft()) < snap) {
                        options.target.setLeft(obj.getLeft() - options.target.getWidth());
                        options.target.setTop(obj.getTop() + obj.getHeight() - options.target.getHeight());
                    }
                }

                // If top points are on same Y axis
                if(Math.abs(options.target.getTop() - obj.getTop()) < snap) {
                    // Snap target TL to object TR
                    if(Math.abs(options.target.getLeft() - (obj.getLeft() + obj.getWidth())) < snap) {
                        options.target.setLeft(obj.getLeft() + obj.getWidth());
                        options.target.setTop(obj.getTop());
                    }

                    // Snap target TR to object TL
                    if(Math.abs((options.target.getLeft() + options.target.getWidth()) - obj.getLeft()) < snap) {
                        options.target.setLeft(obj.getLeft() - options.target.getWidth());
                        options.target.setTop(obj.getTop());
                    }
                }

                // Snap objects to each other vertically

                // If right points are on same X axis
                if(Math.abs((options.target.getLeft() + options.target.getWidth()) - (obj.getLeft() + obj.getWidth())) < snap) {
                    // Snap target TR to object BR
                    if(Math.abs(options.target.getTop() - (obj.getTop() + obj.getHeight())) < snap) {
                        options.target.setLeft(obj.getLeft() + obj.getWidth() - options.target.getWidth());
                        options.target.setTop(obj.getTop() + obj.getHeight());
                    }

                    // Snap target BR to object TR
                    if(Math.abs((options.target.getTop() + options.target.getHeight()) - obj.getTop()) < snap) {
                        options.target.setLeft(obj.getLeft() + obj.getWidth() - options.target.getWidth());
                        options.target.setTop(obj.getTop() - options.target.getHeight());
                    }
                }

                // If left points are on same X axis
                if(Math.abs(options.target.getLeft() - obj.getLeft()) < snap) {
                    // Snap target TL to object BL
                    if(Math.abs(options.target.getTop() - (obj.getTop() + obj.getHeight())) < snap) {
                        options.target.setLeft(obj.getLeft());
                        options.target.setTop(obj.getTop() + obj.getHeight());
                    }

                    // Snap target BL to object TL
                    if(Math.abs((options.target.getTop() + options.target.getHeight()) - obj.getTop()) < snap) {
                        options.target.setLeft(obj.getLeft());
                        options.target.setTop(obj.getTop() - options.target.getHeight());
                    }
                }
            });

            options.target.setCoords();

            // If objects still overlap

            var outerAreaLeft = null,
                outerAreaTop = null,
                outerAreaRight = null,
                outerAreaBottom = null,
                toRemove = false;

            canvas.forEachObject(function (obj) {
                if (obj === options.target) return;

                if (options.target.isContainedWithinObject(obj) || options.target.intersectsWithObject(obj) || obj.isContainedWithinObject(options.target)) {

                    var intersectLeft = null,
                        intersectTop = null,
                        intersectWidth = null,
                        intersectHeight = null,
                        intersectSize = null,
                        targetLeft = options.target.getLeft(),
                        targetRight = targetLeft + options.target.getWidth(),
                        targetTop = options.target.getTop(),
                        targetBottom = targetTop + options.target.getHeight(),
                        objectLeft = obj.getLeft(),
                        objectRight = objectLeft + obj.getWidth(),
                        objectTop = obj.getTop(),
                        objectBottom = objectTop + obj.getHeight();

                    // Find intersect information for X axis
                    if(targetLeft >= objectLeft && targetLeft <= objectRight) {
                        intersectLeft = targetLeft;
                        intersectWidth = obj.getWidth() - (intersectLeft - objectLeft);

                    } else if(objectLeft >= targetLeft && objectLeft <= targetRight) {
                        intersectLeft = objectLeft;
                        intersectWidth = options.target.getWidth() - (intersectLeft - targetLeft);
                    }

                    // Find intersect information for Y axis
                    if(targetTop >= objectTop && targetTop <= objectBottom) {
                        intersectTop = targetTop;
                        intersectHeight = obj.getHeight() - (intersectTop - objectTop);

                    } else if(objectTop >= targetTop && objectTop <= targetBottom) {
                        intersectTop = objectTop;
                        intersectHeight = options.target.getHeight() - (intersectTop - targetTop);
                    }

                    // Find intersect size (this will be 0 if objects are touching but not overlapping)
                    if(intersectWidth > 0 && intersectHeight > 0) {
                        intersectSize = intersectWidth * intersectHeight;
                    }

                    // Set outer snapping area
                    if(obj.getLeft() < outerAreaLeft || outerAreaLeft == null) {
                        outerAreaLeft = obj.getLeft();
                    }

                    if(obj.getTop() < outerAreaTop || outerAreaTop == null) {
                        outerAreaTop = obj.getTop();
                    }

                    if((obj.getLeft() + obj.getWidth()) > outerAreaRight || outerAreaRight == null) {
                        outerAreaRight = obj.getLeft() + obj.getWidth();
                    }

                    if((obj.getTop() + obj.getHeight()) > outerAreaBottom || outerAreaBottom == null) {
                        outerAreaBottom = obj.getTop() + obj.getHeight();
                    }

                    // If objects are intersecting, reposition outside all shapes which touch
                    if(intersectSize) {
                        var distX = (outerAreaRight / 2) - ((options.target.getLeft() + options.target.getWidth()) / 2);
                        var distY = (outerAreaBottom / 2) - ((options.target.getTop() + options.target.getHeight()) / 2);

                        // Set new position
                        //findNewPos(distX, distY, options.target, obj);
                        toRemove=true;
                    }
                }
            });

            if (toRemove) {
                console.log("QUIII");
                canvas.remove(options.taget);return;
            }
        });




        /*
         NOTE: the start and end handlers are events for the <img> elements; the rest are bound to
         the canvas container.
         */

        function handleDragStart(e) {
            [].forEach.call(images, function (img) {
                img.classList.remove('img_dragging');
            });
            this.classList.add('img_dragging');
            console.log(e);
        }

        function handleDragOver(e) {
            if (e.preventDefault) {
                e.preventDefault(); // Necessary. Allows us to drop.
            }

            e.dataTransfer.dropEffect = 'copy'; // See the section on the DataTransfer object.
            // NOTE: comment above refers to the article (see top) -natchiketa

            return false;
        }

        function handleDragEnter(e) {
            // this / e.target is the current hover target.
            console.log("ENTER",e);
            this.classList.add('over');

        }

        function handleDragLeave(e) {
            this.classList.remove('over'); // this / e.target is previous target element.
        }

        function handleDrop(e) {
            // this / e.target is current target element.

            if (e.stopPropagation) {
                e.stopPropagation(); // stops the browser from redirecting.
            }

            var img = document.querySelector('#images img.img_dragging');

            console.log('event: ', e);

            var newImage = new fabric.Image(img, {
                width: img.width,
                height: img.height,
                // Set the center of the new object based on the event coordinates relative
                // to the canvas container.
                left: e.layerX,
                top: e.layerY
            });
            canvas.add(newImage);



            return false;
        }

        function handleDragEnd(e) {
            // this/e.target is the source node.
            [].forEach.call(images, function (img) {
                img.classList.remove('img_dragging');
            });
        }


        // Browser supports HTML5 DnD.

        // Bind the event listeners for the image elements
        var images = document.querySelectorAll('#images img');
        [].forEach.call(images, function (img) {
            img.addEventListener('dragstart', handleDragStart, false);
            img.addEventListener('dragend', handleDragEnd, false);
        });
        // Bind the event listeners for the canvas
        var canvasContainer = document.getElementById('canvas-container');
        canvasContainer.addEventListener('dragenter', handleDragEnter, false);
        canvasContainer.addEventListener('dragover', handleDragOver, false);
        canvasContainer.addEventListener('dragleave', handleDragLeave, false);
        canvasContainer.addEventListener('drop', handleDrop, false);


    </script>
    @endpush

@endsection
