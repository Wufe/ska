(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("fs"), require("path"), require("js-yaml"), require("argparse"), require("chalk"));
	else if(typeof define === 'function' && define.amd)
		define(["fs", "path", "js-yaml", "argparse", "chalk"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("fs"), require("path"), require("js-yaml"), require("argparse"), require("chalk")) : factory(root["fs"], root["path"], root["js-yaml"], root["argparse"], root["chalk"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_9__, __WEBPACK_EXTERNAL_MODULE_13__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	eval("\"use strict\";\n\nconst core_1 = __webpack_require__(1);\nexports.Configuration = core_1.Configuration;\nconst cli_1 = __webpack_require__(7);\nexports.Entrypoint = cli_1.Entrypoint;\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/index.ts\n// module id = 0\n// module chunks = 0\n//# sourceURL=webpack:///./src/index.ts?");

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	eval("\"use strict\";\n\nfunction __export(m) {\n    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];\n}\nconst Configuration_1 = __webpack_require__(2);\nexports.Configuration = Configuration_1.default;\n__export(__webpack_require__(6));\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/core/index.ts\n// module id = 1\n// module chunks = 0\n//# sourceURL=webpack:///./src/core/index.ts?");

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	eval("/// <reference path=\"../../typings/index.d.ts\" />\n\"use strict\";\n\nconst fs_1 = __webpack_require__(3);\nconst path_1 = __webpack_require__(4);\nconst js_yaml_1 = __webpack_require__(5);\nconst _1 = __webpack_require__(1);\nconst CONFIG_FILENAME = 'ska.yml';\nclass Configuration {\n    get() {\n        if (!this.configuration) this.findRootConfiguration();\n        return this.configuration;\n    }\n    findRootConfiguration() {\n        let skaConfiguration = this.searchConfigurationInPackage();\n        if (!skaConfiguration) skaConfiguration = this.searchConfigurationInCurrentDirectory();\n        if (!skaConfiguration) throw new Error(`Cannot find a configuration file.\nEither specify its path in package.json, under a 'ska' attribute,\nor create a configuration file in the current directory called ${ CONFIG_FILENAME }.`);\n        try {\n            this.configuration = js_yaml_1.safeLoad(skaConfiguration);\n        } catch (error) {\n            throw error;\n        }\n    }\n    searchConfigurationInPackage() {\n        let packagePath = path_1.resolve(path_1.join('.', 'package.json'));\n        let skaConfiguration;\n        if (_1.isFile(packagePath)) {\n            let packageFile = fs_1.readFileSync(packagePath, 'utf8');\n            try {\n                let packageJSON = JSON.parse(packageFile);\n                if (packageJSON['ska'] !== undefined) {\n                    let skaSettings = packageJSON['ska'];\n                    if (typeof skaSettings == 'object') {\n                        skaConfiguration = skaSettings;\n                    } else if (typeof skaSettings == 'string') {\n                        let configurationPath = path_1.resolve(path_1.join('.', skaSettings));\n                        if (_1.isFile(configurationPath)) {\n                            skaConfiguration = fs_1.readFileSync(configurationPath, 'utf8');\n                        }\n                    }\n                }\n            } catch (error) {}\n        }\n        return skaConfiguration;\n    }\n    searchConfigurationInCurrentDirectory() {\n        let skaConfiguration;\n        let configurationPath = path_1.resolve(path_1.join('.', 'ska.yml'));\n        if (_1.isFile(configurationPath)) skaConfiguration = fs_1.readFileSync(configurationPath, 'utf8');\n        return skaConfiguration;\n    }\n}\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.default = Configuration;\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/core/Configuration.ts\n// module id = 2\n// module chunks = 0\n//# sourceURL=webpack:///./src/core/Configuration.ts?");

/***/ },
/* 3 */
/***/ function(module, exports) {

	eval("module.exports = require(\"fs\");\n\n//////////////////\n// WEBPACK FOOTER\n// external \"fs\"\n// module id = 3\n// module chunks = 0\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ },
/* 4 */
/***/ function(module, exports) {

	eval("module.exports = require(\"path\");\n\n//////////////////\n// WEBPACK FOOTER\n// external \"path\"\n// module id = 4\n// module chunks = 0\n//# sourceURL=webpack:///external_%22path%22?");

/***/ },
/* 5 */
/***/ function(module, exports) {

	eval("module.exports = require(\"js-yaml\");\n\n//////////////////\n// WEBPACK FOOTER\n// external \"js-yaml\"\n// module id = 5\n// module chunks = 0\n//# sourceURL=webpack:///external_%22js-yaml%22?");

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	eval("/// <reference path=\"../../typings/index.d.ts\" />\n\"use strict\";\n\nconst fs_1 = __webpack_require__(3);\nconst fileExists = fileName => {\n    try {\n        fs_1.accessSync(fileName, fs_1.constants.F_OK);\n        return true;\n    } catch (e) {\n        return false;\n    }\n};\nexports.fileExists = fileExists;\nconst getNestedValue = (obj, ...keys) => {\n    if (keys.length === 1) {\n        return obj[keys[0]];\n    } else {\n        let value = obj;\n        let i = 0;\n        while (typeof value != 'undefined' && i < keys.length) {\n            value = value[keys[i++]];\n        }\n        return value;\n    }\n};\nexports.getNestedValue = getNestedValue;\nconst isFile = fileName => {\n    if (fileExists(fileName)) {\n        return fs_1.lstatSync(fileName).isFile();\n    }\n    return false;\n};\nexports.isFile = isFile;\nconst isDirectory = fileName => {\n    if (fileExists(fileName)) {\n        return !isFile(fileName);\n    }\n    return false;\n};\nexports.isDirectory = isDirectory;\nconst setNestedValue = (obj, value, ...keys) => {\n    let objSubtree = obj;\n    let finalKey;\n    while (keys.length > 0) {\n        if (finalKey) {\n            objSubtree = objSubtree[finalKey];\n        }\n        let key = keys[0];\n        keys = keys.slice(1);\n        if (objSubtree[key] === undefined || typeof objSubtree[key] != \"object\") {\n            objSubtree[key] = {};\n        }\n        finalKey = key;\n    }\n    objSubtree[finalKey] = value;\n    return obj;\n};\nexports.setNestedValue = setNestedValue;\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/core/Utils.ts\n// module id = 6\n// module chunks = 0\n//# sourceURL=webpack:///./src/core/Utils.ts?");

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	eval("\"use strict\";\n\nconst Creator_1 = __webpack_require__(8);\nexports.Creator = Creator_1.default;\nconst Entrypoint_1 = __webpack_require__(12);\nexports.Entrypoint = Entrypoint_1.default;\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/cli/index.ts\n// module id = 7\n// module chunks = 0\n//# sourceURL=webpack:///./src/cli/index.ts?");

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	eval("/// <reference path=\"../../typings/index.d.ts\" />\n\"use strict\";\n\nconst argparse_1 = __webpack_require__(9);\nconst commands = __webpack_require__(10);\nconst pack = __webpack_require__(11);\nclass Creator {\n    constructor() {}\n    createArgumentParser() {\n        let argumentParser = new argparse_1.ArgumentParser({\n            version: pack.version,\n            description: pack.description,\n            addHelp: true\n        });\n        let rootProperties = commands;\n        this.addSubparser(argumentParser, rootProperties);\n        return argumentParser;\n    }\n    addSubparser(rootParser, properties) {\n        let { title, dest, commands } = properties;\n        let subparser = rootParser.addSubparsers({\n            title,\n            dest\n        });\n        if (commands) {\n            commands.forEach(command => {\n                this.addCommand(subparser, command);\n            });\n        }\n    }\n    addCommand(subparser, command) {\n        let { id, args, sub } = command;\n        delete command.args;\n        delete command.sub;\n        delete command.id;\n        let parser = subparser.addParser(id, command);\n        if (args) {\n            args.forEach(arg => {\n                this.addArgument(parser, arg);\n            });\n        }\n        if (sub) this.addSubparser(parser, sub);\n    }\n    addArgument(parser, argument) {\n        let { id } = argument;\n        delete argument.id;\n        parser.addArgument(id, argument);\n    }\n}\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.default = Creator;\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/cli/Creator.ts\n// module id = 8\n// module chunks = 0\n//# sourceURL=webpack:///./src/cli/Creator.ts?");

/***/ },
/* 9 */
/***/ function(module, exports) {

	eval("module.exports = require(\"argparse\");\n\n//////////////////\n// WEBPACK FOOTER\n// external \"argparse\"\n// module id = 9\n// module chunks = 0\n//# sourceURL=webpack:///external_%22argparse%22?");

/***/ },
/* 10 */
/***/ function(module, exports) {

	eval("module.exports = {\n\t\"title\": \"Actions\",\n\t\"dest\": \"action\",\n\t\"commands\": [\n\t\t{\n\t\t\t\"id\": \"generate\",\n\t\t\t\"addHelp\": true,\n\t\t\t\"aliases\": [\n\t\t\t\t\"g\"\n\t\t\t],\n\t\t\t\"help\": \"Generate an element.\",\n\t\t\t\"args\": [\n\t\t\t\t{\n\t\t\t\t\t\"id\": [\n\t\t\t\t\t\t\"name\"\n\t\t\t\t\t],\n\t\t\t\t\t\"help\": \"Start the server attached to the cli process.\"\n\t\t\t\t},\n\t\t\t\t{\n\t\t\t\t\t\"id\": [\n\t\t\t\t\t\t\"values\"\n\t\t\t\t\t],\n\t\t\t\t\t\"help\": \"Values to be replaced from template variables.\",\n\t\t\t\t\t\"nargs\": \"*\"\n\t\t\t\t}\n\t\t\t]\n\t\t},\n\t\t{\n\t\t\t\"id\": \"list\",\n\t\t\t\"addHelp\": true,\n\t\t\t\"aliases\": [\n\t\t\t\t\"l\",\n\t\t\t\t\"ls\"\n\t\t\t],\n\t\t\t\"help\": \"List all available templates.\"\n\t\t}\n\t]\n};\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/cli/commands.yml\n// module id = 10\n// module chunks = 0\n//# sourceURL=webpack:///./src/cli/commands.yml?");

/***/ },
/* 11 */
/***/ function(module, exports) {

	eval("module.exports = {\n\t\"name\": \"ska\",\n\t\"version\": \"0.0.1\",\n\t\"description\": \"Scaffolding CLI tool\",\n\t\"main\": \"lib/index.js\",\n\t\"scripts\": {\n\t\t\"test\": \"npm test\"\n\t},\n\t\"bin\": \"bin/ska\",\n\t\"repository\": {\n\t\t\"type\": \"git\",\n\t\t\"url\": \"git+https://github.com/Wufe/ska.git\"\n\t},\n\t\"keywords\": [\n\t\t\"scaffolding\",\n\t\t\"ska\",\n\t\t\"template\"\n\t],\n\t\"author\": \"Simone Bembi <simone.bembi@gmail.com>\",\n\t\"license\": \"MIT\",\n\t\"bugs\": {\n\t\t\"url\": \"https://github.com/Wufe/ska/issues\"\n\t},\n\t\"homepage\": \"https://github.com/Wufe/ska#readme\",\n\t\"devDependencies\": {\n\t\t\"babel-core\": \"^6.18.2\",\n\t\t\"babel-loader\": \"^6.2.8\",\n\t\t\"json-loader\": \"^0.5.4\",\n\t\t\"mocha\": \"^3.1.2\",\n\t\t\"should\": \"^11.1.1\",\n\t\t\"ts-loader\": \"^1.2.2\",\n\t\t\"ts-node\": \"^1.7.0\",\n\t\t\"typings\": \"^2.0.0\",\n\t\t\"webpack\": \"^1.13.3\",\n\t\t\"webpack-node-externals\": \"^1.5.4\",\n\t\t\"yaml-loader\": \"^0.4.0\"\n\t},\n\t\"dependencies\": {\n\t\t\"argparse\": \"^1.0.9\",\n\t\t\"chalk\": \"^1.1.3\",\n\t\t\"js-yaml\": \"^3.7.0\"\n\t}\n};\n\n//////////////////\n// WEBPACK FOOTER\n// ./package.json\n// module id = 11\n// module chunks = 0\n//# sourceURL=webpack:///./package.json?");

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	eval("/// <reference path=\"../../typings/index.d.ts\" />\n\"use strict\";\n\nconst _1 = __webpack_require__(7);\nconst core_1 = __webpack_require__(1);\nconst chalk_1 = __webpack_require__(13);\nclass Entrypoint {\n    constructor() {}\n    setup() {\n        let creator = new _1.Creator();\n        this.argumentParser = creator.createArgumentParser();\n    }\n    parseArgs() {\n        this.args = this.argumentParser.parseArgs();\n    }\n    getConfiguration() {\n        let configuration = new core_1.Configuration();\n        configuration.get();\n    }\n    run() {\n        try {\n            this.setup();\n            this.parseArgs();\n            this.getConfiguration();\n        } catch (error) {\n            console.error(chalk_1.red(error.message));\n        }\n    }\n}\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.default = Entrypoint;\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/cli/Entrypoint.ts\n// module id = 12\n// module chunks = 0\n//# sourceURL=webpack:///./src/cli/Entrypoint.ts?");

/***/ },
/* 13 */
/***/ function(module, exports) {

	eval("module.exports = require(\"chalk\");\n\n//////////////////\n// WEBPACK FOOTER\n// external \"chalk\"\n// module id = 13\n// module chunks = 0\n//# sourceURL=webpack:///external_%22chalk%22?");

/***/ }
/******/ ])
});
;