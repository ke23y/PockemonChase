const OrthoCamera = function() { 
  this.position = new Vec2(0, 0.1); 
  this.rotation = 0; 
  this.windowSize = new Vec2(2, 2); 
  this.invertedMatrix = new Mat4();
  this.viewProjMatrix = new Mat4(); 
  this.updateViewProjMatrix(); 
};

OrthoCamera.prototype.updateViewProjMatrix = function(){ 
  this.viewProjMatrix.set(). 
    scale(0.5). 
    scale(this.windowSize). 
    rotate(this.rotation). 
    translate(this.position). 
    invert(); 
}; 

OrthoCamera.prototype.inverteUpdateViewProjMatrix = function()
{ 
  this.invertedMatrix.set(). 
    scale(0.5). 
    scale(this.windowSize). 
    rotate(this.rotation). 
    translate(this.position);
    return this.invertedMatrix;
}; 

OrthoCamera.prototype.setAspectRatio = function(ar) 
{ 
  this.windowSize.x = this.windowSize.y * ar;
  this.updateViewProjMatrix();
}; 

OrthoCamera.prototype.mov = function(dt){ 
  this.rotation+= 6 * dt;
  this.updateViewProjMatrix();
};

OrthoCamera.prototype.quake = function(dt){ 
  this.position.x +=  0.03 * Math.sin(dt * 100);
  this.position.y -=  0.03 * Math.sin(dt * 100);
  this.updateViewProjMatrix();
};


