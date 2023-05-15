import * as THREE from "three";

import { EventEmitter } from "events";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { EXRLoader } from "three/examples/jsm/loaders/EXRLoader";
import Experience from "../Experience";

export default class Resources extends EventEmitter {
  constructor(assets) {
    super();
    this.experience = new Experience();
    this.renderer = this.experience.renderer;

    this.assets = assets;
    this.items = {};
    this.queue = this.assets.length;
    this.loaded = 0;

    this.setLoaders();
    this.startLoading();

    console.log(assets);
  }
  setLoaders() {
    this.loaders = {};
    this.loaders.gltfLoader = new GLTFLoader();
    this.loaders.dracoLoader = new DRACOLoader();
    this.loaders.exrLoader = new EXRLoader();

    this.loaders.dracoLoader.setDecoderPath("/draco/");

    this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader);
  }

  startLoading() {
    for (const asset of this.assets) {
      if (asset.type === "glbModel") {
        this.loaders.gltfLoader.load(asset.path, (file) => {
          this.singleAssetLoaded(asset, file);
        });
      }

      if (asset.type === "exr") {
        this.loaders.exrLoader.load(asset.path, (file) => {
          file.mapping = THREE.EquirectangularReflectionMapping;
          file.envMap = this.experience.pmrmGenerator.fromEquirectangular(file);
          this.singleAssetLoaded(asset, file);
        });
      }
    }
  }

  singleAssetLoaded(asset, file) {
    this.items[asset.name] = file;
    this.loaded++;

    if (this.loaded === this.queue) {
      this.emit("ready");
    }
  }
}
