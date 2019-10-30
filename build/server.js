module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var chunk = require("./" + "" + chunkId + "." + hotCurrentHash + ".hot-update.js");
/******/ 		hotAddUpdateChunk(chunk.id, chunk.modules);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest() {
/******/ 		try {
/******/ 			var update = require("./" + "" + hotCurrentHash + ".hot-update.json");
/******/ 		} catch (e) {
/******/ 			return Promise.resolve();
/******/ 		}
/******/ 		return Promise.resolve(update);
/******/ 	}
/******/
/******/ 	//eslint-disable-next-line no-unused-vars
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "051585fb0c7180c2e0b2";
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
/******/ 			var queue = outdatedModules.map(function(id) {
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
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
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
/******/ 		// Now in "apply" phase
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
/******/ 	__webpack_require__.p = "http://localhost:3001/";
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

/***/ "./build/assets.json":
/*!***************************!*\
  !*** ./build/assets.json ***!
  \***************************/
/*! exports provided: client, , default */
/***/ (function(module) {

module.exports = JSON.parse("{\"client\":{\"js\":\"http://localhost:3001/static/js/bundle.js\"},\"\":{\"woff\":[\"http://localhost:3001/static/media/Roboto-Bold.08cb8f79.woff\",\"http://localhost:3001/static/media/Roboto-Light.10ad0f86.woff\",\"http://localhost:3001/static/media/Roboto-Regular.94dac78e.woff\",\"http://localhost:3001/static/media/Roboto-Thin.f09d9b5e.woff\"],\"ttf\":[\"http://localhost:3001/static/media/Roboto-Bold.16d7bb99.ttf\",\"http://localhost:3001/static/media/Roboto-Light.2382fa8a.ttf\",\"http://localhost:3001/static/media/Roboto-Regular.4312f1fb.ttf\",\"http://localhost:3001/static/media/Roboto-Thin.0f5cc8c0.ttf\"],\"eot\":[\"http://localhost:3001/static/media/Roboto-Bold.4a1d8c27.eot\",\"http://localhost:3001/static/media/Roboto-Light.35d85034.eot\",\"http://localhost:3001/static/media/Roboto-Regular.b9077621.eot\",\"http://localhost:3001/static/media/Roboto-Thin.307ba414.eot\"],\"svg\":[\"http://localhost:3001/static/media/close-button.e8edf079.svg\",\"http://localhost:3001/static/media/right-arrow.7560c252.svg\"],\"png\":\"http://localhost:3001/static/media/menu-bg.837f662d.png\"}}");

/***/ }),

/***/ "./node_modules/webpack/hot/log-apply-result.js":
/*!*****************************************!*\
  !*** (webpack)/hot/log-apply-result.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
module.exports = function(updatedModules, renewedModules) {
	var unacceptedModules = updatedModules.filter(function(moduleId) {
		return renewedModules && renewedModules.indexOf(moduleId) < 0;
	});
	var log = __webpack_require__(/*! ./log */ "./node_modules/webpack/hot/log.js");

	if (unacceptedModules.length > 0) {
		log(
			"warning",
			"[HMR] The following modules couldn't be hot updated: (They would need a full reload!)"
		);
		unacceptedModules.forEach(function(moduleId) {
			log("warning", "[HMR]  - " + moduleId);
		});
	}

	if (!renewedModules || renewedModules.length === 0) {
		log("info", "[HMR] Nothing hot updated.");
	} else {
		log("info", "[HMR] Updated modules:");
		renewedModules.forEach(function(moduleId) {
			if (typeof moduleId === "string" && moduleId.indexOf("!") !== -1) {
				var parts = moduleId.split("!");
				log.groupCollapsed("info", "[HMR]  - " + parts.pop());
				log("info", "[HMR]  - " + moduleId);
				log.groupEnd("info");
			} else {
				log("info", "[HMR]  - " + moduleId);
			}
		});
		var numberIds = renewedModules.every(function(moduleId) {
			return typeof moduleId === "number";
		});
		if (numberIds)
			log(
				"info",
				"[HMR] Consider using the NamedModulesPlugin for module names."
			);
	}
};


/***/ }),

/***/ "./node_modules/webpack/hot/log.js":
/*!****************************!*\
  !*** (webpack)/hot/log.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

var logLevel = "info";

function dummy() {}

function shouldLog(level) {
	var shouldLog =
		(logLevel === "info" && level === "info") ||
		(["info", "warning"].indexOf(logLevel) >= 0 && level === "warning") ||
		(["info", "warning", "error"].indexOf(logLevel) >= 0 && level === "error");
	return shouldLog;
}

function logGroup(logFn) {
	return function(level, msg) {
		if (shouldLog(level)) {
			logFn(msg);
		}
	};
}

module.exports = function(level, msg) {
	if (shouldLog(level)) {
		if (level === "info") {
			console.log(msg);
		} else if (level === "warning") {
			console.warn(msg);
		} else if (level === "error") {
			console.error(msg);
		}
	}
};

/* eslint-disable node/no-unsupported-features/node-builtins */
var group = console.group || dummy;
var groupCollapsed = console.groupCollapsed || dummy;
var groupEnd = console.groupEnd || dummy;
/* eslint-enable node/no-unsupported-features/node-builtins */

module.exports.group = logGroup(group);

module.exports.groupCollapsed = logGroup(groupCollapsed);

module.exports.groupEnd = logGroup(groupEnd);

module.exports.setLogLevel = function(level) {
	logLevel = level;
};

module.exports.formatError = function(err) {
	var message = err.message;
	var stack = err.stack;
	if (!stack) {
		return message;
	} else if (stack.indexOf(message) < 0) {
		return message + "\n" + stack;
	} else {
		return stack;
	}
};


/***/ }),

/***/ "./node_modules/webpack/hot/poll.js?300":
/*!*********************************!*\
  !*** (webpack)/hot/poll.js?300 ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__resourceQuery) {/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
/*globals __resourceQuery */
if (true) {
	var hotPollInterval = +__resourceQuery.substr(1) || 10 * 60 * 1000;
	var log = __webpack_require__(/*! ./log */ "./node_modules/webpack/hot/log.js");

	var checkForUpdate = function checkForUpdate(fromUpdate) {
		if (module.hot.status() === "idle") {
			module.hot
				.check(true)
				.then(function(updatedModules) {
					if (!updatedModules) {
						if (fromUpdate) log("info", "[HMR] Update applied.");
						return;
					}
					__webpack_require__(/*! ./log-apply-result */ "./node_modules/webpack/hot/log-apply-result.js")(updatedModules, updatedModules);
					checkForUpdate(true);
				})
				.catch(function(err) {
					var status = module.hot.status();
					if (["abort", "fail"].indexOf(status) >= 0) {
						log("warning", "[HMR] Cannot apply update.");
						log("warning", "[HMR] " + log.formatError(err));
						log("warning", "[HMR] You need to restart the application!");
					} else {
						log("warning", "[HMR] Update failed: " + log.formatError(err));
					}
				});
		}
	};
	setInterval(checkForUpdate, hotPollInterval);
} else {}

/* WEBPACK VAR INJECTION */}.call(this, "?300"))

/***/ }),

/***/ "./src/client/App.js":
/*!***************************!*\
  !*** ./src/client/App.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _website__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./website */ "./src/client/website/index.js");
/* harmony import */ var _admin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./admin */ "./src/client/admin/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_3__);
var _jsxFileName = "C:\\Users\\simpl\\OneDrive\\\u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B\\Node JS Projects\\webapp-admin\\src\\client\\App.js";




/* harmony default export */ __webpack_exports__["default"] = (function () {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Switch"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Route"], {
    path: "/admin-panel",
    component: _admin__WEBPACK_IMPORTED_MODULE_2__["default"],
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    }
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Route"], {
    path: "/:language?",
    component: _website__WEBPACK_IMPORTED_MODULE_1__["default"],
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    }
  }));
});

/***/ }),

/***/ "./src/client/admin/App.js":
/*!*********************************!*\
  !*** ./src/client/admin/App.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom_Route__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom/Route */ "react-router-dom/Route");
/* harmony import */ var react_router_dom_Route__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_router_dom_Route__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom_Switch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom/Switch */ "react-router-dom/Switch");
/* harmony import */ var react_router_dom_Switch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_router_dom_Switch__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _containers_dashboard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./containers/dashboard */ "./src/client/admin/containers/dashboard/index.js");
/* harmony import */ var _containers_glossary__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./containers/glossary */ "./src/client/admin/containers/glossary/index.js");
/* harmony import */ var _components_layout__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/layout */ "./src/client/admin/components/layout/index.js");
/* harmony import */ var _styles_fonts_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./styles/fonts.scss */ "./src/client/admin/styles/fonts.scss");
/* harmony import */ var _styles_fonts_scss__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_styles_fonts_scss__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _styles_app_scss__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./styles/app.scss */ "./src/client/admin/styles/app.scss");
/* harmony import */ var _styles_app_scss__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_styles_app_scss__WEBPACK_IMPORTED_MODULE_7__);
var _jsxFileName = "C:\\Users\\simpl\\OneDrive\\\u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B\\Node JS Projects\\webapp-admin\\src\\client\\admin\\App.js";









var App = function App() {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_layout__WEBPACK_IMPORTED_MODULE_5__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom_Switch__WEBPACK_IMPORTED_MODULE_2___default.a, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom_Route__WEBPACK_IMPORTED_MODULE_1___default.a, {
    exact: true,
    path: "/admin-panel/",
    component: _containers_dashboard__WEBPACK_IMPORTED_MODULE_3__["default"],
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19
    }
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom_Route__WEBPACK_IMPORTED_MODULE_1___default.a, {
    exact: true,
    path: "/admin-panel/glossary",
    component: _containers_glossary__WEBPACK_IMPORTED_MODULE_4__["default"],
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20
    }
  })));
};

/* harmony default export */ __webpack_exports__["default"] = (App);

/***/ }),

/***/ "./src/client/admin/components/article-card/index.js":
/*!***********************************************************!*\
  !*** ./src/client/admin/components/article-card/index.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "@babel/runtime/helpers/extends");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ "@babel/runtime/helpers/objectWithoutProperties");
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./styles.scss */ "./src/client/admin/components/article-card/styles.scss");
/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_scss__WEBPACK_IMPORTED_MODULE_3__);


var _jsxFileName = "C:\\Users\\simpl\\OneDrive\\\u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B\\Node JS Projects\\webapp-admin\\src\\client\\admin\\components\\article-card\\index.js";



var parseDate = function parseDate(date) {
  if (typeof date !== 'string') return '';
  return new Date(date).toLocaleDateString();
};

