/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "28727bbe2e28e2c24165";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "main";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/color-convert/conversions.js":
/*!***************************************************!*\
  !*** ./node_modules/color-convert/conversions.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* MIT license */\nvar cssKeywords = __webpack_require__(/*! color-name */ \"./node_modules/color-name/index.js\");\n\n// NOTE: conversions should only return primitive values (i.e. arrays, or\n//       values that give correct `typeof` results).\n//       do not use box values types (i.e. Number(), String(), etc.)\n\nvar reverseKeywords = {};\nfor (var key in cssKeywords) {\n\tif (cssKeywords.hasOwnProperty(key)) {\n\t\treverseKeywords[cssKeywords[key]] = key;\n\t}\n}\n\nvar convert = module.exports = {\n\trgb: {channels: 3, labels: 'rgb'},\n\thsl: {channels: 3, labels: 'hsl'},\n\thsv: {channels: 3, labels: 'hsv'},\n\thwb: {channels: 3, labels: 'hwb'},\n\tcmyk: {channels: 4, labels: 'cmyk'},\n\txyz: {channels: 3, labels: 'xyz'},\n\tlab: {channels: 3, labels: 'lab'},\n\tlch: {channels: 3, labels: 'lch'},\n\thex: {channels: 1, labels: ['hex']},\n\tkeyword: {channels: 1, labels: ['keyword']},\n\tansi16: {channels: 1, labels: ['ansi16']},\n\tansi256: {channels: 1, labels: ['ansi256']},\n\thcg: {channels: 3, labels: ['h', 'c', 'g']},\n\tapple: {channels: 3, labels: ['r16', 'g16', 'b16']},\n\tgray: {channels: 1, labels: ['gray']}\n};\n\n// hide .channels and .labels properties\nfor (var model in convert) {\n\tif (convert.hasOwnProperty(model)) {\n\t\tif (!('channels' in convert[model])) {\n\t\t\tthrow new Error('missing channels property: ' + model);\n\t\t}\n\n\t\tif (!('labels' in convert[model])) {\n\t\t\tthrow new Error('missing channel labels property: ' + model);\n\t\t}\n\n\t\tif (convert[model].labels.length !== convert[model].channels) {\n\t\t\tthrow new Error('channel and label counts mismatch: ' + model);\n\t\t}\n\n\t\tvar channels = convert[model].channels;\n\t\tvar labels = convert[model].labels;\n\t\tdelete convert[model].channels;\n\t\tdelete convert[model].labels;\n\t\tObject.defineProperty(convert[model], 'channels', {value: channels});\n\t\tObject.defineProperty(convert[model], 'labels', {value: labels});\n\t}\n}\n\nconvert.rgb.hsl = function (rgb) {\n\tvar r = rgb[0] / 255;\n\tvar g = rgb[1] / 255;\n\tvar b = rgb[2] / 255;\n\tvar min = Math.min(r, g, b);\n\tvar max = Math.max(r, g, b);\n\tvar delta = max - min;\n\tvar h;\n\tvar s;\n\tvar l;\n\n\tif (max === min) {\n\t\th = 0;\n\t} else if (r === max) {\n\t\th = (g - b) / delta;\n\t} else if (g === max) {\n\t\th = 2 + (b - r) / delta;\n\t} else if (b === max) {\n\t\th = 4 + (r - g) / delta;\n\t}\n\n\th = Math.min(h * 60, 360);\n\n\tif (h < 0) {\n\t\th += 360;\n\t}\n\n\tl = (min + max) / 2;\n\n\tif (max === min) {\n\t\ts = 0;\n\t} else if (l <= 0.5) {\n\t\ts = delta / (max + min);\n\t} else {\n\t\ts = delta / (2 - max - min);\n\t}\n\n\treturn [h, s * 100, l * 100];\n};\n\nconvert.rgb.hsv = function (rgb) {\n\tvar rdif;\n\tvar gdif;\n\tvar bdif;\n\tvar h;\n\tvar s;\n\n\tvar r = rgb[0] / 255;\n\tvar g = rgb[1] / 255;\n\tvar b = rgb[2] / 255;\n\tvar v = Math.max(r, g, b);\n\tvar diff = v - Math.min(r, g, b);\n\tvar diffc = function (c) {\n\t\treturn (v - c) / 6 / diff + 1 / 2;\n\t};\n\n\tif (diff === 0) {\n\t\th = s = 0;\n\t} else {\n\t\ts = diff / v;\n\t\trdif = diffc(r);\n\t\tgdif = diffc(g);\n\t\tbdif = diffc(b);\n\n\t\tif (r === v) {\n\t\t\th = bdif - gdif;\n\t\t} else if (g === v) {\n\t\t\th = (1 / 3) + rdif - bdif;\n\t\t} else if (b === v) {\n\t\t\th = (2 / 3) + gdif - rdif;\n\t\t}\n\t\tif (h < 0) {\n\t\t\th += 1;\n\t\t} else if (h > 1) {\n\t\t\th -= 1;\n\t\t}\n\t}\n\n\treturn [\n\t\th * 360,\n\t\ts * 100,\n\t\tv * 100\n\t];\n};\n\nconvert.rgb.hwb = function (rgb) {\n\tvar r = rgb[0];\n\tvar g = rgb[1];\n\tvar b = rgb[2];\n\tvar h = convert.rgb.hsl(rgb)[0];\n\tvar w = 1 / 255 * Math.min(r, Math.min(g, b));\n\n\tb = 1 - 1 / 255 * Math.max(r, Math.max(g, b));\n\n\treturn [h, w * 100, b * 100];\n};\n\nconvert.rgb.cmyk = function (rgb) {\n\tvar r = rgb[0] / 255;\n\tvar g = rgb[1] / 255;\n\tvar b = rgb[2] / 255;\n\tvar c;\n\tvar m;\n\tvar y;\n\tvar k;\n\n\tk = Math.min(1 - r, 1 - g, 1 - b);\n\tc = (1 - r - k) / (1 - k) || 0;\n\tm = (1 - g - k) / (1 - k) || 0;\n\ty = (1 - b - k) / (1 - k) || 0;\n\n\treturn [c * 100, m * 100, y * 100, k * 100];\n};\n\n/**\n * See https://en.m.wikipedia.org/wiki/Euclidean_distance#Squared_Euclidean_distance\n * */\nfunction comparativeDistance(x, y) {\n\treturn (\n\t\tMath.pow(x[0] - y[0], 2) +\n\t\tMath.pow(x[1] - y[1], 2) +\n\t\tMath.pow(x[2] - y[2], 2)\n\t);\n}\n\nconvert.rgb.keyword = function (rgb) {\n\tvar reversed = reverseKeywords[rgb];\n\tif (reversed) {\n\t\treturn reversed;\n\t}\n\n\tvar currentClosestDistance = Infinity;\n\tvar currentClosestKeyword;\n\n\tfor (var keyword in cssKeywords) {\n\t\tif (cssKeywords.hasOwnProperty(keyword)) {\n\t\t\tvar value = cssKeywords[keyword];\n\n\t\t\t// Compute comparative distance\n\t\t\tvar distance = comparativeDistance(rgb, value);\n\n\t\t\t// Check if its less, if so set as closest\n\t\t\tif (distance < currentClosestDistance) {\n\t\t\t\tcurrentClosestDistance = distance;\n\t\t\t\tcurrentClosestKeyword = keyword;\n\t\t\t}\n\t\t}\n\t}\n\n\treturn currentClosestKeyword;\n};\n\nconvert.keyword.rgb = function (keyword) {\n\treturn cssKeywords[keyword];\n};\n\nconvert.rgb.xyz = function (rgb) {\n\tvar r = rgb[0] / 255;\n\tvar g = rgb[1] / 255;\n\tvar b = rgb[2] / 255;\n\n\t// assume sRGB\n\tr = r > 0.04045 ? Math.pow(((r + 0.055) / 1.055), 2.4) : (r / 12.92);\n\tg = g > 0.04045 ? Math.pow(((g + 0.055) / 1.055), 2.4) : (g / 12.92);\n\tb = b > 0.04045 ? Math.pow(((b + 0.055) / 1.055), 2.4) : (b / 12.92);\n\n\tvar x = (r * 0.4124) + (g * 0.3576) + (b * 0.1805);\n\tvar y = (r * 0.2126) + (g * 0.7152) + (b * 0.0722);\n\tvar z = (r * 0.0193) + (g * 0.1192) + (b * 0.9505);\n\n\treturn [x * 100, y * 100, z * 100];\n};\n\nconvert.rgb.lab = function (rgb) {\n\tvar xyz = convert.rgb.xyz(rgb);\n\tvar x = xyz[0];\n\tvar y = xyz[1];\n\tvar z = xyz[2];\n\tvar l;\n\tvar a;\n\tvar b;\n\n\tx /= 95.047;\n\ty /= 100;\n\tz /= 108.883;\n\n\tx = x > 0.008856 ? Math.pow(x, 1 / 3) : (7.787 * x) + (16 / 116);\n\ty = y > 0.008856 ? Math.pow(y, 1 / 3) : (7.787 * y) + (16 / 116);\n\tz = z > 0.008856 ? Math.pow(z, 1 / 3) : (7.787 * z) + (16 / 116);\n\n\tl = (116 * y) - 16;\n\ta = 500 * (x - y);\n\tb = 200 * (y - z);\n\n\treturn [l, a, b];\n};\n\nconvert.hsl.rgb = function (hsl) {\n\tvar h = hsl[0] / 360;\n\tvar s = hsl[1] / 100;\n\tvar l = hsl[2] / 100;\n\tvar t1;\n\tvar t2;\n\tvar t3;\n\tvar rgb;\n\tvar val;\n\n\tif (s === 0) {\n\t\tval = l * 255;\n\t\treturn [val, val, val];\n\t}\n\n\tif (l < 0.5) {\n\t\tt2 = l * (1 + s);\n\t} else {\n\t\tt2 = l + s - l * s;\n\t}\n\n\tt1 = 2 * l - t2;\n\n\trgb = [0, 0, 0];\n\tfor (var i = 0; i < 3; i++) {\n\t\tt3 = h + 1 / 3 * -(i - 1);\n\t\tif (t3 < 0) {\n\t\t\tt3++;\n\t\t}\n\t\tif (t3 > 1) {\n\t\t\tt3--;\n\t\t}\n\n\t\tif (6 * t3 < 1) {\n\t\t\tval = t1 + (t2 - t1) * 6 * t3;\n\t\t} else if (2 * t3 < 1) {\n\t\t\tval = t2;\n\t\t} else if (3 * t3 < 2) {\n\t\t\tval = t1 + (t2 - t1) * (2 / 3 - t3) * 6;\n\t\t} else {\n\t\t\tval = t1;\n\t\t}\n\n\t\trgb[i] = val * 255;\n\t}\n\n\treturn rgb;\n};\n\nconvert.hsl.hsv = function (hsl) {\n\tvar h = hsl[0];\n\tvar s = hsl[1] / 100;\n\tvar l = hsl[2] / 100;\n\tvar smin = s;\n\tvar lmin = Math.max(l, 0.01);\n\tvar sv;\n\tvar v;\n\n\tl *= 2;\n\ts *= (l <= 1) ? l : 2 - l;\n\tsmin *= lmin <= 1 ? lmin : 2 - lmin;\n\tv = (l + s) / 2;\n\tsv = l === 0 ? (2 * smin) / (lmin + smin) : (2 * s) / (l + s);\n\n\treturn [h, sv * 100, v * 100];\n};\n\nconvert.hsv.rgb = function (hsv) {\n\tvar h = hsv[0] / 60;\n\tvar s = hsv[1] / 100;\n\tvar v = hsv[2] / 100;\n\tvar hi = Math.floor(h) % 6;\n\n\tvar f = h - Math.floor(h);\n\tvar p = 255 * v * (1 - s);\n\tvar q = 255 * v * (1 - (s * f));\n\tvar t = 255 * v * (1 - (s * (1 - f)));\n\tv *= 255;\n\n\tswitch (hi) {\n\t\tcase 0:\n\t\t\treturn [v, t, p];\n\t\tcase 1:\n\t\t\treturn [q, v, p];\n\t\tcase 2:\n\t\t\treturn [p, v, t];\n\t\tcase 3:\n\t\t\treturn [p, q, v];\n\t\tcase 4:\n\t\t\treturn [t, p, v];\n\t\tcase 5:\n\t\t\treturn [v, p, q];\n\t}\n};\n\nconvert.hsv.hsl = function (hsv) {\n\tvar h = hsv[0];\n\tvar s = hsv[1] / 100;\n\tvar v = hsv[2] / 100;\n\tvar vmin = Math.max(v, 0.01);\n\tvar lmin;\n\tvar sl;\n\tvar l;\n\n\tl = (2 - s) * v;\n\tlmin = (2 - s) * vmin;\n\tsl = s * vmin;\n\tsl /= (lmin <= 1) ? lmin : 2 - lmin;\n\tsl = sl || 0;\n\tl /= 2;\n\n\treturn [h, sl * 100, l * 100];\n};\n\n// http://dev.w3.org/csswg/css-color/#hwb-to-rgb\nconvert.hwb.rgb = function (hwb) {\n\tvar h = hwb[0] / 360;\n\tvar wh = hwb[1] / 100;\n\tvar bl = hwb[2] / 100;\n\tvar ratio = wh + bl;\n\tvar i;\n\tvar v;\n\tvar f;\n\tvar n;\n\n\t// wh + bl cant be > 1\n\tif (ratio > 1) {\n\t\twh /= ratio;\n\t\tbl /= ratio;\n\t}\n\n\ti = Math.floor(6 * h);\n\tv = 1 - bl;\n\tf = 6 * h - i;\n\n\tif ((i & 0x01) !== 0) {\n\t\tf = 1 - f;\n\t}\n\n\tn = wh + f * (v - wh); // linear interpolation\n\n\tvar r;\n\tvar g;\n\tvar b;\n\tswitch (i) {\n\t\tdefault:\n\t\tcase 6:\n\t\tcase 0: r = v; g = n; b = wh; break;\n\t\tcase 1: r = n; g = v; b = wh; break;\n\t\tcase 2: r = wh; g = v; b = n; break;\n\t\tcase 3: r = wh; g = n; b = v; break;\n\t\tcase 4: r = n; g = wh; b = v; break;\n\t\tcase 5: r = v; g = wh; b = n; break;\n\t}\n\n\treturn [r * 255, g * 255, b * 255];\n};\n\nconvert.cmyk.rgb = function (cmyk) {\n\tvar c = cmyk[0] / 100;\n\tvar m = cmyk[1] / 100;\n\tvar y = cmyk[2] / 100;\n\tvar k = cmyk[3] / 100;\n\tvar r;\n\tvar g;\n\tvar b;\n\n\tr = 1 - Math.min(1, c * (1 - k) + k);\n\tg = 1 - Math.min(1, m * (1 - k) + k);\n\tb = 1 - Math.min(1, y * (1 - k) + k);\n\n\treturn [r * 255, g * 255, b * 255];\n};\n\nconvert.xyz.rgb = function (xyz) {\n\tvar x = xyz[0] / 100;\n\tvar y = xyz[1] / 100;\n\tvar z = xyz[2] / 100;\n\tvar r;\n\tvar g;\n\tvar b;\n\n\tr = (x * 3.2406) + (y * -1.5372) + (z * -0.4986);\n\tg = (x * -0.9689) + (y * 1.8758) + (z * 0.0415);\n\tb = (x * 0.0557) + (y * -0.2040) + (z * 1.0570);\n\n\t// assume sRGB\n\tr = r > 0.0031308\n\t\t? ((1.055 * Math.pow(r, 1.0 / 2.4)) - 0.055)\n\t\t: r * 12.92;\n\n\tg = g > 0.0031308\n\t\t? ((1.055 * Math.pow(g, 1.0 / 2.4)) - 0.055)\n\t\t: g * 12.92;\n\n\tb = b > 0.0031308\n\t\t? ((1.055 * Math.pow(b, 1.0 / 2.4)) - 0.055)\n\t\t: b * 12.92;\n\n\tr = Math.min(Math.max(0, r), 1);\n\tg = Math.min(Math.max(0, g), 1);\n\tb = Math.min(Math.max(0, b), 1);\n\n\treturn [r * 255, g * 255, b * 255];\n};\n\nconvert.xyz.lab = function (xyz) {\n\tvar x = xyz[0];\n\tvar y = xyz[1];\n\tvar z = xyz[2];\n\tvar l;\n\tvar a;\n\tvar b;\n\n\tx /= 95.047;\n\ty /= 100;\n\tz /= 108.883;\n\n\tx = x > 0.008856 ? Math.pow(x, 1 / 3) : (7.787 * x) + (16 / 116);\n\ty = y > 0.008856 ? Math.pow(y, 1 / 3) : (7.787 * y) + (16 / 116);\n\tz = z > 0.008856 ? Math.pow(z, 1 / 3) : (7.787 * z) + (16 / 116);\n\n\tl = (116 * y) - 16;\n\ta = 500 * (x - y);\n\tb = 200 * (y - z);\n\n\treturn [l, a, b];\n};\n\nconvert.lab.xyz = function (lab) {\n\tvar l = lab[0];\n\tvar a = lab[1];\n\tvar b = lab[2];\n\tvar x;\n\tvar y;\n\tvar z;\n\n\ty = (l + 16) / 116;\n\tx = a / 500 + y;\n\tz = y - b / 200;\n\n\tvar y2 = Math.pow(y, 3);\n\tvar x2 = Math.pow(x, 3);\n\tvar z2 = Math.pow(z, 3);\n\ty = y2 > 0.008856 ? y2 : (y - 16 / 116) / 7.787;\n\tx = x2 > 0.008856 ? x2 : (x - 16 / 116) / 7.787;\n\tz = z2 > 0.008856 ? z2 : (z - 16 / 116) / 7.787;\n\n\tx *= 95.047;\n\ty *= 100;\n\tz *= 108.883;\n\n\treturn [x, y, z];\n};\n\nconvert.lab.lch = function (lab) {\n\tvar l = lab[0];\n\tvar a = lab[1];\n\tvar b = lab[2];\n\tvar hr;\n\tvar h;\n\tvar c;\n\n\thr = Math.atan2(b, a);\n\th = hr * 360 / 2 / Math.PI;\n\n\tif (h < 0) {\n\t\th += 360;\n\t}\n\n\tc = Math.sqrt(a * a + b * b);\n\n\treturn [l, c, h];\n};\n\nconvert.lch.lab = function (lch) {\n\tvar l = lch[0];\n\tvar c = lch[1];\n\tvar h = lch[2];\n\tvar a;\n\tvar b;\n\tvar hr;\n\n\thr = h / 360 * 2 * Math.PI;\n\ta = c * Math.cos(hr);\n\tb = c * Math.sin(hr);\n\n\treturn [l, a, b];\n};\n\nconvert.rgb.ansi16 = function (args) {\n\tvar r = args[0];\n\tvar g = args[1];\n\tvar b = args[2];\n\tvar value = 1 in arguments ? arguments[1] : convert.rgb.hsv(args)[2]; // hsv -> ansi16 optimization\n\n\tvalue = Math.round(value / 50);\n\n\tif (value === 0) {\n\t\treturn 30;\n\t}\n\n\tvar ansi = 30\n\t\t+ ((Math.round(b / 255) << 2)\n\t\t| (Math.round(g / 255) << 1)\n\t\t| Math.round(r / 255));\n\n\tif (value === 2) {\n\t\tansi += 60;\n\t}\n\n\treturn ansi;\n};\n\nconvert.hsv.ansi16 = function (args) {\n\t// optimization here; we already know the value and don't need to get\n\t// it converted for us.\n\treturn convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);\n};\n\nconvert.rgb.ansi256 = function (args) {\n\tvar r = args[0];\n\tvar g = args[1];\n\tvar b = args[2];\n\n\t// we use the extended greyscale palette here, with the exception of\n\t// black and white. normal palette only has 4 greyscale shades.\n\tif (r === g && g === b) {\n\t\tif (r < 8) {\n\t\t\treturn 16;\n\t\t}\n\n\t\tif (r > 248) {\n\t\t\treturn 231;\n\t\t}\n\n\t\treturn Math.round(((r - 8) / 247) * 24) + 232;\n\t}\n\n\tvar ansi = 16\n\t\t+ (36 * Math.round(r / 255 * 5))\n\t\t+ (6 * Math.round(g / 255 * 5))\n\t\t+ Math.round(b / 255 * 5);\n\n\treturn ansi;\n};\n\nconvert.ansi16.rgb = function (args) {\n\tvar color = args % 10;\n\n\t// handle greyscale\n\tif (color === 0 || color === 7) {\n\t\tif (args > 50) {\n\t\t\tcolor += 3.5;\n\t\t}\n\n\t\tcolor = color / 10.5 * 255;\n\n\t\treturn [color, color, color];\n\t}\n\n\tvar mult = (~~(args > 50) + 1) * 0.5;\n\tvar r = ((color & 1) * mult) * 255;\n\tvar g = (((color >> 1) & 1) * mult) * 255;\n\tvar b = (((color >> 2) & 1) * mult) * 255;\n\n\treturn [r, g, b];\n};\n\nconvert.ansi256.rgb = function (args) {\n\t// handle greyscale\n\tif (args >= 232) {\n\t\tvar c = (args - 232) * 10 + 8;\n\t\treturn [c, c, c];\n\t}\n\n\targs -= 16;\n\n\tvar rem;\n\tvar r = Math.floor(args / 36) / 5 * 255;\n\tvar g = Math.floor((rem = args % 36) / 6) / 5 * 255;\n\tvar b = (rem % 6) / 5 * 255;\n\n\treturn [r, g, b];\n};\n\nconvert.rgb.hex = function (args) {\n\tvar integer = ((Math.round(args[0]) & 0xFF) << 16)\n\t\t+ ((Math.round(args[1]) & 0xFF) << 8)\n\t\t+ (Math.round(args[2]) & 0xFF);\n\n\tvar string = integer.toString(16).toUpperCase();\n\treturn '000000'.substring(string.length) + string;\n};\n\nconvert.hex.rgb = function (args) {\n\tvar match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);\n\tif (!match) {\n\t\treturn [0, 0, 0];\n\t}\n\n\tvar colorString = match[0];\n\n\tif (match[0].length === 3) {\n\t\tcolorString = colorString.split('').map(function (char) {\n\t\t\treturn char + char;\n\t\t}).join('');\n\t}\n\n\tvar integer = parseInt(colorString, 16);\n\tvar r = (integer >> 16) & 0xFF;\n\tvar g = (integer >> 8) & 0xFF;\n\tvar b = integer & 0xFF;\n\n\treturn [r, g, b];\n};\n\nconvert.rgb.hcg = function (rgb) {\n\tvar r = rgb[0] / 255;\n\tvar g = rgb[1] / 255;\n\tvar b = rgb[2] / 255;\n\tvar max = Math.max(Math.max(r, g), b);\n\tvar min = Math.min(Math.min(r, g), b);\n\tvar chroma = (max - min);\n\tvar grayscale;\n\tvar hue;\n\n\tif (chroma < 1) {\n\t\tgrayscale = min / (1 - chroma);\n\t} else {\n\t\tgrayscale = 0;\n\t}\n\n\tif (chroma <= 0) {\n\t\thue = 0;\n\t} else\n\tif (max === r) {\n\t\thue = ((g - b) / chroma) % 6;\n\t} else\n\tif (max === g) {\n\t\thue = 2 + (b - r) / chroma;\n\t} else {\n\t\thue = 4 + (r - g) / chroma + 4;\n\t}\n\n\thue /= 6;\n\thue %= 1;\n\n\treturn [hue * 360, chroma * 100, grayscale * 100];\n};\n\nconvert.hsl.hcg = function (hsl) {\n\tvar s = hsl[1] / 100;\n\tvar l = hsl[2] / 100;\n\tvar c = 1;\n\tvar f = 0;\n\n\tif (l < 0.5) {\n\t\tc = 2.0 * s * l;\n\t} else {\n\t\tc = 2.0 * s * (1.0 - l);\n\t}\n\n\tif (c < 1.0) {\n\t\tf = (l - 0.5 * c) / (1.0 - c);\n\t}\n\n\treturn [hsl[0], c * 100, f * 100];\n};\n\nconvert.hsv.hcg = function (hsv) {\n\tvar s = hsv[1] / 100;\n\tvar v = hsv[2] / 100;\n\n\tvar c = s * v;\n\tvar f = 0;\n\n\tif (c < 1.0) {\n\t\tf = (v - c) / (1 - c);\n\t}\n\n\treturn [hsv[0], c * 100, f * 100];\n};\n\nconvert.hcg.rgb = function (hcg) {\n\tvar h = hcg[0] / 360;\n\tvar c = hcg[1] / 100;\n\tvar g = hcg[2] / 100;\n\n\tif (c === 0.0) {\n\t\treturn [g * 255, g * 255, g * 255];\n\t}\n\n\tvar pure = [0, 0, 0];\n\tvar hi = (h % 1) * 6;\n\tvar v = hi % 1;\n\tvar w = 1 - v;\n\tvar mg = 0;\n\n\tswitch (Math.floor(hi)) {\n\t\tcase 0:\n\t\t\tpure[0] = 1; pure[1] = v; pure[2] = 0; break;\n\t\tcase 1:\n\t\t\tpure[0] = w; pure[1] = 1; pure[2] = 0; break;\n\t\tcase 2:\n\t\t\tpure[0] = 0; pure[1] = 1; pure[2] = v; break;\n\t\tcase 3:\n\t\t\tpure[0] = 0; pure[1] = w; pure[2] = 1; break;\n\t\tcase 4:\n\t\t\tpure[0] = v; pure[1] = 0; pure[2] = 1; break;\n\t\tdefault:\n\t\t\tpure[0] = 1; pure[1] = 0; pure[2] = w;\n\t}\n\n\tmg = (1.0 - c) * g;\n\n\treturn [\n\t\t(c * pure[0] + mg) * 255,\n\t\t(c * pure[1] + mg) * 255,\n\t\t(c * pure[2] + mg) * 255\n\t];\n};\n\nconvert.hcg.hsv = function (hcg) {\n\tvar c = hcg[1] / 100;\n\tvar g = hcg[2] / 100;\n\n\tvar v = c + g * (1.0 - c);\n\tvar f = 0;\n\n\tif (v > 0.0) {\n\t\tf = c / v;\n\t}\n\n\treturn [hcg[0], f * 100, v * 100];\n};\n\nconvert.hcg.hsl = function (hcg) {\n\tvar c = hcg[1] / 100;\n\tvar g = hcg[2] / 100;\n\n\tvar l = g * (1.0 - c) + 0.5 * c;\n\tvar s = 0;\n\n\tif (l > 0.0 && l < 0.5) {\n\t\ts = c / (2 * l);\n\t} else\n\tif (l >= 0.5 && l < 1.0) {\n\t\ts = c / (2 * (1 - l));\n\t}\n\n\treturn [hcg[0], s * 100, l * 100];\n};\n\nconvert.hcg.hwb = function (hcg) {\n\tvar c = hcg[1] / 100;\n\tvar g = hcg[2] / 100;\n\tvar v = c + g * (1.0 - c);\n\treturn [hcg[0], (v - c) * 100, (1 - v) * 100];\n};\n\nconvert.hwb.hcg = function (hwb) {\n\tvar w = hwb[1] / 100;\n\tvar b = hwb[2] / 100;\n\tvar v = 1 - b;\n\tvar c = v - w;\n\tvar g = 0;\n\n\tif (c < 1) {\n\t\tg = (v - c) / (1 - c);\n\t}\n\n\treturn [hwb[0], c * 100, g * 100];\n};\n\nconvert.apple.rgb = function (apple) {\n\treturn [(apple[0] / 65535) * 255, (apple[1] / 65535) * 255, (apple[2] / 65535) * 255];\n};\n\nconvert.rgb.apple = function (rgb) {\n\treturn [(rgb[0] / 255) * 65535, (rgb[1] / 255) * 65535, (rgb[2] / 255) * 65535];\n};\n\nconvert.gray.rgb = function (args) {\n\treturn [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];\n};\n\nconvert.gray.hsl = convert.gray.hsv = function (args) {\n\treturn [0, 0, args[0]];\n};\n\nconvert.gray.hwb = function (gray) {\n\treturn [0, 100, gray[0]];\n};\n\nconvert.gray.cmyk = function (gray) {\n\treturn [0, 0, 0, gray[0]];\n};\n\nconvert.gray.lab = function (gray) {\n\treturn [gray[0], 0, 0];\n};\n\nconvert.gray.hex = function (gray) {\n\tvar val = Math.round(gray[0] / 100 * 255) & 0xFF;\n\tvar integer = (val << 16) + (val << 8) + val;\n\n\tvar string = integer.toString(16).toUpperCase();\n\treturn '000000'.substring(string.length) + string;\n};\n\nconvert.rgb.gray = function (rgb) {\n\tvar val = (rgb[0] + rgb[1] + rgb[2]) / 3;\n\treturn [val / 255 * 100];\n};\n\n\n//# sourceURL=webpack:///./node_modules/color-convert/conversions.js?");

