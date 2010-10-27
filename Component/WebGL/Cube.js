function render() {

    try {

        var SCREEN_WIDTH = window.innerWidth;
        var SCREEN_HEIGHT = window.innerHeight;

        var container;
        var stats;

        var camera;
        var scene;
        var renderer;

        var cube, plane;

        var targetRotation = 0;
        var targetRotationOnMouseDown = 0;

        var mouseX = 0;
        var mouseXOnMouseDown = 0;

        var windowHalfX = window.innerWidth / 2;
        var windowHalfY = window.innerHeight / 2;

        init();
        setInterval(loop, 1000/60);

        function init() {

            container = document.createElement('div');
            document.body.appendChild(container);

            var info = document.createElement('div');
            info.style.position = 'absolute';
            info.style.top = '10px';
            info.style.width = '100%';
            info.style.textAlign = 'center';
            info.style.fontFamily = 'Arial,Verdana';
            info.style.color = '#fff';
            info.innerHTML = 'Drag to spin the cube';
            container.appendChild(info);

            camera = new THREE.Camera( 70, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000 );
            camera.position.y = 150;
            camera.position.z = 500;
            camera.target.position.y = 150;

            scene = new THREE.Scene();

            // Cube

            geometry = new Cube( 200, 200, 200 );

            for (var i = 0; i < geometry.faces.length; i++) {

                geometry.faces[i].color.setRGBA( Math.random() * 0.5, Math.random() * 0.5 + 0.5, Math.random() * 0.5 + 0.5, 1 );
            }

            cube = new THREE.Mesh(geometry, new THREE.MeshFaceColorFillMaterial() );
            cube.position.y = 150;
            scene.addObject( cube );

            // Plane

            plane = new THREE.Mesh( new Plane( 200, 200 ), new THREE.MeshColorFillMaterial( 0xe0e0e0 ) );
            plane.rotation.x = -90 * ( Math.PI / 180 );
            scene.addObject( plane );

            renderer = new THREE.CanvasRenderer();
            renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );

            container.appendChild( renderer.domElement );

            stats = new Stats();
            stats.domElement.style.position = 'absolute';
            stats.domElement.style.top = '0px';
            container.appendChild( stats.domElement );

            document.addEventListener( 'mousedown', onDocumentMouseDown, false );
            document.addEventListener( 'touchstart', onDocumentTouchStart, false );
            document.addEventListener( 'touchmove', onDocumentTouchMove, false );
        }

        //

        function onDocumentMouseDown( event ) {

            event.preventDefault();

            document.addEventListener( 'mousemove', onDocumentMouseMove, false );
            document.addEventListener( 'mouseup', onDocumentMouseUp, false );
            document.addEventListener( 'mouseout', onDocumentMouseOut, false );

            mouseXOnMouseDown = event.clientX - windowHalfX;
            targetRotationOnMouseDown = targetRotation;
        }

        function onDocumentMouseMove( event ) {

            mouseX = event.clientX - windowHalfX;

            targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.02;
        }

        function onDocumentMouseUp( event ) {

            document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
            document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
            document.removeEventListener( 'mouseout', onDocumentMouseOut, false );
        }

        function onDocumentMouseOut( event ) {

            document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
            document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
            document.removeEventListener( 'mouseout', onDocumentMouseOut, false );
        }

        function onDocumentTouchStart( event ) {

            if ( event.touches.length == 1 ) {

                event.preventDefault();

                mouseXOnMouseDown = event.touches[ 0 ].pageX - windowHalfX;
                targetRotationOnMouseDown = targetRotation;

            }
        }

        function onDocumentTouchMove( event ) {

            if ( event.touches.length == 1 ) {

                event.preventDefault();

                mouseX = event.touches[ 0 ].pageX - windowHalfX;
                targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.05;

            }
        }

        //

        function loop() {

            plane.rotation.z = cube.rotation.y += ( targetRotation - cube.rotation.y ) * 0.05;

            renderer.render(scene, camera);
            stats.update();
        }
                
    } catch (e) {

        alert("Error executing 3D script @ Cube.js:");
        alert(e);
    }
};

// Pre-includes
Web.include('Extanium/Component/WebGL/geometry/primitives/Cube.js', 'cubeReady');
Web.include('Extanium/Component/WebGL/geometry/primitives/Plane.js', 'planeReady');

// Render on includes are ready
Web.onMultiReady('cubeReady', 'planeReady', render);