var ArticleCard = function ArticleCard(_ref) {
  var title = _ref.title,
      date = _ref.date,
      rest = _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1___default()(_ref, ["title", "date"]);

  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({
    className: "article-card"
  }, rest, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17
    }
  }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "article-card__title",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18
    }
  }, title), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "article-card__date",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20
    }
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21
    }
  }, "\u041E\u043F\u0443\u0431\u043B\u0438\u043A\u043E\u0432\u0430\u043D\u043E: "), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    }
  }, parseDate(date))));
};

/* harmony default export */ __webpack_exports__["default"] = (ArticleCard);

/***/ }),

/***/ "./src/client/admin/components/article-card/styles.scss":
/*!**************************************************************!*\
  !*** ./src/client/admin/components/article-card/styles.scss ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./src/client/admin/components/dropdown/index.js":
/*!*******************************************************!*\
  !*** ./src/client/admin/components/dropdown/index.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "@babel/runtime/helpers/slicedToArray");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "classnames");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./styles.scss */ "./src/client/admin/components/dropdown/styles.scss");
/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_scss__WEBPACK_IMPORTED_MODULE_3__);

var _jsxFileName = "C:\\Users\\simpl\\OneDrive\\\u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B\\Node JS Projects\\webapp-admin\\src\\client\\admin\\components\\dropdown\\index.js";




var Dropdown = function Dropdown(_ref) {
  var className = _ref.className,
      controlledValue = _ref.value,
      defaultValue = _ref.defaultValue,
      label = _ref.label,
      options = _ref.options,
      _ref$disabled = _ref.disabled,
      disabled = _ref$disabled === void 0 ? false : _ref$disabled,
      onChange = _ref.onChange;

  if (defaultValue) {
    var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(defaultValue),
        _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState, 2),
        valueState = _useState2[0],
        setValue = _useState2[1];
  }

  var handleChange = function handleChange(e) {
    var value = e.target.value;

    if (defaultValue) {
      setValue(value);
    }

    typeof onChange === 'function' && onChange(value);
  };

  var value = controlledValue || valueState;
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()('dropdown', className),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25
    }
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("label", {
    className: "dropdown__label",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26
    }
  }, label), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("select", {
    className: "dropdown__select",
    onChange: handleChange,
    value: value,
    disabled: disabled,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27
    }
  }, options && options.map(function (option, idx) {
    var key = option.key,
        label = option.value;
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("option", {
      key: 'option-' + idx,
      value: key,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 30
      }
    }, label);
  })));
};

/* harmony default export */ __webpack_exports__["default"] = (Dropdown);

/***/ }),

/***/ "./src/client/admin/components/dropdown/styles.scss":
/*!**********************************************************!*\
  !*** ./src/client/admin/components/dropdown/styles.scss ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./src/client/admin/components/header/index.js":
/*!*****************************************************!*\
  !*** ./src/client/admin/components/header/index.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "classnames");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./styles.scss */ "./src/client/admin/components/header/styles.scss");
/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_scss__WEBPACK_IMPORTED_MODULE_2__);



/* harmony default export */ __webpack_exports__["default"] = (function (_ref) {
  var title = _ref.title,
      level = _ref.level,
      className = _ref.className;
  var effectiveLevel = 6;

  if (typeof level === 'number' && 1 <= level && level <= 6) {
    effectiveLevel = level;
  }

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h" + effectiveLevel, {
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('header', className)
  }, title.toString());
});

/***/ }),

/***/ "./src/client/admin/components/header/styles.scss":
/*!********************************************************!*\
  !*** ./src/client/admin/components/header/styles.scss ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./src/client/admin/components/input/index.js":
/*!****************************************************!*\
  !*** ./src/client/admin/components/input/index.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "@babel/runtime/helpers/extends");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "classnames");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./styles.scss */ "./src/client/admin/components/input/styles.scss");
/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_scss__WEBPACK_IMPORTED_MODULE_3__);

var _jsxFileName = "C:\\Users\\simpl\\OneDrive\\\u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B\\Node JS Projects\\webapp-admin\\src\\client\\admin\\components\\input\\index.js";



var Type = {
  Warning: 'warning',
  Error: 'error'
};
/* harmony default export */ __webpack_exports__["default"] = (function (props) {
  var status = props.status;
  var modifier = '';

  switch (status) {
    case Type.Warning:
      modifier = 'input--warning';
      break;

    case Type.Error:
      modifier = 'input--error';
      break;

    default:
      break;
  }

  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("input", _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, props, {
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()('input', props.className, modifier),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25
    }
  }));
});

/***/ }),

/***/ "./src/client/admin/components/input/styles.scss":
/*!*******************************************************!*\
  !*** ./src/client/admin/components/input/styles.scss ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./src/client/admin/components/layout/index.js":
/*!*****************************************************!*\
  !*** ./src/client/admin/components/layout/index.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "@babel/runtime/helpers/defineProperty");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "@babel/runtime/helpers/slicedToArray");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _menu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../menu */ "./src/client/admin/components/menu/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! classnames */ "classnames");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./styles.scss */ "./src/client/admin/components/layout/styles.scss");
/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_styles_scss__WEBPACK_IMPORTED_MODULE_5__);


var _jsxFileName = "C:\\Users\\simpl\\OneDrive\\\u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B\\Node JS Projects\\webapp-admin\\src\\client\\admin\\components\\layout\\index.js";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }






var Layout = function Layout(_ref) {
  var children = _ref.children;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])({
    mobileOverlay: false
  }),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];

  var modifier = state.mobileOverlay ? 'layout--mobile-overlayed' : '';
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: classnames__WEBPACK_IMPORTED_MODULE_4___default()('layout', modifier),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    }
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "layout__side-view",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17
    }
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_menu__WEBPACK_IMPORTED_MODULE_3__["default"], {
    enabled: state,
    onClose: function onClose() {
      return setState(_objectSpread({}, state, {
        mobileOverlay: false
      }));
    },
    onToggle: function onToggle() {
      return setState(_objectSpread({}, state, {
        mobileOverlay: !state.mobileOverlay
      }));
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18
    }
  })), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "layout__main-view",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26
    }
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "layout__container-main",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27
    }
  }, children)));
};

/* harmony default export */ __webpack_exports__["default"] = (Layout);

/***/ }),

/***/ "./src/client/admin/components/layout/styles.scss":
/*!********************************************************!*\
  !*** ./src/client/admin/components/layout/styles.scss ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./src/client/admin/components/list/__group/index.js":
/*!***********************************************************!*\
  !*** ./src/client/admin/components/list/__group/index.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "@babel/runtime/helpers/extends");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ "@babel/runtime/helpers/objectWithoutProperties");
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _header__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../header */ "./src/client/admin/components/header/index.js");
/* harmony import */ var _layout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../__layout */ "./src/client/admin/components/list/__layout/index.js");
/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./styles.scss */ "./src/client/admin/components/list/__group/styles.scss");
/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_styles_scss__WEBPACK_IMPORTED_MODULE_5__);


var _jsxFileName = "C:\\Users\\simpl\\OneDrive\\\u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B\\Node JS Projects\\webapp-admin\\src\\client\\admin\\components\\list\\__group\\index.js";





var Group = function Group(_ref) {
  var title = _ref.title,
      children = _ref.children,
      items = _ref.items,
      _ref$layoutType = _ref.layoutType,
      layoutType = _ref$layoutType === void 0 ? 'linear' : _ref$layoutType,
      rest = _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1___default()(_ref, ["title", "children", "items", "layoutType"]);

  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({
    className: "grouped-items"
  }, rest, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    }
  }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_header__WEBPACK_IMPORTED_MODULE_3__["default"], {
    level: 4,
    className: "grouped-items__title",
    title: title,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    }
  }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_layout__WEBPACK_IMPORTED_MODULE_4__["default"], {
    type: layoutType,
    className: "grouped-items__layout",
    children: children,
    items: items,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    }
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (Group);

/***/ }),

/***/ "./src/client/admin/components/list/__group/styles.scss":
/*!**************************************************************!*\
  !*** ./src/client/admin/components/list/__group/styles.scss ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./src/client/admin/components/list/__layout/index.js":
/*!************************************************************!*\
  !*** ./src/client/admin/components/list/__layout/index.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "@babel/runtime/helpers/slicedToArray");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "classnames");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./styles.scss */ "./src/client/admin/components/list/__layout/styles.scss");
/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_scss__WEBPACK_IMPORTED_MODULE_3__);

var _jsxFileName = "C:\\Users\\simpl\\OneDrive\\\u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B\\Node JS Projects\\webapp-admin\\src\\client\\admin\\components\\list\\__layout\\index.js";




var setLayoutType = function setLayoutType(type) {
  switch (type) {
    case 'grid':
      return 'layout--grid';

    case 'linear':
    default:
      return 'layout--linear';
  }
};

var Layout = function Layout(_ref) {
  var items = _ref.items,
      type = _ref.type,
      children = _ref.children,
      className = _ref.className;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(false),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState, 2),
      loaded = _useState2[0],
      setLoaded = _useState2[1];

  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    setLoaded(true);
  }, []);
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()('layout', className, setLayoutType(type)),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24
    }
  }, items && items.map(function (item, idx) {
    var delay = idx * .1;
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: classnames__WEBPACK_IMPORTED_MODULE_2___default()('layout__item', loaded && 'layout__item--loaded'),
      style: {
        transitionDelay: "".concat(delay, "s")
      },
      key: idx,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 30
      }
    }, children(item));
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (Layout);

/***/ }),

/***/ "./src/client/admin/components/list/__layout/styles.scss":
/*!***************************************************************!*\
  !*** ./src/client/admin/components/list/__layout/styles.scss ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./src/client/admin/components/list/__options/index.js":
/*!*************************************************************!*\
  !*** ./src/client/admin/components/list/__options/index.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "classnames");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _input__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../input */ "./src/client/admin/components/input/index.js");
/* harmony import */ var _dropdown__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../dropdown */ "./src/client/admin/components/dropdown/index.js");
/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./styles.scss */ "./src/client/admin/components/list/__options/styles.scss");
/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_styles_scss__WEBPACK_IMPORTED_MODULE_4__);
var _jsxFileName = "C:\\Users\\simpl\\OneDrive\\\u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B\\Node JS Projects\\webapp-admin\\src\\client\\admin\\components\\list\\__options\\index.js";






var ListOptions = function ListOptions(_ref) {
  var className = _ref.className,
      options = _ref.options,
      _ref$optionValues = _ref.optionValues,
      optionValues = _ref$optionValues === void 0 ? {} : _ref$optionValues,
      onGroupChange = _ref.onGroupChange,
      onSortChange = _ref.onSortChange,
      onFilterChange = _ref.onFilterChange;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('options', className),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "options__left",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_dropdown__WEBPACK_IMPORTED_MODULE_3__["default"], {
    value: optionValues.group,
    className: "options__group",
    label: "\u0413\u0440\u0443\u043F\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043F\u043E:",
    options: options.group,
    onChange: function onChange(key) {
      return onGroupChange(key);
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    }
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_dropdown__WEBPACK_IMPORTED_MODULE_3__["default"], {
    value: optionValues.sort,
    className: "options__sort",
    label: "\u0421\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043F\u043E:",
    options: options.sort,
    onChange: function onChange(key) {
      return onSortChange(key);
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    }
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "options__right",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_input__WEBPACK_IMPORTED_MODULE_2__["default"], {
    placeholder: "\u043F\u043E\u0438\u0441\u043A",
    className: "options__filter",
    onChange: function onChange(e) {
      return onFilterChange(e.target.value);
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18
    }
  })));
};