/***/ }),

/***/ "./node_modules/color-convert/index.js":
/*!*********************************************!*\
  !*** ./node_modules/color-convert/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var conversions = __webpack_require__(/*! ./conversions */ \"./node_modules/color-convert/conversions.js\");\nvar route = __webpack_require__(/*! ./route */ \"./node_modules/color-convert/route.js\");\n\nvar convert = {};\n\nvar models = Object.keys(conversions);\n\nfunction wrapRaw(fn) {\n\tvar wrappedFn = function (args) {\n\t\tif (args === undefined || args === null) {\n\t\t\treturn args;\n\t\t}\n\n\t\tif (arguments.length > 1) {\n\t\t\targs = Array.prototype.slice.call(arguments);\n\t\t}\n\n\t\treturn fn(args);\n\t};\n\n\t// preserve .conversion property if there is one\n\tif ('conversion' in fn) {\n\t\twrappedFn.conversion = fn.conversion;\n\t}\n\n\treturn wrappedFn;\n}\n\nfunction wrapRounded(fn) {\n\tvar wrappedFn = function (args) {\n\t\tif (args === undefined || args === null) {\n\t\t\treturn args;\n\t\t}\n\n\t\tif (arguments.length > 1) {\n\t\t\targs = Array.prototype.slice.call(arguments);\n\t\t}\n\n\t\tvar result = fn(args);\n\n\t\t// we're assuming the result is an array here.\n\t\t// see notice in conversions.js; don't use box types\n\t\t// in conversion functions.\n\t\tif (typeof result === 'object') {\n\t\t\tfor (var len = result.length, i = 0; i < len; i++) {\n\t\t\t\tresult[i] = Math.round(result[i]);\n\t\t\t}\n\t\t}\n\n\t\treturn result;\n\t};\n\n\t// preserve .conversion property if there is one\n\tif ('conversion' in fn) {\n\t\twrappedFn.conversion = fn.conversion;\n\t}\n\n\treturn wrappedFn;\n}\n\nmodels.forEach(function (fromModel) {\n\tconvert[fromModel] = {};\n\n\tObject.defineProperty(convert[fromModel], 'channels', {value: conversions[fromModel].channels});\n\tObject.defineProperty(convert[fromModel], 'labels', {value: conversions[fromModel].labels});\n\n\tvar routes = route(fromModel);\n\tvar routeModels = Object.keys(routes);\n\n\trouteModels.forEach(function (toModel) {\n\t\tvar fn = routes[toModel];\n\n\t\tconvert[fromModel][toModel] = wrapRounded(fn);\n\t\tconvert[fromModel][toModel].raw = wrapRaw(fn);\n\t});\n});\n\nmodule.exports = convert;\n\n\n//# sourceURL=webpack:///./node_modules/color-convert/index.js?");

