"use strict"; 
const GameObject = function(mesh) { 
  this.mesh = mesh;

  this.position = new Vec3(0, 0, 0); 
  this.orientation = 0; 
  this.scale = new Vec3(1,2,1); 
  this.parent = null;
  this.modelMatrix = new Mat4(); 


  //ADD FOR PHYSICS 
  this.move = function(){};
  this.control = function(){};
  this.force = new Vec3();
  this.torque = 0;
  this.velocity = new Vec3();
  this.invMass = 1;
  this.backDrag = 1;
  this.sideDrag = 1;
  this.invAngularMass = 1;
  this.angularVelocity = 0;
  this.angularDrag = 1;
};

// TODO: set the game object’s model matrix property 
//according to the position, orientation, and scale
GameObject.prototype.updateModelMatrix = function(){
	this.modelMatrix.set();
	this.modelMatrix.rotate(this.orientation,0,1,0);
	this.modelMatrix.scale(this.scale);
	this.modelMatrix.translate(this.position);

  if(this.parent) {
    this.parent.updateModelMatrix();
    this.modelMatrix.mul(this.parent.modelMatrix);

  }

}
//GameObject.prototype.move = function(keyPressed, dt) {
  /**

  if (keyPressed["LEFT"]=== true) {
    this.position.x -= 5*dt;
  }
  else if (keyPressed["RIGHT"]=== true) {
    this.position.x += 5*dt;
  }
  else if (keyPressed["DOWN"]=== true) {
    this.position.y -= 5*dt;
  }
  else if (keyPressed["UP"]=== true) {
    this.position.y += 5*dt;
  }

  this.updateModelMatrix(); **/
//}

GameObject.prototype.draw = function(camera){ 


  this.updateModelMatrix();
  this.setStartDirection();
  
  //this.rotateChasis();

  // TODO: Set the uniform modelViewProjMatrix (reflected in the material) 
  //from the modelMatrix property of GameObject (no camera yet). 
  //Operator = cannot be used. Use Mat4’s methods set() and/or mul().

  Material.modelViewProjMatrix.set(this.modelMatrix).mul(camera.viewProjMatrix);
  Material.modelMatrix.set(this.modelMatrix);
  Material.modelMatrixInverse.set(this.modelMatrix).invert();
  
  this.mesh.draw(); 
};

GameObject.prototype.drawShadow = function(camera){ 

  this.updateModelMatrix();
  this.setStartDirection();
  // TODO: Set the uniform modelViewProjMatarix (reflected in the material) 
  //from the modelMatrix property of GameObject (no camera yet). 
  //Operator = cannot be used. Use Mat4’s methods set() and/or mul().

  Material.modelViewProjMatrix.set(this.modelMatrix).scale(1,0,1).mul(camera.viewProjMatrix);
  Material.modelMatrix.set(this.modelMatrix);
  Material.modelMatrixInverse.set(this.modelMatrix).invert();

  this.mesh.draw(); 
};

GameObject.prototype.setStartDirection = function(camera){ 

  //this.modelMatrix.rotate(3.14,100,0,0);
  this.modelMatrix.rotate(3.14,0,1,0);
};








