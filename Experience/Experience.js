import * as THREE from "three";
import Sizes from "./utils/sizes";
import Camera from "./Camera";
import Renderer from "./Renderer";
import Time from "./utils/time";

import World from "../World/world";
import Resources from "./utils/resources";
import assets from "./utils/assets";

export default class Experience {
  static instance;
  constructor(canvas) {
    if (Experience.instance) {
      return Experience.instance;
    }
    Experience.instance = this;
    this.canvas = canvas;
    this.scene = new THREE.Scene();
    this.time = new Time();
    this.sizes = new Sizes();
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.resources = new Resources(assets);
    this.world = new World();

    this.pmrmGenerator = new THREE.PMREMGenerator(this.renderer.renderer);
    this.pmrmGenerator.compileEquirectangularShader();

    this.time.on("update", () => {
      this.update();
    });
    this.sizes.on("resize", () => {
      this.resize();
    });
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
  }
  update() {
    this.camera.update();
    this.renderer.update();
  }
}