/***/ }),

/***/ "./node_modules/color-convert/route.js":
/*!*********************************************!*\
  !*** ./node_modules/color-convert/route.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var conversions = __webpack_require__(/*! ./conversions */ \"./node_modules/color-convert/conversions.js\");\n\n/*\n\tthis function routes a model to all other models.\n\n\tall functions that are routed have a property `.conversion` attached\n\tto the returned synthetic function. This property is an array\n\tof strings, each with the steps in between the 'from' and 'to'\n\tcolor models (inclusive).\n\n\tconversions that are not possible simply are not included.\n*/\n\nfunction buildGraph() {\n\tvar graph = {};\n\t// https://jsperf.com/object-keys-vs-for-in-with-closure/3\n\tvar models = Object.keys(conversions);\n\n\tfor (var len = models.length, i = 0; i < len; i++) {\n\t\tgraph[models[i]] = {\n\t\t\t// http://jsperf.com/1-vs-infinity\n\t\t\t// micro-opt, but this is simple.\n\t\t\tdistance: -1,\n\t\t\tparent: null\n\t\t};\n\t}\n\n\treturn graph;\n}\n\n// https://en.wikipedia.org/wiki/Breadth-first_search\nfunction deriveBFS(fromModel) {\n\tvar graph = buildGraph();\n\tvar queue = [fromModel]; // unshift -> queue -> pop\n\n\tgraph[fromModel].distance = 0;\n\n\twhile (queue.length) {\n\t\tvar current = queue.pop();\n\t\tvar adjacents = Object.keys(conversions[current]);\n\n\t\tfor (var len = adjacents.length, i = 0; i < len; i++) {\n\t\t\tvar adjacent = adjacents[i];\n\t\t\tvar node = graph[adjacent];\n\n\t\t\tif (node.distance === -1) {\n\t\t\t\tnode.distance = graph[current].distance + 1;\n\t\t\t\tnode.parent = current;\n\t\t\t\tqueue.unshift(adjacent);\n\t\t\t}\n\t\t}\n\t}\n\n\treturn graph;\n}\n\nfunction link(from, to) {\n\treturn function (args) {\n\t\treturn to(from(args));\n\t};\n}\n\nfunction wrapConversion(toModel, graph) {\n\tvar path = [graph[toModel].parent, toModel];\n\tvar fn = conversions[graph[toModel].parent][toModel];\n\n\tvar cur = graph[toModel].parent;\n\twhile (graph[cur].parent) {\n\t\tpath.unshift(graph[cur].parent);\n\t\tfn = link(conversions[graph[cur].parent][cur], fn);\n\t\tcur = graph[cur].parent;\n\t}\n\n\tfn.conversion = path;\n\treturn fn;\n}\n\nmodule.exports = function (fromModel) {\n\tvar graph = deriveBFS(fromModel);\n\tvar conversion = {};\n\n\tvar models = Object.keys(graph);\n\tfor (var len = models.length, i = 0; i < len; i++) {\n\t\tvar toModel = models[i];\n\t\tvar node = graph[toModel];\n\n\t\tif (node.parent === null) {\n\t\t\t// no possible conversion, or this node is the source model.\n\t\t\tcontinue;\n\t\t}\n\n\t\tconversion[toModel] = wrapConversion(toModel, graph);\n\t}\n\n\treturn conversion;\n};\n\n\n\n//# sourceURL=webpack:///./node_modules/color-convert/route.js?");

