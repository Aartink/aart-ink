import{C as Qs,V as y,M as jt,T as Rt,Q as Ln,S as _o,a as ce,R as Js,P as ei,b as f,D as ti,H as rn,F as Nn,c as ln,L as ni,d as Y,I as oi,e as Eo,f as Jn,g as Ot,W as si,B as kn,h as Ko,i as $o,j as gn,U as Qo,k as wn,l as ne,m as Kt,n as ii,o as ai,p as ri,q as li,r as ci,s as di,t as ui,G as hi,u as mi,E as pi,v as Je,w as Se,x as te,y as $t,z as fi,A as dt,J as Oe,K as et,N as Jo,O as Qt,X as yi,Y as gi,Z as wi,_ as bi,$ as vi,a0 as _i,a1 as Ei,a2 as So,a3 as Si,a4 as xi,a5 as Li,a6 as Mi}from"./GLTFLoader-o56M-cdD.js";const xo={type:"change"},ro={type:"start"},es={type:"end"},cn=new Js,Lo=new ei,Di=Math.cos(70*f.DEG2RAD),G=new y,se=2*Math.PI,I={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},qn=1e-6;class Ti extends Qs{constructor(t,n=null){super(t,n),this.state=I.NONE,this.target=new y,this.cursor=new y,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:jt.ROTATE,MIDDLE:jt.DOLLY,RIGHT:jt.PAN},this.touches={ONE:Rt.ROTATE,TWO:Rt.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new y,this._lastQuaternion=new Ln,this._lastTargetPosition=new y,this._quat=new Ln().setFromUnitVectors(t.up,new y(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new _o,this._sphericalDelta=new _o,this._scale=1,this._panOffset=new y,this._rotateStart=new ce,this._rotateEnd=new ce,this._rotateDelta=new ce,this._panStart=new ce,this._panEnd=new ce,this._panDelta=new ce,this._dollyStart=new ce,this._dollyEnd=new ce,this._dollyDelta=new ce,this._dollyDirection=new y,this._mouse=new ce,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Pi.bind(this),this._onPointerDown=ki.bind(this),this._onPointerUp=Ci.bind(this),this._onContextMenu=Fi.bind(this),this._onMouseWheel=zi.bind(this),this._onKeyDown=Bi.bind(this),this._onTouchStart=Ri.bind(this),this._onTouchMove=Oi.bind(this),this._onMouseDown=Ai.bind(this),this._onMouseMove=Ii.bind(this),this._interceptControlDown=ji.bind(this),this._interceptControlUp=Hi.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(xo),this.update(),this.state=I.NONE}update(t=null){const n=this.object.position;G.copy(n).sub(this.target),G.applyQuaternion(this._quat),this._spherical.setFromVector3(G),this.autoRotate&&this.state===I.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let o=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(o)&&isFinite(s)&&(o<-Math.PI?o+=se:o>Math.PI&&(o-=se),s<-Math.PI?s+=se:s>Math.PI&&(s-=se),o<=s?this._spherical.theta=Math.max(o,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(o+s)/2?Math.max(o,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let i=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),i=a!=this._spherical.radius}if(G.setFromSpherical(this._spherical),G.applyQuaternion(this._quatInverse),n.copy(this.target).add(G),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const r=G.length();a=this._clampDistance(r*this._scale);const l=r-a;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),i=!!l}else if(this.object.isOrthographicCamera){const r=new y(this._mouse.x,this._mouse.y,0);r.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),i=l!==this.object.zoom;const c=new y(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(r),this.object.updateMatrixWorld(),a=G.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(cn.origin.copy(this.object.position),cn.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(cn.direction))<Di?this.object.lookAt(this.target):(Lo.setFromNormalAndCoplanarPoint(this.object.up,this.target),cn.intersectPlane(Lo,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),i=!0)}return this._scale=1,this._performCursorZoom=!1,i||this._lastPosition.distanceToSquared(this.object.position)>qn||8*(1-this._lastQuaternion.dot(this.object.quaternion))>qn||this._lastTargetPosition.distanceToSquared(this.target)>qn?(this.dispatchEvent(xo),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?se/60*this.autoRotateSpeed*t:se/60/60*this.autoRotateSpeed}_getZoomScale(t){const n=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*n)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,n){G.setFromMatrixColumn(n,0),G.multiplyScalar(-t),this._panOffset.add(G)}_panUp(t,n){this.screenSpacePanning===!0?G.setFromMatrixColumn(n,1):(G.setFromMatrixColumn(n,0),G.crossVectors(this.object.up,G)),G.multiplyScalar(t),this._panOffset.add(G)}_pan(t,n){const o=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;G.copy(s).sub(this.target);let i=G.length();i*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*i/o.clientHeight,this.object.matrix),this._panUp(2*n*i/o.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/o.clientWidth,this.object.matrix),this._panUp(n*(this.object.top-this.object.bottom)/this.object.zoom/o.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,n){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const o=this.domElement.getBoundingClientRect(),s=t-o.left,i=n-o.top,a=o.width,r=o.height;this._mouse.x=s/a*2-1,this._mouse.y=-(i/r)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const n=this.domElement;this._rotateLeft(se*this._rotateDelta.x/n.clientHeight),this._rotateUp(se*this._rotateDelta.y/n.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let n=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(se*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),n=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-se*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),n=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(se*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),n=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-se*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),n=!0;break}n&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const n=this._getSecondPointerPosition(t),o=.5*(t.pageX+n.x),s=.5*(t.pageY+n.y);this._rotateStart.set(o,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const n=this._getSecondPointerPosition(t),o=.5*(t.pageX+n.x),s=.5*(t.pageY+n.y);this._panStart.set(o,s)}}_handleTouchStartDolly(t){const n=this._getSecondPointerPosition(t),o=t.pageX-n.x,s=t.pageY-n.y,i=Math.sqrt(o*o+s*s);this._dollyStart.set(0,i)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const o=this._getSecondPointerPosition(t),s=.5*(t.pageX+o.x),i=.5*(t.pageY+o.y);this._rotateEnd.set(s,i)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const n=this.domElement;this._rotateLeft(se*this._rotateDelta.x/n.clientHeight),this._rotateUp(se*this._rotateDelta.y/n.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const n=this._getSecondPointerPosition(t),o=.5*(t.pageX+n.x),s=.5*(t.pageY+n.y);this._panEnd.set(o,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const n=this._getSecondPointerPosition(t),o=t.pageX-n.x,s=t.pageY-n.y,i=Math.sqrt(o*o+s*s);this._dollyEnd.set(0,i),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(t.pageX+n.x)*.5,r=(t.pageY+n.y)*.5;this._updateZoomParameters(a,r)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let n=0;n<this._pointers.length;n++)if(this._pointers[n]==t.pointerId){this._pointers.splice(n,1);return}}_isTrackingPointer(t){for(let n=0;n<this._pointers.length;n++)if(this._pointers[n]==t.pointerId)return!0;return!1}_trackPointer(t){let n=this._pointerPositions[t.pointerId];n===void 0&&(n=new ce,this._pointerPositions[t.pointerId]=n),n.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const n=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[n]}_customWheelEvent(t){const n=t.deltaMode,o={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(n){case 1:o.deltaY*=16;break;case 2:o.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(o.deltaY*=10),o}}function ki(e){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(e.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(e)&&(this._addPointer(e),e.pointerType==="touch"?this._onTouchStart(e):this._onMouseDown(e)))}function Pi(e){this.enabled!==!1&&(e.pointerType==="touch"?this._onTouchMove(e):this._onMouseMove(e))}function Ci(e){switch(this._removePointer(e),this._pointers.length){case 0:this.domElement.releasePointerCapture(e.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(es),this.state=I.NONE;break;case 1:const t=this._pointers[0],n=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:n.x,pageY:n.y});break}}function Ai(e){let t;switch(e.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case jt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(e),this.state=I.DOLLY;break;case jt.ROTATE:if(e.ctrlKey||e.metaKey||e.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(e),this.state=I.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(e),this.state=I.ROTATE}break;case jt.PAN:if(e.ctrlKey||e.metaKey||e.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(e),this.state=I.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(e),this.state=I.PAN}break;default:this.state=I.NONE}this.state!==I.NONE&&this.dispatchEvent(ro)}function Ii(e){switch(this.state){case I.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(e);break;case I.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(e);break;case I.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(e);break}}function zi(e){this.enabled===!1||this.enableZoom===!1||this.state!==I.NONE||(e.preventDefault(),this.dispatchEvent(ro),this._handleMouseWheel(this._customWheelEvent(e)),this.dispatchEvent(es))}function Bi(e){this.enabled!==!1&&this._handleKeyDown(e)}function Ri(e){switch(this._trackPointer(e),this._pointers.length){case 1:switch(this.touches.ONE){case Rt.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(e),this.state=I.TOUCH_ROTATE;break;case Rt.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(e),this.state=I.TOUCH_PAN;break;default:this.state=I.NONE}break;case 2:switch(this.touches.TWO){case Rt.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(e),this.state=I.TOUCH_DOLLY_PAN;break;case Rt.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(e),this.state=I.TOUCH_DOLLY_ROTATE;break;default:this.state=I.NONE}break;default:this.state=I.NONE}this.state!==I.NONE&&this.dispatchEvent(ro)}function Oi(e){switch(this._trackPointer(e),this.state){case I.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(e),this.update();break;case I.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(e),this.update();break;case I.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(e),this.update();break;case I.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(e),this.update();break;default:this.state=I.NONE}}function Fi(e){this.enabled!==!1&&e.preventDefault()}function ji(e){e.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Hi(e){e.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}class Vi extends ti{constructor(t){super(t),this.type=rn}parse(t){const a=function(p,C){switch(p){case 1:throw new Error("THREE.RGBELoader: Read Error: "+(C||""));case 2:throw new Error("THREE.RGBELoader: Write Error: "+(C||""));case 3:throw new Error("THREE.RGBELoader: Bad File Format: "+(C||""));default:case 4:throw new Error("THREE.RGBELoader: Memory Error: "+(C||""))}},u=`
`,m=function(p,C,d){C=C||1024;let b=p.pos,g=-1,E=0,R="",A=String.fromCharCode.apply(null,new Uint16Array(p.subarray(b,b+128)));for(;0>(g=A.indexOf(u))&&E<C&&b<p.byteLength;)R+=A,E+=A.length,b+=128,A+=String.fromCharCode.apply(null,new Uint16Array(p.subarray(b,b+128)));return-1<g?(p.pos+=E+g+1,R+A.slice(0,g)):!1},L=function(p){const C=/^#\?(\S+)/,d=/^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/,h=/^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/,b=/^\s*FORMAT=(\S+)\s*$/,g=/^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/,E={valid:0,string:"",comments:"",programtype:"RGBE",format:"",gamma:1,exposure:1,width:0,height:0};let R,A;for((p.pos>=p.byteLength||!(R=m(p)))&&a(1,"no header found"),(A=R.match(C))||a(3,"bad initial token"),E.valid|=1,E.programtype=A[1],E.string+=R+`
`;R=m(p),R!==!1;){if(E.string+=R+`
`,R.charAt(0)==="#"){E.comments+=R+`
`;continue}if((A=R.match(d))&&(E.gamma=parseFloat(A[1])),(A=R.match(h))&&(E.exposure=parseFloat(A[1])),(A=R.match(b))&&(E.valid|=2,E.format=A[1]),(A=R.match(g))&&(E.valid|=4,E.height=parseInt(A[1],10),E.width=parseInt(A[2],10)),E.valid&2&&E.valid&4)break}return E.valid&2||a(3,"missing format specifier"),E.valid&4||a(3,"missing image size specifier"),E},B=function(p,C,d){const h=C;if(h<8||h>32767||p[0]!==2||p[1]!==2||p[2]&128)return new Uint8Array(p);h!==(p[2]<<8|p[3])&&a(3,"wrong scanline width");const b=new Uint8Array(4*C*d);b.length||a(4,"unable to allocate buffer space");let g=0,E=0;const R=4*h,A=new Uint8Array(4),re=new Uint8Array(R);let Et=d;for(;Et>0&&E<p.byteLength;){E+4>p.byteLength&&a(1),A[0]=p[E++],A[1]=p[E++],A[2]=p[E++],A[3]=p[E++],(A[0]!=2||A[1]!=2||(A[2]<<8|A[3])!=h)&&a(3,"bad rgbe scanline format");let xe=0,we;for(;xe<R&&E<p.byteLength;){we=p[E++];const me=we>128;if(me&&(we-=128),(we===0||xe+we>R)&&a(3,"bad scanline data"),me){const le=p[E++];for(let St=0;St<we;St++)re[xe++]=le}else re.set(p.subarray(E,E+we),xe),xe+=we,E+=we}const an=h;for(let me=0;me<an;me++){let le=0;b[g]=re[me+le],le+=h,b[g+1]=re[me+le],le+=h,b[g+2]=re[me+le],le+=h,b[g+3]=re[me+le],g+=4}Et--}return b},S=function(p,C,d,h){const b=p[C+3],g=Math.pow(2,b-128)/255;d[h+0]=p[C+0]*g,d[h+1]=p[C+1]*g,d[h+2]=p[C+2]*g,d[h+3]=1},M=function(p,C,d,h){const b=p[C+3],g=Math.pow(2,b-128)/255;d[h+0]=ln.toHalfFloat(Math.min(p[C+0]*g,65504)),d[h+1]=ln.toHalfFloat(Math.min(p[C+1]*g,65504)),d[h+2]=ln.toHalfFloat(Math.min(p[C+2]*g,65504)),d[h+3]=ln.toHalfFloat(1)},v=new Uint8Array(t);v.pos=0;const P=L(v),T=P.width,V=P.height,D=B(v.subarray(v.pos),T,V);let Z,je,ge;switch(this.type){case Nn:ge=D.length/4;const p=new Float32Array(ge*4);for(let d=0;d<ge;d++)S(D,d*4,p,d*4);Z=p,je=Nn;break;case rn:ge=D.length/4;const C=new Uint16Array(ge*4);for(let d=0;d<ge;d++)M(D,d*4,C,d*4);Z=C,je=rn;break;default:throw new Error("THREE.RGBELoader: Unsupported type: "+this.type)}return{width:T,height:V,data:Z,header:P.string,gamma:P.gamma,exposure:P.exposure,type:je}}setDataType(t){return this.type=t,this}load(t,n,o,s){function i(a,r){switch(a.type){case Nn:case rn:a.colorSpace=ni,a.minFilter=Y,a.magFilter=Y,a.generateMipmaps=!1,a.flipY=!0;break}n&&n(a,r)}return super.load(t,i,o,s)}}const Mo=new kn,dn=new y;class ts extends oi{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const t=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],n=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],o=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(o),this.setAttribute("position",new Eo(t,3)),this.setAttribute("uv",new Eo(n,2))}applyMatrix4(t){const n=this.attributes.instanceStart,o=this.attributes.instanceEnd;return n!==void 0&&(n.applyMatrix4(t),o.applyMatrix4(t),n.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(t){let n;t instanceof Float32Array?n=t:Array.isArray(t)&&(n=new Float32Array(t));const o=new Jn(n,6,1);return this.setAttribute("instanceStart",new Ot(o,3,0)),this.setAttribute("instanceEnd",new Ot(o,3,3)),this.instanceCount=this.attributes.instanceStart.count,this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(t){let n;t instanceof Float32Array?n=t:Array.isArray(t)&&(n=new Float32Array(t));const o=new Jn(n,6,1);return this.setAttribute("instanceColorStart",new Ot(o,3,0)),this.setAttribute("instanceColorEnd",new Ot(o,3,3)),this}fromWireframeGeometry(t){return this.setPositions(t.attributes.position.array),this}fromEdgesGeometry(t){return this.setPositions(t.attributes.position.array),this}fromMesh(t){return this.fromWireframeGeometry(new si(t.geometry)),this}fromLineSegments(t){const n=t.geometry;return this.setPositions(n.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new kn);const t=this.attributes.instanceStart,n=this.attributes.instanceEnd;t!==void 0&&n!==void 0&&(this.boundingBox.setFromBufferAttribute(t),Mo.setFromBufferAttribute(n),this.boundingBox.union(Mo))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ko),this.boundingBox===null&&this.computeBoundingBox();const t=this.attributes.instanceStart,n=this.attributes.instanceEnd;if(t!==void 0&&n!==void 0){const o=this.boundingSphere.center;this.boundingBox.getCenter(o);let s=0;for(let i=0,a=t.count;i<a;i++)dn.fromBufferAttribute(t,i),s=Math.max(s,o.distanceToSquared(dn)),dn.fromBufferAttribute(n,i),s=Math.max(s,o.distanceToSquared(dn));this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}}wn.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new ce(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};gn.line={uniforms:Qo.merge([wn.common,wn.fog,wn.line]),vertexShader:`
		#include <common>
		#include <color_pars_vertex>
		#include <fog_pars_vertex>
		#include <logdepthbuf_pars_vertex>
		#include <clipping_planes_pars_vertex>

		uniform float linewidth;
		uniform vec2 resolution;

		attribute vec3 instanceStart;
		attribute vec3 instanceEnd;

		attribute vec3 instanceColorStart;
		attribute vec3 instanceColorEnd;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#ifdef USE_DASH

			uniform float dashScale;
			attribute float instanceDistanceStart;
			attribute float instanceDistanceEnd;
			varying float vLineDistance;

		#endif

		void trimSegment( const in vec4 start, inout vec4 end ) {

			// trim end segment so it terminates between the camera plane and the near plane

			// conservative estimate of the near plane
			float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
			float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
			float nearEstimate = - 0.5 * b / a;

			float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

			end.xyz = mix( start.xyz, end.xyz, alpha );

		}

		void main() {

			#ifdef USE_COLOR

				vColor.xyz = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

			#endif

			#ifdef USE_DASH

				vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
				vUv = uv;

			#endif

			float aspect = resolution.x / resolution.y;

			// camera space
			vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
			vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

			#ifdef WORLD_UNITS

				worldStart = start.xyz;
				worldEnd = end.xyz;

			#else

				vUv = uv;

			#endif

			// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
			// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
			// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
			// perhaps there is a more elegant solution -- WestLangley

			bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

			if ( perspective ) {

				if ( start.z < 0.0 && end.z >= 0.0 ) {

					trimSegment( start, end );

				} else if ( end.z < 0.0 && start.z >= 0.0 ) {

					trimSegment( end, start );

				}

			}

			// clip space
			vec4 clipStart = projectionMatrix * start;
			vec4 clipEnd = projectionMatrix * end;

			// ndc space
			vec3 ndcStart = clipStart.xyz / clipStart.w;
			vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

			// direction
			vec2 dir = ndcEnd.xy - ndcStart.xy;

			// account for clip-space aspect ratio
			dir.x *= aspect;
			dir = normalize( dir );

			#ifdef WORLD_UNITS

				vec3 worldDir = normalize( end.xyz - start.xyz );
				vec3 tmpFwd = normalize( mix( start.xyz, end.xyz, 0.5 ) );
				vec3 worldUp = normalize( cross( worldDir, tmpFwd ) );
				vec3 worldFwd = cross( worldDir, worldUp );
				worldPos = position.y < 0.5 ? start: end;

				// height offset
				float hw = linewidth * 0.5;
				worldPos.xyz += position.x < 0.0 ? hw * worldUp : - hw * worldUp;

				// don't extend the line if we're rendering dashes because we
				// won't be rendering the endcaps
				#ifndef USE_DASH

					// cap extension
					worldPos.xyz += position.y < 0.5 ? - hw * worldDir : hw * worldDir;

					// add width to the box
					worldPos.xyz += worldFwd * hw;

					// endcaps
					if ( position.y > 1.0 || position.y < 0.0 ) {

						worldPos.xyz -= worldFwd * 2.0 * hw;

					}

				#endif

				// project the worldpos
				vec4 clip = projectionMatrix * worldPos;

				// shift the depth of the projected points so the line
				// segments overlap neatly
				vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
				clip.z = clipPose.z * clip.w;

			#else

				vec2 offset = vec2( dir.y, - dir.x );
				// undo aspect ratio adjustment
				dir.x /= aspect;
				offset.x /= aspect;

				// sign flip
				if ( position.x < 0.0 ) offset *= - 1.0;

				// endcaps
				if ( position.y < 0.0 ) {

					offset += - dir;

				} else if ( position.y > 1.0 ) {

					offset += dir;

				}

				// adjust for linewidth
				offset *= linewidth;

				// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
				offset /= resolution.y;

				// select end
				vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

				// back to clip space
				offset *= clip.w;

				clip.xy += offset;

			#endif

			gl_Position = clip;

			vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

			#include <logdepthbuf_vertex>
			#include <clipping_planes_vertex>
			#include <fog_vertex>

		}
		`,fragmentShader:`
		uniform vec3 diffuse;
		uniform float opacity;
		uniform float linewidth;

		#ifdef USE_DASH

			uniform float dashOffset;
			uniform float dashSize;
			uniform float gapSize;

		#endif

		varying float vLineDistance;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#include <common>
		#include <color_pars_fragment>
		#include <fog_pars_fragment>
		#include <logdepthbuf_pars_fragment>
		#include <clipping_planes_pars_fragment>

		vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

			float mua;
			float mub;

			vec3 p13 = p1 - p3;
			vec3 p43 = p4 - p3;

			vec3 p21 = p2 - p1;

			float d1343 = dot( p13, p43 );
			float d4321 = dot( p43, p21 );
			float d1321 = dot( p13, p21 );
			float d4343 = dot( p43, p43 );
			float d2121 = dot( p21, p21 );

			float denom = d2121 * d4343 - d4321 * d4321;

			float numer = d1343 * d4321 - d1321 * d4343;

			mua = numer / denom;
			mua = clamp( mua, 0.0, 1.0 );
			mub = ( d1343 + d4321 * ( mua ) ) / d4343;
			mub = clamp( mub, 0.0, 1.0 );

			return vec2( mua, mub );

		}

		void main() {

			#include <clipping_planes_fragment>

			#ifdef USE_DASH

				if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

				if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

			#endif

			float alpha = opacity;

			#ifdef WORLD_UNITS

				// Find the closest points on the view ray and the line segment
				vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
				vec3 lineDir = worldEnd - worldStart;
				vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

				vec3 p1 = worldStart + lineDir * params.x;
				vec3 p2 = rayEnd * params.y;
				vec3 delta = p1 - p2;
				float len = length( delta );
				float norm = len / linewidth;

				#ifndef USE_DASH

					#ifdef USE_ALPHA_TO_COVERAGE

						float dnorm = fwidth( norm );
						alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

					#else

						if ( norm > 0.5 ) {

							discard;

						}

					#endif

				#endif

			#else

				#ifdef USE_ALPHA_TO_COVERAGE

					// artifacts appear on some hardware if a derivative is taken within a conditional
					float a = vUv.x;
					float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
					float len2 = a * a + b * b;
					float dlen = fwidth( len2 );

					if ( abs( vUv.y ) > 1.0 ) {

						alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

					}

				#else

					if ( abs( vUv.y ) > 1.0 ) {

						float a = vUv.x;
						float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
						float len2 = a * a + b * b;

						if ( len2 > 1.0 ) discard;

					}

				#endif

			#endif

			vec4 diffuseColor = vec4( diffuse, alpha );

			#include <logdepthbuf_fragment>
			#include <color_fragment>

			gl_FragColor = vec4( diffuseColor.rgb, alpha );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>
			#include <fog_fragment>
			#include <premultiplied_alpha_fragment>

		}
		`};class lo extends $o{constructor(t){super({type:"LineMaterial",uniforms:Qo.clone(gn.line.uniforms),vertexShader:gn.line.vertexShader,fragmentShader:gn.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(t)}get color(){return this.uniforms.diffuse.value}set color(t){this.uniforms.diffuse.value=t}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(t){t===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(t){this.uniforms.linewidth&&(this.uniforms.linewidth.value=t)}get dashed(){return"USE_DASH"in this.defines}set dashed(t){t===!0!==this.dashed&&(this.needsUpdate=!0),t===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(t){this.uniforms.dashScale.value=t}get dashSize(){return this.uniforms.dashSize.value}set dashSize(t){this.uniforms.dashSize.value=t}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(t){this.uniforms.dashOffset.value=t}get gapSize(){return this.uniforms.gapSize.value}set gapSize(t){this.uniforms.gapSize.value=t}get opacity(){return this.uniforms.opacity.value}set opacity(t){this.uniforms&&(this.uniforms.opacity.value=t)}get resolution(){return this.uniforms.resolution.value}set resolution(t){this.uniforms.resolution.value.copy(t)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(t){this.defines&&(t===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),t===!0?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}}const Yn=new Kt,Do=new y,To=new y,Q=new Kt,J=new Kt,Le=new Kt,Gn=new y,Wn=new ai,ee=new ii,ko=new y,un=new kn,hn=new Ko,Me=new Kt;let Te,bt;function Po(e,t,n){return Me.set(0,0,-t,1).applyMatrix4(e.projectionMatrix),Me.multiplyScalar(1/Me.w),Me.x=bt/n.width,Me.y=bt/n.height,Me.applyMatrix4(e.projectionMatrixInverse),Me.multiplyScalar(1/Me.w),Math.abs(Math.max(Me.x,Me.y))}function Ui(e,t){const n=e.matrixWorld,o=e.geometry,s=o.attributes.instanceStart,i=o.attributes.instanceEnd,a=Math.min(o.instanceCount,s.count);for(let r=0,l=a;r<l;r++){ee.start.fromBufferAttribute(s,r),ee.end.fromBufferAttribute(i,r),ee.applyMatrix4(n);const c=new y,u=new y;Te.distanceSqToSegment(ee.start,ee.end,u,c),u.distanceTo(c)<bt*.5&&t.push({point:u,pointOnLine:c,distance:Te.origin.distanceTo(u),object:e,face:null,faceIndex:r,uv:null,uv1:null})}}function Ni(e,t,n){const o=t.projectionMatrix,i=e.material.resolution,a=e.matrixWorld,r=e.geometry,l=r.attributes.instanceStart,c=r.attributes.instanceEnd,u=Math.min(r.instanceCount,l.count),m=-t.near;Te.at(1,Le),Le.w=1,Le.applyMatrix4(t.matrixWorldInverse),Le.applyMatrix4(o),Le.multiplyScalar(1/Le.w),Le.x*=i.x/2,Le.y*=i.y/2,Le.z=0,Gn.copy(Le),Wn.multiplyMatrices(t.matrixWorldInverse,a);for(let L=0,B=u;L<B;L++){if(Q.fromBufferAttribute(l,L),J.fromBufferAttribute(c,L),Q.w=1,J.w=1,Q.applyMatrix4(Wn),J.applyMatrix4(Wn),Q.z>m&&J.z>m)continue;if(Q.z>m){const V=Q.z-J.z,D=(Q.z-m)/V;Q.lerp(J,D)}else if(J.z>m){const V=J.z-Q.z,D=(J.z-m)/V;J.lerp(Q,D)}Q.applyMatrix4(o),J.applyMatrix4(o),Q.multiplyScalar(1/Q.w),J.multiplyScalar(1/J.w),Q.x*=i.x/2,Q.y*=i.y/2,J.x*=i.x/2,J.y*=i.y/2,ee.start.copy(Q),ee.start.z=0,ee.end.copy(J),ee.end.z=0;const M=ee.closestPointToPointParameter(Gn,!0);ee.at(M,ko);const v=f.lerp(Q.z,J.z,M),P=v>=-1&&v<=1,T=Gn.distanceTo(ko)<bt*.5;if(P&&T){ee.start.fromBufferAttribute(l,L),ee.end.fromBufferAttribute(c,L),ee.start.applyMatrix4(a),ee.end.applyMatrix4(a);const V=new y,D=new y;Te.distanceSqToSegment(ee.start,ee.end,D,V),n.push({point:D,pointOnLine:V,distance:Te.origin.distanceTo(D),object:e,face:null,faceIndex:L,uv:null,uv1:null})}}}class qi extends ne{constructor(t=new ts,n=new lo({color:Math.random()*16777215})){super(t,n),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const t=this.geometry,n=t.attributes.instanceStart,o=t.attributes.instanceEnd,s=new Float32Array(2*n.count);for(let a=0,r=0,l=n.count;a<l;a++,r+=2)Do.fromBufferAttribute(n,a),To.fromBufferAttribute(o,a),s[r]=r===0?0:s[r-1],s[r+1]=s[r]+Do.distanceTo(To);const i=new Jn(s,2,1);return t.setAttribute("instanceDistanceStart",new Ot(i,1,0)),t.setAttribute("instanceDistanceEnd",new Ot(i,1,1)),this}raycast(t,n){const o=this.material.worldUnits,s=t.camera;s===null&&!o&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');const i=t.params.Line2!==void 0&&t.params.Line2.threshold||0;Te=t.ray;const a=this.matrixWorld,r=this.geometry,l=this.material;bt=l.linewidth+i,r.boundingSphere===null&&r.computeBoundingSphere(),hn.copy(r.boundingSphere).applyMatrix4(a);let c;if(o)c=bt*.5;else{const m=Math.max(s.near,hn.distanceToPoint(Te.origin));c=Po(s,m,l.resolution)}if(hn.radius+=c,Te.intersectsSphere(hn)===!1)return;r.boundingBox===null&&r.computeBoundingBox(),un.copy(r.boundingBox).applyMatrix4(a);let u;if(o)u=bt*.5;else{const m=Math.max(s.near,un.distanceToPoint(Te.origin));u=Po(s,m,l.resolution)}un.expandByScalar(u),Te.intersectsBox(un)!==!1&&(o?Ui(this,n):Ni(this,s,n))}onBeforeRender(t){const n=this.material.uniforms;n&&n.resolution&&(t.getViewport(Yn),this.material.uniforms.resolution.value.set(Yn.z,Yn.w))}}class ns extends ts{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(t){const n=t.length-3,o=new Float32Array(2*n);for(let s=0;s<n;s+=3)o[2*s]=t[s],o[2*s+1]=t[s+1],o[2*s+2]=t[s+2],o[2*s+3]=t[s+3],o[2*s+4]=t[s+4],o[2*s+5]=t[s+5];return super.setPositions(o),this}setColors(t){const n=t.length-3,o=new Float32Array(2*n);for(let s=0;s<n;s+=3)o[2*s]=t[s],o[2*s+1]=t[s+1],o[2*s+2]=t[s+2],o[2*s+3]=t[s+3],o[2*s+4]=t[s+4],o[2*s+5]=t[s+5];return super.setColors(o),this}setFromPoints(t){const n=t.length-1,o=new Float32Array(6*n);for(let s=0;s<n;s++)o[6*s]=t[s].x,o[6*s+1]=t[s].y,o[6*s+2]=t[s].z||0,o[6*s+3]=t[s+1].x,o[6*s+4]=t[s+1].y,o[6*s+5]=t[s+1].z||0;return super.setPositions(o),this}fromLine(t){const n=t.geometry;return this.setPositions(n.attributes.position.array),this}}class os extends qi{constructor(t=new ns,n=new lo({color:Math.random()*16777215})){super(t,n),this.isLine2=!0,this.type="Line2"}}const H=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile/i.test(navigator.userAgent)||navigator.maxTouchPoints&&navigator.maxTouchPoints>1;let tt=null;const j=new ri,Yi=H?80:75,k=new li(Yi,window.innerWidth/window.innerHeight,.1,1e3);k.lookAt(0,0,0);H?k.position.set(0,10,350):k.position.set(0,10,200);let ss="high-performance";H&&navigator.hardwareConcurrency&&navigator.hardwareConcurrency<=4&&(ss="low-power");const vt=new ci({canvas:document.querySelector("#bg"),antialias:!0,powerPreference:ss,logarithmicDepthBuffer:!H}),it=vt.domElement,Gi=H?1.5:2;vt.setPixelRatio(Math.min(window.devicePixelRatio,Gi));const is=new di(vt);is.compileEquirectangularShader();let as=!1;window.onYouTubeIframeAPIReady=()=>{as=!0};const at=new mi,ke=new ce,oe=[],Wi=300;let ie=[],Co=0,Ao=!1,Pn=!0,bn=!1,He=1.5,co=!1,ft=0;const Xi=setInterval(()=>{ft<100&&(co=!0,ft+=1+Math.random()*1.5,ft=Math.min(ft,100),document.querySelector(".loading-progress").style.width=`${ft}%`),ft>=100&&clearInterval(Xi)},100);setTimeout(()=>{Pn&&(console.warn("⏰ Loading timeout reached. Forcing screen dismiss."),rs())},3e4);function rs(){const e=document.getElementById("loading-screen");e.classList.add("fade-out"),setTimeout(()=>{e.style.display="none",Pn=!1;const t=()=>{mo(),window.removeEventListener("click",t),window.removeEventListener("keydown",t)};window.addEventListener("click",t),window.addEventListener("keydown",t)},1e3)}window.addEventListener("load",()=>{(!history.state||history.state.modalOpen===void 0)&&history.replaceState({modalOpen:!1},"")});window.addEventListener("pointerdown",e=>{e.pointerType==="touch"&&(window.removeEventListener("pointerdown",arguments.callee),mo())},{once:!0});const Cn=new ui;Cn.onProgress=(e,t,n)=>{co=!0;const o=t/n*100;ft=o,document.querySelector(".loading-progress").style.width=`${o}%`};const ls=new hi(Cn);let de=!1;const _t=document.getElementById("cursor-fly"),Xt=document.getElementById("cursor-orbit");function cs(){de?(_t.style.display="block",Xt.style.display="none"):(_t.style.display="none",Xt.style.display="block")}let Io=0,zo=0,Bo=Date.now();setInterval(()=>{const e=parseFloat(_t.style.left||0),t=parseFloat(_t.style.top||0);e!==Io||t!==zo?(Io=e,zo=t,Bo=Date.now(),ho()):Date.now()-Bo>3e3&&uo()},3e3);document.addEventListener("mousemove",e=>{const t=e.clientX,n=e.clientY;_t.style.transform=`translate(${t}px, ${n}px)`,Xt.style.transform=`translate(${t}px, ${n}px)`});cs();function uo(){_t.style.opacity="0",Xt.style.opacity="0"}function ho(){_t.style.opacity="0.8",Xt.style.opacity="0.75"}let eo;window.addEventListener("mouseout",e=>{!e.relatedTarget&&!e.toElement&&(clearTimeout(eo),uo())});window.addEventListener("mousemove",e=>{document.hasFocus()&&(clearTimeout(eo),eo=setTimeout(()=>{document.hasFocus()&&ho()},0))});document.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"?ho():uo()});window.addEventListener("keydown",e=>{e.key.toLowerCase()==="f"&&(bn=!bn,console.log(bn?"📸 Screenshot mode ON":"▶️ Resumed animation"))});const Zt=document.getElementById("fullscreen-toggle"),mn=Zt.querySelector("i");function Zi(){document.fullscreenElement?document.exitFullscreen().then(()=>{mn.classList.remove("fa-compress"),mn.classList.add("fa-expand"),Zt.title="Enter fullscreen"}):document.documentElement.requestFullscreen().then(()=>{mn.classList.remove("fa-expand"),mn.classList.add("fa-compress"),Zt.title="Exit fullscreen"})}let Xn=!1;function ds(){Xn||(Xn=!0,Zi(),setTimeout(()=>Xn=!1,500))}Zt.addEventListener("click",e=>{e.stopPropagation(),ds()});Zt.addEventListener("touchstart",e=>{e.stopPropagation(),e.preventDefault(),ds()},{passive:!1});document.addEventListener("keydown",e=>{const t=document.fullscreenElement!==null;e.key==="Escape"&&t&&(e.preventDefault(),e.stopPropagation(),console.log("🚫 ESC blocked in fullscreen"))});document.addEventListener("keydown",e=>{e.key==="Tab"&&!e.repeat&&(e.preventDefault(),document.documentElement.requestFullscreen())});const ot=document.createElement("div");ot.className="tooltip";document.body.appendChild(ot);const Zn=document.querySelector(".modal-details");["scroll","touchmove","wheel"].forEach(e=>Zn==null?void 0:Zn.addEventListener(e,Ut));const Ue=document.createElement("div");Ue.className="idle-hint";Ue.innerHTML=`
  <button class="idle-hint-close">✖</button>
  ${H?`
<div class="hint-line"><span class="big-emoji">👆</span> <strong>Tap</strong> to interact</div>
<div class="hint-line"><span class="big-emoji">👉</span> <strong>Drag</strong> to rotate</div>
<div class="hint-line"><span class="big-emoji">🤏</span> <strong>Pinch</strong> to zoom</div>
<div class="hint-line"><span class="big-emoji">✌️</span> <strong>Two fingers</strong> to pan</div>
    `:`
    <div class="hint-line">
      <div class="mouse-icon"><div class="mouse-button left"></div><div class="mouse-body"></div></div>
      <strong>Left click</strong> to rotate camera
    </div>
    <div class="hint-line">
      <div class="mouse-icon"><div class="mouse-button right"></div><div class="mouse-body"></div></div>
      <strong>Right click</strong> to pan / focus
    </div>
    <div class="hint-line">
      <div class="mouse-icon"><div class="mouse-wheel"></div><div class="mouse-body"></div></div>
      <strong>Scroll</strong> to zoom
    </div>
    <div class="hint-line">
      <div class="mouse-icon fake"></div>
      <div class="wasd-group">
        <kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd>
        <span class="wasd-label"> to <strong>move</strong></span>
      </div>
    </div>
    <div class="hint-line">
      <kbd class="wide">⇧ Shift</kbd> to <strong>boost</strong>
    </div>
      <div class="hint-line">
    <kbd>Z</kbd> to <strong>descend</strong>
  </div>
  <div class="hint-line">
    <kbd class="wide">Space</kbd> to <strong>ascend</strong>
  </div>
    <div class="hint-line">
  <kbd>F</kbd> to <strong>freeze time</strong>
</div>
  <div class="hint-line">
  <kbd>M</kbd> to <strong>mute/unmute</strong>
</div>
    <div class="hint-line">
  <kbd>N</kbd> to toggle <strong>Disco mode</strong>
</div>
    <div class="hint-line">
  <kbd>T</kbd> to toggle <strong>Fly mode</strong>
</div>
    <div class="hint-line">
  <kbd>G</kbd> to open <strong>Gallery</strong>
</div>
  `}
`;document.body.appendChild(Ue);const ye=document.createElement("button");ye.id="hint-toggle-button";ye.innerHTML="🎮";ye.style.display="none";document.body.appendChild(ye);let to=null;function Ki(e=3e4){Ue.classList.add("visible"),ye.style.display="none",clearTimeout(to),to=setTimeout(()=>{Ue.classList.remove("visible"),ye.style.display="block",setTimeout(()=>{ye.classList.add("idle-hint-ready")},200),setTimeout(()=>{ye.classList.remove("idle-hint-ready")},5e3)},e)}setTimeout(()=>{},800);ye.addEventListener("click",()=>{Ue.classList.add("visible"),ye.style.display="none",to=setTimeout(()=>{Ue.classList.remove("visible"),ye.style.display="block"},3e4)});const $i=Ue.querySelector(".idle-hint-close");$i.addEventListener("click",()=>{Ue.classList.remove("visible"),ye.style.display="block"});function Qi(e=.5){const t=o=>{o.volume=e,o.addEventListener("play",()=>{o.volume=e}),o.addEventListener("volumechange",()=>{Math.abs(o.volume-e)>.01&&(o.volume=e)})};document.querySelectorAll("video, audio").forEach(t),new MutationObserver(o=>{o.forEach(s=>{s.addedNodes.forEach(i=>{(i.tagName==="VIDEO"||i.tagName==="AUDIO")&&t(i),i.querySelectorAll&&i.querySelectorAll("video, audio").forEach(t)})})}).observe(document.body,{childList:!0,subtree:!0})}function An(){const e=H?1:window.devicePixelRatio||1;document.documentElement.style.setProperty("--zoom",e)}An();window.addEventListener("resize",An);window.addEventListener("load",An);window.addEventListener("DOMContentLoaded",An);console.log("Current zoom factor:",getComputedStyle(document.documentElement).getPropertyValue("--zoom"));const Ne=document.createElement("div");Ne.id="coord-display";Ne.innerHTML="<span>●</span>";document.body.appendChild(Ne);let Wt=!1,no="";Ne.classList.add("dot-mode");let Ro=0;function us(){const e=Date.now();e-Ro<400||(Ro=e,Wt=!Wt,Ne.classList.toggle("dot-mode",!Wt),setTimeout(()=>{Ne.querySelector("span").textContent=Wt?no:"●"},100))}Ne.addEventListener("click",us);Ne.addEventListener("touchstart",e=>{e.preventDefault(),us()},{passive:!1});function Ji(){const e=Math.round(k.position.x),t=Math.round(k.position.y),n=Math.round(k.position.z);no=`${e} ${t} ${n}`,Wt&&(Ne.querySelector("span").textContent=no)}let hs=.09,qe=.09;const vn={ambient:new Audio("./floats.mp3")},F=vn.ambient;F.loop=!0;F.volume=qe;function mo(){Pn||Ao||(Ao=!0,F.play().then(()=>{console.log("🎧 Ambient music playing"),Ta();const e=document.querySelector(".volume-control"),t=document.getElementById("volume-slider");t.addEventListener("mousedown",n=>n.stopPropagation()),t.addEventListener("touchstart",n=>n.stopPropagation()),e.classList.add("appear"),e.classList.remove("low-opacity"),e.classList.remove("hover-ready"),e.classList.remove("volume-visible"),setTimeout(()=>{e.classList.remove("appear"),e.classList.add("hover-ready"),window.dispatchEvent(new Event("volumePulseFinished"))},14300),window.removeEventListener("click",mo)}).catch(e=>{console.warn("Autoplay blocked:",e)}))}const ea=document.getElementById("reactivity-slider"),ta=document.getElementById("reactivity-value");ea.addEventListener("input",e=>{He=parseFloat(e.target.value),ta.textContent=He.toFixed(2)});const na=document.getElementById("reactivity-control"),st=document.getElementById("volume-icon"),ve=document.getElementById("volume-slider");let Ve=!1;function ms(e){qe=e,hs=e,F&&!Ve&&(F.volume=e),ve.value=e,po()}function po(){const e=st.classList;e.remove("fa-volume-mute","fa-volume-off","fa-volume-down","fa-volume-up"),Ve||qe===0?(e.add("fa-volume-mute"),st.style.color="#888"):qe<.5?(e.add("fa-volume-down"),st.style.color="#ffcc00"):(e.add("fa-volume-up"),st.style.color="#ffcc00")}let pn=qe;st&&st.addEventListener("click",()=>{Ve=!Ve,Ve?(pn=F.volume,F.volume=0,ve.value=0):(F.volume=pn,qe=pn,ve.value=pn),po()});ve.addEventListener("input",e=>{const t=parseFloat(e.target.value);Ve&&(Ve=!1,po()),ms(t),F.paused&&F.play().then(()=>{console.log("🔊 Ambient resumed via volume slider")}).catch(n=>{console.warn("Could not resume ambient:",n)})});ve.addEventListener("wheel",e=>{e.preventDefault();const t=.1,n=e.deltaY<0?1:-1;let o=parseFloat(ve.value)+n*t;o=Math.min(1,Math.max(0,o)),ve.value=o,ve.dispatchEvent(new Event("input"))},{passive:!1});st&&st.addEventListener("wheel",e=>{e.preventDefault();const t=.1,n=e.deltaY<0?1:-1;let o=parseFloat(ve.value)+n*t;o=Math.min(1,Math.max(0,o)),ve.value=o,ve.dispatchEvent(new Event("input"))},{passive:!1});ms(qe);function Oo(e,t=300){const o=t/30,s=F.volume,i=(e-s)/30;let a=0;const r=setInterval(()=>{a++;const l=s+i*a;F.volume=f.clamp(l,0,1),a>=30&&clearInterval(r)},o)}Oo(Ve?0:qe);window.addEventListener("keydown",e=>{const t=document.activeElement;if(!(t&&(t.tagName==="INPUT"||t.tagName==="TEXTAREA"||t.isContentEditable))){if(e.key.toLowerCase()==="m"){const o=document.getElementById("volume-icon");o&&o.click()}if(e.key.toLowerCase()==="n"){const o=document.getElementById("sound-toggle");o&&o.click()}e.key.toLowerCase()==="r"&&e.shiftKey&&na.classList.toggle("hidden")}});const z=new Ti(k,vt.domElement);H&&(z.enableZoom=!0,z.enablePan=!0,z.enableDamping=!0,z.dampingFactor=1,z.rotateSpeed=1,z.zoomSpeed=.5,z.panSpeed=1.5);z.minDistance=35;z.maxDistance=800;let Jt=null,q=null;const Ht=5;let Fo=0;window.addEventListener("mousedown",e=>{Jt=e.target,q={x:e.clientX,y:e.clientY},e.button});window.addEventListener("touchstart",e=>{const t=e.touches[0];Jt=e.target,q={x:t.clientX,y:t.clientY};const n=Date.now();if(n-Fo<400){e.preventDefault();return}Fo=n},{passive:!1});window.addEventListener("touchend",e=>{const t=e.changedTouches[0],n=Math.abs(t.clientX-((q==null?void 0:q.x)??0)),o=Math.abs(t.clientY-((q==null?void 0:q.y)??0));if(n>Ht||o>Ht||Jt!==e.target){console.log("❌ Touch drag blocked");return}const i=(ae==null?void 0:ae.style.display)==="flex",a=e.target.closest(".mic-popup-window"),r=e.target.closest(".modal-content"),l=e.target.closest(".modal-close");if(r||i&&!a)return;if(l)return wt();if(_.classList.contains("active"))return;const c=it.getBoundingClientRect(),u=(t.clientX-c.left)/it.clientWidth*2-1,m=-((t.clientY-c.top)/it.clientHeight)*2+1;ke.set(u,m),at.setFromCamera(ke,k);const L=at.intersectObjects(oe,!0);for(const B of L)if(B.object.userData.isImagePlane){const{name:S,imageSrc:M,medium:v,year:P,description:T,isVideoPlane:V,ytVideoId:D,kiriEmbed:Z}=B.object.userData;ys({name:S,imageSrc:M,medium:v,year:P,description:T,isVideoPlane:V,ytVideoId:D,kiriEmbed:Z});break}},{passive:!1});window.addEventListener("contextmenu",e=>{e.preventDefault();const t=Math.abs(e.clientX-((q==null?void 0:q.x)??0)),n=Math.abs(e.clientY-((q==null?void 0:q.y)??0));if(t>Ht||n>Ht||Jt!==e.target){console.log("❌ Dragged right-click blocked");return}const s=it.getBoundingClientRect(),i=(e.clientX-s.left)/it.clientWidth*2-1,a=-((e.clientY-s.top)/it.clientHeight)*2+1;ke.set(i,a),at.setFromCamera(ke,k);const r=at.intersectObjects(oe,!0);if(r.length>0){const l=r[0].point;za(l),console.log("🎯 Smooth focus triggered")}});const oa="./nebula_mob.hdr",sa="./nebula_desk.hdr",ia=H?oa:sa;new Vi(Cn).load(ia,e=>{e.mapping=pi;const t=is.fromEquirectangular(e).texture;j.environment=t,j.background=t,e.dispose()});const en=document.createElement("div");en.classList.add("overlay");document.body.appendChild(en);const ps=document.createElement("style");ps.innerHTML=`
    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.1); /* Semi-transparent black background */
      z-index: 9998; /* Behind the modal but above the 3D scene */
      display: none; /* Hidden by default */
    }
  `;document.head.appendChild(ps);const _=document.createElement("div");_.classList.add("modal");_.innerHTML=`
  <div class="modal-overlay">
    <button class="modal-close" aria-label="Close modal">&times;</button>
    <div class="zoom-lock-container">
      <div class="modal-content aartink-mode">
        <div class="modal-content-inner">
          <div class="modal-body">
            <img src="" alt="" class="modal-image" />
            <div class="modal-embed" style="display: none;"> </div>
            <div class="modal-details">
              <h2 class="modal-title"></h2>
              <p class="modal-medium">
                <span class="value"></span>
              </p>
              <p class="modal-year">
                <span class="value"></span>
              </p>
              <p class="modal-description">
                <span class="value"></span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
`;document.body.appendChild(_);const $=_.querySelector(".modal-image"),W=_.querySelector(".modal-embed"),ut=_.querySelector(".modal-title"),ht=_.querySelector(".modal-medium .value"),mt=_.querySelector(".modal-year .value"),pt=_.querySelector(".modal-description .value");function aa(e){const t=e.domElement,n=t.clientWidth,o=t.clientHeight,s=window.devicePixelRatio||1,i=t.width!==n*s||t.height!==o*s;return i&&(e.setSize(n,o,!1),e.setPixelRatio(s)),i}function ra(e,t=1e3){let n=0;const o=Math.floor(e._lastVolume??50),s=Math.max(1,t/50),i=o/s,a=setInterval(()=>{n+=i;const r=Math.min(Math.floor(n),o);e.setVolume(r),n>=o&&clearInterval(a)},50)}function fs(e,t=1500){var i;typeof e._lastVolume>"u"&&(e._lastVolume=((i=e.getVolume)==null?void 0:i.call(e))??100);let n=e._lastVolume;const o=n/(t/50),s=setInterval(()=>{n-=o,n<=0?(e.setVolume(0),e.pauseVideo(),clearInterval(s)):e.setVolume(n)},50)}let fo=!1;function ys({name:e,imageSrc:t,medium:n,year:o,description:s,isVideoPlane:i,ytVideoId:a,kiriEmbed:r,isLocalVideo:l}){fo=!0,history.pushState({modalOpen:!0},""),_.classList.add("active","modal-opening"),setTimeout(()=>{_.classList.remove("modal-opening")},300);const c=_.querySelector(".modal-content"),u=e==="Aart.ink",m=e==="Bisque Pot",L=e==="3D Scan";if(_.classList.contains("active")||history.pushState({modalOpen:!0},""),_.classList.add("active"),en.style.display="block",document.body.style.overflow="hidden",z.enabled=!1,_.style.zIndex=9999,$.src=t,$.alt="",$.style.display="none",W.innerHTML="",W.style.display="none",c.classList.remove("aartink-mode"),_.removeAttribute("data-aartink"),l?(_.querySelector(".modal-content").classList.remove("aartink-mode"),_.querySelector(".modal-content").classList.add("local-video-mode")):c.classList.remove("local-video-mode"),i&&(t!=null&&t.endsWith(".mp4"))&&(l=!0),F&&!F.paused&&i&&(F.pause(),console.log("🎞 Ambient music paused for video")),u)c.classList.add("aartink-mode"),_.setAttribute("data-aartink","true"),ut.textContent="Aart.ink",ht.textContent="",mt.textContent="",pt.innerHTML=`
    <div class="aartink-wrapper">
      <h1 class="aartink-title">AART.INK</h1>
      <h2>Socials</h2>
      
      <div class="social-buttons" style="margin-bottom: 20px;">
        <a href="https://www.instagram.com/aart.ink" target="_blank">
          <i class="fab fa-instagram"></i> Instagram
        </a>
        <a href="https://www.facebook.com/abtahi0" target="_blank">
          <i class="fab fa-facebook"></i> Facebook
        </a>
      </div>

         <div class="newsletter-header">
  <i class="fas fa-envelope email-icon"></i>
  <span class="newsletter-label">Contact</span>
</div>
      <div class="newsletter-signup">
        <input type="email" id="user-email" placeholder="Enter your email" required />
        <button id="send-email-btn">Sign Up</button>
        <div id="email-status"></div>
      </div>

      <div id="fb-feed">
        <div class="fb-page"
            data-href="https://www.facebook.com/abtahi0"
            data-tabs="timeline"
            data-width="500"
            data-height="600"
            data-small-header="false"
            data-adapt-container-width="true"
            data-hide-cover="false"
            data-show-facepile="true">
        </div>
      </div>
    </div>
  `,setTimeout(()=>{const S=document.getElementById("send-email-btn"),M=document.getElementById("user-email"),v=document.getElementById("email-status");if(!S||!M||!v){console.warn("💥 Email elements not found");return}typeof z<"u"&&(M.addEventListener("focus",()=>{z.enabled=!1,de=!1}),M.addEventListener("blur",()=>{z.enabled=!de})),window.addEventListener("keydown",T=>{document.activeElement===M&&[" ","Shift","w","a","s","d","q","e","f","t"].includes(T.key)&&T.stopPropagation()},!0);const P=()=>{const T=M.value.trim();if(!T||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(T)){v.textContent="❗ Please enter a valid email.",v.style.color="red";return}fetch("https://aartink.netlify.app/.netlify/functions/send-newsletter",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:T})}).then(D=>D.json()).then(D=>{D.success?(v.textContent="✅ Welcome email sent!",v.style.color="green",M.value=""):(v.textContent="❌ Failed to send. Try again.",v.style.color="red")}).catch(D=>{v.textContent="❌ Error sending email.",v.style.color="red",console.error(D)})};M.addEventListener("keydown",T=>{T.key==="Enter"&&(T.preventDefault(),P())}),S.addEventListener("click",T=>{T.preventDefault(),P()})},100);else if(r)W.innerHTML=r,W.style.display="block",$.style.display="none",ut.textContent=e||"",ht.textContent=n||"",mt.textContent=o||"",pt.innerHTML=s||"";else if(m)W.innerHTML=`
        <iframe 
          title="bisque piece" 
          src="https://www.kiriengine.app/share/embed/b77779aef91b44efa488cbea11d40cac?userId=888696&bg_theme=dark&auto_spin=1"
          frameborder="0"
          allowfullscreen 
          mozallowfullscreen 
          webkitallowfullscreen 
          allow="autoplay; fullscreen;"
          style="width: 100%; height: 400px; border: 0;"></iframe>
      `,W.style.display="block",ut.textContent=e||"",ht.textContent=n||"",mt.textContent=o||"",pt.innerHTML=s||"";else if(L)W.innerHTML=`
        <iframe 
          title="3D Scan" 
          src="https://www.kiriengine.app/share/embed/6a89148e3c3a4b95abed9264b5c3a6da?userId=888696&bg_theme=dark&auto_spin=1"
          frameborder="0"
          allowfullscreen 
          mozallowfullscreen 
          webkitallowfullscreen 
          allow="autoplay; fullscreen;"
          style="width: 100%; height: 400px; border: 0;">
        </iframe>
      `,W.style.display="block",ut.textContent=e||"",ht.textContent=n||"",mt.textContent=o||"",pt.innerHTML=s||"";else if(i&&l){$.style.display="none",W.innerHTML="",W.style.display="block";const S=document.createElement("video");S.src=t,S.autoplay=!0,S.muted=!1,S.loop=!0,S.playsInline=!0,S.controls=!0,S.volume=.4,W.appendChild(S),ut.textContent=e||"",ht.textContent=n||"",mt.textContent=o||"",pt.innerHTML=s||"";return}else if(i){const S=a||"defaultVideoId";if(W.innerHTML="",H){const M=`https://www.youtube.com/embed/${S}?autoplay=1&mute=1&playsinline=1`;W.innerHTML=`
          <iframe 
            id="yt-fallback-mobile"
            title="${e}" 
            src="${M}" 
            frameborder="0"
            allow="autoplay; encrypted-media"
            allowfullscreen
            playsinline
style="
  width: 100%;
  aspect-ratio: 16 / 9;
  height: auto;
  border: none;
  "
          </iframe>
        `;const v=document.createElement("button");v.className="unmute-btn",v.innerText="Enable Sound 🔊",Object.assign(v.style,{marginTop:"0.75rem",padding:"8px 14px",fontSize:"0.9rem",background:"#111",color:"#ffd700",border:"1px solid #ffd700",cursor:"pointer",borderRadius:"6px",display:"inline-block",transition:"all 0.2s ease",boxShadow:"0 2px 4px rgba(0,0,0,0.2)"}),v.addEventListener("mouseenter",()=>{v.style.background="#ffd700",v.style.color="#111"}),v.addEventListener("mouseleave",()=>{v.style.background="#111",v.style.color="#ffd700"}),v.addEventListener("click",()=>{const P=`https://www.youtube.com/embed/${S}?autoplay=1&mute=0&playsinline=1`;W.innerHTML=`
            <iframe 
              id="yt-fallback-mobile-unmuted"
              title="${e} (Unmuted)" 
              src="${P}" 
              frameborder="0"
              allow="autoplay; encrypted-media"
              allowfullscreen
              playsinline
              style="width: 100%; max-width: 2400px; aspect-ratio: 16 / 9; height: auto; display: block; border: 0;">
            </iframe>
          `}),W.appendChild(v)}else if(as){const M=document.createElement("div");M.id="yt-desktop-player",M.style.width="100%",M.style.maxWidth="2400px",M.style.aspectRatio="16 / 9",M.style.marginBottom="1rem",W.appendChild(M);const v=new YT.Player("yt-desktop-player",{videoId:S,playerVars:{autoplay:1,mute:0,playsinline:1},events:{onReady:P=>{P.target.setVolume(0),P.target.unMute(),P.target.playVideo(),ra(P.target),_.dataset.ytPlayer=P.target}}});_.dataset.ytPlayer=v}else{const M=`https://www.youtube.com/embed/${S}?autoplay=1&mute=0&playsinline=1&enablejsapi=1&rel=0&showinfo=0`;W.innerHTML=`
          <iframe 
            id="yt-player"
            title="${e}" 
            src="${M}" 
            frameborder="0"
            allow="autoplay; encrypted-media"
            allowfullscreen
            playsinline
            style="width: 100%; max-width: 2400px; aspect-ratio: 16 / 9; height: auto; display: block; border: 0;">
          </iframe>
        `}W.style.display="block",ut.textContent=e||"",ht.textContent=n||"",mt.textContent=o||"",pt.innerHTML=s||""}else{if(e==="C.O.L.L.A.B"){const S=jo[Math.floor(Math.random()*jo.length)];$.src=S}else if(e==="Abtahi"){const S=Ho[Math.floor(Math.random()*Ho.length)];$.src=S}else $.src=t||"";$.alt=e||"",$.style.display="block",ut.textContent=e||"",ht.textContent=n||"",mt.textContent=o||"",pt.innerHTML=s||""}setTimeout(Ut,100);const B=_.querySelector(".modal-details");B&&new ResizeObserver(Ut).observe(B)}function wt(){fo=!1,_.classList.add("closing"),setTimeout(()=>{var n;_.classList.remove("active","closing"),document.body.style.overflow="",z.enabled=!0,en.style.display="none";const e=_.querySelector(".modal-content"),t=_.querySelector(".modal-details");if(e&&(e.style.transform=""),t&&(t.style.transform=""),!Ve&&F){F.paused&&(F.volume=0,F.play().then(()=>{console.log("🔊 Ambient resumed after modal close")}).catch(a=>{console.warn("Ambient resume failed:",a)}));const o=qe||.4,s=o/20,i=setInterval(()=>{F.volume=Math.min(o,F.volume+s),F.volume>=o&&clearInterval(i)},50)}if(_.dataset.ytPlayer){const o=_.dataset.ytPlayer;fs(o),_.dataset.ytPlayer=null}W.innerHTML="",_.querySelectorAll("iframe").forEach(o=>o.remove()),(n=history.state)!=null&&n.modalOpen&&setTimeout(()=>history.back(),100)},400)}_.classList.add("closing");setTimeout(()=>{_.classList.remove("active","closing"),document.body.style.overflow="",z.enabled=!0,en.style.display="none";const e=_.querySelector(".modal-content"),t=_.querySelector(".modal-details");e&&(e.style.transform=""),t&&(t.style.transform="")},400);var Wo;(Wo=history.state)!=null&&Wo.modalOpen&&setTimeout(()=>history.back(),100);vn&&!vn.muted&&(vn.volume=hs);if(_.dataset.ytPlayer){const e=_.dataset.ytPlayer;fs(e),_.dataset.ytPlayer=null}document.addEventListener("keydown",e=>{e.key==="Escape"&&_.classList.contains("active")&&wt()});window.addEventListener("popstate",e=>{_.classList.contains("active")&&wt()});function la(e,t){e.userData={...t,...e.userData},e.isMesh&&(e.userData.cachedOutline=null),e.traverse(n=>{n.isMesh&&(n.userData={...t,...n.userData},n.userData.cachedOutline=null)})}const _e=document.createElement("video");_e.src="./test.mp4";_e.loop=!0;_e.muted=!0;_e.autoplay=!0;_e.playsInline=!0;_e.setAttribute("playsinline","");_e.crossOrigin="anonymous";_e.oncanplaythrough=()=>_e.play();const tn=new Je(_e);tn.minFilter=Y;tn.magFilter=Y;tn.generateMipmaps=!1;const ca=new Se({map:tn,color:new te(16777215)}),U=new ne(new $t(30,72,72),ca);j.add(U);const jo=["./Sphere.jpg","./Sphere2.jpg","./Sphere3.jpg"];U.userData={isImagePlane:!0,name:"C.O.L.L.A.B",imageSrc:"./Sphere.jpg",description:"C.O.L.L.A.B explores the concept of translations: from sound to image, from the physical to the metaphysical. At its core, the project investigates the dynamic relationship between humans, technology, and space through interactive sound and projected visuals. The central sphere acts as both a canvas and living entity, responding to your presence. Visuals emerge from the sphere’s surface, shaped by the volume and frequency of its surrounding sounds.",medium:"Installation",year:"2025"};oe.push(U);const da=new fi,Ee=[],Fe=[];ie.push(...Fe);const Ye=document.createElement("video");Ye.src="./Shaped.mp4";Ye.loop=!0;Ye.muted=!0;Ye.autoplay=!0;Ye.playsInline=!0;Ye.oncanplaythrough=()=>Ye.play();const In=new Je(Ye);In.minFilter=Y;In.magFilter=Y;In.format=dt;const gs=new Se({map:In,side:Oe}),ua=new et(65,40),Ce=new ne(ua,gs);Ce.position.set(-40,-80,100);Ce.userData.originalColor=gs.color.clone();Ce.userData={isImagePlane:!0,isVideoPlane:!0,name:"Shaped",imageSrc:"",description:"Thomas was alone, Thomas went on a journey, Thomas was shaped, Thomas is home.",medium:"Stop-motion painting",year:"2021"};j.add(Ce);oe.push(Ce);Ce.userData.baseScale=Ce.scale.clone();Fe.push(Ce);Ce.userData.ytVideoId="l7PrLzz6X3Q";Ee.push(Ce);const Ge=document.createElement("video");Ge.src="./NothingChanges.mp4";Ge.loop=!0;Ge.muted=!0;Ge.autoplay=!0;Ge.playsInline=!0;Ge.oncanplaythrough=()=>Ge.play();const zn=new Je(Ge);zn.minFilter=Y;zn.magFilter=Y;zn.format=dt;const ws=new Se({map:zn,side:Oe}),ha=new et(65,40),Ae=new ne(ha,ws);Ae.position.set(190,-60,10);Ae.userData.originalColor=ws.color.clone();Ae.userData={isImagePlane:!0,isVideoPlane:!0,name:"Nothing Changes",imageSrc:"",description:"A contemplative stop-motion piece exploring the quiet persistence of time and repetition.",medium:"Stop-motion painting",year:"2020"};j.add(Ae);oe.push(Ae);Fe.push(Ae);Ee.push(Ae);Ae.userData.ytVideoId="Ytul_pgGHfI";Ae.userData.baseScale=Ae.scale.clone();const We=document.createElement("video");We.src="./katzenjammer.mp4";We.loop=!0;We.muted=!0;We.autoplay=!0;We.playsInline=!0;We.oncanplaythrough=()=>We.play();const Bn=new Je(We);Bn.minFilter=Y;Bn.magFilter=Y;Bn.format=dt;const bs=new Se({map:Bn,side:Oe}),ma=new et(30,50),Ie=new ne(ma,bs);Ie.position.set(-55,60,-200);Ie.userData.originalColor=bs.color.clone();Ie.userData={isImagePlane:!0,isVideoPlane:!0,name:"Katzenjammer",imageSrc:"",description:'A live performance where I composed and looped a guitar track, then painted in real time using a brush attached to the neck of my guitar. The act of playing and painting became a unified gesture, each stroke informed by the rhythm, tone, and movement of sound. The resulting work captures not only the physical trace of motion but the resonance of an improvised moment, where sound and image emerged together through the same instrument. The result of this performace would be my painting <em>"Construction P"</em>.',medium:"Performance",year:"2024"};j.add(Ie);oe.push(Ie);Ie.userData.baseScale=Ie.scale.clone();Fe.push(Ie);Ie.userData.ytVideoId="yrBib2R-4kg";Ee.push(Ie);const Xe=document.createElement("video");Xe.src="./beholder.mp4";Xe.loop=!0;Xe.muted=!0;Xe.autoplay=!0;Xe.playsInline=!0;Xe.oncanplaythrough=()=>Xe.play();const Rn=new Je(Xe);Rn.minFilter=Y;Rn.magFilter=Y;Rn.format=dt;const vs=new Se({map:Rn,side:Oe}),pa=new et(65,40),ze=new ne(pa,vs);ze.position.set(-75,200,-190);ze.userData.originalColor=vs.color.clone();ze.userData={isImagePlane:!0,isVideoPlane:!0,name:"Beholder",imageSrc:"",description:"They are always watching.",medium:"Performance",year:"2024"};j.add(ze);oe.push(ze);ze.userData.baseScale=ze.scale.clone();Fe.push(ze);ze.userData.ytVideoId="h4v_SK-V4wA";Ee.push(ze);const Be=document.createElement("video");Be.src="./soar.mp4";Be.loop=!0;Be.muted=!0;Be.autoplay=!0;Be.playsInline=!0;Be.crossOrigin="anonymous";Be.oncanplaythrough=()=>Be.play();const On=new Je(Be);On.minFilter=Y;On.magFilter=Y;On.format=dt;const _s=new Se({map:On,side:Oe}),fa=new et(70,30),Ze=new ne(fa,_s);Ze.position.set(130,210,90);Ze.userData.originalColor=_s.color.clone();Ze.userData={isImagePlane:!0,isVideoPlane:!0,isLocalVideo:!0,name:"Soar",imageSrc:"./soar.mp4",description:"",medium:"Digital",thumbnail:"./soar.jpg",year:"2017"};j.add(Ze);oe.push(Ze);Fe.push(Ze);Ee.push(Ze);Ze.userData.baseScale=Ze.scale.clone();const Ke=document.createElement("video");Ke.src="./catscan.mp4";Ke.loop=!0;Ke.muted=!0;Ke.autoplay=!0;Ke.playsInline=!0;Ke.crossOrigin="anonymous";Ke.oncanplaythrough=()=>Ke.play();const Fn=new Je(Ke);Fn.minFilter=Y;Fn.magFilter=Y;Fn.format=dt;const Es=new Se({map:Fn,side:Oe}),ya=new et(60,40),$e=new ne(ya,Es);$e.position.set(80,130,-190);$e.userData.originalColor=Es.color.clone();$e.userData={isImagePlane:!0,isVideoPlane:!0,isLocalVideo:!0,name:"CAT Scan",imageSrc:"./catscan.mp4",description:"Beginning with a solid clay sculpture of a cat, complete with anatomically accurate internal organs modeled in stained clay, the piece was then methodically sliced like a loaf of bread. Each cross-section was individually fired and suspended.",medium:"Stoneware, Installation",thumbnail:"./catscan.jpg",year:"2022"};j.add($e);oe.push($e);Fe.push($e);Ee.push($e);$e.userData.baseScale=$e.scale.clone();const Re=document.createElement("video");Re.src="./clayful_prev.mp4";Re.loop=!0;Re.muted=!0;Re.autoplay=!0;Re.playsInline=!0;Re.crossOrigin="anonymous";Re.oncanplaythrough=()=>Re.play();const jn=new Je(Re);jn.minFilter=Y;jn.magFilter=Y;jn.format=dt;const Ss=new Se({map:jn,side:Oe}),ga=new et(30,50),Qe=new ne(ga,Ss);Qe.position.set(-130,-20,120);Qe.userData.originalColor=Ss.color.clone();Qe.userData={isImagePlane:!0,isVideoPlane:!0,isLocalVideo:!0,name:"Clayful",imageSrc:"./clayful.mp4",description:"A group exhibition.",medium:"Ceramics",thumbnail:"./clayful.png",year:"2023"};j.add(Qe);oe.push(Qe);Fe.push(Qe);Ee.push(Qe);Qe.userData.baseScale=Qe.scale.clone();const wa=[{src:"./yoko.jpg",name:"Yoko",description:"Imagine a 2ft x 3ft canvas where a luminous, glossy background sets a vibrant stage for the central subject rendered in a subtle matte finish. The deliberate contrast creates a dynamic interplay of texture and depth, drawing your eye into the heart of the scene. At the center of this artistic dialogue is a personal homage to my beloved dog Yoko—a gentle reminder of her ever-present warmth and joyful spirit. Yoko’s playful eyes and comforting presence are subtly integrated into the composition, imbuing the painting with both visual intrigue and heartfelt sentiment.",medium:"Acrylic on canvas.",year:"2019",size:[25,40],position:[80,60,75]},{src:"./yoko2.jpg",name:"Yoko",description:"This piece is a colored lithophane made from cast porcelain. It was created using a mold made from a 3D-printed lithophane, from a photograph of my cat, Yoko. A handmade wooden frame encases the lithophane, while colored transparencies add color to the lithophane.<br>The labor-intensive process of making this piece reflects the care and devotion we have for our pets. When illuminated, the lithophane symbolizes how our pets brighten our lives, transforming effort into warmth, labor into love.",medium:"Porcelain and wood",year:"2025",size:[40,40],position:[-105,70,-75]},{src:"./afeeling.jpg",name:"A Feeling",description:"This work features three wood-fired ceramic pieces arranged within a diorama, integrated seamlessly into the scene",medium:"Stoneware, Installation",year:"2024",size:[65,40],position:[-105,-80,-85]},{src:"./owned2.png",name:"Poppified",description:"This piece was created in collaboration with the Bangladeshi band <em>Owned</em>. The main subject was photographed against a green screen and printed. The print was then collaged with traditional painting on canvas. The piece was finally scanned and digitally manipulated to complete the composition.",medium:"Mixed Media",year:"2017",size:[40,40],position:[90,60,-120]},{src:"./ownedposter.jpg",name:"Owned Two",description:"Created in collaboration with the Bangladeshi band <em>Owned</em>, this work reimagines the band through the lens of pulp cinema. Drawing visual inspiration from vintage film posters—most notably <em>Pulp Fiction</em>—the band members are placed within a bold, graphic composition that blends satire, homage, and cultural commentary. The final image was digitally composed to evoke the gritty charm of cult classic cinema.",medium:"Digital",year:"2018",size:[35,45],position:[160,10,-165]},{src:"./pudge.jpg",name:"Pudge, The Butcher",description:"",medium:"Acrylic on Canvas",year:"2016",size:[30,20],position:[-20,-20,-185]},{src:"./birthday.jpg",name:"Birthday Bouquet",description:"",medium:"Acrylic on canvas",year:"2016",size:[35,45],position:[10,180,25]},{src:"./timbersaw.jpg",name:"Rizzrack, The Timbersaw",description:"",medium:"Acrylic on Canvas",year:"2017",size:[45,30],position:[20,-170,-15]},{src:"./keno.jpg",name:"কেন?",description:"",medium:"Digital",year:"2018",size:[30,25],position:[160,100,-35]},{src:"./dalaimama.jpg",name:"Dalai Mama",description:"",medium:"Paper Collage",year:"2017",size:[40,25],position:[-140,40,30]},{src:"./funk_noodles.jpg",name:"Funk Noodles",description:"",medium:"Acrylic on canvas",year:"2017",size:[40,55],position:[-120,200,-10]},{src:"./fantastic_planet.jpg",name:"Fantastic Planet",description:'A homage to the ablum, <em>"Failure - Fantastic Planet"</em>',medium:"Acrylic on canvas",year:"2017",size:[50,35],position:[40,170,-85]},{src:"./tinker.jpg",name:"Boush, The Tinker",description:"",medium:"Acrylic on canvas",year:"2016",size:[40,40],position:[85,-150,75]},{src:"./conclusion.jpg",name:"Conclusion",description:"",medium:"Acrylic on canvas",year:"2017",size:[55,40],position:[-60,170,170]},{src:"./glare.png",name:"Glare",description:"A triptych of forests painted in gradients of green, red, and gold. Each panel represents a different emotional phase—growth, warmth, and introspection. Together, they form a meditative sequence of light and time.",medium:"Acrylic on canvas",year:"2016",size:[80,40],position:[-120,40,200]},{src:"./render.jpg",name:"Construction B",description:"Blender render; composite scene using geospatial data from Google Maps, 3D scanned models, and digitally modeled assets.",medium:"Digital",year:"2024",size:[30,40],position:[140,55,180]},{src:"./construction.jpg",name:"Construction P",description:"Painting based on a Blender-rendered digital environment.",medium:"Acrylic on Canvas",year:"2024",size:[30,40],position:[-180,-20,-130]},{src:"./baba.png",name:"বাবা",description:"Woodfired mug.",medium:"Stoneware",year:"2023",size:[20,20],position:[-10,-40,200]},{src:"./ammu.png",name:"আম্মু",description:"Woodfired mug.",medium:"Stoneware",year:"2023",size:[20,20],position:[20,-60,205]},{src:"./flash.jpg",name:"Flash",description:"",medium:"Acrylic on canvas",year:"2016",size:[20,30],position:[20,-110,-150]},{src:"./cha.png",name:"অনিদ্রারোগসংক্রান্ত চা",description:"Cone 6 Oxidation.",medium:"Stoneware",year:"2023",size:[35,30],position:[210,50,-145]},{src:"./pani.png",name:"পানি",description:"",medium:"Stoneware, wire, cork",year:"2023",size:[15,35],position:[-180,140,-140]}];function ba({src:e,name:t,description:n,medium:o,year:s,size:i,position:a}){const r=da.load(e);r.encoding=void 0;const l=new Se({map:r,transparent:!0,alphaTest:.1,side:Oe});r.encoding=void 0,r.colorSpace=bi,l.map=r,l.color.setRGB(1.1,1.1,1.1);const c=new et(...i),u=new ne(c,l);return u.position.set(...a),u.userData.originalColor=l.color.clone(),u.userData={...u.userData,isImagePlane:!0,name:t,imageSrc:e,description:n,medium:o,year:s},j.add(u),oe.push(u),u}wa.forEach(e=>{const t=ba(e);Ee.push(t)});function va(e,t=1.2){const n=new kn().setFromObject(e),o=new y,s=new y;n.getSize(o),n.getCenter(s),o.multiplyScalar(t);const i=new Si(o.x,o.y,o.z),a=new Se({color:16711935,transparent:!0,opacity:0,depthWrite:!1}),r=new ne(i,a);r.name="hitbox",e.worldToLocal(s),r.position.copy(s),e.add(r),r.userData={...e.userData,linkedModel:e,modelRef:e},oe.push(r),r.userData.disableOutline=!0}function he(e,t,n,o,s=()=>{}){ls.load(e,i=>{const a=i.scene;a.scale.set(...t),a.position.set(...n),la(a,o),j.add(a),oe.push(a),ie.push(a),a.userData.baseScale=a.scale.clone(),(o.name==="Aart.ink"||o.name==="Abtahi")&&va(a,3.5),s(a)})}let Ft,be,yt,gt,Mt,Dt,Tt,kt,Pt,Ct,At,It,zt;he("./aartink.glb",[.3,.3,.3],[0,45,0],{isImagePlane:!0,name:"Aart.ink",imageSrc:"",description:"",medium:""},e=>{Ft=e;const t=document.createElement("video");t.src="./static.mp4",t.loop=!0,t.muted=!0,t.playsInline=!0,t.crossOrigin="anonymous",t.addEventListener("canplaythrough",()=>{const n=new Je(t);n.minFilter=Y,n.magFilter=Y,n.format=dt,Ft.traverse(o=>{o.isMesh&&o.name==="Aartink"&&(o.material=new Qt({map:n,emissive:new te(0),emissiveIntensity:1,side:Oe}))}),t.play()}),t.load()});const Ho=["./abtahi.jpg","./abtahi2.jpg","./abtahi3.jpg"];he("./abtahi.glb",[.3,.3,.3],[0,-45,0],{isImagePlane:!0,name:"Abtahi",imageSrc:"./abtahi.jpg",description:"My practice is a conversation between cultures, technologies, and material forms. I move fluidly across ceramics, painting, digital media, sound, and sculpture; drawing from each to build immersive installations that are both sensory and conceptual. Whether projecting real-time visuals onto a floating sphere or handcrafted porcelain lithophanes, I explore how narratives can translate across media and space. At the heart of my work is a desire to transform interaction into meaning, inviting viewers to not just witness; but participate..",medium:""},e=>{be=e,be.traverse(n=>{n.isMesh&&n.name!=="hitbox"&&(n.material=new Qt({color:16776960,emissive:16776960,emissiveIntensity:1.5,roughness:.3,metalness:.6}))});function t(){be.traverse(n=>{if(n.isMesh){const o=Math.random();o<.01?n.material.emissiveIntensity=Math.random()*5:o<.3?n.material.emissiveIntensity=Math.random()*2:n.material.emissiveIntensity=.9}})}setInterval(t,Math.random()*200+100)});he("./barn.glb",[8,8,8],[75,0,-210],{isImagePlane:!0,name:"Texture Map",imageSrc:"",description:"A sculpture that replicates the procedural logic of digital 3D modeling and texture mapping, but constructed entirely through analog, hand-based techniques.",medium:"Sculpture",year:"2023",isVideoPlane:!1,kiriEmbed:`
    <iframe 
      title="Texture Map" 
      src="https://www.kiriengine.app/share/embed/6a8a63dad8eb4896905f3ad2743cb655?userId=888696&bg_theme=dark&auto_spin_model=1"
      frameborder="0"
      allowfullscreen 
      mozallowfullscreen 
      webkitallowfullscreen 
      allow="autoplay; fullscreen;"
      style="width: 100%; height: 400px; border: 0;">
    </iframe>
  `},e=>{kt=e});he("./Aphrodite.glb",[10,10,10],[-20,120,-140],{isImagePlane:!0,name:"Aphrodite",imageSrc:"",description:"A woodfired ceramic vessel. Its surface bears the unpredictable blush of flame and ash.",medium:"Stoneware",year:"2022",isVideoPlane:!1,ytVideoId:"",kiriEmbed:`
    <iframe 
      title="Aphrodite" 
      src="https://www.kiriengine.app/share/embed/429feddd6fbd42e4b5f42fddc77302a3?userId=888696&bg_theme=dark&auto_spin_model=1&model_rotation=%7B%22x%22%3A%22-2.49241%22%2C%22y%22%3A%22-0.06463%22%2C%22z%22%3A%22-2.80944%22%7D&model_position=%7B%22x%22%3A%220.00000%22%2C%22y%22%3A%220.00000%22%2C%22z%22%3A%220.00000%22%7D"
      frameborder="0"
      allowfullscreen 
      mozallowfullscreen 
      webkitallowfullscreen 
      allow="autoplay; fullscreen;"
      style="width: 100%; height: 400px; border: 0;">
    </iframe>
  `},e=>{Mt=e});he("./glazed.glb",[35,35,35],[-120,10,-200],{isImagePlane:!0,name:"Glazed Pot",imageSrc:"",description:"Slip casted. Cone 6 glaze fired.",medium:"Stoneware",year:"2024",isVideoPlane:!1,ytVideoId:"",kiriEmbed:`
    <iframe 
      title="Glazed Pot" 
      src="https://www.kiriengine.app/share/embed/3d3ad8705aae458283b04881db3e8d33?userId=888696&bg_theme=dark&auto_spin_model=1&model_rotation=%7B%22x%22%3A%22-2.49241%22%2C%22y%22%3A%22-0.06463%22%2C%22z%22%3A%22-2.80944%22%7D&model_position=%7B%22x%22%3A%220.00000%22%2C%22y%22%3A%220.00000%22%2C%22z%22%3A%220.00000%22%7D"
      frameborder="0"
      allowfullscreen 
      mozallowfullscreen 
      webkitallowfullscreen 
      allow="autoplay; fullscreen;"
      style="width: 100%; height: 400px; border: 0;">
    </iframe>
  `},e=>{Pt=e});he("./Zagreus.glb",[10,10,10],[130,150,130],{isImagePlane:!0,name:"Zagreus",imageSrc:"",description:"A woodfired ceramic vessel that embodies yearning, its form reaching, stretching, as if pulled by a distant desire etched in flame.",medium:"Stoneware",year:"2022",isVideoPlane:!1,ytVideoId:"",kiriEmbed:`
    <iframe 
      title="Pothos" 
      src="https://www.kiriengine.app/share/embed/3acdb3c5a2734023ad83a585390abc28?userId=888696&bg_theme=dark&auto_spin_model=1&model_rotation=%7B%22x%22%3A%220.60808%22%2C%22y%22%3A%22-0.82252%22%2C%22z%22%3A%220.67818%22%7D&model_position=%7B%22x%22%3A%220.00000%22%2C%22y%22%3A%220.00000%22%2C%22z%22%3A%220.00000%22%7D"
      frameborder="0"
      allowfullscreen 
      mozallowfullscreen 
      webkitallowfullscreen 
      allow="autoplay; fullscreen;"
      style="width: 100%; height: 400px; border: 0;">
    </iframe>
  `},e=>{Dt=e});he("./zelus.glb",[5,5,5],[120,0,-140],{isImagePlane:!0,name:"Zelus",imageSrc:"",description:"A woodfired ceramic vessel.",medium:"Stoneware",year:"2022",isVideoPlane:!1,ytVideoId:"",kiriEmbed:`
    <iframe 
      title="Zelus" 
      src="https://www.kiriengine.app/share/embed/cb45bdf6c83b45578650d955e48b244a?userId=888696&bg_theme=dark&auto_spin_model=1&model_rotation=%7B%22x%22%3A%223.09915%22%2C%22y%22%3A%22-0.11968%22%2C%22z%22%3A%22-2.99637%22%7D&model_position=%7B%22x%22%3A%220.00000%22%2C%22y%22%3A%220.00000%22%2C%22z%22%3A%220.00000%22%7D"
      frameborder="0"
      allowfullscreen 
      mozallowfullscreen 
      webkitallowfullscreen 
      allow="autoplay; fullscreen;"
      style="width: 100%; height: 400px; border: 0;">
    </iframe>
  `},e=>{Tt=e});he("./edd.glb",[100,100,100],[160,150,70],{isImagePlane:!0,name:"Edd",imageSrc:"",description:"A soda fired ceramic vessel.",medium:"Stoneware",year:"2025",isVideoPlane:!1,ytVideoId:"",kiriEmbed:`
    <iframe 
      title="Edd" 
      src="https://www.kiriengine.app/share/embed/94f4ddb2df22467d8f4c4c28b4ab86da?userId=888696&bg_theme=dark&auto_spin_model=1&model_rotation=%7B%22x%22%3A%220.60808%22%2C%22y%22%3A%22-0.82252%22%2C%22z%22%3A%220.67818%22%7D&model_position=%7B%22x%22%3A%220.00000%22%2C%22y%22%3A%220.00000%22%2C%22z%22%3A%220.00000%22%7D"
      frameborder="0"
      allowfullscreen 
      mozallowfullscreen 
      webkitallowfullscreen 
      allow="autoplay; fullscreen;"
      style="width: 100%; height: 400px; border: 0;">
    </iframe>
  `},e=>{At=e});he("./ed.glb",[15,15,15],[-135,0,30],{isImagePlane:!0,name:"Ed",imageSrc:"",description:"A soda fired ceramic vessel.",medium:"Stoneware",year:"2025",isVideoPlane:!1,ytVideoId:"",kiriEmbed:`
    <iframe 
      title="Ed" 
      src="https://www.kiriengine.app/share/embed/75432a3b0bfe4bdfaea88b290ea703ae?userId=888696&bg_theme=dark&auto_spin_model=1&model_rotation=%7B%22x%22%3A%22-2.50957%22%2C%22y%22%3A%220.01643%22%2C%22z%22%3A%221.44328%22%7D&model_position=%7B%22x%22%3A%220.00000%22%2C%22y%22%3A%220.00000%22%2C%22z%22%3A%220.00000%22%7D"
      frameborder="0"
      allowfullscreen 
      mozallowfullscreen 
      webkitallowfullscreen 
      allow="autoplay; fullscreen;"
      style="width: 100%; height: 400px; border: 0;">
    </iframe>
  `},e=>{Ct=e});he("./eddy.glb",[5,5,5],[70,0,170],{isImagePlane:!0,name:"Eddy",imageSrc:"",description:"A soda fired ceramic vessel.",medium:"Stoneware",year:"2025",isVideoPlane:!1,ytVideoId:"",kiriEmbed:`
    <iframe 
      title="Eddy" 
      src="https://www.kiriengine.app/share/embed/0ffd431cf5624da482e48d291ef07eb1?userId=888696&bg_theme=dark&auto_spin=1&model_rotation=%7B%22x%22%3A%22-2.87538%22%2C%22y%22%3A%220.53195%22%2C%22z%22%3A%221.44112%22%7D&model_position=%7B%22x%22%3A%220.00000%22%2C%22y%22%3A%220.00000%22%2C%22z%22%3A%220.00000%22%7D"
      frameborder="0"
      allowfullscreen 
      mozallowfullscreen 
      webkitallowfullscreen 
      allow="autoplay; fullscreen;"
      style="width: 100%; height: 400px; border: 0;">
    </iframe>
  `},e=>{It=e});he("./nyanko.glb",[1,1,1],[100,0,-110],{isImagePlane:!0,name:"nyanko",imageSrc:"/nyanko.jpg",description:'<span style="font-size: 3rem;">🦖</span>',medium:"3D Print",year:"2024",isVideoPlane:!1,ytVideoId:"",kiriEmbed:""},e=>{zt=e,e.rotation.x=18});he("./face.glb",[10,10,10],[90,-90,-90],{isImagePlane:!0,name:"3D Scan",imageSrc:"",description:"Thats me!",medium:"",year:"2024"},e=>{yt=e});he("./pot.glb",[10,10,10],[-80,80,90],{isImagePlane:!0,name:"Bisque Pot",imageSrc:"",description:"Marbled slip cast. Cone 06 bisqued",medium:"Bisqueware",year:"2024"},e=>{gt=e});function _a(){return[Ye,Ge,Be,F,We,Xe,Re,_e].map(t=>new Promise(n=>{if(!t)return n();const o=()=>n();t.readyState>=3?o():t instanceof HTMLAudioElement||t instanceof HTMLVideoElement?(t.addEventListener("canplaythrough",o,{once:!0}),t.load()):o()}))}Cn.onLoad=async()=>{const e=co?0:1e3,t=_a();await Promise.all(t),setTimeout(()=>{rs()},e)};const yo=new Jo;j.add(yo);const Ea=H?500:1500,Vo=900;for(let e=0;e<Ea;e++){const t=new y(f.randFloatSpread(1),f.randFloatSpread(1),f.randFloatSpread(1)).normalize(),n=Math.pow(Math.random(),1.5)*Vo,o=t.multiplyScalar(n),s=f.mapLinear(n,0,Vo,.1,.5),i=new $t(s,12,12),a=f.randFloat(0,1),r=f.randFloat(.05,.2),l=f.randFloat(.85,1),c=new te().setHSL(a,r,l),u=new Qt({color:c,emissive:c,emissiveIntensity:f.randFloat(1,2)}),m=new ne(i,u);m.position.copy(o),yo.add(m)}const oo=new Jo;j.add(oo);const so=[],Sa=H?4:12;function xa(){const e=[new te(7838122),new te(10070715),new te(8952234),new te(6715272),new te(10079436),new te(9060914)],t=e[Math.floor(Math.random()*e.length)],n=f.randFloat(.3,.6),o=new ne(new $t(n,16,16),new Qt({color:t,emissive:t,emissiveIntensity:2,transparent:!0,opacity:0})),s=70,i=[];for(let l=0;l<s;l++){const c=1-l/s,u=new ne(new et(n*.4,n*1.2),new Se({color:t.clone().multiplyScalar(.8),transparent:!0,opacity:c,side:Oe,depthWrite:!1,blending:vi}));u.rotation.z=Math.random()*Math.PI,oo.add(u),i.push(u)}const a=new y(f.randFloatSpread(300),f.randFloatSpread(300),f.randFloatSpread(300)),r=new y(f.randFloat(.2,.6),f.randFloat(.1,.4),f.randFloat(.4,1));o.position.copy(a),oo.add(o),so.push({comet:o,trail:i,velocity:r,curvePhase:Math.random()*Math.PI*2,waveFreq:Math.random()*.5+.2,fadePhase:Math.random()*Math.PI*2})}for(let e=0;e<Sa;e++)xa();const Mn=H?48:256,Dn=36,xs=[];for(let e=0;e<Mn;e++){const t=e/Mn*Math.PI*2,n=Math.cos(t)*Dn,o=0,s=Math.sin(t)*Dn;xs.push(n,o,s)}const Ls=new ns;Ls.setPositions(xs);const go=new lo({color:15658734,linewidth:H?1:2.5,transparent:!0,opacity:0,depthWrite:!1,dashed:!1});go.resolution.set(window.innerWidth,window.innerHeight);window.addEventListener("resize",()=>{go.resolution.set(window.innerWidth,window.innerHeight)});const ue=new os(Ls,go);ue.computeLineDistances();j.add(ue);ue.position.copy(U.position);ue.scale.set(1.7,1.7,1.7);ue.userData.baseScale=new y(1.7,1.7,1.7);ie.push(ue);function nn(e,t,n){const o=e.geometry.clone(),s=e.material.clone(),i=new os(o,s);return i.computeLineDistances(),i.position.copy(U.position),i.position.y+=t,i.scale.set(n,n,n),i.userData.baseScale=new y(n,n,n),j.add(i),ie.push(i),i}const Uo=nn(ue,1,1.5),Ms=nn(ue,-1,1.5),Ds=nn(ue,-.5,1.85),Ts=nn(ue,.5,1.85),ks=nn(ue,0,1.85),Vt=H?[ue,Uo]:[ue,Uo,Ms,Ds,Ts,ks];H||Vt.push(Ms,Ds,Ts,ks);const Kn=Vt.map(()=>0),Yt=Vt.map(()=>0),$n=Vt.map(()=>2);function La(e,t,n){const o=[],s=Math.PI*2/e;for(let i=0;i<e;i++){const a=i*s+Math.random()*s,r=f.randFloat(t[0],t[1]),l=Math.cos(a)*r,c=f.randFloat(n[0],n[1]),u=Math.sin(a)*r;o.push(new y(l,c,u))}return o.push(o[0].clone()),o}function No(e,t){const n=e.length-1,o=t%n,s=Math.floor(o),i=o-s;return new y().lerpVectors(e[s],e[(s+1)%e.length],i)}const Ps=[],Ma=[{url:"./stop.glb",scale:.5},{url:"./whisper.glb",scale:.5},{url:"./clayman.glb",scale:.5},{url:"./orloff.glb",scale:.2},{url:"./interdis.glb",scale:.3},{url:"./coffee.glb",scale:.6},{url:"./hydrant.glb",scale:.6},{url:"./caution.glb",scale:.4},{url:"./free.glb",scale:.5},{url:"./bench.glb",scale:.4},{url:"./GKmodel.glb",scale:.6}];Ma.forEach(({url:e,scale:t})=>{ls.load(e,n=>{const o=n.scene;o.scale.set(t,t,t);const s=La(10,[50,250],[-150,150]);o.userData={path:s,offset:Math.random()*10,baseScale:new y(t,t,t),speed:.1+Math.random()*.05,currentIntensity:0,trail:[],trailLength:100,lastPosition:new y};const i=s[0].clone();o.position.copy(i),o.userData.lastPosition=i.clone();for(let a=0;a<o.userData.trailLength;a++){const r=a/o.userData.trailLength,l=new ne(new $t(t*1.2,8,8),new Qt({color:new te().setHSL(r,1,.5),emissive:new te().setHSL(r,1,.5),emissiveIntensity:1.5,transparent:!0,opacity:0,depthWrite:!1}));j.add(l),o.userData.trail.push(l)}Ps.push(o),ie.push(o),j.add(o)})});const Bt=new yi(16777215,2);j.add(Bt);const Cs=new gi(16777215,1);Cs.position.set(5,50,5).normalize();j.add(Cs);const x={w:!1,a:!1,s:!1,d:!1,q:!1,e:!1,arrowup:!1,arrowdown:!1,arrowleft:!1,arrowright:!1,shift:!1,z:!1," ":!1};window.addEventListener("blur",()=>{for(const e in x)x[e]=!1});document.addEventListener("visibilitychange",()=>{if(document.hidden)for(const e in x)x[e]=!1});window.addEventListener("keydown",e=>{const t=e.key.toLowerCase();t in x&&(x[t]=!0),e.code==="Space"&&(x[" "]=!0)});window.addEventListener("keyup",e=>{const t=e.key.toLowerCase();t in x&&(x[t]=!1),e.code==="Space"&&(x[" "]=!1)});function As(){const e=document.querySelector(".welcome-popup"),t=document.getElementById("interaction-catcher");return(e==null?void 0:e.classList.contains("visible"))||!!t}function Da(e){var n;if(As()||!e.geometry||e.getObjectByName("outline"))return;const t=(n=e.userData.name)==null?void 0:n.toLowerCase();if(e.userData.cachedOutline){const o=e.userData.cachedOutline.clone();o.name="outline",e.add(o)}else{let o=30,s=16776960;switch(t){case"c.o.l.l.a.b":o=2;break;case"3d scan":o=120;break}const i=new xi(e.geometry,o),a=new Li({color:s}),r=new Mi(i,a);r.name="outline",e.add(r),e.userData.cachedOutline=r.clone()}}function Is(e){As()||e.userData.disableOutline||(e.isMesh&&Da(e),e.children.forEach(Is))}function io(e){const t=e.getObjectByName("outline");t&&e.remove(t),e.children.forEach(io)}window.addEventListener("mousemove",e=>{const t=_.classList.contains("active"),n=document.querySelector(".welcome-popup"),o=document.getElementById("interaction-catcher"),s=(n==null?void 0:n.classList.contains("visible"))||!!o;if(t||s){ot.classList.remove("visible");return}const i=vt.domElement.getBoundingClientRect();ke.x=(e.clientX-i.left)/i.width*2-1,ke.y=-((e.clientY-i.top)/i.height)*2+1,at.setFromCamera(ke,k);const a=at.intersectObjects(oe,!0);let r=!1;for(const l of a){let c=l.object;for(;c&&!c.userData.isImagePlane&&c.parent;)c=c.parent;if(c&&c.userData.isImagePlane){const u=c.userData.modelRef||c;ot.classList.add("visible"),ot.style.left=`${e.clientX+10}px`,ot.style.top=`${e.clientY+10}px`,ot.innerHTML=u.userData.name||"",tt!==u&&(tt&&io(tt),Is(u),tt=u),r=!0;break}}r||(ot.classList.remove("visible"),tt&&(io(tt),tt=null))});const qo=H?"Tap screen to initialize":"Click to initialize";window.addEventListener("load",()=>{const e=document.createElement("div");e.className="welcome-popup",e.innerHTML=`
      <div class="welcome-content">
        <h2 data-text="AART.INK">AART.INK</h2>
        <p data-text="${qo}">${qo}</p>
      </div>
    `,document.body.appendChild(e)});function Ta(){const e=document.querySelector(".welcome-popup");e&&(e.classList.remove("visible"),e.classList.add("closing"),setTimeout(()=>{e.remove()},800),setTimeout(()=>{Ki(1e4)},5e3))}window.addEventListener("click",e=>{var L;if(Pn){e.preventDefault(),e.stopPropagation();return}document.getElementById("interaction-catcher")&&((L=document.getElementById("interaction-catcher"))==null||L.remove());const t=Date.now();if(t-Co<Wi)return;Co=t;const n=Math.abs(e.clientX-((q==null?void 0:q.x)??0)),o=Math.abs(e.clientY-((q==null?void 0:q.y)??0)),s=n>Ht||o>Ht,i=typeof e.button<"u"&&e.button===2;if(s||Jt!==e.target||i){console.log("❌ Dragged-in click blocked");return}if(e.target.closest(".welcome-popup, .mic-popup, #interaction-catcher, .volume-control, .unmute-btn"))return;if(_.classList.contains("active")){const B=e.target.closest(".modal-close"),S=e.target.closest(".modal-content"),M=e.target.closest(".modal-overlay");if(B){wt();return}else if(!S&&M){wt();return}}if(document.body.classList.contains("mic-blocking")||ae.style.display==="flex"&&e.target.closest(".mic-popup-window")||ae.style.display==="flex")return;const r=_.classList.contains("active"),l=e.target.closest(".modal-close"),c=e.target.closest(".modal-content"),u=e.target.closest(".modal-overlay");if(r){(l||!c&&u)&&wt();return}if(document.getElementById("scene-wrapper").classList.contains("blocked"))return;at.setFromCamera(ke,k);const m=at.intersectObjects(oe,!0);for(const B of m)if(B.object.userData.isImagePlane){const{name:S,imageSrc:M,medium:v,year:P,description:T,isVideoPlane:V,ytVideoId:D,kiriEmbed:Z,isLocalVideo:je}=B.object.userData;setTimeout(()=>{ys({name:S,imageSrc:M,medium:v,year:P,description:T,isVideoPlane:V,ytVideoId:D,kiriEmbed:Z,isLocalVideo:je})},0);break}});function Ut(){const e=document.querySelector(".modal-details");if(!e)return;const t=e.scrollTop,n=e.scrollHeight,o=e.clientHeight,s=t===0,i=t+o>=n-1;e.classList.toggle("at-top",s),e.classList.toggle("at-bottom",i),e.classList.toggle("at-top-at-bottom",s&&i),s&&i?e.classList.add("at-top-at-bottom"):e.classList.remove("at-top-at-bottom")}document.addEventListener("DOMContentLoaded",Ut);window.addEventListener("resize",Ut);var Xo;(Xo=_.querySelector(".modal-details"))==null||Xo.addEventListener("scroll",Ut);document.querySelectorAll(".modal-details").forEach(e=>{e.addEventListener("wheel",t=>{t.stopPropagation()},{passive:!1})});function ka(){const t=document.createElement("canvas");t.width=t.height=512;const n=t.getContext("2d"),o=["#ff00ff","#00ffff","#ffff00","#ff8800","#00ff88"];for(let i=0;i<10;i++){const a=Math.random()*512,r=Math.random()*512,l=Math.random()*80+40,c=o[Math.floor(Math.random()*o.length)];for(let u=-1;u<=1;u++)for(let m=-1;m<=1;m++){const L=a+u*512,B=r+m*512,S=n.createRadialGradient(L,B,0,L,B,l);S.addColorStop(0,c),S.addColorStop(1,"transparent"),n.fillStyle=S,n.beginPath(),n.arc(L,B,l,0,Math.PI*2),n.fill()}}const s=new _i(t);return s.wrapS=s.wrapT=Ei,s.repeat.set(2,2),s.needsUpdate=!0,s}const ao=ka(),nt={nebulaTex:{value:ao},layers:{value:H?3:4},opacity:{value:0},hueShift:{value:0},time:{value:0}},_n=new ne(new $t(1e3,64,64),new $o({uniforms:nt,vertexShader:`
      varying vec2 vUV;
      void main() {
        vUV = uv;
        vec4 pos = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        gl_Position = pos.xyww;
      }
    `,fragmentShader:`
      uniform sampler2D nebulaTex;
      uniform float opacity;
      uniform float hueShift;
      uniform float time;
      varying vec2 vUV;

      vec3 shiftHue(vec3 color, float hueAdjust) {
        float angle = hueAdjust * 6.2831853;
        float s = sin(angle), c = cos(angle);
        mat3 hueRot = mat3(
          vec3(0.299, 0.587, 0.114) + vec3(0.701, -0.587, -0.114) * c + vec3(0.168, -0.330, 0.500) * s,
          vec3(0.299, 0.587, 0.114) + vec3(-0.299, 0.413, -0.114) * c + vec3(0.328, 0.035, -0.292) * s,
          vec3(0.299, 0.587, 0.114) + vec3(-0.300, -0.588, 0.886) * c + vec3(-0.497, 0.292, -0.085) * s
        );
        return color * hueRot;
      }

      void main() {
        vec2 baseUV = vUV * 2.0;  // Original scale preserved
        
        // Multiple offset texture samples
        vec4 texColor = vec4(0.0);
        float layers = 4.0; // Increase for even more density

        for (float i = 0.0; i < layers; i++) {
          float angle = (6.2831853 / layers) * i + time * 0.05;
          vec2 offset = vec2(cos(angle), sin(angle)) * 0.3 * (i + 1.0);
          texColor += texture2D(nebulaTex, baseUV + offset);
        }

        texColor /= layers;  // average samples to maintain original brightness

        vec3 shiftedColor = shiftHue(texColor.rgb, hueShift) *1.5;

        float edgeFade = smoothstep(0.1, 0.3, vUV.y) * smoothstep(0.1, 0.3, 1.0 - vUV.y);

        gl_FragColor = vec4(shiftedColor, texColor.a * opacity * edgeFade);
      }
    `,side:wi,transparent:!0,depthWrite:!1}));j.add(_n);let Tn=!1,N=!1,K,w,fn=10;const O=document.getElementById("sound-toggle"),ae=document.createElement("div");ae.id="mic-popup";ae.className="mic-popup";ae.innerHTML=`
    <div class="mic-popup-window">
      <p><strong>Enable Mic?</strong></p>
      <div class="mic-options">
        <button id="enable-mic-btn"><strong>Yes</strong><br>Let’s vibe!</button>
        <button id="deny-mic-btn"><strong>No</strong><br>Skip for now.</button>
      </div>
    </div>
  `;document.body.appendChild(ae);document.addEventListener("keydown",e=>{e.key==="Escape"&&ae.style.display==="flex"&&De()});document.body.appendChild(ae);Aa();function Pa(){Tn||(O.innerHTML='<i class="fas fa-microphone"></i>',O.title="Enable mic",setTimeout(()=>{const e=document.createElement("span");e.className="mic-hint";const t="DISCO MODE";e.innerHTML=[...t].map((n,o)=>`<span class="rainbow-letter" style="--i:${o}">${n===" "?"&nbsp;":n}</span>`).join(""),O.appendChild(e),requestAnimationFrame(()=>O.classList.add("reveal")),setTimeout(()=>{e.classList.add("fade-out"),O.classList.remove("reveal"),setTimeout(()=>e.remove(),300),document.querySelector(".volume-control").classList.add("hover-ready")},15e3)},3e3),O.style.display="flex",O.classList.add("visible","fade-in"),setTimeout(()=>O.classList.remove("fade-in"),500),setTimeout(()=>{O.classList.remove("visible"),O.classList.add("low-opacity");const e=document.querySelector(".volume-control");e.classList.remove("hover-ready"),e.classList.add("low-opacity")},18e3))}window.addEventListener("volumePulseFinished",Pa);function zs(){var e;if(Tn)N=!N,N?(O.classList.remove("low-opacity"),O.classList.add("enabled"),O.title="Disable mic",O.innerHTML='<i class="fas fa-microphone"></i>'):(O.classList.remove("enabled"),O.classList.add("low-opacity"),O.title="Enable mic",O.innerHTML='<i class="fas fa-microphone"></i>',setTimeout(Ia,500));else{(e=navigator.permissions)==null||e.query({name:"microphone"}).then(t=>{t.state==="granted"?(Tn=!0,N=!0,Bs()):Ca()});return}}O.addEventListener("click",e=>{e.stopPropagation(),e.preventDefault(),zs()});O.addEventListener("touchstart",e=>{e.stopPropagation(),e.preventDefault(),zs()},{passive:!1});function Ca(){var e,t;ae.style.display="flex",document.body.classList.add("mic-blocking"),(e=document.getElementById("scene-wrapper"))==null||e.classList.add("blocked"),(t=document.getElementById("touch-blocker"))==null||t.style.setProperty("display","block")}function De(){var e,t;ae.style.display="none",document.body.classList.remove("mic-blocking"),(e=document.getElementById("scene-wrapper"))==null||e.classList.remove("blocked"),(t=document.getElementById("touch-blocker"))==null||t.style.setProperty("display","none")}async function Bs(){try{const e=await navigator.mediaDevices.getUserMedia({audio:!0}),t=new(window.AudioContext||window.webkitAudioContext);await t.resume();const n=t.createMediaStreamSource(e);K=t.createAnalyser(),K.fftSize=H?32:128,w=new Uint8Array(K.frequencyBinCount),n.connect(K),Tn=!0,N=!0,De==null||De(),O.title="Disable Mic",O.classList.remove("low-opacity"),O.classList.add("enabled"),O.innerHTML='<i class="fas fa-microphone"></i>',console.log("✅ Mic activated successfully.")}catch(e){console.error("Mic error:",e),alert("Microphone access denied or not supported."),De==null||De()}}function Aa(){const e=document.getElementById("enable-mic-btn"),t=document.getElementById("deny-mic-btn");if(["touchstart","touchend"].forEach(n=>{e.addEventListener(n,o=>{o.stopPropagation()}),t.addEventListener(n,o=>{o.stopPropagation()})}),!e||!t){console.warn("Mic buttons not found yet");return}e.addEventListener("click",async()=>{e.disabled=!0,e.textContent="Enabling...",Bs().finally(()=>{e.disabled=!1,e.innerHTML="<strong>Yes</strong><br>let’s vibe!"})}),t.addEventListener("click",n=>{n.stopPropagation(),De()})}var Zo;(Zo=document.getElementById("deny-mic-btn"))==null||Zo.addEventListener("click",e=>{e.stopPropagation(),De()});window.addEventListener("click",e=>{const t=ae.style.display==="flex",n=e.target.closest(".mic-popup-window"),o=e.target.closest("#sound-toggle");t&&!n&&!o&&De()});function Ia(){be&&be.traverse(e=>{e.isMesh&&e.material&&(Array.isArray(e.material)?e.material:[e.material]).forEach(n=>{var o,s;(o=n.color)==null||o.set(2236928),(s=n.emissive)==null||s.set(16776960),n.emissiveIntensity=1.5,n.metalness=.3,n.roughness=.8,n.needsUpdate=!0})})}let Gt=1;const Qn=new te(16777215);U.userData.baseScale=U.scale.clone();ie.push(U);Ee.forEach(e=>{e.userData.baseScale=e.scale.clone(),ie.push(e)});Fe.forEach(e=>{e.userData.baseScale=e.scale.clone(),ie.push(e)});ie=ie.filter(e=>{var t;return((t=e==null?void 0:e.userData)==null?void 0:t.baseScale)instanceof y});const xt={aart:{amplitude:1.2,speed:.6,offset:.5},abtahi:{amplitude:1.4,speed:.7,offset:2.2}};let Rs=new y,Os=new y,En=1;function za(e){Rs.copy(z.target),Os.copy(e),En=0}let Lt=new y,Ba=.009,Ra=.9915,Yo=0,Go=0,Sn=0,yn=.02;function Fs(){var e;if(requestAnimationFrame(Fs),!(fo&&H)){if(aa(vt)&&(k.aspect=it.clientWidth/it.clientHeight,k.updateProjectionMatrix()),!bn){const t=performance.now()*.001;if(K&&w&&N?(K.getByteFrequencyData(w),ie.forEach((i,a)=>{var m;if(!((m=i.userData)!=null&&m.baseScale))return;const r=a%w.length,l=w[r]/255,c=f.lerp(1,1.25,l),u=i.userData.baseScale.clone().multiplyScalar(c);i.scale.lerp(u,.15)})):ie.forEach(i=>{var a;(a=i.userData)!=null&&a.baseScale&&i.scale.lerp(i.userData.baseScale,.15)}),K&&w){K.getByteFrequencyData(w);const i=w.reduce((d,h)=>d+h,0)/w.length;if(K&&w){K.getByteFrequencyData(w);const d=w.reduce((h,b)=>h+b,0)/w.length;fn+=(d-fn)*.05}if(Vt.length){K.getByteFrequencyData(w);const d=w.reduce((b,g)=>b+g,0)/w.length,h=performance.now();Vt.forEach((b,g)=>{const E=b.geometry,R=[],A=f.lerp(2.5,4,d/255);$n[g]+=(A-$n[g])*.05,b.material.linewidth=$n[g];let re=0;if(N&&w){const pe=w.reduce((fe,Un)=>fe+Un,0)/w.length;re=f.lerp(.01,.75,pe/255)}re>Yt[g]?Yt[g]=re:Yt[g]+=(re-Yt[g])*2,b.material.opacity+=(Yt[g]-b.material.opacity)*.1,b.material.opacity=f.clamp(b.material.opacity,0,1),b.visible=b.material.opacity>.005;const Et=f.lerp(.3,1,b.material.opacity),xe=b.userData.baseScale||new y(1,1,1);b.scale.lerp(xe.clone().multiplyScalar(Et),.2);for(let pe=0;pe<Mn;pe++){const fe=pe/Mn*Math.PI*2,Un=Math.cos(fe)*Dn,Zs=Math.sin(fe)*Dn,Ks=w[(pe+g*10)%w.length]/255,$s=Math.sin(fe*4+h*.002+g)*Ks*(4+g)+Math.sin(fe*8+h*.0015+g)*.4;R.push(Un,$s,Zs)}E.setPositions(R);const we=[1,2],an=g%2===0?1:-1;let me=an*f.lerp(.002,.01*He,d/255);we.includes(g)&&(me=an*f.lerp(.005,.3,d/255)),Kn[g]+=(me-Kn[g])*.1,b.rotation.y+=Kn[g];const le=w.slice(0,20).reduce((pe,fe)=>pe+fe,0)/20,St=w.slice(20,100).reduce((pe,fe)=>pe+fe,0)/80,Hn=w.slice(100).reduce((pe,fe)=>pe+fe,0)/(w.length-100),vo=(le+St+Hn)/3,Vn=le+St+Hn,Us=le/Vn,Ns=St/Vn,qs=Hn/Vn,Ys=(Us*.1+Ns*.4+qs*.7+g*.08+h*7e-5)%1,Gs=f.clamp(vo/200,.7,2),Ws=f.lerp(.3,.75,vo/255),Xs=new te().setHSL(Ys,Gs,Ws);b.material.color.lerp(Xs,.2)})}const a=w.slice(0,20).reduce((d,h)=>d+h,0)/20||0,r=w.slice(20,100).reduce((d,h)=>d+h,0)/80||0,l=w.slice(100).reduce((d,h)=>d+h,0)/Math.max(1,w.length-100),c=(a+r+l)/3,L=f.lerp(5e-5,2e-4,c/200),B=performance.now()*L%1,S=f.clamp((a-l+128)/255,0,1),M=(B+S*.05)%1,v=f.lerp(.3,.6,fn/255),P=new te().setHSL(M,1,v),T=N?1:0,V=N?.03:.01;Gt+=(T-Gt)*V,N&&K&&w&&(K.getByteFrequencyData(w),Qn.lerp(P,.2));const Z=new te().setHSL(.58,.2,.8).clone().lerp(Qn,Gt);if(N&&P&&Qn.lerp(P,.2),K&&w&&N){K.getByteFrequencyData(w);const d=w.slice(0,8).reduce((b,g)=>b+g,0)/8,h=f.clamp(d/255,0,1);ie.forEach((b,g)=>{var xe;if(!((xe=b.userData)!=null&&xe.baseScale))return;const E=g%w.length,R=w[E]/255*He,A=f.lerp(1.25,1.55,h),re=f.lerp(1,A,R),Et=b.userData.baseScale.clone().multiplyScalar(re);b.scale.lerp(Et,.2)})}else ie.forEach(d=>{var h;(h=d.userData)!=null&&h.baseScale&&d.scale.lerp(d.userData.baseScale,.15)});const je=w.slice(0,8).reduce((d,h)=>d+h,0)/8,ge=w.slice(-12).reduce((d,h)=>d+h,0)/12,p=f.clamp((je+ge)/2/255,0,1);if(nt.hueShift.value+=p*.02*He,Bt.intensity=f.lerp(Bt.intensity,(3+p*4)*He,.12),p>.6&&(k.position.x+=Math.sin(t*30)*.5*p,k.position.y+=Math.cos(t*30)*.5*p),nt){const d=N?f.clamp(i/90,.2,.7*He):0;nt.opacity.value+=(d-nt.opacity.value)*.05;const b=1e-4+(w.slice(0,10).reduce((g,E)=>g+E,0)/10||0)/25500;nt.hueShift.value=(nt.hueShift.value+b)%1}Bt.color.lerp(Z,.15),Bt.intensity=f.lerp(Bt.intensity,3+Gt*2,.1),N&&be&&be.traverse(d=>{var h;d.isMesh&&((h=d.material)!=null&&h.emissive)&&(d.material.emissive.lerp(Z,.05),d.material.emissiveIntensity=f.lerp(d.material.emissiveIntensity||1.5,(1.5+fn/255*Gt)*He,.05))}),[...Fe,...Ee].forEach(d=>{var h;(h=d.material)!=null&&h.color&&d.material.color.lerp(Z,.1)}),(e=U==null?void 0:U.material)!=null&&e.color&&U.material.color.lerp(Z,.1)}if(U&&(U.rotation.y+=.001,U.rotation.x+=6e-4,U.rotation.z+=8e-4,U.position.y=Math.sin(t*.7+1.2)*1.5,U.position.x=Math.sin(t*(.7*.8)+.5)*(1.5*.5),U.position.z=Math.sin(t*(.7*1.3)+2.4)*(1.5*.3)),U.readyState===U.HAVE_ENOUGH_DATA&&(tn.needsUpdate=!0),Ee.forEach((i,a)=>{if(tt!==i){const r=a%2===0?1:-1,l=performance.now()*.001+a;i.rotation.y+=r*5e-4+Math.sin(l*.7)*.002,i.rotation.z+=-r*5e-4+Math.sin(l*.5+10)*8e-4,i.rotation.x+=-r*5e-4+Math.sin(l*.5+10)*.001,i.position.y+=Math.sin(l*1.5)*.01}}),Ft&&(Ft.rotation.y+=-3e-4),be&&(be.rotation.y+=6e-4),yt&&(yt.rotation.y+=.001),yt&&(yt.rotation.x+=.001),yt&&(yt.rotation.z+=.001),gt&&(gt.rotation.y+=.001),gt&&(gt.rotation.x+=.001),gt&&(gt.rotation.z+=.001),ao&&(ao.offset.x+=5e-4),Mt){Mt.rotation.y+=.001,Mt.rotation.x+=6e-4,Mt.rotation.z+=8e-4;const i=t*.7+1.5;Mt.position.y=120+Math.sin(i)*1.3}if(Dt){Dt.rotation.y+=.001,Dt.rotation.x+=.0012,Dt.rotation.z+=5e-4;const i=t*.5+2.2;Dt.position.y=-60+Math.sin(i)*1.4}if(Tt){Tt.rotation.y+=.001,Tt.rotation.x+=.0012,Tt.rotation.z+=5e-4;const i=t*.5+2.2;Tt.position.y=190+Math.sin(i)*1.4}if(At){At.rotation.y+=.001,At.rotation.x+=.0012,At.rotation.z+=5e-4;const i=t*.5+2.2;At.position.y=80+Math.sin(i)*1.4}if(It){It.rotation.y+=.001,It.rotation.x+=.0012,It.rotation.z+=5e-4;const i=t*.5+2.2;It.position.y=120+Math.sin(i)*1.4}if(Ct){Ct.rotation.y+=.001,Ct.rotation.x+=.0012,Ct.rotation.z+=5e-4;const i=t*.5+2.2;Ct.position.y=-140+Math.sin(i)*1.4}if(zt){zt.rotation.y+=.001,zt.rotation.x+=.0012,zt.rotation.z+=5e-4;const i=t*.5+2.2;zt.position.y=-85+Math.sin(i)*1.4}if(kt){kt.rotation.y+=.001,kt.rotation.x+=7e-4,kt.rotation.z+=5e-4;const i=t*.6+1.8;kt.position.y=-10+Math.sin(i)*1.5}if(Pt){Pt.rotation.y+=.001,Pt.rotation.x+=7e-4,Pt.rotation.z+=5e-4;const i=t*.6+1.8;Pt.position.y=-10+Math.sin(i)*1.5}if(Ft){const i=t*xt.aart.speed+xt.aart.offset;Ft.position.y=45+Math.sin(i)*xt.aart.amplitude}if(be){const i=t*xt.abtahi.speed+xt.abtahi.offset;be.position.y=-45+Math.sin(i)*xt.abtahi.amplitude}const n=performance.now()*.001;Ps.forEach((i,a)=>{const{path:r,offset:l,speed:c,baseScale:u,trail:m}=i.userData,L=n*(c*(N?4:.5))+l,B=No(r,L),S=No(r,L+.05);let M=0;N&&K&&w&&(K.getByteFrequencyData(w),M=w[a%w.length]/255),i.userData.currentIntensity+=(M-i.userData.currentIntensity)*.05;const v=i.userData.currentIntensity,P=new y(Math.sin(L*1.1+l)*(3+v*2),Math.sin(L*1.6+l)*(8+v*4),Math.cos(L*1.3+l)*(3+v*2));let T;if(N?(T=B.clone().add(P).clamp(new y(-200,-200,-200),new y(200,200,200)),i.userData.lastPosition=T.clone()):T=i.userData.lastPosition||i.position.clone(),i.position.lerp(T,.1),N){const D=S.clone().sub(B).normalize(),Z=new Ln().setFromUnitVectors(new y(0,0,1),D);i.quaternion.slerp(Z,.08)}i.rotation.x+=Math.sin(L+l)*.002,i.rotation.y+=Math.cos(L*.8+l)*.002;const V=f.lerp(1,1.3,v);i.scale.lerp(u.clone().multiplyScalar(V),.08);for(let D=m.length-1;D>0;D--)m[D].position.lerp(m[D-1].position,.5),m[D].material.opacity=f.lerp(m[D].material.opacity,m[D-1].material.opacity,1),m[D].material.emissiveIntensity*=.9;if(m[0].position.copy(i.position),N&&K&&w){const Z=w.reduce((p,C)=>p+C,0)/w.length/255,je=(performance.now()*2e-4+Z*.5)%1,ge=new te().setHSL(je,1,.5);m[0].material.color.copy(ge),m[0].material.emissive.copy(ge),m[0].material.opacity=f.lerp(0,.9,Z),m[0].material.emissiveIntensity=f.lerp(.5,3*He,Z)}else m[0].material.opacity*=.9,m[0].material.emissiveIntensity*=.9}),yo.rotation.y=Math.sin(t*.05)*.2;for(let i=0;i<so.length;i++){const{comet:a,velocity:r,trail:l,curvePhase:c,waveFreq:u,fadePhase:m}=so[i],L=t*u+c,B=new y(Math.sin(L*1.5)*.2,Math.cos(L*1.2)*.2,Math.sin(L)*.1),S=r.clone().add(B);a.position.add(S),a.rotation.y+=.01;const M=.6+.3*Math.sin(t*1.8+m),v=Math.sin((t+m)*.3)*.2,P=Math.max(.25,M+v);a.material.opacity=P,a.position.length()>600&&a.position.set(f.randFloatSpread(300),f.randFloatSpread(300),f.randFloatSpread(300));for(let T=l.length-1;T>0;T--){l[T].position.copy(l[T-1].position);const V=Math.sqrt(1-T/l.length);l[T].material.opacity=V*P}l[0].position.copy(a.position),l[0].material.opacity=P}_n.rotation.x=Math.sin(t*.12)*.2,_n.rotation.y=Math.cos(t*.1)*.3,_n.rotation.z=Math.sin(t*.15)*.25,nt.time.value=t*2;const o=25e-5,s=N?o*4:o;if(j.rotation.y+=s,Ji(),!de&&z&&(x.q||x.e)){const a=x.shift?5:2,r=k.position.distanceTo(z.target),l=a*r/500,c=new y;k.getWorldDirection(c),c.y=0,c.normalize(),c.cross(k.up).normalize();const u=c.clone().multiplyScalar(x.q?-l:l);z.target.add(u),k.position.add(u)}}if(!de){const n=x.shift?4:1,o=new y,s=new y,i=new y,a=new y(0,1,0);k.getWorldDirection(s),s.y=0,s.normalize(),i.crossVectors(s,k.up).normalize(),a.set(0,1,0),o.set(0,0,0),(x.w||x.arrowup)&&o.add(s),(x.s||x.arrowdown)&&o.sub(s),(x.d||x.arrowright)&&o.add(i),(x.a||x.arrowleft)&&o.sub(i),x[" "]&&o.add(a),x.z&&o.sub(a),o.normalize().multiplyScalar(n),k.position.add(o)}if(En<1&&(En+=.03,z.target.lerpVectors(Rs,Os,En)),!de&&z&&(x.q||x.e)){const n=x.shift?5:2,o=k.position.distanceTo(z.target),s=n*o/500,i=new y;k.getWorldDirection(i),i.y=0,i.normalize(),i.cross(k.up).normalize();const a=i.clone().multiplyScalar(x.q?-s:s);z.target.add(a),k.position.add(a)}if(de){Go-=ke.x*yn,Yo+=ke.y*yn,x.q&&(Sn+=yn),x.e&&(Sn-=yn);const t=new Ln().setFromEuler(new So(Yo,Go,Sn,"YXZ"));k.quaternion.slerp(t,.1);const n=new y,o=new y(0,0,-1).applyQuaternion(k.quaternion),s=new y(1,0,0).applyQuaternion(k.quaternion),i=new y(0,1,0);x.w&&n.add(o),x.s&&n.sub(o),x.a&&n.sub(s),x.d&&n.add(s),x[" "]&&n.add(i),x.z&&n.sub(i);const a=Lt.length().toFixed(2);document.getElementById("hud-speed").textContent=a;const r=new So().setFromQuaternion(k.quaternion),l=f.radToDeg(r.y).toFixed(0),c=f.radToDeg(r.x).toFixed(0),u=f.radToDeg(r.z).toFixed(0);document.getElementById("hud-yaw").textContent=l,document.getElementById("hud-pitch").textContent=c,document.getElementById("hud-roll").textContent=u;const m=x.shift?3:1;n.normalize().multiplyScalar(Ba*m),Lt.add(n);const L=2;Lt.length()>L&&Lt.setLength(L),Lt.multiplyScalar(Ra),k.position.add(Lt)}else z.update();vt.render(j,k)}}Fs();document.getElementById("fly-hud");function Oa(){const e=document.getElementById("fly-hud");e&&(de?e.classList.add("visible"):e.classList.remove("visible"))}window.addEventListener("keydown",e=>{e.key.toLowerCase()==="t"&&(de=!de,z.enabled=!de,Oa(),cs(),console.log(de?"🛸 Fly Mode ON":"🧭 Orbit Mode ON"))});z.enabled=!de;window.addEventListener("keydown",e=>{e.key.toLowerCase()==="r"&&(Sn=0,k.up.set(0,1,0))});document.addEventListener("visibilitychange",()=>{document.hidden&&H&&F.pause()});window.addEventListener("keydown",e=>{const t=e.key.toLowerCase(),n=["w","a","s","d","arrowup","arrowdown","arrowleft","arrowright"," ","shift","z","q","e"],o=[{Z:!0,shift:!0,alt:!1,meta:!1,key:"a"},{Z:!0,shift:!1,alt:!1,meta:!1,key:"w"},{Z:!1,shift:!1,alt:!1,meta:!0,key:"d"}];if(n.includes(t)){e.preventDefault(),e.stopPropagation();return}for(const s of o)if(e.ZKey===s.Z&&e.shiftKey===s.shift&&e.altKey===s.alt&&e.metaKey===s.meta&&t===s.key){e.preventDefault(),e.stopPropagation();return}});document.addEventListener("DOMContentLoaded",()=>{if(H){const e=document.getElementById("interaction-catcher");e&&(e.remove(),console.log("Interaction catcher removed on mobile"))}});function Fa(e){const t=e.clientX,n=e.clientY,o=document.getElementById("cursor-fly");o&&(o.style.transform=`translate(${t}px, ${n}px) scale(calc(1 / var(--zoom)))`)}function ja(e,t=33){let n=0;return(...o)=>{const s=performance.now();s-n>t&&(n=s,e(...o))}}window.addEventListener("mousemove",ja(Fa));document.addEventListener("keydown",e=>{if(e.key.toLowerCase()==="g"){const t=document.getElementById("gallery-btn");t&&t.click()}});const X=document.getElementById("fullscreen-image-container"),on=document.getElementById("fullscreen-image"),wo=document.getElementById("fullscreen-close-btn");on.draggable=!1;on.addEventListener("dragstart",e=>e.preventDefault());let Pe=1,rt=0,lt=0,sn=!1,Nt=0,qt=0,xn=!1;$==null||$.addEventListener("click",()=>{on.src=$.src,Pe=1,rt=0,lt=0,ct(),X.classList.remove("hidden"),H&&setTimeout(()=>{wo.classList.add("show-mobile")},4e3)});function js(){X.classList.add("hidden"),wo.classList.remove("show-mobile")}X.addEventListener("click",e=>{(e.target===X||e.target===wo)&&js()});document.addEventListener("keydown",e=>{!X.classList.contains("hidden")&&e.key==="Escape"&&(e.stopPropagation(),js())});document.addEventListener("keydown",e=>{if(X.classList.contains("hidden"))return;const t=40/Pe;switch(e.key.toLowerCase()){case"w":case"arrowup":lt-=t;break;case"s":case"arrowdown":lt+=t;break;case"a":case"arrowleft":rt-=t;break;case"d":case"arrowright":rt+=t;break;default:return}e.preventDefault(),e.stopPropagation(),ct()});X.addEventListener("wheel",e=>{if(X.classList.contains("hidden"))return;e.preventDefault();const t=e.deltaY>0?.9:1.1;Pe*=t,Pe=Math.max(1,Math.min(Pe,5)),ct()},{passive:!1});X.addEventListener("mousedown",e=>{e.button===0&&(sn=!0,xn=!1,Nt=e.clientX,qt=e.clientY,X.style.cursor="grabbing")});window.addEventListener("mousemove",e=>{if(!sn)return;const t=e.clientX-Nt,n=e.clientY-qt;!xn&&Math.hypot(t,n)>3&&(xn=!0),xn&&(rt+=t,lt+=n,ct()),Nt=e.clientX,qt=e.clientY});window.addEventListener("mouseup",()=>{sn=!1,X.style.cursor="grab"});function ct(){on.style.transform=`translate(${rt}px, ${lt}px) scale(${Pe})`}window.addEventListener("wheel",e=>{const t=document.querySelector(".modal.active"),n=!X.classList.contains("hidden");t&&!n&&e.preventDefault()},{passive:!1});window.addEventListener("gesturestart",e=>{const t=document.querySelector(".modal.active"),n=!X.classList.contains("hidden");t&&!n&&e.preventDefault()});let Hs=0,Vs=1,bo=!1;X.addEventListener("touchstart",e=>{if(e.touches.length===2){const t=e.touches[0].clientX-e.touches[1].clientX,n=e.touches[0].clientY-e.touches[1].clientY;Hs=Math.hypot(t,n),Vs=Pe}else e.touches.length===1&&(sn=!0,bo=!0,Nt=e.touches[0].clientX,qt=e.touches[0].clientY)},{passive:!1});X.addEventListener("touchmove",e=>{if(e.touches.length===2){const t=e.touches[0].clientX-e.touches[1].clientX,n=e.touches[0].clientY-e.touches[1].clientY,s=Math.hypot(t,n)/Hs;Pe=Math.max(1,Math.min(Vs*s,5)),ct()}else if(e.touches.length===1&&bo){const t=e.touches[0].clientX-Nt,n=e.touches[0].clientY-qt;rt+=t,lt+=n,Nt=e.touches[0].clientX,qt=e.touches[0].clientY,ct()}},{passive:!1});X.addEventListener("touchend",()=>{sn=!1,bo=!1});window.addEventListener("popstate",()=>{X.classList.contains("hidden")||(X.classList.add("hidden"),Pe=1,rt=0,lt=0,ct())});$==null||$.addEventListener("click",()=>{on.src=$.src,Pe=1,rt=0,lt=0,ct(),X.classList.remove("hidden"),history.pushState(null,null)});Qi(.5);
