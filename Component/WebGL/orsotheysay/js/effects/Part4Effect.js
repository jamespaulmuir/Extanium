var Part4Effect = function ( camera, renderer ) {

	Effect.call( this );

	// Init

	var scene, cube, particle, galaxies, mesh, material, material2;

	scene = new THREE.Scene();

	material = loadImage( new THREE.ParticleBitmapMaterial(), '../Component/WebGL/orsotheysay/files/textures/nova_particle.png' );

	for (var i = 0; i < 80; i++) {

		particle = new THREE.Particle( material );
		particle.position.x = Math.random() * 10000 - 5000;
		particle.position.y = Math.random() * 10000 - 5000;
		particle.position.z = Math.random() * 10000 - 8000;
		particle.scale.x = particle.scale.y = Math.random() * 1.5 + 0.5;
		scene.addObject( particle );
	}

	material = loadImage( new THREE.ParticleBitmapMaterial(), '../Component/WebGL/orsotheysay/files/textures/nova.png' );
	material2 = loadImage( new THREE.MeshBitmapUVMappingMaterial(), '../Component/WebGL/orsotheysay/files/textures/galaxy.jpg' );

	galaxies = [];

	for ( var i = 0; i < 15; i ++ ) {

		particle = new THREE.Particle( material );
		particle.position.x = Math.random() * 10000 - 5000;
		particle.position.y = Math.random() * 10000 - 5000;
		particle.position.z = Math.random() * 10000 - 8000;
		scene.addObject( particle );

		galaxies[ i ] = mesh = new THREE.Mesh( new Plane( 400, 400, 2, 2 ), material2 );
		mesh.position.x = particle.position.x;
		mesh.position.y = particle.position.y;
		mesh.position.z = particle.position.z;
		mesh.rotation.x = - 90 * Math.PI / 180;
		mesh.rotation.y =  Math.random() * Math.PI;
		mesh.doubleSided = true;
		scene.addObject( mesh );

	}

	//

	function loadImage( material, path ) {

		var image = new Image();

		image.onload = function () {

			material.bitmap = this;

		};

		image.src = path;
        material.bitmap = image;

		return material;

	}

	//

	this.show = function () {

		renderer.domElement.getContext( '2d' ).globalCompositeOperation = 'lighter';

	};

	this.update = function ( time ) {

		for ( var i = 0; i < 15; i ++ ) {

			mesh = galaxies[ i ];
			mesh.rotation.z = - time * 2;

		}

		renderer.clear();
		renderer.render( scene, camera );

	};

};


Part4Effect.prototype = new Effect();
Part4Effect.prototype.constructor = Part4Effect;