/***/ }),

/***/ "./node_modules/color-name/index.js":
/*!******************************************!*\
  !*** ./node_modules/color-name/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\n\r\nmodule.exports = {\r\n\t\"aliceblue\": [240, 248, 255],\r\n\t\"antiquewhite\": [250, 235, 215],\r\n\t\"aqua\": [0, 255, 255],\r\n\t\"aquamarine\": [127, 255, 212],\r\n\t\"azure\": [240, 255, 255],\r\n\t\"beige\": [245, 245, 220],\r\n\t\"bisque\": [255, 228, 196],\r\n\t\"black\": [0, 0, 0],\r\n\t\"blanchedalmond\": [255, 235, 205],\r\n\t\"blue\": [0, 0, 255],\r\n\t\"blueviolet\": [138, 43, 226],\r\n\t\"brown\": [165, 42, 42],\r\n\t\"burlywood\": [222, 184, 135],\r\n\t\"cadetblue\": [95, 158, 160],\r\n\t\"chartreuse\": [127, 255, 0],\r\n\t\"chocolate\": [210, 105, 30],\r\n\t\"coral\": [255, 127, 80],\r\n\t\"cornflowerblue\": [100, 149, 237],\r\n\t\"cornsilk\": [255, 248, 220],\r\n\t\"crimson\": [220, 20, 60],\r\n\t\"cyan\": [0, 255, 255],\r\n\t\"darkblue\": [0, 0, 139],\r\n\t\"darkcyan\": [0, 139, 139],\r\n\t\"darkgoldenrod\": [184, 134, 11],\r\n\t\"darkgray\": [169, 169, 169],\r\n\t\"darkgreen\": [0, 100, 0],\r\n\t\"darkgrey\": [169, 169, 169],\r\n\t\"darkkhaki\": [189, 183, 107],\r\n\t\"darkmagenta\": [139, 0, 139],\r\n\t\"darkolivegreen\": [85, 107, 47],\r\n\t\"darkorange\": [255, 140, 0],\r\n\t\"darkorchid\": [153, 50, 204],\r\n\t\"darkred\": [139, 0, 0],\r\n\t\"darksalmon\": [233, 150, 122],\r\n\t\"darkseagreen\": [143, 188, 143],\r\n\t\"darkslateblue\": [72, 61, 139],\r\n\t\"darkslategray\": [47, 79, 79],\r\n\t\"darkslategrey\": [47, 79, 79],\r\n\t\"darkturquoise\": [0, 206, 209],\r\n\t\"darkviolet\": [148, 0, 211],\r\n\t\"deeppink\": [255, 20, 147],\r\n\t\"deepskyblue\": [0, 191, 255],\r\n\t\"dimgray\": [105, 105, 105],\r\n\t\"dimgrey\": [105, 105, 105],\r\n\t\"dodgerblue\": [30, 144, 255],\r\n\t\"firebrick\": [178, 34, 34],\r\n\t\"floralwhite\": [255, 250, 240],\r\n\t\"forestgreen\": [34, 139, 34],\r\n\t\"fuchsia\": [255, 0, 255],\r\n\t\"gainsboro\": [220, 220, 220],\r\n\t\"ghostwhite\": [248, 248, 255],\r\n\t\"gold\": [255, 215, 0],\r\n\t\"goldenrod\": [218, 165, 32],\r\n\t\"gray\": [128, 128, 128],\r\n\t\"green\": [0, 128, 0],\r\n\t\"greenyellow\": [173, 255, 47],\r\n\t\"grey\": [128, 128, 128],\r\n\t\"honeydew\": [240, 255, 240],\r\n\t\"hotpink\": [255, 105, 180],\r\n\t\"indianred\": [205, 92, 92],\r\n\t\"indigo\": [75, 0, 130],\r\n\t\"ivory\": [255, 255, 240],\r\n\t\"khaki\": [240, 230, 140],\r\n\t\"lavender\": [230, 230, 250],\r\n\t\"lavenderblush\": [255, 240, 245],\r\n\t\"lawngreen\": [124, 252, 0],\r\n\t\"lemonchiffon\": [255, 250, 205],\r\n\t\"lightblue\": [173, 216, 230],\r\n\t\"lightcoral\": [240, 128, 128],\r\n\t\"lightcyan\": [224, 255, 255],\r\n\t\"lightgoldenrodyellow\": [250, 250, 210],\r\n\t\"lightgray\": [211, 211, 211],\r\n\t\"lightgreen\": [144, 238, 144],\r\n\t\"lightgrey\": [211, 211, 211],\r\n\t\"lightpink\": [255, 182, 193],\r\n\t\"lightsalmon\": [255, 160, 122],\r\n\t\"lightseagreen\": [32, 178, 170],\r\n\t\"lightskyblue\": [135, 206, 250],\r\n\t\"lightslategray\": [119, 136, 153],\r\n\t\"lightslategrey\": [119, 136, 153],\r\n\t\"lightsteelblue\": [176, 196, 222],\r\n\t\"lightyellow\": [255, 255, 224],\r\n\t\"lime\": [0, 255, 0],\r\n\t\"limegreen\": [50, 205, 50],\r\n\t\"linen\": [250, 240, 230],\r\n\t\"magenta\": [255, 0, 255],\r\n\t\"maroon\": [128, 0, 0],\r\n\t\"mediumaquamarine\": [102, 205, 170],\r\n\t\"mediumblue\": [0, 0, 205],\r\n\t\"mediumorchid\": [186, 85, 211],\r\n\t\"mediumpurple\": [147, 112, 219],\r\n\t\"mediumseagreen\": [60, 179, 113],\r\n\t\"mediumslateblue\": [123, 104, 238],\r\n\t\"mediumspringgreen\": [0, 250, 154],\r\n\t\"mediumturquoise\": [72, 209, 204],\r\n\t\"mediumvioletred\": [199, 21, 133],\r\n\t\"midnightblue\": [25, 25, 112],\r\n\t\"mintcream\": [245, 255, 250],\r\n\t\"mistyrose\": [255, 228, 225],\r\n\t\"moccasin\": [255, 228, 181],\r\n\t\"navajowhite\": [255, 222, 173],\r\n\t\"navy\": [0, 0, 128],\r\n\t\"oldlace\": [253, 245, 230],\r\n\t\"olive\": [128, 128, 0],\r\n\t\"olivedrab\": [107, 142, 35],\r\n\t\"orange\": [255, 165, 0],\r\n\t\"orangered\": [255, 69, 0],\r\n\t\"orchid\": [218, 112, 214],\r\n\t\"palegoldenrod\": [238, 232, 170],\r\n\t\"palegreen\": [152, 251, 152],\r\n\t\"paleturquoise\": [175, 238, 238],\r\n\t\"palevioletred\": [219, 112, 147],\r\n\t\"papayawhip\": [255, 239, 213],\r\n\t\"peachpuff\": [255, 218, 185],\r\n\t\"peru\": [205, 133, 63],\r\n\t\"pink\": [255, 192, 203],\r\n\t\"plum\": [221, 160, 221],\r\n\t\"powderblue\": [176, 224, 230],\r\n\t\"purple\": [128, 0, 128],\r\n\t\"rebeccapurple\": [102, 51, 153],\r\n\t\"red\": [255, 0, 0],\r\n\t\"rosybrown\": [188, 143, 143],\r\n\t\"royalblue\": [65, 105, 225],\r\n\t\"saddlebrown\": [139, 69, 19],\r\n\t\"salmon\": [250, 128, 114],\r\n\t\"sandybrown\": [244, 164, 96],\r\n\t\"seagreen\": [46, 139, 87],\r\n\t\"seashell\": [255, 245, 238],\r\n\t\"sienna\": [160, 82, 45],\r\n\t\"silver\": [192, 192, 192],\r\n\t\"skyblue\": [135, 206, 235],\r\n\t\"slateblue\": [106, 90, 205],\r\n\t\"slategray\": [112, 128, 144],\r\n\t\"slategrey\": [112, 128, 144],\r\n\t\"snow\": [255, 250, 250],\r\n\t\"springgreen\": [0, 255, 127],\r\n\t\"steelblue\": [70, 130, 180],\r\n\t\"tan\": [210, 180, 140],\r\n\t\"teal\": [0, 128, 128],\r\n\t\"thistle\": [216, 191, 216],\r\n\t\"tomato\": [255, 99, 71],\r\n\t\"turquoise\": [64, 224, 208],\r\n\t\"violet\": [238, 130, 238],\r\n\t\"wheat\": [245, 222, 179],\r\n\t\"white\": [255, 255, 255],\r\n\t\"whitesmoke\": [245, 245, 245],\r\n\t\"yellow\": [255, 255, 0],\r\n\t\"yellowgreen\": [154, 205, 50]\r\n};\r\n\n\n//# sourceURL=webpack:///./node_modules/color-name/index.js?");

/***/ }),