/* harmony default export */ __webpack_exports__["default"] = (ListOptions);

/***/ }),

/***/ "./src/client/admin/components/list/__options/styles.scss":
/*!****************************************************************!*\
  !*** ./src/client/admin/components/list/__options/styles.scss ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./src/client/admin/components/list/index.js":
/*!***************************************************!*\
  !*** ./src/client/admin/components/list/index.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "classnames");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _options__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./__options */ "./src/client/admin/components/list/__options/index.js");
/* harmony import */ var _group__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./__group */ "./src/client/admin/components/list/__group/index.js");
/* harmony import */ var _layout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./__layout */ "./src/client/admin/components/list/__layout/index.js");
var _jsxFileName = "C:\\Users\\simpl\\OneDrive\\\u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B\\Node JS Projects\\webapp-admin\\src\\client\\admin\\components\\list\\index.js";






var List = function List(_ref) {
  var className = _ref.className,
      optionValues = _ref.optionValues,
      options = _ref.options,
      children = _ref.children,
      items = _ref.items,
      _ref$layoutType = _ref.layoutType,
      layoutType = _ref$layoutType === void 0 ? 'linear' : _ref$layoutType,
      onGroupChange = _ref.onGroupChange,
      onSortChange = _ref.onSortChange,
      onFilterChange = _ref.onFilterChange;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('list-view', className),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    }
  }, options && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_options__WEBPACK_IMPORTED_MODULE_2__["default"], {
    className: "list-view__options",
    optionValues: optionValues,
    options: options,
    onGroupChange: onGroupChange,
    onSortChange: onSortChange,
    onFilterChange: onFilterChange,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17
    }
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_layout__WEBPACK_IMPORTED_MODULE_4__["default"], {
    className: "list-view__layout",
    type: layoutType,
    children: children,
    items: items,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27
    }
  }));
};

List.Layout = _layout__WEBPACK_IMPORTED_MODULE_4__["default"];
List.Group = _group__WEBPACK_IMPORTED_MODULE_3__["default"];
/* harmony default export */ __webpack_exports__["default"] = (List);

/***/ }),

/***/ "./src/client/admin/components/menu/__close-button/index.js":
/*!******************************************************************!*\
  !*** ./src/client/admin/components/menu/__close-button/index.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles.scss */ "./src/client/admin/components/menu/__close-button/styles.scss");
/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_scss__WEBPACK_IMPORTED_MODULE_1__);
var _jsxFileName = "C:\\Users\\simpl\\OneDrive\\\u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B\\Node JS Projects\\webapp-admin\\src\\client\\admin\\components\\menu\\__close-button\\index.js";


/* harmony default export */ __webpack_exports__["default"] = (function (_ref) {
  var onClick = _ref.onClick;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "menu__close-button",
    onClick: onClick,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 5
    }
  });
});

/***/ }),

/***/ "./src/client/admin/components/menu/__close-button/styles.scss":
/*!*********************************************************************!*\
  !*** ./src/client/admin/components/menu/__close-button/styles.scss ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./src/client/admin/components/menu/__link/index.js":
/*!**********************************************************!*\
  !*** ./src/client/admin/components/menu/__link/index.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./styles.scss */ "./src/client/admin/components/menu/__link/styles.scss");
/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_scss__WEBPACK_IMPORTED_MODULE_2__);
var _jsxFileName = "C:\\Users\\simpl\\OneDrive\\\u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B\\Node JS Projects\\webapp-admin\\src\\client\\admin\\components\\menu\\__link\\index.js";



/* harmony default export */ __webpack_exports__["default"] = (function (_ref) {
  var to = _ref.to,
      text = _ref.text;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "menu__item",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["NavLink"], {
    className: "menu__link",
    exact: true,
    to: to,
    activeClassName: "menu__link--active",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    }
  }, text));
});

/***/ }),

/***/ "./src/client/admin/components/menu/__link/styles.scss":
/*!*************************************************************!*\
  !*** ./src/client/admin/components/menu/__link/styles.scss ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./src/client/admin/components/menu/__logo/index.js":
/*!**********************************************************!*\
  !*** ./src/client/admin/components/menu/__logo/index.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles.scss */ "./src/client/admin/components/menu/__logo/styles.scss");
/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_scss__WEBPACK_IMPORTED_MODULE_1__);
var _jsxFileName = "C:\\Users\\simpl\\OneDrive\\\u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B\\Node JS Projects\\webapp-admin\\src\\client\\admin\\components\\menu\\__logo\\index.js";


/* harmony default export */ __webpack_exports__["default"] = (function () {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "menu__logo",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 5
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("svg", {
    viewBox: "0 0 134 45",
    className: "menu__logo-svg",
    xmlns: "http://www.w3.org/2000/svg",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("title", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    }
  }, "\u0418\u043D\u0442\u0435\u0440\u043D\u0435\u0442-\u044D\u043A\u0432\u0430\u0439\u0440\u0438\u043D\u0433 Payture"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("g", {
    fillRule: "evenodd",
    style: {
      fill: "rgb(255, 255, 255)"
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
    d: "M47.06,185.37a10.81,10.81,0,0,1,.07,3.48,8,8,0,0,1-1.07,3,7.17,7.17,0,0,1-2.28,2.29,9.5,9.5,0,0,1-3.55,1.31l-4.11.72L38,206.95l-4.59.81-4.95-28,8.46-1.49a11.38,11.38,0,0,1,3.64-.1,7.29,7.29,0,0,1,3,1.12,7.11,7.11,0,0,1,2.21,2.39A11.25,11.25,0,0,1,47.06,185.37Zm-4.57.7a4.64,4.64,0,0,0-1.57-3,4,4,0,0,0-3.26-.56l-3.83.68,1.53,8.66,3.87-.68a3.8,3.8,0,0,0,2.83-1.72A4.9,4.9,0,0,0,42.49,186.07Z",
    transform: "translate(-28.48 -170.81)",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    }
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
    d: "M58.39,208.51l-7.78-1.37q-0.15.35-.54,1.15T49.26,210l-0.8,1.73q-0.37.81-.56,1.15L43.1,212l13-26.62,4.43,0.78,3.19,29.49-4.88-.86Zm-3.6-10.69-2.45,5.39,5.72,1-0.42-5.85q0-.38,0-1.26t-0.09-1.84q-0.06-1-.11-1.83a10.72,10.72,0,0,1,0-1.23l-0.2,0Z",
    transform: "translate(-28.48 -170.81)",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    }
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
    d: "M69.12,184.2q0.2-1.45.45-2.86t0.49-2.87l1.34-6.8,4.88-.86L72.1,188.66l2,11.45-4.51.8-2-11.45-10-15.39,5-.88q0.9,1.55,1.8,3t1.76,3l1.38,2.5,1.38,2.5Z",
    transform: "translate(-28.48 -170.81)",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    }
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
    d: "M89.13,183.89l-4.21,23.86-4.59-.81,4.21-23.86L78.37,182l0.74-4.19,17,3L95.34,185Z",
    transform: "translate(-28.48 -170.81)",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    }
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
    d: "M112.5,185.71l3.45,19.55a10.3,10.3,0,0,1,0,3.76,7.75,7.75,0,0,1-1.29,3.07,8,8,0,0,1-2.41,2.21,10.6,10.6,0,0,1-7.29,1.18,7.62,7.62,0,0,1-3-1.44,8.23,8.23,0,0,1-2.11-2.56,11.12,11.12,0,0,1-1.16-3.39l-3.41-19.34,4.59-.81,3.43,19.47a4.9,4.9,0,0,0,1.57,2.92,3.71,3.71,0,0,0,3.27.75,3.85,3.85,0,0,0,2.61-1.6,4.12,4.12,0,0,0,.58-3.2l-3.48-19.75Z",
    transform: "translate(-28.48 -170.81)",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    }
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
    d: "M130.2,201.13l-2.13-12.43-3.59-.63-2.06,11.69-4.59-.81,4.95-28,9,1.59a10.17,10.17,0,0,1,3.14,1.07,6.8,6.8,0,0,1,3.52,4.78,9.6,9.6,0,0,1,0,3.63,9.1,9.1,0,0,1-1.94,4.4,7.3,7.3,0,0,1-3.86,2.35l2.6,13.3Zm3.73-20a3.9,3.9,0,0,0-.49-3.1,4.15,4.15,0,0,0-2.73-1.46l-4.07-.72-1.41,8,4,0.71a4,4,0,0,0,3.07-.54A4.23,4.23,0,0,0,133.93,181.18Z",
    transform: "translate(-28.48 -170.81)",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    }
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
    d: "M146.49,208.53l-4.95-28,15.6-2.75L157.9,182l-11,1.94,1.32,7.5,9.47-1.67,0.74,4.19L149,195.63l1.36,7.74,11-1.94,0.77,4.35Z",
    transform: "translate(-28.48 -170.81)",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    }
  }))));
});

/***/ }),

/***/ "./src/client/admin/components/menu/__logo/styles.scss":
/*!*************************************************************!*\
  !*** ./src/client/admin/components/menu/__logo/styles.scss ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./src/client/admin/components/menu/__toggle-arrow/index.js":
/*!******************************************************************!*\
  !*** ./src/client/admin/components/menu/__toggle-arrow/index.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles.scss */ "./src/client/admin/components/menu/__toggle-arrow/styles.scss");
/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_scss__WEBPACK_IMPORTED_MODULE_1__);
var _jsxFileName = "C:\\Users\\simpl\\OneDrive\\\u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B\\Node JS Projects\\webapp-admin\\src\\client\\admin\\components\\menu\\__toggle-arrow\\index.js";


/* harmony default export */ __webpack_exports__["default"] = (function (_ref) {
  var onClick = _ref.onClick;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "menu__toggle-arrow",
    onClick: onClick,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 5
    }
  });
});

/***/ }),

/***/ "./src/client/admin/components/menu/__toggle-arrow/styles.scss":
/*!*********************************************************************!*\
  !*** ./src/client/admin/components/menu/__toggle-arrow/styles.scss ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./src/client/admin/components/menu/index.js":
/*!***************************************************!*\
  !*** ./src/client/admin/components/menu/index.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _logo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./__logo */ "./src/client/admin/components/menu/__logo/index.js");
