"use strict";
const Scene = function(gl) {
  this.vsIdle = new Shader(gl, gl.VERTEX_SHADER, "idle_vs.essl");
  this.fsSolid = new Shader(gl, gl.FRAGMENT_SHADER, "solid_fs.essl");

  this.fstextured = new Shader(gl, gl.FRAGMENT_SHADER, "textured_fs.essl");
  this.vstextured = new Shader(gl, gl.VERTEX_SHADER, "textured_vs.essl");
  this.texturedProgram = new TexturedProgram(gl, this.vstextured, this.fstextured);
  this.solidProgram = new Program(gl, this.vsIdle, this.fsSolid);
  
  

  //this.triangleGeometry = new TriangleGeometry(gl);
  //this.TexturedIndexedTrianglesGeometry = new TexturedIndexedTrianglesGeometry(gl, "slowpoke/Slowpoke.json" );
  
  
  this.skyCubeTexture = new
  TextureCube(gl, [
    "slowpoke/sky.jpg",
    "slowpoke/sky.jpg",
    "slowpoke/sky.jpg",
    "slowpoke/sky.jpg",
    "slowpoke/sky.jpg",
    "slowpoke/sky.jpg",
    ]
    ); 

  //Mirror Object 
  
  this.enmapFsShader = new Shader(gl, gl.FRAGMENT_SHADER, "envmap_fs.essl");
  this.enmapProgram = new TexturedProgram(gl, this.vstextured, this.enmapFsShader);
  this.enmapMaterial = new Material(gl,this.enmapProgram);
  this.enmapMaterial.envmapTexture.set(this.skyCubeTexture);
  this.envmapMesh = new MultiMesh(gl, "slowpoke/Slowpoke.json",[this.enmapMaterial,this.enmapMaterial]);
  this.mirrorObject = new GameObject(this.envmapMesh);
  


  //Mirror Background 
//Mirror Background 
  this.envbgFragShader = new Shader(gl, gl.FRAGMENT_SHADER, "envbg_fs.essl");
  this.envbgVertShader = new Shader(gl, gl.VERTEX_SHADER, "envbg_vs.essl");
  this.bgProgram = new TexturedProgram(gl,this.envbgVertShader,this.envbgFragShader);
  this.bgMaterial = new Material(gl, this.bgProgram);
  this.texturedQuadGeometry = new TexturedQuadGeometry(gl);
  this.bgMesh = new Mesh(this.texturedQuadGeometry,this.bgMaterial);
  this.bgMaterial.cubeTexture.set(this.skyCubeTexture);
  this.backgroundObject = new GameObject(this.bgMesh);


  //The Matrix Revolutions 
  this.carMaterial = new Material(gl, this.texturedProgram);
  this.carMaterial.colorTexture.set(new Texture2D(gl, "slowpoke/chevy/chevy.png"));
  this.bodyMesh = new MultiMesh(gl,"slowpoke/chevy/chassis.json",[this.carMaterial] );
  this.wheelMesh = new MultiMesh(gl,"slowpoke/chevy/wheel.json",[this.carMaterial] );


  this.chassis = new GameObject(this.bodyMesh);
  this.wheel1 = new GameObject(this.wheelMesh);
  this.wheel2 = new GameObject(this.wheelMesh);
  this.wheel3 = new GameObject(this.wheelMesh);
  this.wheel4 = new GameObject(this.wheelMesh);

  this.wheel1.parent=this.chassis;
  this.wheel2.parent=this.chassis;
  this.wheel3.parent=this.chassis;
  this.wheel4.parent=this.chassis;

  this.chassis.scale.set(0.5,0.7,0.5);
  this.wheel1.scale.set(0.9,0.9,0.9);
  this.wheel2.scale.set(0.9,0.9,0.9);
  this.wheel3.scale.set(0.9,0.9,0.9);
  this.wheel4.scale.set(0.9,0.9,0.9);


  this.wheel1.position.set(-7,-1,-11);
  this.wheel2.position.set(7,-1,-11);
  this.wheel3.position.set(-7,-1,13);
  this.wheel4.position.set(7,-1,13);


  this.chassis.position.set(-15,8,-15);

  //race track 
  
  this.wallMaterial = new Material(gl,this.texturedProgram);
  this.wallMaterial.colorTexture.set(new Texture2D(gl,"slowpoke/wall1.jpg"));
  this.wallMesh = new MultiMesh(gl,"slowpoke/circlewalls.json",[this.wallMaterial]);
  this.wall = new GameObject(this.wallMesh);
  this.wall.position.set(10,0,0);
  this.wall.scale.set(0.5,20,1);

  

  this.camera = new PerspectiveCamera();

  this.timeAtLastFrame = new Date().getTime();
  this.timeAtFirstFrame = new Date().getTime();

  
  //this.texturedMaterial.envmapTexture.set( 
    //this.skyCubeTexture);


  //Ground Zero 
  this.groundShader = new Shader(gl, gl.FRAGMENT_SHADER, "ground_fs.essl");
  this.groundProgram = new TexturedProgram(gl, this.vstextured, this.groundShader);
  this.groundMaterial = new Material(gl, this.groundProgram);
  this.groundMaterial.colorTexture.set(new Texture2D(gl, "slowpoke/flowerBG.jpg"));
  this.secQuadGeomatry = new SecQuadGeomatry(gl);
  this.groundMesh = new Mesh(this.secQuadGeomatry, this.groundMaterial);
  this.groundObject = new GameObject(this.groundMesh);


  //Ground as a winning sign
  this.winMaterial = new Material(gl, this.groundProgram);
  this.winMaterial.colorTexture.set(new Texture2D(gl, "slowpoke/win.jpg"));
  this.secQuadGeomatry1 = new SecQuadGeomatry(gl);
  this.winMesh = new Mesh(this.secQuadGeomatry1, this.winMaterial);
  this.winGround = new GameObject(this.winMesh);
  
  //Pokemon
  //this.texturedMaterial = new Material(gl, this.texturedProgram);
  this.material = new Material(gl, this.solidProgram);
  this.subMaterial1 = new Material(gl, this.texturedProgram);
  this.subMaterial2 = new Material(gl, this.texturedProgram);
  this.subMaterial1.colorTexture.set(new Texture2D(gl, "slowpoke/YadonDh.png"));
  this.subMaterial2.colorTexture.set(new Texture2D(gl, "slowpoke/YadonEyeDh.png"));
  //this.texturedMaterial.colorTexture.set(new Texture2D(gl, "asteroid.png"));
  this.material.solidColor.set(0.1, 0.4, 0.5);
  this.multiMesh = new MultiMesh(gl, "slowpoke/Slowpoke.json", [this.subMaterial1, this.subMaterial2]);
  this.multiMeshObject = new GameObject(this.multiMesh);

  //Trees -- Draw a forest 
  this.treeMaterial = new Material(gl, this.texturedProgram);
  this.treeMaterial.colorTexture.set(new Texture2D(gl, "slowpoke/tree.png"));
  this.treeMesh = new MultiMesh(gl, "slowpoke/tree.json", [this.treeMaterial]);
  this.trees = [];
  let j = -250;

  for (let i = 0; i<=30; i++) {

      const tree = new GameObject(this.treeMesh);
      this.trees.push(tree);
      this.trees[i].position.set(0,0,j);
      this.trees[i].scale.set(0.5,1,0.5);
      j+=40;
    
  }

  j = -250;

  for (let i = 31; i<=60; i++) {
    const tree = new GameObject(this.treeMesh);
    this.trees.push(tree);
    this.trees[i].position.set(-20,0,j);
    this.trees[i].scale.set(0.5,1,0.5);
    j+=40;
  }

    j = -250;

  for (let i = 61; i<=90; i++) {
    const tree = new GameObject(this.treeMesh);
    this.trees.push(tree);
    this.trees[i].position.set(-40,0,j);
    this.trees[i].scale.set(0.5,1,0.5);
    j+=40;
  }

  j = -250;

  for (let i = 91; i<=120; i++) {
    const tree = new GameObject(this.treeMesh);
    this.trees.push(tree);
    this.trees[i].position.set(20,0,j);
    this.trees[i].scale.set(0.5,1,0.5);
    j+=40;
  }

    j = -250;

  for (let i = 121; i<=150; i++) {
    const tree = new GameObject(this.treeMesh);
    this.trees.push(tree);
    this.trees[i].position.set(40,0,j);
    this.trees[i].scale.set(0.5,1,0.5);
    j+=40;
  }


    j = -250;

  for (let i = 151; i<=180; i++) {
    const tree = new GameObject(this.treeMesh);
    this.trees.push(tree);
    this.trees[i].position.set(-60,0,j);
    this.trees[i].scale.set(0.5,1,0.5);
    j+=40;
  }



    j = -250;

  for (let i = 181; i<=210; i++) {
    const tree = new GameObject(this.treeMesh);
    this.trees.push(tree);
    this.trees[i].position.set(60,0,j);
    this.trees[i].scale.set(0.5,1,0.5);
    j+=40;
  }



    j = -250;

  for (let i = 211; i<=240; i++) {
    const tree = new GameObject(this.treeMesh);
    this.trees.push(tree);
    this.trees[i].position.set(-80,0,j);
    this.trees[i].scale.set(0.5,1,0.5);
    j+=40;
  }



    j = -250;

  for (let i = 241; i<=270; i++) {
    const tree = new GameObject(this.treeMesh);
    this.trees.push(tree);
    this.trees[i].position.set(80,0,j);
    this.trees[i].scale.set(0.5,1,0.5);
    j+=40;
  }

      j = -250;

  for (let i = 271; i<=300; i++) {
    const tree = new GameObject(this.treeMesh);
    this.trees.push(tree);
    this.trees[i].position.set(-100,0,j);
    this.trees[i].scale.set(0.5,1,0.5);
    j+=40;
  }

      j = -250;

  for (let i = 301; i<=330; i++) {
    const tree = new GameObject(this.treeMesh);
    this.trees.push(tree);
    this.trees[i].position.set(100,0,j);
    this.trees[i].scale.set(0.5,1,0.5);
    j+=40;
  }

      j = -250;

  for (let i = 331; i<=360; i++) {
    const tree = new GameObject(this.treeMesh);
    this.trees.push(tree);
    this.trees[i].position.set(-120,0,j);
    this.trees[i].scale.set(0.5,1,0.5);
    j+=40;
  }

      j = -250;

  for (let i = 361; i<=390; i++) {
    const tree = new GameObject(this.treeMesh);
    this.trees.push(tree);
    this.trees[i].position.set(120,0,j);
    this.trees[i].scale.set(0.5,1,0.5);
    j+=40;
  }


  //Pokemon with spotlight 
  /**
  this.pointLightShader = new Shader(gl, gl.FRAGMENT_SHADER, "pointlight_fs.essl");
  this.pointLightProgram = new TexturedProgram(gl, this.vstextured, this.pointLightShader);
  this.pointLightMaterial1 = new Material(gl, this.pointLightProgram);
  this.pointLightMaterial2 = new Material(gl, this.pointLightProgram);
  this.pointLightMaterial1.colorTexture.set(new Texture2D(gl, "slowpoke/YadonDh.png"));
  this.pointLightMaterial2.colorTexture.set(new Texture2D(gl, "slowpoke/YadonEyeDh.png"));
  this.pointLightMesh = new MultiMesh(gl, "slowpoke/Slowpoke.json", [this.pointLightMaterial1, this.pointLightMaterial2]);
  this.pointLightObject = new GameObject(this.pointLightMesh);
  this.pointLightObject.position.set(5,0,15);
  this.pointLightObject.scale.set(0.5,1,0.5);
  **/

    //Create and set up gmae objects
  this.gameObjects = [];

  

  const genericMove = function(t, dt){
    // PRACTICAL
    //pos += asteroid.velocity + dt;
    //this.velocity.addScaled();
    const acceleration = new Vec3(this.force).
          mul(this.invMass);
    const angularAcce = this.torque * this.invAngularMass;

    this.velocity.addScaled(dt, acceleration);
    this.velocity.mul(Math.pow(this.backDrag,dt));
    
    //this.velocity *= Math.pow(this.drag,dt);
    this.angularVelocity += dt * angularAcce;
    this.angularVelocity *= Math.pow(this.angularDrag,dt)
    this.orientation += dt* this.angularVelocity;

    const ahead = new Vec3(Math.cos(this.orientation),0,Math.sin(this.orientation));

    this.aheadVelocity = ahead.times(ahead.dot(this.velocity));
    this.sideVelocity = this.velocity.minus(this.aheadVelocity);

    this.aheadVelocity.mul(Math.pow(this.backDrag,dt));
    this.sideVelocity.mul(Math.pow(this.sideDrag,dt));
    this.velocity = this.aheadVelocity.plus(this.sideVelocity);
    this.position.addScaled(dt, this.velocity);
  };

    //multiMesh.position.setRandom(new Vec3(-12, -12, 0.5), new Vec3(12, 12, 0.5) );

    //Make the pokemon move at random speed random direction
    this.multiMeshObject.force.set(0,0,0);
    this.multiMeshObject.velocity.setRandom(new Vec3(-6, 0, -1), new Vec3(6, 0, 5));
    //this.multiMeshObject.acceleration
    this.multiMeshObject.angularVelocity = Math.random(-0.1,0.1 );    
    //this.multiMeshObject.sideVelocity.setRandom(new Vec3(-2, -2, 0), new Vec3(2, 2, 0));
    //this.multiMeshObject.aheadVelocity.setRandom(new Vec3(0, 0, 0), new Vec3(0, 0, 5));
    
    this.multiMeshObject.move = genericMove;
    this.gameObjects.push(this.multiMeshObject);
 

  this.chassis.backDrag = 0.9;
  this.chassis.sideDrag = 0.5;
  this.chassis.angularDrag = 0.5;

  this.chassis.control = function(t, dt, keysPressed, colliders){
    //PRACTICAL
    this.force.set(0,0,0);
    this.torque = 1;
    this.thrust = 0;

    if(keysPressed.UP) {
      this.thrust += 5;
      //this.force.z +=5;

    } // do same for DOWN
    if(keysPressed.DOWN) {
      //this.force.z -= 5;
      this.thrust -=5;
    }
    this.torque = 0;
    if(keysPressed.LEFT) {
      //this.force.x -=5;
      //this.torque += 5;
      this.torque+=0.5;
      
      //this.thrust += 1;
    }
    if (keysPressed.RIGHT) {
      //this.force.x +=5;
      //this.torque -=5;
      this.torque -=0.5;
      
      //this.thrust -=1;

    } // do same for RIGHT 
    // compute ahead vector from orientation; force as ahead*thrust
    this.ahead = new Vec3(Math.sin(this.orientation),0,Math.cos(this.orientation));
    this.force = this.ahead.times(this.thrust);

    //Handle collisions between the car and all the trees 
    for (let i =0; i<colliders.length; i++) {
      const a = colliders[i];
      if(this == a) continue;
      const diff = this.position.minus(a.position);
      if (diff.length() <10 && (diff.length()>=-5)) {

        const distance = this.position.minus(a.position).normalize();
        this.velocity.set(0,0,0);
        this.force.set(0,0,0);
        //this.backDrag = 10000;
        //this.sideDrag = 10000;
        this.position.addScaled(0.01,distance);
      }
    }

  };  

   this.gameObjects.push(this.chassis);
   //this.gameObjects.push(this.wall);

  this.chassis.move = genericMove;



  
  //this.gameObjects.push(this.mirrorObject);
 

  //this.gameObjects.push(this.pointLightObject);
   this.gameObjects[0].position.set(-5,1,-25); //pokemon
  this.gameObjects[1].position.set(-10,2,-25); //car 
  //this.gameObjects[1].position.set(0,0,-15);
  this.groundObject.position.set(0,-1,0);
  //this.finishLine.position.set(0,10,0);
  //this.backgroundObject.position.set(0,0,0);

  //this.wheel.parent = this.car;

    gl.enable(gl.BLEND);
    gl.enable(gl.DEPTH_TEST);
     gl.blendFunc(
    gl.SRC_ALPHA,
    gl.ONE_MINUS_SRC_ALPHA);


this.gameObjects[0].position.set(5,1,-15); //pokemon
  this.gameObjects[1].position.set(-10,2,-25); //car 
  //this.gameObjects[1].position.set(0,0,-15);
  this.groundObject.position.set(0,-1,0);
  

};