/***/ "./node_modules/color-string/index.js":
/*!********************************************!*\
  !*** ./node_modules/color-string/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* MIT license */\nvar colorNames = __webpack_require__(/*! color-name */ \"./node_modules/color-string/node_modules/color-name/index.js\");\nvar swizzle = __webpack_require__(/*! simple-swizzle */ \"./node_modules/simple-swizzle/index.js\");\n\nvar reverseNames = {};\n\n// create a list of reverse color names\nfor (var name in colorNames) {\n\tif (colorNames.hasOwnProperty(name)) {\n\t\treverseNames[colorNames[name]] = name;\n\t}\n}\n\nvar cs = module.exports = {\n\tto: {},\n\tget: {}\n};\n\ncs.get = function (string) {\n\tvar prefix = string.substring(0, 3).toLowerCase();\n\tvar val;\n\tvar model;\n\tswitch (prefix) {\n\t\tcase 'hsl':\n\t\t\tval = cs.get.hsl(string);\n\t\t\tmodel = 'hsl';\n\t\t\tbreak;\n\t\tcase 'hwb':\n\t\t\tval = cs.get.hwb(string);\n\t\t\tmodel = 'hwb';\n\t\t\tbreak;\n\t\tdefault:\n\t\t\tval = cs.get.rgb(string);\n\t\t\tmodel = 'rgb';\n\t\t\tbreak;\n\t}\n\n\tif (!val) {\n\t\treturn null;\n\t}\n\n\treturn {model: model, value: val};\n};\n\ncs.get.rgb = function (string) {\n\tif (!string) {\n\t\treturn null;\n\t}\n\n\tvar abbr = /^#([a-f0-9]{3,4})$/i;\n\tvar hex = /^#([a-f0-9]{6})([a-f0-9]{2})?$/i;\n\tvar rgba = /^rgba?\\(\\s*([+-]?\\d+)\\s*,\\s*([+-]?\\d+)\\s*,\\s*([+-]?\\d+)\\s*(?:,\\s*([+-]?[\\d\\.]+)\\s*)?\\)$/;\n\tvar per = /^rgba?\\(\\s*([+-]?[\\d\\.]+)\\%\\s*,\\s*([+-]?[\\d\\.]+)\\%\\s*,\\s*([+-]?[\\d\\.]+)\\%\\s*(?:,\\s*([+-]?[\\d\\.]+)\\s*)?\\)$/;\n\tvar keyword = /(\\D+)/;\n\n\tvar rgb = [0, 0, 0, 1];\n\tvar match;\n\tvar i;\n\tvar hexAlpha;\n\n\tif (match = string.match(hex)) {\n\t\thexAlpha = match[2];\n\t\tmatch = match[1];\n\n\t\tfor (i = 0; i < 3; i++) {\n\t\t\t// https://jsperf.com/slice-vs-substr-vs-substring-methods-long-string/19\n\t\t\tvar i2 = i * 2;\n\t\t\trgb[i] = parseInt(match.slice(i2, i2 + 2), 16);\n\t\t}\n\n\t\tif (hexAlpha) {\n\t\t\trgb[3] = Math.round((parseInt(hexAlpha, 16) / 255) * 100) / 100;\n\t\t}\n\t} else if (match = string.match(abbr)) {\n\t\tmatch = match[1];\n\t\thexAlpha = match[3];\n\n\t\tfor (i = 0; i < 3; i++) {\n\t\t\trgb[i] = parseInt(match[i] + match[i], 16);\n\t\t}\n\n\t\tif (hexAlpha) {\n\t\t\trgb[3] = Math.round((parseInt(hexAlpha + hexAlpha, 16) / 255) * 100) / 100;\n\t\t}\n\t} else if (match = string.match(rgba)) {\n\t\tfor (i = 0; i < 3; i++) {\n\t\t\trgb[i] = parseInt(match[i + 1], 0);\n\t\t}\n\n\t\tif (match[4]) {\n\t\t\trgb[3] = parseFloat(match[4]);\n\t\t}\n\t} else if (match = string.match(per)) {\n\t\tfor (i = 0; i < 3; i++) {\n\t\t\trgb[i] = Math.round(parseFloat(match[i + 1]) * 2.55);\n\t\t}\n\n\t\tif (match[4]) {\n\t\t\trgb[3] = parseFloat(match[4]);\n\t\t}\n\t} else if (match = string.match(keyword)) {\n\t\tif (match[1] === 'transparent') {\n\t\t\treturn [0, 0, 0, 0];\n\t\t}\n\n\t\trgb = colorNames[match[1]];\n\n\t\tif (!rgb) {\n\t\t\treturn null;\n\t\t}\n\n\t\trgb[3] = 1;\n\n\t\treturn rgb;\n\t} else {\n\t\treturn null;\n\t}\n\n\tfor (i = 0; i < 3; i++) {\n\t\trgb[i] = clamp(rgb[i], 0, 255);\n\t}\n\trgb[3] = clamp(rgb[3], 0, 1);\n\n\treturn rgb;\n};\n\ncs.get.hsl = function (string) {\n\tif (!string) {\n\t\treturn null;\n\t}\n\n\tvar hsl = /^hsla?\\(\\s*([+-]?(?:\\d*\\.)?\\d+)(?:deg)?\\s*,\\s*([+-]?[\\d\\.]+)%\\s*,\\s*([+-]?[\\d\\.]+)%\\s*(?:,\\s*([+-]?[\\d\\.]+)\\s*)?\\)$/;\n\tvar match = string.match(hsl);\n\n\tif (match) {\n\t\tvar alpha = parseFloat(match[4]);\n\t\tvar h = (parseFloat(match[1]) + 360) % 360;\n\t\tvar s = clamp(parseFloat(match[2]), 0, 100);\n\t\tvar l = clamp(parseFloat(match[3]), 0, 100);\n\t\tvar a = clamp(isNaN(alpha) ? 1 : alpha, 0, 1);\n\n\t\treturn [h, s, l, a];\n\t}\n\n\treturn null;\n};\n\ncs.get.hwb = function (string) {\n\tif (!string) {\n\t\treturn null;\n\t}\n\n\tvar hwb = /^hwb\\(\\s*([+-]?\\d*[\\.]?\\d+)(?:deg)?\\s*,\\s*([+-]?[\\d\\.]+)%\\s*,\\s*([+-]?[\\d\\.]+)%\\s*(?:,\\s*([+-]?[\\d\\.]+)\\s*)?\\)$/;\n\tvar match = string.match(hwb);\n\n\tif (match) {\n\t\tvar alpha = parseFloat(match[4]);\n\t\tvar h = ((parseFloat(match[1]) % 360) + 360) % 360;\n\t\tvar w = clamp(parseFloat(match[2]), 0, 100);\n\t\tvar b = clamp(parseFloat(match[3]), 0, 100);\n\t\tvar a = clamp(isNaN(alpha) ? 1 : alpha, 0, 1);\n\t\treturn [h, w, b, a];\n\t}\n\n\treturn null;\n};\n\ncs.to.hex = function () {\n\tvar rgba = swizzle(arguments);\n\n\treturn (\n\t\t'#' +\n\t\thexDouble(rgba[0]) +\n\t\thexDouble(rgba[1]) +\n\t\thexDouble(rgba[2]) +\n\t\t(rgba[3] < 1\n\t\t\t? (hexDouble(Math.round(rgba[3] * 255)))\n\t\t\t: '')\n\t);\n};\n\ncs.to.rgb = function () {\n\tvar rgba = swizzle(arguments);\n\n\treturn rgba.length < 4 || rgba[3] === 1\n\t\t? 'rgb(' + Math.round(rgba[0]) + ', ' + Math.round(rgba[1]) + ', ' + Math.round(rgba[2]) + ')'\n\t\t: 'rgba(' + Math.round(rgba[0]) + ', ' + Math.round(rgba[1]) + ', ' + Math.round(rgba[2]) + ', ' + rgba[3] + ')';\n};\n\ncs.to.rgb.percent = function () {\n\tvar rgba = swizzle(arguments);\n\n\tvar r = Math.round(rgba[0] / 255 * 100);\n\tvar g = Math.round(rgba[1] / 255 * 100);\n\tvar b = Math.round(rgba[2] / 255 * 100);\n\n\treturn rgba.length < 4 || rgba[3] === 1\n\t\t? 'rgb(' + r + '%, ' + g + '%, ' + b + '%)'\n\t\t: 'rgba(' + r + '%, ' + g + '%, ' + b + '%, ' + rgba[3] + ')';\n};\n\ncs.to.hsl = function () {\n\tvar hsla = swizzle(arguments);\n\treturn hsla.length < 4 || hsla[3] === 1\n\t\t? 'hsl(' + hsla[0] + ', ' + hsla[1] + '%, ' + hsla[2] + '%)'\n\t\t: 'hsla(' + hsla[0] + ', ' + hsla[1] + '%, ' + hsla[2] + '%, ' + hsla[3] + ')';\n};\n\n// hwb is a bit different than rgb(a) & hsl(a) since there is no alpha specific syntax\n// (hwb have alpha optional & 1 is default value)\ncs.to.hwb = function () {\n\tvar hwba = swizzle(arguments);\n\n\tvar a = '';\n\tif (hwba.length >= 4 && hwba[3] !== 1) {\n\t\ta = ', ' + hwba[3];\n\t}\n\n\treturn 'hwb(' + hwba[0] + ', ' + hwba[1] + '%, ' + hwba[2] + '%' + a + ')';\n};\n\ncs.to.keyword = function (rgb) {\n\treturn reverseNames[rgb.slice(0, 3)];\n};\n\n// helpers\nfunction clamp(num, min, max) {\n\treturn Math.min(Math.max(min, num), max);\n}\n\nfunction hexDouble(num) {\n\tvar str = num.toString(16).toUpperCase();\n\treturn (str.length < 2) ? '0' + str : str;\n}\n\n\n//# sourceURL=webpack:///./node_modules/color-string/index.js?");

/***/ }),

/***/ "./node_modules/color-string/node_modules/color-name/index.js":
/*!********************************************************************!*\
  !*** ./node_modules/color-string/node_modules/color-name/index.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\n\r\nmodule.exports = {\r\n\t\"aliceblue\": [240, 248, 255],\r\n\t\"antiquewhite\": [250, 235, 215],\r\n\t\"aqua\": [0, 255, 255],\r\n\t\"aquamarine\": [127, 255, 212],\r\n\t\"azure\": [240, 255, 255],\r\n\t\"beige\": [245, 245, 220],\r\n\t\"bisque\": [255, 228, 196],\r\n\t\"black\": [0, 0, 0],\r\n\t\"blanchedalmond\": [255, 235, 205],\r\n\t\"blue\": [0, 0, 255],\r\n\t\"blueviolet\": [138, 43, 226],\r\n\t\"brown\": [165, 42, 42],\r\n\t\"burlywood\": [222, 184, 135],\r\n\t\"cadetblue\": [95, 158, 160],\r\n\t\"chartreuse\": [127, 255, 0],\r\n\t\"chocolate\": [210, 105, 30],\r\n\t\"coral\": [255, 127, 80],\r\n\t\"cornflowerblue\": [100, 149, 237],\r\n\t\"cornsilk\": [255, 248, 220],\r\n\t\"crimson\": [220, 20, 60],\r\n\t\"cyan\": [0, 255, 255],\r\n\t\"darkblue\": [0, 0, 139],\r\n\t\"darkcyan\": [0, 139, 139],\r\n\t\"darkgoldenrod\": [184, 134, 11],\r\n\t\"darkgray\": [169, 169, 169],\r\n\t\"darkgreen\": [0, 100, 0],\r\n\t\"darkgrey\": [169, 169, 169],\r\n\t\"darkkhaki\": [189, 183, 107],\r\n\t\"darkmagenta\": [139, 0, 139],\r\n\t\"darkolivegreen\": [85, 107, 47],\r\n\t\"darkorange\": [255, 140, 0],\r\n\t\"darkorchid\": [153, 50, 204],\r\n\t\"darkred\": [139, 0, 0],\r\n\t\"darksalmon\": [233, 150, 122],\r\n\t\"darkseagreen\": [143, 188, 143],\r\n\t\"darkslateblue\": [72, 61, 139],\r\n\t\"darkslategray\": [47, 79, 79],\r\n\t\"darkslategrey\": [47, 79, 79],\r\n\t\"darkturquoise\": [0, 206, 209],\r\n\t\"darkviolet\": [148, 0, 211],\r\n\t\"deeppink\": [255, 20, 147],\r\n\t\"deepskyblue\": [0, 191, 255],\r\n\t\"dimgray\": [105, 105, 105],\r\n\t\"dimgrey\": [105, 105, 105],\r\n\t\"dodgerblue\": [30, 144, 255],\r\n\t\"firebrick\": [178, 34, 34],\r\n\t\"floralwhite\": [255, 250, 240],\r\n\t\"forestgreen\": [34, 139, 34],\r\n\t\"fuchsia\": [255, 0, 255],\r\n\t\"gainsboro\": [220, 220, 220],\r\n\t\"ghostwhite\": [248, 248, 255],\r\n\t\"gold\": [255, 215, 0],\r\n\t\"goldenrod\": [218, 165, 32],\r\n\t\"gray\": [128, 128, 128],\r\n\t\"green\": [0, 128, 0],\r\n\t\"greenyellow\": [173, 255, 47],\r\n\t\"grey\": [128, 128, 128],\r\n\t\"honeydew\": [240, 255, 240],\r\n\t\"hotpink\": [255, 105, 180],\r\n\t\"indianred\": [205, 92, 92],\r\n\t\"indigo\": [75, 0, 130],\r\n\t\"ivory\": [255, 255, 240],\r\n\t\"khaki\": [240, 230, 140],\r\n\t\"lavender\": [230, 230, 250],\r\n\t\"lavenderblush\": [255, 240, 245],\r\n\t\"lawngreen\": [124, 252, 0],\r\n\t\"lemonchiffon\": [255, 250, 205],\r\n\t\"lightblue\": [173, 216, 230],\r\n\t\"lightcoral\": [240, 128, 128],\r\n\t\"lightcyan\": [224, 255, 255],\r\n\t\"lightgoldenrodyellow\": [250, 250, 210],\r\n\t\"lightgray\": [211, 211, 211],\r\n\t\"lightgreen\": [144, 238, 144],\r\n\t\"lightgrey\": [211, 211, 211],\r\n\t\"lightpink\": [255, 182, 193],\r\n\t\"lightsalmon\": [255, 160, 122],\r\n\t\"lightseagreen\": [32, 178, 170],\r\n\t\"lightskyblue\": [135, 206, 250],\r\n\t\"lightslategray\": [119, 136, 153],\r\n\t\"lightslategrey\": [119, 136, 153],\r\n\t\"lightsteelblue\": [176, 196, 222],\r\n\t\"lightyellow\": [255, 255, 224],\r\n\t\"lime\": [0, 255, 0],\r\n\t\"limegreen\": [50, 205, 50],\r\n\t\"linen\": [250, 240, 230],\r\n\t\"magenta\": [255, 0, 255],\r\n\t\"maroon\": [128, 0, 0],\r\n\t\"mediumaquamarine\": [102, 205, 170],\r\n\t\"mediumblue\": [0, 0, 205],\r\n\t\"mediumorchid\": [186, 85, 211],\r\n\t\"mediumpurple\": [147, 112, 219],\r\n\t\"mediumseagreen\": [60, 179, 113],\r\n\t\"mediumslateblue\": [123, 104, 238],\r\n\t\"mediumspringgreen\": [0, 250, 154],\r\n\t\"mediumturquoise\": [72, 209, 204],\r\n\t\"mediumvioletred\": [199, 21, 133],\r\n\t\"midnightblue\": [25, 25, 112],\r\n\t\"mintcream\": [245, 255, 250],\r\n\t\"mistyrose\": [255, 228, 225],\r\n\t\"moccasin\": [255, 228, 181],\r\n\t\"navajowhite\": [255, 222, 173],\r\n\t\"navy\": [0, 0, 128],\r\n\t\"oldlace\": [253, 245, 230],\r\n\t\"olive\": [128, 128, 0],\r\n\t\"olivedrab\": [107, 142, 35],\r\n\t\"orange\": [255, 165, 0],\r\n\t\"orangered\": [255, 69, 0],\r\n\t\"orchid\": [218, 112, 214],\r\n\t\"palegoldenrod\": [238, 232, 170],\r\n\t\"palegreen\": [152, 251, 152],\r\n\t\"paleturquoise\": [175, 238, 238],\r\n\t\"palevioletred\": [219, 112, 147],\r\n\t\"papayawhip\": [255, 239, 213],\r\n\t\"peachpuff\": [255, 218, 185],\r\n\t\"peru\": [205, 133, 63],\r\n\t\"pink\": [255, 192, 203],\r\n\t\"plum\": [221, 160, 221],\r\n\t\"powderblue\": [176, 224, 230],\r\n\t\"purple\": [128, 0, 128],\r\n\t\"rebeccapurple\": [102, 51, 153],\r\n\t\"red\": [255, 0, 0],\r\n\t\"rosybrown\": [188, 143, 143],\r\n\t\"royalblue\": [65, 105, 225],\r\n\t\"saddlebrown\": [139, 69, 19],\r\n\t\"salmon\": [250, 128, 114],\r\n\t\"sandybrown\": [244, 164, 96],\r\n\t\"seagreen\": [46, 139, 87],\r\n\t\"seashell\": [255, 245, 238],\r\n\t\"sienna\": [160, 82, 45],\r\n\t\"silver\": [192, 192, 192],\r\n\t\"skyblue\": [135, 206, 235],\r\n\t\"slateblue\": [106, 90, 205],\r\n\t\"slategray\": [112, 128, 144],\r\n\t\"slategrey\": [112, 128, 144],\r\n\t\"snow\": [255, 250, 250],\r\n\t\"springgreen\": [0, 255, 127],\r\n\t\"steelblue\": [70, 130, 180],\r\n\t\"tan\": [210, 180, 140],\r\n\t\"teal\": [0, 128, 128],\r\n\t\"thistle\": [216, 191, 216],\r\n\t\"tomato\": [255, 99, 71],\r\n\t\"turquoise\": [64, 224, 208],\r\n\t\"violet\": [238, 130, 238],\r\n\t\"wheat\": [245, 222, 179],\r\n\t\"white\": [255, 255, 255],\r\n\t\"whitesmoke\": [245, 245, 245],\r\n\t\"yellow\": [255, 255, 0],\r\n\t\"yellowgreen\": [154, 205, 50]\r\n};\r\n\n\n//# sourceURL=webpack:///./node_modules/color-string/node_modules/color-name/index.js?");

/***/ }),