/* harmony import */ var _toggle_arrow__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./__toggle-arrow */ "./src/client/admin/components/menu/__toggle-arrow/index.js");
/* harmony import */ var _close_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./__close-button */ "./src/client/admin/components/menu/__close-button/index.js");
/* harmony import */ var _link__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./__link */ "./src/client/admin/components/menu/__link/index.js");
/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./styles.scss */ "./src/client/admin/components/menu/styles.scss");
/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_styles_scss__WEBPACK_IMPORTED_MODULE_5__);
var _jsxFileName = "C:\\Users\\simpl\\OneDrive\\\u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B\\Node JS Projects\\webapp-admin\\src\\client\\admin\\components\\menu\\index.js";







var Menu = function Menu(_ref) {
  var enabled = _ref.enabled,
      onToggle = _ref.onToggle,
      onClose = _ref.onClose;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "menu",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_close_button__WEBPACK_IMPORTED_MODULE_3__["default"], {
    onClick: onClose,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17
    }
  }), enabled ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_logo__WEBPACK_IMPORTED_MODULE_1__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20
    }
  }) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_toggle_arrow__WEBPACK_IMPORTED_MODULE_2__["default"], {
    onClick: onToggle,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20
    }
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("nav", {
    className: "menu__nav",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_link__WEBPACK_IMPORTED_MODULE_4__["default"], {
    to: "/admin-panel",
    text: "\u0413\u043B\u0430\u0432\u043D\u0430\u044F",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24
    }
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_link__WEBPACK_IMPORTED_MODULE_4__["default"], {
    to: "/admin-panel/glossary",
    text: "\u0413\u043B\u043E\u0441\u0441\u0430\u0440\u0438\u0439",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25
    }
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_link__WEBPACK_IMPORTED_MODULE_4__["default"], {
    to: "/admin-panel/test",
    text: "\u0422\u0435\u0441\u0442\u043E\u0432\u0430\u044F",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26
    }
  })));
};

/* harmony default export */ __webpack_exports__["default"] = (Menu);

/***/ }),

/***/ "./src/client/admin/components/menu/styles.scss":
/*!******************************************************!*\
  !*** ./src/client/admin/components/menu/styles.scss ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./src/client/admin/containers/dashboard/index.js":
/*!********************************************************!*\
  !*** ./src/client/admin/containers/dashboard/index.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/layout */ "./src/client/admin/components/layout/index.js");
var _jsxFileName = "C:\\Users\\simpl\\OneDrive\\\u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B\\Node JS Projects\\webapp-admin\\src\\client\\admin\\containers\\dashboard\\index.js";


/* harmony default export */ __webpack_exports__["default"] = (function (props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8
    }
  }, "Dashboard");
});

/***/ }),

/***/ "./src/client/admin/containers/glossary/index.js":
/*!*******************************************************!*\
  !*** ./src/client/admin/containers/glossary/index.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "@babel/runtime/helpers/possibleConstructorReturn");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "@babel/runtime/helpers/getPrototypeOf");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "@babel/runtime/helpers/inherits");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "@babel/runtime/helpers/slicedToArray");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! redux */ "redux");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(redux__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-redux */ "react-redux");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _store_glossary_actions__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../store/glossary/actions */ "./src/client/admin/store/glossary/actions.js");
/* harmony import */ var _components_list__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../components/list */ "./src/client/admin/components/list/index.js");
/* harmony import */ var _components_article_card__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../components/article-card */ "./src/client/admin/components/article-card/index.js");






var _jsxFileName = "C:\\Users\\simpl\\OneDrive\\\u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B\\Node JS Projects\\webapp-admin\\src\\client\\admin\\containers\\glossary\\index.js";






var options = {
  group: [{
    key: 'title',
    value: 'названию'
  }, {
    key: 'creationDate',
    value: 'дате создания'
  }],
  sort: [{
    key: 'asc',
    value: 'возрастанию'
  }, {
    key: 'desc',
    value: 'убыванию'
  }]
};

var formatTitle = function formatTitle(title, groupKey) {
  switch (groupKey) {
    case 'creationDate':
    case 'lastEditDate':
      {
        if (title === 'unknown_date') return title;
        var names = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Ноябрь', 'Декабрь'];

        var _title$split = title.split('/'),
            _title$split2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_5___default()(_title$split, 2),
            month = _title$split2[0],
            year = _title$split2[1];

        return "".concat(names[month].toLowerCase(), " ").concat(year, " \u0433.");
      }

    default:
      return title;
  }
};

var Test = function Test(_ref) {
  var group = _ref.group,
      filter = _ref.filter,
      sort = _ref.sort,
      groups = _ref.items,
      getArticleList = _ref.getArticleList,
      handleGroupChange = _ref.handleGroupChange,
      handleFilterChange = _ref.handleFilterChange,
      handleSortChange = _ref.handleSortChange;
  Object(react__WEBPACK_IMPORTED_MODULE_6__["useEffect"])(function () {
    getArticleList(filter, group, sort);
  }, [group, filter, sort]);
  return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("div", {
    className: "glossary",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 49
    }
  }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_components_list__WEBPACK_IMPORTED_MODULE_10__["default"], {
    items: groups,
    options: options,
    onGroupChange: handleGroupChange,
    onFilterChange: handleFilterChange,
    onSortChange: handleSortChange,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 51
    }
  }, function (g) {
    return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_components_list__WEBPACK_IMPORTED_MODULE_10__["default"].Group, {
      items: g.items,
      title: formatTitle(g.title, group),
      layoutType: "grid",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 58
      }
    }, function (item) {
      return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_components_article_card__WEBPACK_IMPORTED_MODULE_11__["default"], {
        title: item.title,
        date: item.lastEditDate,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 59
        }
      });
    });
  }));
};

var GlossaryContainer =
/*#__PURE__*/
function (_React$Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(GlossaryContainer, _React$Component);

  function GlossaryContainer() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, GlossaryContainer);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(GlossaryContainer).apply(this, arguments));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(GlossaryContainer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          group = _this$props.group,
          filter = _this$props.filter,
          sort = _this$props.sort,
          getArticleList = _this$props.getArticleList;
      getArticleList(filter, group, sort);
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      var _this$props2 = this.props,
          group = _this$props2.group,
          filter = _this$props2.filter,
          sort = _this$props2.sort,
          items = _this$props2.items;
      var nextGroup = nextProps.group,
          nextFilter = nextProps.filter,
          nextSort = nextProps.sort,
          nextItems = nextProps.items;
      if (items !== nextItems) return true;

      if (group !== nextGroup || filter !== nextFilter || sort !== nextSort) {
        this.props.getArticleList(nextFilter, nextGroup, nextSort);
        return false;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          group = _this$props3.group,
          filter = _this$props3.filter,
          sort = _this$props3.sort,
          groups = _this$props3.items,
          getArticleList = _this$props3.getArticleList,
          handleGroupChange = _this$props3.handleGroupChange,
          handleFilterChange = _this$props3.handleFilterChange,
          handleSortChange = _this$props3.handleSortChange;
      return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("div", {
        className: "glossary",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 93
        }
      }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_components_list__WEBPACK_IMPORTED_MODULE_10__["default"], {
        items: groups,
        options: options,
        optionValues: {
          group: group,
          filter: filter,
          sort: sort
        },
        onGroupChange: handleGroupChange,
        onFilterChange: handleFilterChange,
        onSortChange: handleSortChange,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 95
        }
      }, function (g) {
        return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_components_list__WEBPACK_IMPORTED_MODULE_10__["default"].Group, {
          items: g.items,
          title: formatTitle(g.title, group),
          layoutType: "grid",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 103
          }
        }, function (item) {
          return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_components_article_card__WEBPACK_IMPORTED_MODULE_11__["default"], {
            title: item.title,
            date: item.lastEditDate,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 104
            }
          });
        });
      }));
    }
  }]);

  return GlossaryContainer;
}(react__WEBPACK_IMPORTED_MODULE_6___default.a.Component);

var mapStateToProps = function mapStateToProps(state) {
  return {
    group: state.glossary.listView.group,
    filter: state.glossary.listView.filter,
    sort: state.glossary.listView.sort,
    items: state.glossary.listView.data
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return Object(redux__WEBPACK_IMPORTED_MODULE_7__["bindActionCreators"])({
    getArticleList: _store_glossary_actions__WEBPACK_IMPORTED_MODULE_9__["getArticleList"],
    handleGroupChange: _store_glossary_actions__WEBPACK_IMPORTED_MODULE_9__["handleGroupChange"],
    handleSortChange: _store_glossary_actions__WEBPACK_IMPORTED_MODULE_9__["handleSortChange"],
    handleFilterChange: _store_glossary_actions__WEBPACK_IMPORTED_MODULE_9__["handleFilterChange"]
  }, dispatch);
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_8__["connect"])(mapStateToProps, mapDispatchToProps)(GlossaryContainer));

/***/ }),

/***/ "./src/client/admin/index.js":
/*!***********************************!*\
  !*** ./src/client/admin/index.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App */ "./src/client/admin/App.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "redux");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(redux__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "react-redux");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! redux-thunk */ "redux-thunk");
/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(redux_thunk__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _store_reducers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./store/reducers */ "./src/client/admin/store/reducers.js");
var _jsxFileName = "C:\\Users\\simpl\\OneDrive\\\u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B\\Node JS Projects\\webapp-admin\\src\\client\\admin\\index.js";






var store = Object(redux__WEBPACK_IMPORTED_MODULE_2__["createStore"])(Object(redux__WEBPACK_IMPORTED_MODULE_2__["combineReducers"])(_store_reducers__WEBPACK_IMPORTED_MODULE_5__), Object(redux__WEBPACK_IMPORTED_MODULE_2__["applyMiddleware"])(redux_thunk__WEBPACK_IMPORTED_MODULE_4___default.a));
/* harmony default export */ __webpack_exports__["default"] = (function () {
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_3__["Provider"], {
    store: store,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    }
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_App__WEBPACK_IMPORTED_MODULE_0__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    }
  }));
});

/***/ }),

/***/ "./src/client/admin/services/backend/glossary/index.js":
/*!*************************************************************!*\
  !*** ./src/client/admin/services/backend/glossary/index.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "@babel/runtime/helpers/asyncToGenerator");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helpers */ "./src/client/admin/services/backend/helpers/index.js");



