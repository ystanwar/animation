var mySceneTLX;        /* Top Left corner X coordinate */
var mySceneTLY;        /* Top Left corner Y coordinate */
var mySceneBRX;        /* Bottom Right corner X coordinate */
var mySceneBRY;        /* Bottom Right corner Y coordinate */
var mySceneW;          /* Scene Width */
var mySceneH;          /* Scene Height */
var myCenterX;         /* Scene Center X coordinate */
var myCenterY;
var backB=50.0;
var wallThickness; 

var radius;
var cylinder;
var ellipse;
var cgeometry;
var curve;

var RadiusCy;	
var	RadiusCdefault;
var	RadiusCmin;
var	RadiusCmax;
var	RadiusCStep;

function initialiseScene()
{
    /* Initialise Scene Variables */
    mySceneTLX = -12.0;
    mySceneTLY = -12.0;
    mySceneBRX = 12.0;
    mySceneBRY = 12.0;
    mySceneW   = (mySceneBRX - mySceneTLX);
    mySceneH   = (mySceneTLY - mySceneBRY);
    myCenterX  = (mySceneTLX + mySceneBRX) / 2.0;
    myCenterY  = (mySceneTLY + mySceneBRY) / 2.0;
	wallThickness = 0.20;
    
}
function handleRadius(newValue)
{
    radius = newValue;
    cylinder.radius=radius;
    //cylinder.position.set(1,radius,0);
	//ellipse
	//cylinder.radiusTop=3.0;
    //cylinder.radiusBottom=3.0;
	cylinder.scale.x=radius;
	cylinder.scale.z=radius;
	ellipse.scale.y=radius;
	ellipse.scale.x=radius;
	line1.scale.set( radius, radius, radius);
    PIErender();
}

function initialiseControlVariables()
{
RadiusCy="RadiusC";
RadiusCdefault=1.0;
RadiusCmin=0.0;
RadiusCmax=10.0;
RadiusCStep=1.0;
         
}


function initialiseControls()
{
    initialiseControlVariables();
    /* Create Input Panel */
	var message="choose radius from below";
	var label="radius";
	PIEaddDisplayText(label,message);
    PIEaddInputSlider(RadiusCy, RadiusCdefault, handleRadius, RadiusCmin, RadiusCmax, RadiusCStep);
    
    /* Create Display Panel */
    PIEaddDisplayText(RadiusCy, RadiusCdefault);
    
}

function loadExperimentElements()
{


        
var camera;
var scene;
var renderer;
var size=10;
var geometry;
var material
var line;
var yMaterial;
radius=1.0;
var myBack;
var step=1;
var rad;
var path;
//clock = new THREE.Clock();
PIEsetExperimentTitle("Area Of Circle");
PIEsetDeveloperName("yuvraj singh tanwar"); 
PIEhideControlElement();
				initialiseScene();
						
						geometry = new THREE.BoxGeometry( mySceneW * 2, mySceneH * 2, wallThickness );
						material = new THREE.MeshBasicMaterial( {color:'yellow'} );
						myBack = new THREE.Mesh( geometry, material );
						myBack.position.set(myCenterX, myCenterY, backB - (wallThickness / 2));
						myBack.receiveShadow = true;
						PIEaddElement(myBack);






				 

                geometry = new THREE.Geometry();
                material = new THREE.LineBasicMaterial({color: 'blue',linewidth:5});   
				//scene.background = new THREE.Color( 'white');
				//PIEchangeDisplayCommand('white','black',scene.background);
				//PIEchangeDisplayBaclgroundColor(white);
				
                for ( var i = - size; i <= size; i += step){
                    geometry.vertices.push(new THREE.Vector3( - size,  i,0 ));
                    geometry.vertices.push(new THREE.Vector3( size,  i ,0));
   
                    geometry.vertices.push(new THREE.Vector3( i,  - size ,0));
                    geometry.vertices.push(new THREE.Vector3( i,  size ,0));

                }
				
                line = new THREE.Line( geometry, material, THREE.LinePieces);
                PIEaddElement(line);
				cgeometry = new THREE.CylinderGeometry( radius, radius, 0.5, 32 );
				yMaterial = new THREE.MeshBasicMaterial( { color: 'red', transparent: true, opacity: 0.5} );
				//cgeometry = new THREE.CircleGeometry( radius, 32);
				cylinder = new THREE.Mesh( cgeometry, yMaterial );
				cylinder.rotation.x += Math.PI/2;
				cylinder.castShadow = true;
				cylinder.receiveShadow = true;
				PIEaddElement(cylinder);
				PIEdragElement(cylinder);
				PIEsetCameraAspect(45);
					
				curve = new THREE.EllipseCurve(
				0,  0,            // ax, aY
				radius, radius,           // xRadius, yRadius
				0,  2 * Math.PI,  // aStartAngle, aEndAngle
				false,            // aClockwise
				0                 // aRotation
				);

				path = new THREE.Path( curve.getPoints( 50 ) );
				geometry = path.createPointsGeometry( 50 );
				material = new THREE.LineBasicMaterial( { color : 0xff0000 } );

				
				
				
				
				
				// Create the final object to add to the scene
				ellipse = new THREE.Line( geometry, material );
				PIEaddElement(ellipse);
				
				rad = new THREE.Geometry();
				rad.vertices.push(new THREE.Vector3(0, 0, 0));
				rad.vertices.push(new THREE.Vector3(radius, 0, 0));
				line1 = new THREE.Line(rad, material);
				PIEaddElement(line1);
				
			    render();
			    initialiseControls();
				PIEsetAreaOfInterest(mySceneTLX, mySceneTLY, mySceneBRX, mySceneBRY);		
}		




function render(){
			requestAnimationFrame( render );
		
			//cylinder.rotation.y +=0.1 ;
				var timer = Date.now() * 0.0001;
				//cylinder.material.opacity = 0.5 * (1 + Math.sin( timer));
				line1.rotation.z=+Math.cos( timer ) * 10;
				//camera.position.x = Math.cos( timer ) * 10;
			    //camera.position.z = Math.sin( timer ) * 30;
				//PIEadjustCamera(Math.cos( timer ) * 10,0, Math.sin( timer ) * 30);
			
               PIErender();
	
}
function resetExperiment()
{
    /* initialise Other Variables */
    //initialiseOtherVariables();
     
	radius=1;
	cylinder.scale.x=radius;
	cylinder.scale.z=radius;
	ellipse.scale.y=radius;
	ellipse.scale.x=radius;
	line1.scale.set( radius, radius, radius);
    PIErender();
	 
}
//function updateExperimentElements(t, dt)
//{
	
	
	//PIEchangeDisplayText(RadiusCy, radius);
   // PIEchangeDisplayText(Area, 0);
  
	
//}
   
   