/***/ "./node_modules/color/index.js":
/*!*************************************!*\
  !*** ./node_modules/color/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar colorString = __webpack_require__(/*! color-string */ \"./node_modules/color-string/index.js\");\nvar convert = __webpack_require__(/*! color-convert */ \"./node_modules/color-convert/index.js\");\n\nvar _slice = [].slice;\n\nvar skippedModels = [\n\t// to be honest, I don't really feel like keyword belongs in color convert, but eh.\n\t'keyword',\n\n\t// gray conflicts with some method names, and has its own method defined.\n\t'gray',\n\n\t// shouldn't really be in color-convert either...\n\t'hex'\n];\n\nvar hashedModelKeys = {};\nObject.keys(convert).forEach(function (model) {\n\thashedModelKeys[_slice.call(convert[model].labels).sort().join('')] = model;\n});\n\nvar limiters = {};\n\nfunction Color(obj, model) {\n\tif (!(this instanceof Color)) {\n\t\treturn new Color(obj, model);\n\t}\n\n\tif (model && model in skippedModels) {\n\t\tmodel = null;\n\t}\n\n\tif (model && !(model in convert)) {\n\t\tthrow new Error('Unknown model: ' + model);\n\t}\n\n\tvar i;\n\tvar channels;\n\n\tif (typeof obj === 'undefined') {\n\t\tthis.model = 'rgb';\n\t\tthis.color = [0, 0, 0];\n\t\tthis.valpha = 1;\n\t} else if (obj instanceof Color) {\n\t\tthis.model = obj.model;\n\t\tthis.color = obj.color.slice();\n\t\tthis.valpha = obj.valpha;\n\t} else if (typeof obj === 'string') {\n\t\tvar result = colorString.get(obj);\n\t\tif (result === null) {\n\t\t\tthrow new Error('Unable to parse color from string: ' + obj);\n\t\t}\n\n\t\tthis.model = result.model;\n\t\tchannels = convert[this.model].channels;\n\t\tthis.color = result.value.slice(0, channels);\n\t\tthis.valpha = typeof result.value[channels] === 'number' ? result.value[channels] : 1;\n\t} else if (obj.length) {\n\t\tthis.model = model || 'rgb';\n\t\tchannels = convert[this.model].channels;\n\t\tvar newArr = _slice.call(obj, 0, channels);\n\t\tthis.color = zeroArray(newArr, channels);\n\t\tthis.valpha = typeof obj[channels] === 'number' ? obj[channels] : 1;\n\t} else if (typeof obj === 'number') {\n\t\t// this is always RGB - can be converted later on.\n\t\tobj &= 0xFFFFFF;\n\t\tthis.model = 'rgb';\n\t\tthis.color = [\n\t\t\t(obj >> 16) & 0xFF,\n\t\t\t(obj >> 8) & 0xFF,\n\t\t\tobj & 0xFF\n\t\t];\n\t\tthis.valpha = 1;\n\t} else {\n\t\tthis.valpha = 1;\n\n\t\tvar keys = Object.keys(obj);\n\t\tif ('alpha' in obj) {\n\t\t\tkeys.splice(keys.indexOf('alpha'), 1);\n\t\t\tthis.valpha = typeof obj.alpha === 'number' ? obj.alpha : 0;\n\t\t}\n\n\t\tvar hashedKeys = keys.sort().join('');\n\t\tif (!(hashedKeys in hashedModelKeys)) {\n\t\t\tthrow new Error('Unable to parse color from object: ' + JSON.stringify(obj));\n\t\t}\n\n\t\tthis.model = hashedModelKeys[hashedKeys];\n\n\t\tvar labels = convert[this.model].labels;\n\t\tvar color = [];\n\t\tfor (i = 0; i < labels.length; i++) {\n\t\t\tcolor.push(obj[labels[i]]);\n\t\t}\n\n\t\tthis.color = zeroArray(color);\n\t}\n\n\t// perform limitations (clamping, etc.)\n\tif (limiters[this.model]) {\n\t\tchannels = convert[this.model].channels;\n\t\tfor (i = 0; i < channels; i++) {\n\t\t\tvar limit = limiters[this.model][i];\n\t\t\tif (limit) {\n\t\t\t\tthis.color[i] = limit(this.color[i]);\n\t\t\t}\n\t\t}\n\t}\n\n\tthis.valpha = Math.max(0, Math.min(1, this.valpha));\n\n\tif (Object.freeze) {\n\t\tObject.freeze(this);\n\t}\n}\n\nColor.prototype = {\n\ttoString: function () {\n\t\treturn this.string();\n\t},\n\n\ttoJSON: function () {\n\t\treturn this[this.model]();\n\t},\n\n\tstring: function (places) {\n\t\tvar self = this.model in colorString.to ? this : this.rgb();\n\t\tself = self.round(typeof places === 'number' ? places : 1);\n\t\tvar args = self.valpha === 1 ? self.color : self.color.concat(this.valpha);\n\t\treturn colorString.to[self.model](args);\n\t},\n\n\tpercentString: function (places) {\n\t\tvar self = this.rgb().round(typeof places === 'number' ? places : 1);\n\t\tvar args = self.valpha === 1 ? self.color : self.color.concat(this.valpha);\n\t\treturn colorString.to.rgb.percent(args);\n\t},\n\n\tarray: function () {\n\t\treturn this.valpha === 1 ? this.color.slice() : this.color.concat(this.valpha);\n\t},\n\n\tobject: function () {\n\t\tvar result = {};\n\t\tvar channels = convert[this.model].channels;\n\t\tvar labels = convert[this.model].labels;\n\n\t\tfor (var i = 0; i < channels; i++) {\n\t\t\tresult[labels[i]] = this.color[i];\n\t\t}\n\n\t\tif (this.valpha !== 1) {\n\t\t\tresult.alpha = this.valpha;\n\t\t}\n\n\t\treturn result;\n\t},\n\n\tunitArray: function () {\n\t\tvar rgb = this.rgb().color;\n\t\trgb[0] /= 255;\n\t\trgb[1] /= 255;\n\t\trgb[2] /= 255;\n\n\t\tif (this.valpha !== 1) {\n\t\t\trgb.push(this.valpha);\n\t\t}\n\n\t\treturn rgb;\n\t},\n\n\tunitObject: function () {\n\t\tvar rgb = this.rgb().object();\n\t\trgb.r /= 255;\n\t\trgb.g /= 255;\n\t\trgb.b /= 255;\n\n\t\tif (this.valpha !== 1) {\n\t\t\trgb.alpha = this.valpha;\n\t\t}\n\n\t\treturn rgb;\n\t},\n\n\tround: function (places) {\n\t\tplaces = Math.max(places || 0, 0);\n\t\treturn new Color(this.color.map(roundToPlace(places)).concat(this.valpha), this.model);\n\t},\n\n\talpha: function (val) {\n\t\tif (arguments.length) {\n\t\t\treturn new Color(this.color.concat(Math.max(0, Math.min(1, val))), this.model);\n\t\t}\n\n\t\treturn this.valpha;\n\t},\n\n\t// rgb\n\tred: getset('rgb', 0, maxfn(255)),\n\tgreen: getset('rgb', 1, maxfn(255)),\n\tblue: getset('rgb', 2, maxfn(255)),\n\n\thue: getset(['hsl', 'hsv', 'hsl', 'hwb', 'hcg'], 0, function (val) { return ((val % 360) + 360) % 360; }), // eslint-disable-line brace-style\n\n\tsaturationl: getset('hsl', 1, maxfn(100)),\n\tlightness: getset('hsl', 2, maxfn(100)),\n\n\tsaturationv: getset('hsv', 1, maxfn(100)),\n\tvalue: getset('hsv', 2, maxfn(100)),\n\n\tchroma: getset('hcg', 1, maxfn(100)),\n\tgray: getset('hcg', 2, maxfn(100)),\n\n\twhite: getset('hwb', 1, maxfn(100)),\n\twblack: getset('hwb', 2, maxfn(100)),\n\n\tcyan: getset('cmyk', 0, maxfn(100)),\n\tmagenta: getset('cmyk', 1, maxfn(100)),\n\tyellow: getset('cmyk', 2, maxfn(100)),\n\tblack: getset('cmyk', 3, maxfn(100)),\n\n\tx: getset('xyz', 0, maxfn(100)),\n\ty: getset('xyz', 1, maxfn(100)),\n\tz: getset('xyz', 2, maxfn(100)),\n\n\tl: getset('lab', 0, maxfn(100)),\n\ta: getset('lab', 1),\n\tb: getset('lab', 2),\n\n\tkeyword: function (val) {\n\t\tif (arguments.length) {\n\t\t\treturn new Color(val);\n\t\t}\n\n\t\treturn convert[this.model].keyword(this.color);\n\t},\n\n\thex: function (val) {\n\t\tif (arguments.length) {\n\t\t\treturn new Color(val);\n\t\t}\n\n\t\treturn colorString.to.hex(this.rgb().round().color);\n\t},\n\n\trgbNumber: function () {\n\t\tvar rgb = this.rgb().color;\n\t\treturn ((rgb[0] & 0xFF) << 16) | ((rgb[1] & 0xFF) << 8) | (rgb[2] & 0xFF);\n\t},\n\n\tluminosity: function () {\n\t\t// http://www.w3.org/TR/WCAG20/#relativeluminancedef\n\t\tvar rgb = this.rgb().color;\n\n\t\tvar lum = [];\n\t\tfor (var i = 0; i < rgb.length; i++) {\n\t\t\tvar chan = rgb[i] / 255;\n\t\t\tlum[i] = (chan <= 0.03928) ? chan / 12.92 : Math.pow(((chan + 0.055) / 1.055), 2.4);\n\t\t}\n\n\t\treturn 0.2126 * lum[0] + 0.7152 * lum[1] + 0.0722 * lum[2];\n\t},\n\n\tcontrast: function (color2) {\n\t\t// http://www.w3.org/TR/WCAG20/#contrast-ratiodef\n\t\tvar lum1 = this.luminosity();\n\t\tvar lum2 = color2.luminosity();\n\n\t\tif (lum1 > lum2) {\n\t\t\treturn (lum1 + 0.05) / (lum2 + 0.05);\n\t\t}\n\n\t\treturn (lum2 + 0.05) / (lum1 + 0.05);\n\t},\n\n\tlevel: function (color2) {\n\t\tvar contrastRatio = this.contrast(color2);\n\t\tif (contrastRatio >= 7.1) {\n\t\t\treturn 'AAA';\n\t\t}\n\n\t\treturn (contrastRatio >= 4.5) ? 'AA' : '';\n\t},\n\n\tisDark: function () {\n\t\t// YIQ equation from http://24ways.org/2010/calculating-color-contrast\n\t\tvar rgb = this.rgb().color;\n\t\tvar yiq = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;\n\t\treturn yiq < 128;\n\t},\n\n\tisLight: function () {\n\t\treturn !this.isDark();\n\t},\n\n\tnegate: function () {\n\t\tvar rgb = this.rgb();\n\t\tfor (var i = 0; i < 3; i++) {\n\t\t\trgb.color[i] = 255 - rgb.color[i];\n\t\t}\n\t\treturn rgb;\n\t},\n\n\tlighten: function (ratio) {\n\t\tvar hsl = this.hsl();\n\t\thsl.color[2] += hsl.color[2] * ratio;\n\t\treturn hsl;\n\t},\n\n\tdarken: function (ratio) {\n\t\tvar hsl = this.hsl();\n\t\thsl.color[2] -= hsl.color[2] * ratio;\n\t\treturn hsl;\n\t},\n\n\tsaturate: function (ratio) {\n\t\tvar hsl = this.hsl();\n\t\thsl.color[1] += hsl.color[1] * ratio;\n\t\treturn hsl;\n\t},\n\n\tdesaturate: function (ratio) {\n\t\tvar hsl = this.hsl();\n\t\thsl.color[1] -= hsl.color[1] * ratio;\n\t\treturn hsl;\n\t},\n\n\twhiten: function (ratio) {\n\t\tvar hwb = this.hwb();\n\t\thwb.color[1] += hwb.color[1] * ratio;\n\t\treturn hwb;\n\t},\n\n\tblacken: function (ratio) {\n\t\tvar hwb = this.hwb();\n\t\thwb.color[2] += hwb.color[2] * ratio;\n\t\treturn hwb;\n\t},\n\n\tgrayscale: function () {\n\t\t// http://en.wikipedia.org/wiki/Grayscale#Converting_color_to_grayscale\n\t\tvar rgb = this.rgb().color;\n\t\tvar val = rgb[0] * 0.3 + rgb[1] * 0.59 + rgb[2] * 0.11;\n\t\treturn Color.rgb(val, val, val);\n\t},\n\n\tfade: function (ratio) {\n\t\treturn this.alpha(this.valpha - (this.valpha * ratio));\n\t},\n\n\topaquer: function (ratio) {\n\t\treturn this.alpha(this.valpha + (this.valpha * ratio));\n\t},\n\n\trotate: function (degrees) {\n\t\tvar hsl = this.hsl();\n\t\tvar hue = hsl.color[0];\n\t\thue = (hue + degrees) % 360;\n\t\thue = hue < 0 ? 360 + hue : hue;\n\t\thsl.color[0] = hue;\n\t\treturn hsl;\n\t},\n\n\tmix: function (mixinColor, weight) {\n\t\t// ported from sass implementation in C\n\t\t// https://github.com/sass/libsass/blob/0e6b4a2850092356aa3ece07c6b249f0221caced/functions.cpp#L209\n\t\tvar color1 = mixinColor.rgb();\n\t\tvar color2 = this.rgb();\n\t\tvar p = weight === undefined ? 0.5 : weight;\n\n\t\tvar w = 2 * p - 1;\n\t\tvar a = color1.alpha() - color2.alpha();\n\n\t\tvar w1 = (((w * a === -1) ? w : (w + a) / (1 + w * a)) + 1) / 2.0;\n\t\tvar w2 = 1 - w1;\n\n\t\treturn Color.rgb(\n\t\t\t\tw1 * color1.red() + w2 * color2.red(),\n\t\t\t\tw1 * color1.green() + w2 * color2.green(),\n\t\t\t\tw1 * color1.blue() + w2 * color2.blue(),\n\t\t\t\tcolor1.alpha() * p + color2.alpha() * (1 - p));\n\t}\n};\n\n// model conversion methods and static constructors\nObject.keys(convert).forEach(function (model) {\n\tif (skippedModels.indexOf(model) !== -1) {\n\t\treturn;\n\t}\n\n\tvar channels = convert[model].channels;\n\n\t// conversion methods\n\tColor.prototype[model] = function () {\n\t\tif (this.model === model) {\n\t\t\treturn new Color(this);\n\t\t}\n\n\t\tif (arguments.length) {\n\t\t\treturn new Color(arguments, model);\n\t\t}\n\n\t\tvar newAlpha = typeof arguments[channels] === 'number' ? channels : this.valpha;\n\t\treturn new Color(assertArray(convert[this.model][model].raw(this.color)).concat(newAlpha), model);\n\t};\n\n\t// 'static' construction methods\n\tColor[model] = function (color) {\n\t\tif (typeof color === 'number') {\n\t\t\tcolor = zeroArray(_slice.call(arguments), channels);\n\t\t}\n\t\treturn new Color(color, model);\n\t};\n});\n\nfunction roundTo(num, places) {\n\treturn Number(num.toFixed(places));\n}\n\nfunction roundToPlace(places) {\n\treturn function (num) {\n\t\treturn roundTo(num, places);\n\t};\n}\n\nfunction getset(model, channel, modifier) {\n\tmodel = Array.isArray(model) ? model : [model];\n\n\tmodel.forEach(function (m) {\n\t\t(limiters[m] || (limiters[m] = []))[channel] = modifier;\n\t});\n\n\tmodel = model[0];\n\n\treturn function (val) {\n\t\tvar result;\n\n\t\tif (arguments.length) {\n\t\t\tif (modifier) {\n\t\t\t\tval = modifier(val);\n\t\t\t}\n\n\t\t\tresult = this[model]();\n\t\t\tresult.color[channel] = val;\n\t\t\treturn result;\n\t\t}\n\n\t\tresult = this[model]().color[channel];\n\t\tif (modifier) {\n\t\t\tresult = modifier(result);\n\t\t}\n\n\t\treturn result;\n\t};\n}\n\nfunction maxfn(max) {\n\treturn function (v) {\n\t\treturn Math.max(0, Math.min(max, v));\n\t};\n}\n\nfunction assertArray(val) {\n\treturn Array.isArray(val) ? val : [val];\n}\n\nfunction zeroArray(arr, length) {\n\tfor (var i = 0; i < length; i++) {\n\t\tif (typeof arr[i] !== 'number') {\n\t\t\tarr[i] = 0;\n\t\t}\n\t}\n\n\treturn arr;\n}\n\nmodule.exports = Color;\n\n\n//# sourceURL=webpack:///./node_modules/color/index.js?");