var GlossaryInterface = {
  getArticleList: function () {
    var _getArticleList = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(options) {
      var _ref, filter, group, sort, url, response;

      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _ref = options || {}, filter = _ref.filter, group = _ref.group, sort = _ref.sort;
              url = new URL('/admin/glossary/previews', window.location.origin);
              filter && url.searchParams.append('search', filter);
              group && url.searchParams.append('group', group);
              sort && url.searchParams.append('sort', sort);
              _context.next = 7;
              return Object(_helpers__WEBPACK_IMPORTED_MODULE_2__["fetch"])(url);

            case 7:
              response = _context.sent;
              return _context.abrupt("return", response.data);

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function getArticleList(_x) {
      return _getArticleList.apply(this, arguments);
    }

    return getArticleList;
  }(),
  getArticle: function () {
    var _getArticle = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(id) {
      var response;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return Object(_helpers__WEBPACK_IMPORTED_MODULE_2__["fetch"])("/admin/glossary/".concat(id));

            case 2:
              response = _context2.sent;
              return _context2.abrupt("return", response.data);

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function getArticle(_x2) {
      return _getArticle.apply(this, arguments);
    }

    return getArticle;
  }()
};
/* harmony default export */ __webpack_exports__["default"] = (GlossaryInterface);

/***/ }),

/***/ "./src/client/admin/services/backend/helpers/index.js":
/*!************************************************************!*\
  !*** ./src/client/admin/services/backend/helpers/index.js ***!
  \************************************************************/
/*! exports provided: fetch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetch", function() { return request; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "@babel/runtime/helpers/defineProperty");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "@babel/runtime/helpers/asyncToGenerator");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__);




function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var request =
/*#__PURE__*/
function () {
  var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(url) {
    var _ref2,
        _ref2$data,
        data,
        _ref2$method,
        method,
        _ref2$authentication,
        authentication,
        response,
        responseParsed,
        _args = arguments;

    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _ref2 = _args.length > 1 && _args[1] !== undefined ? _args[1] : {}, _ref2$data = _ref2.data, data = _ref2$data === void 0 ? {} : _ref2$data, _ref2$method = _ref2.method, method = _ref2$method === void 0 ? "GET" : _ref2$method, _ref2$authentication = _ref2.authentication, authentication = _ref2$authentication === void 0 ? false : _ref2$authentication;

            if (url) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return");

          case 3:
            _context.prev = 3;
            _context.next = 6;
            return fetch(url, _objectSpread({
              method: method
            }, method !== 'GET' && {
              body: JSON.stringify(data)
            }, {
              headers: {
                Accept: 'application/json'
              }
            }));

          case 6:
            response = _context.sent;

            if (!response.ok) {
              console.error("Payture backend server request to ".concat(url, " failed, HTTP status ").concat(response.status));
            }

            _context.next = 10;
            return response.json();

          case 10:
            responseParsed = _context.sent;
            return _context.abrupt("return", responseParsed);

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](3);
            console.error('Fetch operation failed ' + _context.t0);

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 14]]);
  }));

  return function request(_x) {
    return _ref.apply(this, arguments);
  };
}();



/***/ }),

/***/ "./src/client/admin/services/backend/index.js":
/*!****************************************************!*\
  !*** ./src/client/admin/services/backend/index.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _glossary__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./glossary */ "./src/client/admin/services/backend/glossary/index.js");

var backend = {
  glossary: _glossary__WEBPACK_IMPORTED_MODULE_0__["default"]
};
/* harmony default export */ __webpack_exports__["default"] = (backend);

/***/ }),

/***/ "./src/client/admin/store/glossary/actions.js":
/*!****************************************************!*\
  !*** ./src/client/admin/store/glossary/actions.js ***!
  \****************************************************/
/*! exports provided: getArticleList, handleGroupChange, handleSortChange, handleFilterChange */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getArticleList", function() { return getArticleList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "handleGroupChange", function() { return handleGroupChange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "handleSortChange", function() { return handleSortChange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "handleFilterChange", function() { return handleFilterChange; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "@babel/runtime/helpers/asyncToGenerator");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! . */ "./src/client/admin/store/glossary/index.js");
/* harmony import */ var _services_backend__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/backend */ "./src/client/admin/services/backend/index.js");




var getArticleList = function getArticleList(filter, group, sort) {
  return (
    /*#__PURE__*/
    function () {
      var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(dispatch) {
        var items;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _services_backend__WEBPACK_IMPORTED_MODULE_3__["default"].glossary.getArticleList({
                  filter: filter,
                  group: group,
                  sort: sort
                });

              case 2:
                items = _context.sent;
                dispatch({
                  type: ___WEBPACK_IMPORTED_MODULE_2__["actionTypes"].LOAD_DATA,
                  data: items || []
                });

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }()
  );
};
var handleGroupChange = function handleGroupChange(group) {
  return {
    type: ___WEBPACK_IMPORTED_MODULE_2__["actionTypes"].GROUP_KEY_CHANGED,
    group: group
  };
};
var handleSortChange = function handleSortChange(sort) {
  return {
    type: ___WEBPACK_IMPORTED_MODULE_2__["actionTypes"].SORT_KEY_CHANGED,
    sort: sort
  };
};
var handleFilterChange = function handleFilterChange(filter) {
  return {
    type: ___WEBPACK_IMPORTED_MODULE_2__["actionTypes"].FILTER_VALUE_CHANGED,
    filter: filter
  };
};

/***/ }),

/***/ "./src/client/admin/store/glossary/index.js":
/*!**************************************************!*\
  !*** ./src/client/admin/store/glossary/index.js ***!
  \**************************************************/
/*! exports provided: default, actionTypes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "actionTypes", function() { return actionTypes; });
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ "redux");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(redux__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _server_side_processed_list__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../server-side-processed-list */ "./src/client/admin/store/server-side-processed-list/index.js");


var REDUCER_KEY = 'test-glossary';

var commonPage = function commonPage() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;
  return state;
};

var defaultListState = {
  data: [],
  group: 'creationDate',
  filter: null,
  sort: 'asc'
};
var listView = Object(_server_side_processed_list__WEBPACK_IMPORTED_MODULE_1__["createReducer"])(REDUCER_KEY, defaultListState);
var actionTypes = Object(_server_side_processed_list__WEBPACK_IMPORTED_MODULE_1__["createActionTypes"])(REDUCER_KEY);
/* harmony default export */ __webpack_exports__["default"] = (Object(redux__WEBPACK_IMPORTED_MODULE_0__["combineReducers"])({
  listView: listView
}));


/***/ }),

/***/ "./src/client/admin/store/reducers.js":
/*!********************************************!*\
  !*** ./src/client/admin/store/reducers.js ***!
  \********************************************/
/*! exports provided: glossary */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _glossary__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./glossary */ "./src/client/admin/store/glossary/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "glossary", function() { return _glossary__WEBPACK_IMPORTED_MODULE_0__["default"]; });




/***/ }),

/***/ "./src/client/admin/store/server-side-processed-list/index.js":
/*!********************************************************************!*\
  !*** ./src/client/admin/store/server-side-processed-list/index.js ***!
  \********************************************************************/
/*! exports provided: createReducer, createActionTypes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createReducer", function() { return createReducer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createActionTypes", function() { return createActionTypes; });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "@babel/runtime/helpers/defineProperty");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var defaultState = {
  data: [],
  pageIndex: 0,
  pageSize: 10,
  pageCount: undefined,
  group: null,
  filter: null,
  sort: null
};

var createActionTypes = function createActionTypes(key) {
  return {
    LOAD_DATA: "@@SERVER_SIDE_LIST-LOAD_DATA--[".concat(key, "]"),
    SET_PAGE_SIZE: "@@SERVER_SIDE_LIST-SET_PAGE_SIZE--[".concat(key, "]"),
    SET_PAGE_IDX: "@@SERVER_SIDE_LIST-SET_PAGE_IDX--[".concat(key, "]"),
    GROUP_KEY_CHANGED: "@@SERVER_SIDE_LIST-GROUP_KEY_CHANGED--[".concat(key, "]"),
    SORT_KEY_CHANGED: "@@SERVER_SIDE_LIST-SORT_KEY_CHANGED--[".concat(key, "]"),
    FILTER_VALUE_CHANGED: "@@SERVER_SIDE_LIST-FILTER_VALUE_CHANGED--[".concat(key, "]")
  };
};

var createReducer = function createReducer(key) {
  var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultState;
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments.length > 1 ? arguments[1] : undefined;
    var t = createActionTypes(key);

    switch (action.type) {
      case t.LOAD_DATA:
        {
          return _objectSpread({}, state, {
            data: action.data
          });
        }

      case t.SET_PAGE_SIZE:
        {
          return _objectSpread({}, state, {
            pageSize: action.pageSize
          });
        }

      case t.SET_PAGE_IDX:
        {
          return _objectSpread({}, state, {
            pageIndex: action.pageIndex
          });
        }

      case t.GROUP_KEY_CHANGED:
        {
          return _objectSpread({}, state, {
            group: action.group
          });
        }

      case t.SORT_KEY_CHANGED:
        {
          return _objectSpread({}, state, {
            sort: action.sort
          });
        }

      case t.FILTER_VALUE_CHANGED:
        {
          return _objectSpread({}, state, {
            filter: action.filter
          });
        }

      default:
        {
          return state;
        }
    }
  };
};



/***/ }),

/***/ "./src/client/admin/styles/app.scss":
/*!******************************************!*\
  !*** ./src/client/admin/styles/app.scss ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./src/client/admin/styles/fonts.scss":
/*!********************************************!*\
  !*** ./src/client/admin/styles/fonts.scss ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./src/client/website/index.js":
/*!*************************************!*\
  !*** ./src/client/website/index.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_1__);
var _jsxFileName = "C:\\Users\\simpl\\OneDrive\\\u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B\\Node JS Projects\\webapp-admin\\src\\client\\website\\index.js";


/* harmony default export */ __webpack_exports__["default"] = (function () {
  console.log("Payture website stub");
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Redirect"], {
    to: '/admin-panel',
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8
    }
  });
});

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! http */ "http");
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(http__WEBPACK_IMPORTED_MODULE_0__);


var app = __webpack_require__(/*! ./server */ "./src/server/index.js")["default"];

var server = http__WEBPACK_IMPORTED_MODULE_0___default.a.createServer(app);
var currentApp = app;
server.listen("3000" || false, function (error) {
  if (error) {
    console.log(error);
  }

  console.log('🚀 started');
});

if (true) {
  console.log('✅  Server-side HMR Enabled!');
  module.hot.accept(/*! ./server */ "./src/server/index.js", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { (function () {
    console.log('🔁  HMR Reloading `./server`...');

    try {
      app = __webpack_require__(/*! ./server */ "./src/server/index.js")["default"];
      server.removeListener('request', currentApp);
      server.on('request', app);
      currentApp = app;
    } catch (error) {
      console.error(error);
    }
  })(__WEBPACK_OUTDATED_DEPENDENCIES__); }.bind(this));
}

/***/ }),

/***/ "./src/server/api/glossary/helpers.js":
/*!********************************************!*\
  !*** ./src/server/api/glossary/helpers.js ***!
  \********************************************/
