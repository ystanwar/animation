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
var line1;

var RadiusCy;	
var	RadiusCdefault;
var	RadiusCmin;
var	RadiusCmax;
var	RadiusCStep;

var message;
var label;

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

}

function scale(){
    cylinder.radius=radius;
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
	//var message="choose radius from below";
	//var label="radius";
	//PIEaddDisplayText(label,message);
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
				var pass=0;
				//render(pass);
			    
			    initialiseControls();
				resetExperiment();
				PIEsetAreaOfInterest(mySceneTLX, mySceneTLY, mySceneBRX, mySceneBRY);		
}		




function render(rot){
			requestAnimationFrame( render );
		
			//cylinder.rotation.y +=0.1 ;
			
				//cylinder.material.opacity = 0.5 * (1 + Math.sin( timer));
				
			
					//rotate();
				
				

				//camera.position.x = Math.cos( timer ) * 10;
			    //camera.position.z = Math.sin( timer ) * 30;
				//PIEadjustCamera(Math.cos( timer ) * 10,0, Math.sin( timer ) * 30);
			
               
	
}

function rotate(){
		var timer = Date.now() * 0.0001;
		line1.rotation.z=+Math.cos( timer ) * 10;
		PIErender();
}


function resetExperiment()
{
    /* initialise Other Variables */
    //initialiseOtherVariables();
     
	radius=1;
	data();
	PIEchangeInputSlider(RadiusCy, radius);
	PIEchangeDisplayText(RadiusCy, radius);
	//message="radius is reset";
	//label="message";
	//PIEaddDisplayText(label,message);
	scale();
	 
}
function data(){
	var r=radius;
    if(r==0){
		document.getElementById("ra").innerHTML = r;
		document.getElementById("fsquare").innerHTML = 0;
		document.getElementById("ghsquare").innerHTML = 0;
		document.getElementById("hsquare").innerHTML = 0;
		document.getElementById("areaC").innerHTML = "0+0+(0)/2 = "+0;
		document.getElementById("areaF").innerHTML = "3.14 x 0 x 0 = " + 0;
		document.getElementById("res").innerHTML = 0+"cm<sup>2</sup> "+ "&asymp; " +0+"cm<sup>2</sup>";
		
    }
	else if(r==1){
		document.getElementById("ra").innerHTML = r;
		document.getElementById("fsquare").innerHTML = 0;
		document.getElementById("ghsquare").innerHTML = 4;
		document.getElementById("hsquare").innerHTML = 0;
		document.getElementById("areaC").innerHTML = "0+4+(0)/2 = "+4;
		document.getElementById("areaF").innerHTML = "3.14 x 1 x 1 = " + 3.14;
		document.getElementById("res").innerHTML = 4+"cm<sup>2</sup> "+ "&asymp; " +3.14+"cm<sup>2</sup>";
	
		
	}
	else if(r==2){
		document.getElementById("ra").innerHTML = r;
		document.getElementById("fsquare").innerHTML = 4;
		document.getElementById("ghsquare").innerHTML =8;
		document.getElementById("hsquare").innerHTML = 0;
		document.getElementById("areaC").innerHTML = "4+8+(0)/2 = "+12;
		document.getElementById("areaF").innerHTML = "3.14 x 2 x 2 = " + 12.56;
		document.getElementById("res").innerHTML = 12+"cm<sup>2</sup> "+ "&asymp; " +12.56+"cm<sup>2</sup>";
		
		
	}
	else if(r==3){
		document.getElementById("ra").innerHTML = r;
		document.getElementById("fsquare").innerHTML = 24;
		document.getElementById("ghsquare").innerHTML = 0;
		document.getElementById("hsquare").innerHTML = 8;
		document.getElementById("areaC").innerHTML = "27+0+(8)/2 = "+28;
		document.getElementById("areaF").innerHTML = "3.14 x 3 x 3 = " + 28.259;
		document.getElementById("res").innerHTML = 28+"cm<sup>2</sup> "+ "&asymp; " +28.259+"cm<sup>2</sup>";
		
		
	}
	else if(r==4){
		document.getElementById("ra").innerHTML = r;
		document.getElementById("fsquare").innerHTML = 40;
		document.getElementById("ghsquare").innerHTML = 12;
		document.getElementById("hsquare").innerHTML = 0;
		document.getElementById("areaC").innerHTML = "40+12+(0)/2 = "+52;
		document.getElementById("areaF").innerHTML = "3.14 x 4 x 4 = " + 50.24;
		document.getElementById("res").innerHTML = 52+"cm<sup>2</sup> "+ "&asymp; " +50.24+"cm<sup>2</sup>";
		
		
	}
	else if(r==5){
		document.getElementById("ra").innerHTML = r;
		document.getElementById("fsquare").innerHTML = 68;
		document.getElementById("ghsquare").innerHTML = 8;
		document.getElementById("hsquare").innerHTML = 4;
		document.getElementById("areaC").innerHTML = "68+8+(4)/2 = "+80;
		document.getElementById("areaF").innerHTML = "3.14 x 5 x 5 = " + 78.5;
		document.getElementById("res").innerHTML = 80+"cm<sup>2</sup> "+ "&asymp; " +78.5+"cm<sup>2</sup>";
		
		
	}
	else if(r==6){
		document.getElementById("ra").innerHTML = r;
		document.getElementById("fsquare").innerHTML = 96;
		document.getElementById("ghsquare").innerHTML = 16;
		document.getElementById("hsquare").innerHTML = 8;
		document.getElementById("areaC").innerHTML = "96+16+(8)/2 = "+116;
		document.getElementById("areaF").innerHTML = "3.14 x 6 x 6 = " + 113.03;
		document.getElementById("res").innerHTML = 116+"cm<sup>2</sup> "+ "&asymp; " +113.03+"cm<sup>2</sup>";
		
		
	}
	else if(r==7){
		document.getElementById("ra").innerHTML = r;
		document.getElementById("fsquare").innerHTML = 132;
		document.getElementById("ghsquare").innerHTML = 16;
		document.getElementById("hsquare").innerHTML = 16;
		document.getElementById("areaC").innerHTML = "132+16+(16)/2 = "+156;
		document.getElementById("areaF").innerHTML = "3.14 x 7 x 7 = " + 153.03;
		document.getElementById("res").innerHTML = 156+"cm<sup>2</sup> "+ "&asymp; " +153.03+"cm<sup>2</sup>";
		
		
	}
	else if(r==8){
		document.getElementById("ra").innerHTML = r;
		document.getElementById("fsquare").innerHTML = 180;
		document.getElementById("ghsquare").innerHTML = 28;
		document.getElementById("hsquare").innerHTML = 0;
		document.getElementById("areaC").innerHTML = "180+28+(0)/2 = "+208;
		document.getElementById("areaF").innerHTML = "3.14 x 8 x 8 = " + 200.96;
		document.getElementById("res").innerHTML = 208+"cm<sup>2</sup> "+ "&asymp; " +200.96+"cm<sup>2</sup>";
		
	}
	else if(r==9){
		document.getElementById("ra").innerHTML = r;
		document.getElementById("fsquare").innerHTML = 224;
		document.getElementById("ghsquare").innerHTML = 16;
		document.getElementById("hsquare").innerHTML = 0;
		document.getElementById("areaC").innerHTML = "224+16+(0)/2 = "+240;
		document.getElementById("areaF").innerHTML = "3.14 x 9 x 9 = " + 254.34;
		document.getElementById("res").innerHTML = 240+"cm<sup>2</sup> "+ "&asymp; " +254.34+"cm<sup>2</sup>";
		
	}
	else{
		
		document.getElementById("ra").innerHTML = r;
		document.getElementById("fsquare").innerHTML = 284;
		document.getElementById("ghsquare").innerHTML = 20;
		document.getElementById("hsquare").innerHTML = 12;
		document.getElementById("areaC").innerHTML = "284+20+(12)/2 = "+310;
		document.getElementById("areaF").innerHTML = "3.14 x 10 x 10 = " + 314;
		document.getElementById("res").innerHTML = 310+"cm<sup>2</sup> "+ "&asymp; " +314+"cm<sup>2</sup>";
		
		
		
		
	}

		
		
	}	
function updateExperimentElements(t, dt)
{
			
			data();
			scale();
			var timer = Date.now() * 0.0001;
			line1.rotation.z=+Math.cos( timer ) * 10;
			PIErender();
			PIEchangeDisplayText(RadiusCy, radius);
	
	
	

   //PIEchangeDisplayText(Area, 0);
  
	
}
	

	
	

   