/***/ }),

/***/ "./node_modules/is-arrayish/index.js":
/*!*******************************************!*\
  !*** ./node_modules/is-arrayish/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function isArrayish(obj) {\n\tif (!obj || typeof obj === 'string') {\n\t\treturn false;\n\t}\n\n\treturn obj instanceof Array || Array.isArray(obj) ||\n\t\t(obj.length >= 0 && (obj.splice instanceof Function ||\n\t\t\t(Object.getOwnPropertyDescriptor(obj, (obj.length - 1)) && obj.constructor.name !== 'String')));\n};\n\n\n//# sourceURL=webpack:///./node_modules/is-arrayish/index.js?");

/***/ }),

/***/ "./node_modules/simple-swizzle/index.js":
/*!**********************************************!*\
  !*** ./node_modules/simple-swizzle/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar isArrayish = __webpack_require__(/*! is-arrayish */ \"./node_modules/is-arrayish/index.js\");\n\nvar concat = Array.prototype.concat;\nvar slice = Array.prototype.slice;\n\nvar swizzle = module.exports = function swizzle(args) {\n\tvar results = [];\n\n\tfor (var i = 0, len = args.length; i < len; i++) {\n\t\tvar arg = args[i];\n\n\t\tif (isArrayish(arg)) {\n\t\t\t// http://jsperf.com/javascript-array-concat-vs-push/98\n\t\t\tresults = concat.call(results, slice.call(arg));\n\t\t} else {\n\t\t\tresults.push(arg);\n\t\t}\n\t}\n\n\treturn results;\n};\n\nswizzle.wrap = function (fn) {\n\treturn function () {\n\t\treturn fn(swizzle(arguments));\n\t};\n};\n\n\n//# sourceURL=webpack:///./node_modules/simple-swizzle/index.js?");

/***/ }),

