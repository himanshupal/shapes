import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { Mesh } from "@babylonjs/core/Meshes/mesh";

import { addLabelToMesh } from "./gui";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";

var canvas: HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement;
var engine: Engine = new Engine(canvas, true);

function createScene(): Scene {
	var scene: Scene = new Scene(engine);

	var camera: ArcRotateCamera = new ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, Vector3.Zero(), scene);
	camera.attachControl(canvas, true);

	var light1: HemisphericLight = new HemisphericLight("light1", new Vector3(1, 1, 0), scene);
	light1.shadowEnabled = true;
	scene.addLight(light1);

	var material = new StandardMaterial("material", scene);
	material.wireframe = true;

	var sphere: Mesh = MeshBuilder.CreateSphere("sphere", { diameter: 1 }, scene);
	sphere.material = material;

	// addLabelToMesh(sphere);

	return scene;
}

var scene: Scene = createScene();

engine.runRenderLoop(() => {
	scene.render();
});

window.addEventListener("resize", function () {
	canvas.height = window.innerHeight;
	canvas.width = window.innerWidth;
});
