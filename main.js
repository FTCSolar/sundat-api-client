let scene, camera, renderer, group, table, pvlayout
function main(){
    var objLoader = new THREE.ObjectLoader();
    scene = new THREE.Scene()
    scene.background = new THREE.Color('#c3d593')
    var light = new THREE.DirectionalLight( 0xffffff, 1 );
    light.position.set( 1, 1, 1 ).normalize();
    scene.add( light );
    camera = new THREE.PerspectiveCamera(150,window.innerWidth/window.innerHeight,1,10000)
    renderer = new THREE.WebGLRenderer()
    const controls = new THREE.OrbitControls(camera, renderer.domElement) 
    setObjectPosition(camera,26000,2500,5000)
    const  loader = new THREE.FileLoader();
    document.getElementById('webgl').appendChild(renderer.domElement)
    loadPvLayoutData(loader)
    table = createTable(JSON.parse(localStorage.getItem('pvlayout-data'))[0].components['ft-jinko-2x30-15'].subcomponent_positions)    
    const tablePositions = JSON.parse(localStorage.getItem('pvlayout-data'))[0].layout_parameters.cache_json
    const dimX = JSON.parse(localStorage.getItem('pvlayout-data'))[0].components['ft-jinko-2x30-15'].dimx
    const dimY = JSON.parse(localStorage.getItem('pvlayout-data'))[0].components['ft-jinko-2x30-15'].dimy
    pvlayout = renderPvLayout(tablePositions,dimX,dimY)
    scene.add(pvlayout)
    update(renderer,scene,camera, controls)
    
}

function update(renderer,scene,camera, controls){
    renderer.setSize(window.innerWidth,window.innerHeight)
    renderer.render(scene,camera)
    controls.update()
    requestAnimationFrame(function(){
        update(renderer,scene,camera, controls)
    })
}

function renderPvLayout(tablesPosition,dimX,dimY){
    var ox1, ox2, oy1, oy2
    var material = new THREE.MeshBasicMaterial({color: '#ff0000', wireframe: true})
    var group = new THREE.Group()
    var tableTest = table.clone()
    tablesPosition.forEach((tablePosition) => {
        var geometry = new THREE.Geometry()
        var table = tableTest.clone() 
        geometry.vertices.push(new THREE.Vector3(tablePosition[0],tablePosition[1],tablePosition[2]))
        geometry.vertices.push(new THREE.Vector3(tablePosition[0] + dimX,tablePosition[1],tablePosition[2]))
        geometry.vertices.push(new THREE.Vector3(tablePosition[0] + dimX,tablePosition[1] + dimY,tablePosition[2]))
        geometry.vertices.push(new THREE.Vector3(tablePosition[0],tablePosition[1] + dimY,tablePosition[2]))
        geometry.faces.push( new THREE.Face3( 0, 1, 2 ) );
        geometry.faces.push( new THREE.Face3( 0, 2, 3 ) );
        ox1 = (geometry.vertices[0].x + geometry.vertices[1].x + geometry.vertices[2].x)/3
        oy1 = (geometry.vertices[0].y + geometry.vertices[1].y + geometry.vertices[2].y)/3
        ox2 = (geometry.vertices[0].x + geometry.vertices[2].x + geometry.vertices[3].x)/3
        oy2 = (geometry.vertices[0].y + geometry.vertices[2].y + geometry.vertices[3].y)/3
        table.position.set((ox1+ox2)/2,(oy1+oy2)/2,0)
        group.add(table)
    })
    group.rotation.x = Math.PI/2
    return group 
}


function createTable(subcomponent_positions){
    group = new THREE.Object3D()
    subcomponent_positions.forEach((position, index) => {
        var geometry = new THREE.Geometry();
        var material = new THREE.MeshPhongMaterial({ color: "#045097", side: THREE.DoubleSide});
        position.forEach((ver, index) => {
            geometry.vertices.push( new THREE.Vector3(ver[0],ver[1],ver[2]) );
        })
        geometry.faces.push( new THREE.Face3( 0, 1, 2 ) ); // counter-clockwise winding order
        geometry.faces.push( new THREE.Face3( 0, 2, 3 ) );
        var mesh = new THREE.Mesh(geometry,material)
        geometry.computeFaceNormals();
        geometry.computeVertexNormals();
        group.add(mesh)
    })

    return group
}

function loadPvLayoutData(loader){
     //load a text file and output the result to the console
    var pv = loader.load(
        // resource URL
        './pvlayout.json',

        // onLoad callback
        function ( data ) {
            localStorage.setItem('pvlayout-data',data)
        },

        // onProgress callback
        function ( xhr ) {
            console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
        },

        // onError callback
        function ( err ) {
            console.error( 'An error happened' );
        }
    );
}


function setObjectPosition(obj, posX, posY, posZ){
    obj.position.set(posX,posY,posZ)
}



main()