/***/ "./src/bola.js":
/*!*********************!*\
  !*** ./src/bola.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _mouse = __webpack_require__(/*! ./mouse */ \"./src/mouse.js\");\n\nvar _mouse2 = _interopRequireDefault(_mouse);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar GRAVITY = 300;\n\nvar Bola = function () {\n  function Bola(x, y, color) {\n    _classCallCheck(this, Bola);\n\n    this.x = x;\n    this.y = y;\n    this.velX = 100;\n    this.velY = 0;\n    this.color = color;\n  }\n\n  _createClass(Bola, [{\n    key: \"draw\",\n    value: function draw(ctx, world) {\n      ctx.beginPath();\n      ctx.fillStyle = this.color;\n      ctx.arc(this.x, this.y, 30, 0, Math.PI * 2);\n      ctx.fill();\n\n      ctx.closePath();\n    }\n  }, {\n    key: \"changeColor\",\n    value: function changeColor() {\n      if (this.color == \"red\") {\n        this.color = \"green\";\n      } else if (this.color == \"green\") {\n        this.color = \"blue\";\n      } else {\n        this.color = \"red\";\n      }\n    }\n  }, {\n    key: \"update\",\n    value: function update(world) {\n      // this.x += this.velX * world.deltaTime;\n      // this.y += this.velY * world.deltaTime;\n      var velX = this.velX;\n\n      var isOnGround = false;\n\n      if (this.y + 35 > world.height) {\n        isOnGround = true;\n      }\n\n      if (!isOnGround) {\n        velX *= 0.25;\n      }\n\n      this.color = \"green\";\n\n      if (_mouse2.default.key(\"ArrowRight\")) {\n        var movement = velX * world.deltaTime;\n\n        if (this.x + movement + 30 > world.width) {\n          movement = 0;\n        }\n\n        this.x += movement;\n\n        this.color = \"red\";\n      }\n\n      if (_mouse2.default.key(\"ArrowLeft\")) {\n        var movement = -velX * world.deltaTime;\n\n        if (this.x - movement - 30 < 0) {\n          movement = 0;\n        }\n\n        this.x += movement;\n        this.color = \"blue\";\n      }\n      var gravityFactor = GRAVITY;\n\n      if (this.velY > 0) {\n        this.velY -= GRAVITY * world.deltaTime * 2;\n\n        if (_mouse2.default.key(\"Space\")) {\n          gravityFactor *= 0.65;\n        } else if (this.velY < GRAVITY) {\n          gravityFactor *= 1.15;\n        }\n      } else {\n        this.velY = 0;\n      }\n      if (_mouse2.default.key(\"Space\") && isOnGround) {\n        this.velY = 600;\n      }\n\n      var movement = gravityFactor * world.deltaTime;\n      movement += -this.velY * world.deltaTime;\n\n      if (this.y + movement + 30 > world.height) {\n        movement = 0;\n      }\n\n      this.y += movement;\n    }\n  }]);\n\n  return Bola;\n}();\n\nexports.default = Bola;\n\n//# sourceURL=webpack:///./src/bola.js?");

/***/ }),

/***/ "./src/canvas.js":
/*!***********************!*\
  !*** ./src/canvas.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nvar canvas = document.querySelector(\"canvas\");\nvar ctx = canvas.getContext(\"2d\");\n\nfunction clear() {\n  ctx.clearRect(0, 0, canvas.height, canvas.height);\n}\n\nvar world = { deltaTime: 0, lastTime: new Date(), width: canvas.width, height: canvas.height };\n\nfunction draw(action) {\n  world.deltaTime = (new Date().getTime() - world.lastTime.getTime()) / 1000;\n\n  action(ctx, world);\n  requestAnimationFrame(function () {\n    return draw(action);\n  });\n\n  world.lastTime = new Date();\n}\n\nexports.draw = draw;\n\n//# sourceURL=webpack:///./src/canvas.js?");

/***/ }),

/***/ "./src/circle.js":
/*!***********************!*\
  !*** ./src/circle.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Circle = function () {\n  function Circle(speed, top) {\n    _classCallCheck(this, Circle);\n\n    this.elapsed = top ? Math.PI / 3 : 0;\n    this.speed = speed;\n    this.top = top;\n  }\n\n  _createClass(Circle, [{\n    key: \"draw\",\n    value: function draw(ctx, world) {\n      var x = world.xPos + world.width / 2;\n      var y = world.yPos + world.height / 2;\n      var radius = Math.min(world.width, world.height) / 2 * 0.8;\n\n      ctx.beginPath();\n\n      ctx.strokeStyle = \"#eef\";\n      ctx.arc(x, y, radius, 0, Math.PI * 2);\n      ctx.stroke();\n      ctx.closePath();\n\n      this.elapsed += world.deltaTime * this.speed;\n\n      x += Math.sin(this.elapsed) * radius;\n      y += Math.cos(this.elapsed) * radius;\n\n      this.x = x - world.xPos;\n      this.y = y - world.yPos;\n\n      ctx.beginPath();\n      ctx.fillStyle = \"white\";\n      ctx.arc(x, y, 5, 0, Math.PI * 2);\n      ctx.fill();\n      ctx.closePath();\n    }\n  }, {\n    key: \"update\",\n    value: function update(world) {}\n  }]);\n\n  return Circle;\n}();\n\nexports.default = Circle;\n\n//# sourceURL=webpack:///./src/circle.js?");

/***/ }),

/***/ "./src/grid.js":
/*!*********************!*\
  !*** ./src/grid.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Grid = function () {\n  function Grid(rows, cols) {\n    _classCallCheck(this, Grid);\n\n    this.rows = rows;\n    this.cols = cols;\n    this.cells = [];\n    this.deveLimpar = {};\n    this.isBlack = false;\n    window.clls = this.cells;\n    for (var x = 0; x < rows; x++) {\n      var row = [];\n      for (var y = 0; y < cols; y++) {\n        row.push(null);\n      }\n      this.cells.push(row);\n    }\n  }\n\n  _createClass(Grid, [{\n    key: \"add\",\n    value: function add(x, y, obj, deveLimpar) {\n      this.cells[x][y] = obj;\n\n      this.deveLimpar[x + \"-\" + y] = deveLimpar;\n    }\n  }, {\n    key: \"get\",\n    value: function get(x, y) {\n      return this.cells[x][y];\n    }\n  }, {\n    key: \"limpar\",\n    value: function limpar(ctx, world, x, y) {\n      if (!this.deveLimpar[x + \"-\" + y]) return;\n\n      var width = world.width / this.cols;\n      var height = world.height / this.rows;\n\n      ctx.clearRect(x * width, y * height, width, height);\n\n      ctx.beginPath();\n      ctx.fillStyle = \"black\";\n      ctx.rect(x * width, y * height, width, height);\n      ctx.fill();\n      ctx.closePath();\n    }\n  }, {\n    key: \"draw\",\n    value: function draw(ctx, world) {\n      var width = world.width / this.cols;\n      var height = world.height / this.rows;\n\n      if (!this.isBlack) {\n        ctx.beginPath();\n        ctx.fillStyle = \"black\";\n        ctx.rect(0, 0, world.width, world.height);\n        ctx.fill();\n        ctx.closePath();\n        this.isBlack = true;\n      }\n\n      for (var x = 0; x < this.rows; x++) {\n        for (var y = 0; y < this.cols; y++) {\n          var gameObject = this.cells[x][y];\n\n          if (!gameObject) continue;\n          var gameWorld = Object.assign({}, world);\n          gameWorld.x = x;\n          gameWorld.y = y;\n          gameWorld.xPos = x * width;\n          gameWorld.yPos = y * height;\n          gameWorld.width = width;\n          gameWorld.height = height;\n\n          this.limpar(ctx, world, x, y);\n          gameObject.draw(ctx, gameWorld);\n        }\n      }\n      ctx.strokeStyle = \"#334\";\n      for (var y = 1; y < this.rows; y++) {\n        ctx.beginPath();\n        ctx.moveTo(0, y * height);\n        ctx.lineTo(world.width, y * height);\n        ctx.stroke();\n        ctx.closePath();\n      }\n\n      for (var x = 1; x < this.cols; x++) {\n        ctx.beginPath();\n        ctx.moveTo(x * width, 0);\n        ctx.lineTo(x * width, world.height);\n        ctx.stroke();\n        ctx.closePath();\n      }\n    }\n  }]);\n\n  return Grid;\n}();\n\nexports.default = Grid;\n\n//# sourceURL=webpack:///./src/grid.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _canvas = __webpack_require__(/*! ./canvas */ \"./src/canvas.js\");\n\nvar _bola = __webpack_require__(/*! ./bola */ \"./src/bola.js\");\n\nvar _bola2 = _interopRequireDefault(_bola);\n\nvar _circle = __webpack_require__(/*! ./circle */ \"./src/circle.js\");\n\nvar _circle2 = _interopRequireDefault(_circle);\n\nvar _grid = __webpack_require__(/*! ./grid */ \"./src/grid.js\");\n\nvar _grid2 = _interopRequireDefault(_grid);\n\nvar _mirror = __webpack_require__(/*! ./mirror */ \"./src/mirror.js\");\n\nvar _mirror2 = _interopRequireDefault(_mirror);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar cores = [\"red\", \"green\", \"blue\", \"blue\"];\n\nfunction random(min, max) {\n  return Math.round(Math.random() * (max - min) + min);\n}\n\nvar x = 100;\nvar y = 100;\nvar bola = new _bola2.default(x, y, cores[0]);\n\nvar rows = 12;\nvar cols = 12;\n\nvar grid = new _grid2.default(rows, cols);\n\nfor (var _x = 1; _x < rows; _x++) {\n  grid.add(_x, 0, new _circle2.default(_x, true), true);\n}\nfor (var _y = 1; _y < cols; _y++) {\n  grid.add(0, _y, new _circle2.default(_y), true);\n}\n\nfor (var _x2 = 1; _x2 < rows; _x2++) {\n  for (var _y2 = 1; _y2 < cols; _y2++) {\n    grid.add(_x2, _y2, new _mirror2.default(grid.get(_x2, 0), grid.get(0, _y2)), false);\n  }\n}\n\n(0, _canvas.draw)(function (ctx, world) {\n  // draw time\n\n  grid.draw(ctx, world);\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/mirror.js":
/*!***********************!*\
  !*** ./src/mirror.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _color = __webpack_require__(/*! color */ \"./node_modules/color/index.js\");\n\nvar _color2 = _interopRequireDefault(_color);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Mirror = function () {\n  function Mirror(refX, refY) {\n    _classCallCheck(this, Mirror);\n\n    this.refX = refX;\n    this.refY = refY;\n    this.color = _color2.default.rgb(0, 0, 255);\n    this.initColor = false;\n  }\n\n  _createClass(Mirror, [{\n    key: \"draw\",\n    value: function draw(ctx, world) {\n      if (!this.initColor) {\n        this.initColor = true;\n        this.color = this.color.rotate((world.x + world.y) * 6);\n      }\n\n      var x = world.xPos + this.refX.x;\n      var y = world.yPos + this.refY.y;\n\n      ctx.beginPath();\n      ctx.strokeStyle = this.color.toString();\n      ctx.arc(x, y, 1, 0, Math.PI * 2);\n      ctx.stroke();\n      ctx.closePath();\n\n      this.color = this.color.rotate(world.deltaTime * 15);\n    }\n  }]);\n\n  return Mirror;\n}();\n\nexports.default = Mirror;\n\n//# sourceURL=webpack:///./src/mirror.js?");

/***/ }),

/***/ "./src/mouse.js":
/*!**********************!*\
  !*** ./src/mouse.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Mouse = function () {\n  function Mouse() {\n    var _this = this;\n\n    _classCallCheck(this, Mouse);\n\n    this.keys = {};\n\n    document.body.addEventListener(\"keydown\", function (event) {\n      console.log(event);\n      _this.keys[event.code] = true;\n    });\n\n    document.body.addEventListener(\"keyup\", function (event) {\n      _this.keys[event.code] = false;\n    });\n  }\n\n  _createClass(Mouse, [{\n    key: \"key\",\n    value: function key(keyName) {\n      return this.keys[keyName] || false;\n    }\n  }]);\n\n  return Mouse;\n}();\n\nexports.default = new Mouse();\n\n//# sourceURL=webpack:///./src/mouse.js?");

/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./src/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./src/index.js */\"./src/index.js\");\n\n\n//# sourceURL=webpack:///multi_./src/index.js?");

/***/ })

/******/ });