/*! exports provided: groupItems */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "groupItems", function() { return groupItems; });
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "@babel/runtime/helpers/toConsumableArray");
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__);


var groupItems = function groupItems(items, selector) {
  var mapping = items.reduce(function (acc, item) {
    var groupKey = selector(item);
    acc[groupKey] = acc[groupKey] ? [].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(acc[groupKey]), [item]) : [item];
    return acc;
  }, {});
  return Object.keys(mapping).reduce(function (acc, key) {
    return [].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(acc), [{
      title: key,
      items: mapping[key]
    }]);
  }, []);
};



/***/ }),

/***/ "./src/server/api/glossary/index.js":
/*!******************************************!*\
  !*** ./src/server/api/glossary/index.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "@babel/runtime/helpers/defineProperty");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils */ "./src/server/utils/index.js");
/* harmony import */ var _repository_glossary__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../repository/glossary */ "./src/server/repository/glossary/index.js");
/* harmony import */ var _preview__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./preview */ "./src/server/api/glossary/preview.js");


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }





var api = _objectSpread({
  saveArticle: function saveArticle(req, res) {
    var article = _objectSpread({}, req.body, {
      creationDate: new Date(),
      lastEditDate: new Date()
    });

    _repository_glossary__WEBPACK_IMPORTED_MODULE_2__["default"].save(article).then(function (result) {
      return _utils__WEBPACK_IMPORTED_MODULE_1__["response"].success(res)();
    })["catch"](function (err) {
      return _utils__WEBPACK_IMPORTED_MODULE_1__["response"].error(res)(_utils__WEBPACK_IMPORTED_MODULE_1__["error"].DB_ERROR);
    });
  },
  updateArticle: function updateArticle(req, res) {
    var article = _objectSpread({}, req.body, {
      lastEditDate: new Date()
    });

    _repository_glossary__WEBPACK_IMPORTED_MODULE_2__["default"].update({
      id: req.params.id
    }, _objectSpread({}, article)).then(function (result) {
      return _utils__WEBPACK_IMPORTED_MODULE_1__["response"].success(res)();
    })["catch"](function (err) {
      return _utils__WEBPACK_IMPORTED_MODULE_1__["response"].error(res)(_utils__WEBPACK_IMPORTED_MODULE_1__["error"].DB_ERROR);
    });
  },
  getArticle: function getArticle(req, res) {
    _repository_glossary__WEBPACK_IMPORTED_MODULE_2__["default"].get({
      id: req.params.id
    }).then(function (article) {
      return article.toJSON();
    }).then(function (article) {
      return _utils__WEBPACK_IMPORTED_MODULE_1__["response"].success(res)(article);
    })["catch"](function (err) {
      return _utils__WEBPACK_IMPORTED_MODULE_1__["response"].error(res)(_utils__WEBPACK_IMPORTED_MODULE_1__["error"].DB_ERROR);
    });
  },
  getArticles: function getArticles(req, res) {
    _repository_glossary__WEBPACK_IMPORTED_MODULE_2__["default"].get().then(function (articles) {
      return articles.map(function (article) {
        return article.toJSON();
      });
    }).then(function (articles) {
      return _utils__WEBPACK_IMPORTED_MODULE_1__["response"].success(res)(articles);
    })["catch"](function (err) {
      return _utils__WEBPACK_IMPORTED_MODULE_1__["response"].error(res)(_utils__WEBPACK_IMPORTED_MODULE_1__["error"].DB_ERROR);
    });
  }
}, _preview__WEBPACK_IMPORTED_MODULE_3__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (api);

/***/ }),

/***/ "./src/server/api/glossary/preview.js":
/*!********************************************!*\
  !*** ./src/server/api/glossary/preview.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils */ "./src/server/utils/index.js");
/* harmony import */ var _repository_glossary__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../repository/glossary */ "./src/server/repository/glossary/index.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helpers */ "./src/server/api/glossary/helpers.js");



var groupType = {
  BY_TITLE: 'title',
  BY_CREATION_DATE: 'creationdate',
  BY_LAST_EDIT_DATE: 'lasteditdate'
};
var apiPreview = {
  getPreviews: function getPreviews(req, res) {
    var _req$query = req.query,
        search = _req$query.search,
        group = _req$query.group,
        sort = _req$query.sort;
    _repository_glossary__WEBPACK_IMPORTED_MODULE_1__["default"].getArticlePreviews().then(function (previews) {
      return previews.map(function (preview) {
        return preview.toJSON();
      });
    }).then(function (previews) {
      // filtering
      if (search && search.trim()) {
        return previews.filter(function (preview) {
          if (!preview || !preview.title) return false;
          return preview.title.toLowerCase().includes(search.toLowerCase());
        });
      }

      return previews;
    }).then(function (previews) {
      // grouping
      if (!group) {
        return previews;
      }

      switch (group.toLowerCase()) {
        case groupType.BY_TITLE:
          {
            return Object(_helpers__WEBPACK_IMPORTED_MODULE_2__["groupItems"])(previews, function (item) {
              return item.title.toLowerCase()[0];
            });
          }

        case groupType.BY_CREATION_DATE:
          {
            return Object(_helpers__WEBPACK_IMPORTED_MODULE_2__["groupItems"])(previews, function (item) {
              if (!item.creationDate) {
                return 'unknown_date';
              }

              var date = new Date(item.creationDate);
              return "".concat(date.getMonth(), "/").concat(date.getFullYear());
            });
          }

        case groupType.BY_LAST_EDIT_DATE:
          {
            return Object(_helpers__WEBPACK_IMPORTED_MODULE_2__["groupItems"])(previews, function (item) {
              if (!item.lastEditDate) {
                return 'unknown_date';
              }

              var date = new Date(item.lastEditDate);
              return "".concat(date.getMonth(), "/").concat(date.getFullYear());
            });
          }

        default:
          return previews;
      }
    }).then(function (previews) {
      // sorting
      if (!sort) {
        return previews;
      }

      switch (sort) {
        case 'desc':
          {
            return previews.sort(function (a, b) {
              return a.title < b.title ? 1 : -1;
            });
          }

        default:
        case 'asc':
          {
            return previews.sort(function (a, b) {
              return a.title < b.title ? -1 : 1;
            });
          }
      }
    }).then(function (previews) {
      return _utils__WEBPACK_IMPORTED_MODULE_0__["response"].success(res)(previews);
    })["catch"](function (err) {
      return _utils__WEBPACK_IMPORTED_MODULE_0__["response"].error(res)(_utils__WEBPACK_IMPORTED_MODULE_0__["error"].DB_ERROR);
    });
  }
};
/* harmony default export */ __webpack_exports__["default"] = (apiPreview);

/***/ }),

/***/ "./src/server/api/users/index.js":
/*!***************************************!*\
  !*** ./src/server/api/users/index.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "@babel/runtime/helpers/defineProperty");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils */ "./src/server/utils/index.js");
/* harmony import */ var _repository_users__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../repository/users */ "./src/server/repository/users/index.js");


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }



var api = {
  saveUser: function saveUser(req, res) {
    var userdata = _objectSpread({}, req.body, {
      creationDate: new Date(),
      lastAccessDate: new Date()
    });

    var username = userdata.username,
        email = userdata.email,
        password = userdata.password;

    if (!username || !email || !password) {
      return _utils__WEBPACK_IMPORTED_MODULE_1__["response"].error(res)(_utils__WEBPACK_IMPORTED_MODULE_1__["error"].WRONG_PARAMS);
    }

    _repository_users__WEBPACK_IMPORTED_MODULE_2__["default"].save(userdata).then(function (result) {
      return _utils__WEBPACK_IMPORTED_MODULE_1__["response"].success(res)();
    })["catch"](function (err) {
      return _utils__WEBPACK_IMPORTED_MODULE_1__["response"].error(res)(_utils__WEBPACK_IMPORTED_MODULE_1__["error"].DB_ERROR);
    });
  },
  getUsers: function getUsers(req, res) {
    _repository_users__WEBPACK_IMPORTED_MODULE_2__["default"].get().then(function (users) {
      return _utils__WEBPACK_IMPORTED_MODULE_1__["response"].success(res)({
        users: users
      });
    })["catch"](function (err) {
      return _utils__WEBPACK_IMPORTED_MODULE_1__["response"].error(res)(_utils__WEBPACK_IMPORTED_MODULE_1__["error"].DB_ERROR);
    });
  },
  getUser: function getUser(req, res) {
    _repository_users__WEBPACK_IMPORTED_MODULE_2__["default"].get({
      username: req.params.username
    }).then(function (user) {
      if (user) {
        return _utils__WEBPACK_IMPORTED_MODULE_1__["response"].success(res)({
          user: user
        });
      } else {
        return _utils__WEBPACK_IMPORTED_MODULE_1__["response"].error(res)(_utils__WEBPACK_IMPORTED_MODULE_1__["error"].ENTITY_NOT_FOUND);
      }
    })["catch"](function (err) {
      return _utils__WEBPACK_IMPORTED_MODULE_1__["response"].error(res)(_utils__WEBPACK_IMPORTED_MODULE_1__["error"].DB_ERROR);
    });
  },
  updateUser: function updateUser(req, res) {
    var username = req.params.username;
    _repository_users__WEBPACK_IMPORTED_MODULE_2__["default"].update({
      username: username
    }, _objectSpread({}, req.body)).then(function (result) {
      return _utils__WEBPACK_IMPORTED_MODULE_1__["response"].success(res)();
    })["catch"](function (err) {
      return _utils__WEBPACK_IMPORTED_MODULE_1__["response"].error(res)(_utils__WEBPACK_IMPORTED_MODULE_1__["error"].DB_ERROR);
    });
  },
  deleteUser: function deleteUser(req, res) {
    _repository_users__WEBPACK_IMPORTED_MODULE_2__["default"]["delete"]({
      username: req.params.username
    }).then(function (res) {
      return _utils__WEBPACK_IMPORTED_MODULE_1__["response"].success(res)();
    })["catch"](function (err) {
      return _utils__WEBPACK_IMPORTED_MODULE_1__["response"].error(res)(_utils__WEBPACK_IMPORTED_MODULE_1__["error"].DB_ERROR);
    });
  },
  deleteUsers: function deleteUsers(req, res) {
    _repository_users__WEBPACK_IMPORTED_MODULE_2__["default"]["delete"]().then(function (result) {
      return _utils__WEBPACK_IMPORTED_MODULE_1__["response"].success(res)();
    })["catch"](function (err) {
      return _utils__WEBPACK_IMPORTED_MODULE_1__["response"].error(res)(_utils__WEBPACK_IMPORTED_MODULE_1__["error"].DB_ERROR);
    });
  }
};
/* harmony default export */ __webpack_exports__["default"] = (api);

/***/ }),

/***/ "./src/server/config/auth/index.js":
/*!*****************************************!*\
  !*** ./src/server/config/auth/index.js ***!
  \*****************************************/