Scene.prototype.update = function(gl, keysPressed) {


  //jshint bitwise:false
  //jshint unused:false
  //const timeAtThisFrame = new Date().getTime();
  //const dt = (timeAtThisFrame - this.timeAtLastFrame) / 1000.0;
  //this.timeAtLastFrame = timeAtThisFrame;

  // clear the screen
  gl.clearColor(0.6, 5.0, 3.3, 6.0);
  //gl.clearColor(0.6, 0.0, 0.3, 1.0);
  gl.clearDepth(1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);



  const timeAtThisFrame = new Date().getTime();
  const dt = (timeAtThisFrame - this.timeAtLastFrame) / 50000.0;
  //this.timeAtLastFrame = this.timeAtThisFrame;


  const t = (timeAtThisFrame - this.timeAtFirstFrame) / 1000.0;

  this.chassis.control(timeAtThisFrame, dt, keysPressed, this.trees);
  this.multiMeshObject.control(timeAtThisFrame, dt, this.trees);
  
  //this.multiMeshObject.control(timeAtThisFrame, dt, keysPressed, this.gameObjects);
  
  //this.chassis.move(timeAtThisFrame, dt);
  

      this.camera.position.x = -this.chassis.position.x
      this.camera.position.z = -this.chassis.position.z +40
      //this.chassis.position = this.camera.position;
      //this.camera.updateViewMatrix();
      //this.camera.updateProjMatrix();
      //this.camera.ahead = this.chassis.ahead;
      //this.camera.position = this.chassis.position;
      //this.camera.position.y += 10;
      //this.camera.position.addScaled(-0.1,this.chassis.ahead)
      /**
      this.camera.right.setVectorProduct(this.camera.ahead, this.camera.worldUp ); 
      this.camera.right.normalize(); 
      this.camera.up.setVectorProduct(this.camera.right, this.camera.ahead); **/
      this.camera.updateViewMatrix();


    
      this.camera.move(dt,keysPressed,t);
      this.camera.updateViewMatrix();

    

  
  


  //Material.eyePosition.set(this.camera.position);
  //Material.rayDirMatrix.set(this.camera.rayDirMatrix);

  this.backgroundObject.draw(this.camera);
  //this.finishLine.draw(this.camera);
  this.groundObject.draw(this.camera);

  Material.shadowColor.set(1,1,1);



  for (var i = 0; i<this.gameObjects.length;i++) {
    
    this.gameObjects[i].draw(this.camera);
    

  }

  this.chassis.move(timeAtThisFrame,dt);
  this.multiMeshObject.move(timeAtThisFrame,dt/4);


  for (var i = 0; i<this.trees.length;i++) {
    
    this.trees[i].draw(this.camera);

  }

  this.wheel1.draw(this.camera);
  this.wheel2.draw(this.camera);
  this.wheel3.draw(this.camera);
  this.wheel4.draw(this.camera);



  //this.wall.draw(this.camera);

   
   Material.shadowColor.set(0,0,0);

   //Pitch black: draw shadow 
   for (var i = 0; i<this.gameObjects.length;i++) {
    
    this.gameObjects[i].drawShadow(this.camera);
  }

  for (var i = 0; i<this.trees.length;i++) {
    
    this.trees[i].drawShadow(this.camera);

  }
  //this.mirrorObject.drawShadow(this.camera);
  //this.wall.drawShadow(this.camera);
  //this.finishLine.setFinishLine();

  //Coolision between the car and the pokemon: if the car hit the pokemon,
  //then the game wins. 
      //if(this.chassis == this.multiMeshObject) continue;
  const dif = this.chassis.position.minus(this.multiMeshObject.position);
  if (dif.length() <10 && (dif.length()>=-5)) {
    this.winGround.position.set(0,1,0);
    this.winGround.draw(this.camera);

    const dis = this.chassis.position.minus(this.multiMeshObject.position).normalize();
    this.chassis.velocity.set(0,0,0);
    this.chassis.force.set(0,0,0);
    this.multiMeshObject.velocity.set(0,0,0);
    this.multiMeshObject.force.set(0,0,0);
    this.multiMeshObject.position.addScaled(0.01,dis);
    //this.backDrag = 10000;
    //this.sideDrag = 10000;
    this.chassis.position.addScaled(0.01,dis);
  }
    



  

  

  //Driving the car back  
  /**
  if (keysPressed["W"] ==true) {
    this.chassis.position.z +=5 * dt;
    /*
    this.wheel1.orientation += 10*dt;
    this.wheel3.orientation += 10*dt;
    this.wheel2.orientation += 10*dt;
    this.wheel4.orientation += 10*dt; 
  }
  //Driving the car ahead 
  else if (keysPressed["S"]==true) {
    this.chassis.position.z -=5 * dt;
    /*
    this.wheel1.orientation -= 10*dt;
    this.wheel3.orientation -= 10*dt;
    this.wheel2.orientation -= 10*dt;
    this.wheel4.orientation -= 10*dt; 
  }
  else if (keysPressed["A"]==true) {
    this.chassis.position.x -=5 * dt;
    /*
    this.wheel1.orientDation -= 10*dt;
    this.wheel3.orientation -= 10*dt;
    this.wheel2.orientation -= 10*dt;
    this.wheel4.orientation -= 10*dt; 
  }
  else if (keysPressed["D"]==true) {
    this.chassis.position.x +=5 * dt;
    /*
    this.wheel1.orientation -= 10*dt;
    this.wheel3.orientation -= 10*dt;D
    this.wheel2.orientation -= 10*dt;
    this.wheel4.orientation -= 10*dt;
    
  } 
  */





    //Spotlight: for poing light 
    Material.lightPowerDensity.at(1).set(400,400,400,1);
    Material.lightPos.at(1).set(5,20,10,1);
/*
  for(var i =0; i<8; i++) {
    Material.lightPowerDensity.at(i).set(1,1,1,0);
    Material.lightPos.at(i).set(1,1,1,1);    
  }
  **/

  //The Texture of Falling: For falling texture
  if (keysPressed["B"]==true) {
    
    Material.lightPowerDensity.at(0).set(1,1,1,1);
    Material.lightPos.at(0).set(0,20,0);    

  }
  //Shining: Apply Phong-Blinn shading  
    Material.lightPos.at(2).set(3,10,10,0);
    Material.lightPowerDensity.at(2).set(10,10,10);
  
   


/*this.material.commit();
//Set up the uniform for drawing triangle 
  const trianglePositionLocation =
     gl.getUniformLocation(this.solidProgram.glProgram,
                                      "trianglePosition"); 
if(trianglePositionLocation < 0) 
  console.log("Could not find uniform: trianglePosition."); 
else 
  gl.uniform3f(trianglePositionLocation,
      this.trianglePosition.x, this.trianglePosition.y, 
      this.trianglePosition.z); 
 
  this.triangleGeometry.draw();
  
  this.material.commit();

  const modelMatrixUniformLocation = gl.getUniformLocation(
  this.solidProgram.glProgram, "modelViewProjMatrix");
if(modelMatrixUniformLocation == null) {
  console.log("Could not find uniform modelViewProjMatrix.");
} else {

  const modelViewProjMatrix = new Mat4().translate(this.trianglePosition2);
  modelViewProjMatrix.commit(gl, modelMatrixUniformLocation);
}
*/
  //this.solidProgram.commit();

   //this.triangleGeometry.draw();





};


