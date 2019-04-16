"use strict"; 
const Material = function(gl, program) { 
  this.gl = gl; 
  this.program = program;  
  Object.keys(program.uniforms).forEach( (uniformName) => { 
    const uniform = program.uniforms[uniformName]; 
    const reflectionVariable = 
        UniformReflectionFactories.makeVar(gl,
                                uniform.type, uniform.size, uniform.textureUnit);
    if(!Material[uniformName]) {
      Object.defineProperty(this, uniformName,
        {value: reflectionVariable} );                            
    
  }
  }); 
}; 



  Material.prototype.commit = function() { 
  const gl = this.gl; 
  this.program.commit(); 
  Object.keys(this.program.uniforms).forEach( (uniformName) => { 
    const uniform = this.program.uniforms[uniformName]; 
    const reflectionVariable =
         Material[uniformName] || 
         this[uniformName]; 
   reflectionVariable.commit(gl,
                            uniform.location);
    //this[uniformName].commit(gl, uniform.location); 
  }); 

  }; 

  Object.defineProperty(Material, "modelViewProjMatrix", {value: new Mat4()} );
  Object.defineProperty(Material, "modelMatrix", {value: new Mat4()} );
  Object.defineProperty(Material, "modelMatrixInverse", {value: new Mat4()} );
  Object.defineProperty(Material, "lightPos", {value: new Vec4Array(8)});
  Object.defineProperty(Material, "lightPowerDensity", {value: new Vec4Array(8)});
  Object.defineProperty(Material, "eyePosition", {value: new Vec3()});
  Object.defineProperty(Material, "rayDirMatrix", {value: new Mat4()});
  Object.defineProperty(Material, "shadowColor", {value: new Vec3()});
  //Object.defineProperty(Material, "viewProjMatrixInverse", {value: new Mat4()} );

  