/*! exports provided: default, auth */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "auth", function() { return auth; });
/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! passport */ "passport");
/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(passport__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var passport_local__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! passport-local */ "passport-local");
/* harmony import */ var passport_local__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(passport_local__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var express_jwt__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! express-jwt */ "express-jwt");
/* harmony import */ var express_jwt__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(express_jwt__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _schemas_users__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../schemas/users */ "./src/server/config/schemas/users.js");




var LocalStrategy = passport_local__WEBPACK_IMPORTED_MODULE_1___default.a.Strategy;
passport__WEBPACK_IMPORTED_MODULE_0___default.a.use(new LocalStrategy({
  usernameField: 'login'
}, function (username, password, done) {
  _schemas_users__WEBPACK_IMPORTED_MODULE_3__["default"].findOne({
    username: username
  }).then(function (user) {
    if (!user || !user.validatePassword(password)) {
      return done(true, null, null);
    }

    return done(null, user);
  })["catch"](function (err) {
    return done(err);
  });
}));

var getTokenFromHeaders = function getTokenFromHeaders(req) {
  var authorization = req.headers.authorization;

  if (authorization && authorization.split(' ')[0] === 'Token') {
    return authorization.split(' ')[1];
  }

  return null;
};

var auth = {
  required: express_jwt__WEBPACK_IMPORTED_MODULE_2___default()({
    secret: 'secret',
    userProperty: 'payload',
    getToken: getTokenFromHeaders
  }),
  optional: express_jwt__WEBPACK_IMPORTED_MODULE_2___default()({
    secret: 'secret',
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
    credentialsRequired: false
  })
};
/* harmony default export */ __webpack_exports__["default"] = (passport__WEBPACK_IMPORTED_MODULE_0___default.a);


/***/ }),

/***/ "./src/server/config/schemas/connection.js":
/*!*************************************************!*\
  !*** ./src/server/config/schemas/connection.js ***!
  \*************************************************/
/*! exports provided: default, autoIncrement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ "mongoose");
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mongoose_auto_increment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mongoose-auto-increment */ "mongoose-auto-increment");
/* harmony import */ var mongoose_auto_increment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mongoose_auto_increment__WEBPACK_IMPORTED_MODULE_1__);
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "autoIncrement", function() { return mongoose_auto_increment__WEBPACK_IMPORTED_MODULE_1___default.a; });


mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.connect('mongodb://localhost/test-database');
mongoose_auto_increment__WEBPACK_IMPORTED_MODULE_1___default.a.initialize(mongoose__WEBPACK_IMPORTED_MODULE_0___default.a);
/* harmony default export */ __webpack_exports__["default"] = (mongoose__WEBPACK_IMPORTED_MODULE_0___default.a);


/***/ }),

/***/ "./src/server/config/schemas/glossary.js":
/*!***********************************************!*\
  !*** ./src/server/config/schemas/glossary.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _connection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./connection */ "./src/server/config/schemas/connection.js");

var GlossaryArticleSchema = new _connection__WEBPACK_IMPORTED_MODULE_0__["default"].Schema({
  title: String,
  creationDate: Date,
  lastEditDate: Date,
  keywords: Array,
  body: Object,
  url: String
});

GlossaryArticleSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj._id;
  delete obj.__v;
  return obj;
};

GlossaryArticleSchema.plugin(_connection__WEBPACK_IMPORTED_MODULE_0__["autoIncrement"].plugin, {
  model: 'GlossaryArticle',
  field: 'id',
  startAt: 1
});
var GlossaryArticle = _connection__WEBPACK_IMPORTED_MODULE_0__["default"].model('GlossaryArticle', GlossaryArticleSchema, 'glossaryArticle');
/* harmony default export */ __webpack_exports__["default"] = (GlossaryArticle);

/***/ }),

/***/ "./src/server/config/schemas/users.js":
/*!********************************************!*\
  !*** ./src/server/config/schemas/users.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _connection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./connection */ "./src/server/config/schemas/connection.js");
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! crypto */ "crypto");
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__);



var UserSchema = new _connection__WEBPACK_IMPORTED_MODULE_0__["default"].Schema({
  username: String,
  email: String,
  hash: String,
  salt: String,
  creationDate: Date,
  lastAccessDate: Date
});

UserSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj._id;
  delete obj.__v;
  return obj;
};

UserSchema.plugin(_connection__WEBPACK_IMPORTED_MODULE_0__["autoIncrement"].plugin, {
  model: 'User',
  field: 'id',
  startAt: 1
});

UserSchema.methods.setPassword = function (password) {
  this.salt = crypto__WEBPACK_IMPORTED_MODULE_1___default.a.randomBytes(16).toString('hex');
  this.hash = crypto__WEBPACK_IMPORTED_MODULE_1___default.a.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.validatePassword = function (password) {
  var hash = crypto__WEBPACK_IMPORTED_MODULE_1___default.a.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

UserSchema.methods.generateJWT = function () {
  var today = new Date();
  var expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);
  return jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default.a.sign({
    username: this.username,
    id: this._id,
    exp: parseInt(expirationDate.getTime() / 1000, 10)
  }, 'paytureForever!');
};

UserSchema.methods.toAuthJSON = function () {
  return {
    id: this.id,
    username: this.username,
    token: this.generateJWT()
  };
};

var User = _connection__WEBPACK_IMPORTED_MODULE_0__["default"].model('User', UserSchema, 'users');
/* harmony default export */ __webpack_exports__["default"] = (User);

/***/ }),

/***/ "./src/server/index.js":
/*!*****************************!*\
  !*** ./src/server/index.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _client_App__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../client/App */ "./src/client/App.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./routes */ "./src/server/routes/index.js");
/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-dom/server */ "react-dom/server");
/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_dom_server__WEBPACK_IMPORTED_MODULE_5__);
var _jsxFileName = "C:\\Users\\simpl\\OneDrive\\\u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B\\Node JS Projects\\webapp-admin\\src\\server\\index.js";







var assets = __webpack_require__(/*! ./build/assets.json */ "./build/assets.json");

var server = express__WEBPACK_IMPORTED_MODULE_3___default()();
server.disable('x-powered-by').use(express__WEBPACK_IMPORTED_MODULE_3___default.a["static"]("C:\\Users\\simpl\\OneDrive\\Документы\\Node JS Projects\\webapp-admin\\public")).use(_routes__WEBPACK_IMPORTED_MODULE_4__["default"]).get('/*', function (req, res) {
  var context = {};
  var markup = Object(react_dom_server__WEBPACK_IMPORTED_MODULE_5__["renderToString"])(react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["StaticRouter"], {
    context: context,
    location: req.url,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18
    }
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_client_App__WEBPACK_IMPORTED_MODULE_0__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19
    }
  })));

  if (context.url) {
    res.redirect(context.url);
  } else {
    res.status(200).send("<!doctype html>\n    <html lang=\"\">\n    <head>\n        <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\" />\n        <meta charset=\"utf-8\" />\n        <title>Welcome to Razzle</title>\n        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n        ".concat(assets.client.css ? "<link rel=\"stylesheet\" href=\"".concat(assets.client.css, "\">") : '', "\n        ").concat( false ? undefined : "<script src=\"".concat(assets.client.js, "\" defer crossorigin></script>"), "\n    </head>\n    <body>\n        <div id=\"root\">").concat(markup, "</div>\n    </body>\n</html>"));
  }
});
/* harmony default export */ __webpack_exports__["default"] = (server);

/***/ }),

/***/ "./src/server/repository/basic/index.js":
/*!**********************************************!*\
  !*** ./src/server/repository/basic/index.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var repository = function repository(Model) {
  return {
    model: Model,
    save: function save(object) {
      var model = new Model(object);
      return model.save();
    },
    get: function get(query) {
      return query ? Model.findOne(query) : Model.find();
    },
    update: function update(query, object) {
      return Model.updateMany(query, object, {
        upsert: true
      });
    },
    "delete": function _delete(query) {
      return query ? Model.deleteOne(query) : Model.deleteMany();
    }
  };
};

/* harmony default export */ __webpack_exports__["default"] = (repository);

/***/ }),

/***/ "./src/server/repository/glossary/index.js":
/*!*************************************************!*\
  !*** ./src/server/repository/glossary/index.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "@babel/runtime/helpers/defineProperty");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _config_schemas_glossary__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../config/schemas/glossary */ "./src/server/config/schemas/glossary.js");
/* harmony import */ var _basic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../basic */ "./src/server/repository/basic/index.js");


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }




var glossaryRepository = _objectSpread({}, Object(_basic__WEBPACK_IMPORTED_MODULE_2__["default"])(_config_schemas_glossary__WEBPACK_IMPORTED_MODULE_1__["default"]), {
  getArticlePreviews: function getArticlePreviews() {
    return _config_schemas_glossary__WEBPACK_IMPORTED_MODULE_1__["default"].find({}, {
      id: 1,
      title: 1,
      keywords: 1,
      creationDate: 1,
      lastEditDate: 1
    });
  }
});

/* harmony default export */ __webpack_exports__["default"] = (glossaryRepository);

/***/ }),

/***/ "./src/server/repository/users/index.js":
/*!**********************************************!*\
  !*** ./src/server/repository/users/index.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "@babel/runtime/helpers/defineProperty");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _config_schemas_users__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../config/schemas/users */ "./src/server/config/schemas/users.js");
/* harmony import */ var _basic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../basic */ "./src/server/repository/basic/index.js");


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }




var repository = _objectSpread({}, Object(_basic__WEBPACK_IMPORTED_MODULE_2__["default"])(_config_schemas_users__WEBPACK_IMPORTED_MODULE_1__["default"]), {
  save: function save(userdata) {
    var user = new _config_schemas_users__WEBPACK_IMPORTED_MODULE_1__["default"](userdata);
    user.setPassword(userdata.password);
    return user.save();
  }
});

/* harmony default export */ __webpack_exports__["default"] = (repository);

/***/ }),

/***/ "./src/server/routes/admin/auth/index.js":
/*!***********************************************!*\
  !*** ./src/server/routes/admin/auth/index.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _config_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../config/auth */ "./src/server/config/auth/index.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utils */ "./src/server/utils/index.js");



var router = express__WEBPACK_IMPORTED_MODULE_0___default.a.Router();
router.post('/login', function (req, res) {
  var _req$body = req.body,
      login = _req$body.login,
      password = _req$body.password;

  if (!login || !password) {
    return _utils__WEBPACK_IMPORTED_MODULE_2__["response"].error(res)(_utils__WEBPACK_IMPORTED_MODULE_2__["error"].WRONG_CREDENTIALS);
  }

  return _config_auth__WEBPACK_IMPORTED_MODULE_1__["default"].authenticate('local', {
    session: false
  }, function (err, user, info) {
    if (err) {
      return _utils__WEBPACK_IMPORTED_MODULE_2__["response"].error(res)(_utils__WEBPACK_IMPORTED_MODULE_2__["error"].WRONG_CREDENTIALS);
    }

    if (user) {
      return _utils__WEBPACK_IMPORTED_MODULE_2__["response"].success(res)(user.toAuthJSON());
    }

    return _utils__WEBPACK_IMPORTED_MODULE_2__["response"].error(res)(_utils__WEBPACK_IMPORTED_MODULE_2__["error"].WRONG_CREDENTIALS);
  })(req, res);
});
/* harmony default export */ __webpack_exports__["default"] = (router);

/***/ }),

/***/ "./src/server/routes/admin/glossary/index.js":
/*!***************************************************!*\
  !*** ./src/server/routes/admin/glossary/index.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _api_glossary__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../api/glossary */ "./src/server/api/glossary/index.js");


var router = express__WEBPACK_IMPORTED_MODULE_0___default.a.Router();
router.get('/glossary/previews', function (req, res) {
  return _api_glossary__WEBPACK_IMPORTED_MODULE_1__["default"].getPreviews(req, res);
}).get('/glossary', function (req, res) {
  return _api_glossary__WEBPACK_IMPORTED_MODULE_1__["default"].getArticles(req, res);
}).get('/glossary/:id', function (req, res) {
  return _api_glossary__WEBPACK_IMPORTED_MODULE_1__["default"].getArticle(req, res);
}).put('/glossary/:id', function (req, res) {
  return _api_glossary__WEBPACK_IMPORTED_MODULE_1__["default"].updateArticle(req, res);
}).post('/glossary', function (req, res) {
  return _api_glossary__WEBPACK_IMPORTED_MODULE_1__["default"].saveArticle(req, res);
});
/* harmony default export */ __webpack_exports__["default"] = (router);

/***/ }),

/***/ "./src/server/routes/admin/index.js":
/*!******************************************!*\
  !*** ./src/server/routes/admin/index.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! passport */ "passport");
/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(passport__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./auth */ "./src/server/routes/admin/auth/index.js");
/* harmony import */ var _users__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./users */ "./src/server/routes/admin/users/index.js");
/* harmony import */ var _glossary__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./glossary */ "./src/server/routes/admin/glossary/index.js");





var router = express__WEBPACK_IMPORTED_MODULE_0___default.a.Router();
router.use(passport__WEBPACK_IMPORTED_MODULE_1___default.a.initialize()).use(passport__WEBPACK_IMPORTED_MODULE_1___default.a.session()).use(_auth__WEBPACK_IMPORTED_MODULE_2__["default"]).use(_users__WEBPACK_IMPORTED_MODULE_3__["default"]).use(_glossary__WEBPACK_IMPORTED_MODULE_4__["default"]);
/* harmony default export */ __webpack_exports__["default"] = (router);

/***/ }),

/***/ "./src/server/routes/admin/users/index.js":
/*!************************************************!*\
  !*** ./src/server/routes/admin/users/index.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _api_users__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../api/users */ "./src/server/api/users/index.js");
/* harmony import */ var q__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! q */ "q");
/* harmony import */ var q__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(q__WEBPACK_IMPORTED_MODULE_2__);



var router = express__WEBPACK_IMPORTED_MODULE_0___default.a.Router();
router.get('/users', function (req, res) {
  return _api_users__WEBPACK_IMPORTED_MODULE_1__["default"].getUsers(req, res);
}).get('/users/:username', function (req, res) {
  return _api_users__WEBPACK_IMPORTED_MODULE_1__["default"].getUser(req, res);
}).post('/users', function (req, res) {
  return _api_users__WEBPACK_IMPORTED_MODULE_1__["default"].saveUser(req, res);
}).put('/users/:username', function (req, res) {
  return _api_users__WEBPACK_IMPORTED_MODULE_1__["default"].updateUser(req, res);
})["delete"]('/users', function (req, res) {
  return _api_users__WEBPACK_IMPORTED_MODULE_1__["default"].deleteUsers(req, res);
})["delete"]('/users/:username', function (req, res) {
  return _api_users__WEBPACK_IMPORTED_MODULE_1__["default"].deleteUser(req, res);
});
/* harmony default export */ __webpack_exports__["default"] = (router);

/***/ }),

/***/ "./src/server/routes/index.js":
/*!************************************!*\
  !*** ./src/server/routes/index.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! body-parser */ "body-parser");
/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(body_parser__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _admin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./admin */ "./src/server/routes/admin/index.js");



var router = express__WEBPACK_IMPORTED_MODULE_0___default.a.Router();
router.use(body_parser__WEBPACK_IMPORTED_MODULE_1___default.a.json()).use('/admin', _admin__WEBPACK_IMPORTED_MODULE_2__["default"]);
/* harmony default export */ __webpack_exports__["default"] = (router);

/***/ }),

/***/ "./src/server/utils/error.js":
/*!***********************************!*\
  !*** ./src/server/utils/error.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var error = {
  DB_ERROR: 0,
  ENTITY_NOT_FOUND: 1,
  ENTITY_EXISTS: 2,
  WRONG_PARAMS: 3,
  WRONG_CREDENTIALS: 4
};
/* harmony default export */ __webpack_exports__["default"] = (error);

/***/ }),

/***/ "./src/server/utils/index.js":
/*!***********************************!*\
  !*** ./src/server/utils/index.js ***!
  \***********************************/
/*! exports provided: response, error */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _response__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./response */ "./src/server/utils/response.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "response", function() { return _response__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _error__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./error */ "./src/server/utils/error.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "error", function() { return _error__WEBPACK_IMPORTED_MODULE_1__["default"]; });





/***/ }),

/***/ "./src/server/utils/response.js":
/*!**************************************!*\
  !*** ./src/server/utils/response.js ***!
  \**************************************/
/*! exports provided: success, error, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "success", function() { return success; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "error", function() { return error; });
var success = function success(response) {
  return function (body) {
    return response.status(200).json({
      success: true,
      error: null,
      data: body
    });
  };
};

var error = function error(response) {
  return function (error) {
    return response.status(400).json({
      success: false,
      error: error
    });
  };
};

var response = {
  success: success,
  error: error
};

/* harmony default export */ __webpack_exports__["default"] = (response);

/***/ }),

/***/ 0:
/*!**************************************************************************!*\
  !*** multi razzle-dev-utils/prettyNodeErrors webpack/hot/poll?300 ./src ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! razzle-dev-utils/prettyNodeErrors */"razzle-dev-utils/prettyNodeErrors");
__webpack_require__(/*! webpack/hot/poll?300 */"./node_modules/webpack/hot/poll.js?300");
module.exports = __webpack_require__(/*! C:\Users\simpl\OneDrive\Документы\Node JS Projects\webapp-admin\src */"./src/index.js");


/***/ }),

/***/ "@babel/runtime/helpers/asyncToGenerator":
/*!**********************************************************!*\
  !*** external "@babel/runtime/helpers/asyncToGenerator" ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/asyncToGenerator");

/***/ }),

/***/ "@babel/runtime/helpers/classCallCheck":
/*!********************************************************!*\
  !*** external "@babel/runtime/helpers/classCallCheck" ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/classCallCheck");

/***/ }),

/***/ "@babel/runtime/helpers/createClass":
/*!*****************************************************!*\
  !*** external "@babel/runtime/helpers/createClass" ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/createClass");

/***/ }),

/***/ "@babel/runtime/helpers/defineProperty":
/*!********************************************************!*\
  !*** external "@babel/runtime/helpers/defineProperty" ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/defineProperty");

/***/ }),

/***/ "@babel/runtime/helpers/extends":
/*!*************************************************!*\
  !*** external "@babel/runtime/helpers/extends" ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/extends");

/***/ }),

/***/ "@babel/runtime/helpers/getPrototypeOf":
/*!********************************************************!*\
  !*** external "@babel/runtime/helpers/getPrototypeOf" ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/getPrototypeOf");

/***/ }),

/***/ "@babel/runtime/helpers/inherits":
/*!**************************************************!*\
  !*** external "@babel/runtime/helpers/inherits" ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/inherits");

/***/ }),

/***/ "@babel/runtime/helpers/objectWithoutProperties":
/*!*****************************************************************!*\
  !*** external "@babel/runtime/helpers/objectWithoutProperties" ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/objectWithoutProperties");

/***/ }),

/***/ "@babel/runtime/helpers/possibleConstructorReturn":
/*!*******************************************************************!*\
  !*** external "@babel/runtime/helpers/possibleConstructorReturn" ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/possibleConstructorReturn");

/***/ }),

/***/ "@babel/runtime/helpers/slicedToArray":
/*!*******************************************************!*\
  !*** external "@babel/runtime/helpers/slicedToArray" ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/slicedToArray");

/***/ }),

/***/ "@babel/runtime/helpers/toConsumableArray":
/*!***********************************************************!*\
  !*** external "@babel/runtime/helpers/toConsumableArray" ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/toConsumableArray");

/***/ }),

/***/ "@babel/runtime/regenerator":
/*!*********************************************!*\
  !*** external "@babel/runtime/regenerator" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/regenerator");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),

/***/ "classnames":
/*!*****************************!*\
  !*** external "classnames" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("classnames");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "express-jwt":
/*!******************************!*\
  !*** external "express-jwt" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express-jwt");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),

/***/ "mongoose-auto-increment":
/*!******************************************!*\
  !*** external "mongoose-auto-increment" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("mongoose-auto-increment");

/***/ }),

/***/ "passport":
/*!***************************!*\
  !*** external "passport" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),

/***/ "passport-local":
/*!*********************************!*\
  !*** external "passport-local" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("passport-local");

/***/ }),

/***/ "q":
/*!********************!*\
  !*** external "q" ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("q");

/***/ }),

/***/ "razzle-dev-utils/prettyNodeErrors":
/*!****************************************************!*\
  !*** external "razzle-dev-utils/prettyNodeErrors" ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("razzle-dev-utils/prettyNodeErrors");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react-dom/server":
/*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),

/***/ "react-redux":
/*!******************************!*\
  !*** external "react-redux" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),

/***/ "react-router-dom":
/*!***********************************!*\
  !*** external "react-router-dom" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ }),

/***/ "react-router-dom/Route":
/*!*****************************************!*\
  !*** external "react-router-dom/Route" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-router-dom/Route");

/***/ }),

/***/ "react-router-dom/Switch":
/*!******************************************!*\
  !*** external "react-router-dom/Switch" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-router-dom/Switch");

/***/ }),

/***/ "redux":
/*!************************!*\
  !*** external "redux" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),

/***/ "redux-thunk":
/*!******************************!*\
  !*** external "redux-thunk" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("redux-thunk");

/***/ })

/******/ });
//# sourceMappingURL=server.js.map