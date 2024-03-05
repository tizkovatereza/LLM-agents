"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makePullRequest = exports.commit = exports.readFile = exports.listFiles = exports.saveContentToFile = exports.createDirectory = exports.REPO_DIRECTORY = void 0;
var path_1 = require("path");
exports.REPO_DIRECTORY = '/home/user/repo';
function createDirectory(sandbox, _a) {
    var directory = _a.directory;
    return __awaiter(this, void 0, void 0, function () {
        var e_1, error;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log("Creating directory", directory);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, sandbox.filesystem.makeDir(directory)];
                case 2:
                    _b.sent();
                    return [2 /*return*/, 'success'];
                case 3:
                    e_1 = _b.sent();
                    error = "Error: ".concat(e_1.message);
                    console.error(error);
                    return [2 /*return*/, error];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.createDirectory = createDirectory;
function saveContentToFile(sandbox, _a) {
    var content = _a.content, filePath = _a.filePath;
    return __awaiter(this, void 0, void 0, function () {
        var dir, e_2, error;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log("Saving content to", filePath);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    dir = path_1.default.dirname(filePath);
                    return [4 /*yield*/, sandbox.filesystem.makeDir(dir)];
                case 2:
                    _b.sent();
                    return [4 /*yield*/, sandbox.filesystem.write(filePath, content)];
                case 3:
                    _b.sent();
                    return [2 /*return*/, 'success'];
                case 4:
                    e_2 = _b.sent();
                    error = "Error: ".concat(e_2.message);
                    console.error(error);
                    return [2 /*return*/, error];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.saveContentToFile = saveContentToFile;
function listFiles(sandbox, _a) {
    var dirPath = _a.dirPath;
    return __awaiter(this, void 0, void 0, function () {
        var files, e_3, error;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log("Listing files on path", dirPath);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, sandbox.filesystem.list(dirPath)];
                case 2:
                    files = _b.sent();
                    return [2 /*return*/, files.map(function (file) {
                            return file.isDir ? "dir: ".concat(file.name) : file.name;
                        }).join('\n')];
                case 3:
                    e_3 = _b.sent();
                    error = "Error: ".concat(e_3.message);
                    console.error(error);
                    return [2 /*return*/, error];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.listFiles = listFiles;
function readFile(sandbox, _a) {
    var filePath = _a.filePath;
    return __awaiter(this, void 0, void 0, function () {
        var e_4, error;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log("Reading file on path", filePath);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, sandbox.filesystem.read(filePath)];
                case 2: return [2 /*return*/, _b.sent()]; // Updated parameter name
                case 3:
                    e_4 = _b.sent();
                    error = "Error: ".concat(e_4.message);
                    console.error(error);
                    return [2 /*return*/, error];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.readFile = readFile;
function commit(sandbox, _a) {
    var commitMessage = _a.commitMessage;
    return __awaiter(this, void 0, void 0, function () {
        var gitAddProc, error, commitProc, error, e_5, error;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log("Committing with the message", commitMessage);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, sandbox.process.startAndWait("git -C ".concat(exports.REPO_DIRECTORY, " add ."))];
                case 2:
                    gitAddProc = _b.sent();
                    if (gitAddProc.exitCode != 0) {
                        error = "Error adding files to staging: ".concat(gitAddProc.stdout, "\n\t").concat(gitAddProc.stderr);
                        console.error(error);
                        return [2 /*return*/, error];
                    }
                    return [4 /*yield*/, sandbox.process.startAndWait("git -C ".concat(exports.REPO_DIRECTORY, " commit -m \"").concat(commitMessage, "\""))];
                case 3:
                    commitProc = _b.sent();
                    if (commitProc.exitCode != 0) {
                        error = "Error committing changes: ".concat(commitProc.stdout, "\n\t").concat(commitProc.stderr);
                        console.error(error);
                        return [2 /*return*/, error];
                    }
                    return [2 /*return*/, 'success'];
                case 4:
                    e_5 = _b.sent();
                    error = "Error: ".concat(e_5.message);
                    console.error(error);
                    return [2 /*return*/, error];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.commit = commit;
function makePullRequest(sandbox, args) {
    return __awaiter(this, void 0, void 0, function () {
        var REPO_DIRECTORY, baseBranch, randomLetters, newBranchName, title, body, gitCheckoutProc, error, gitPushProc, error, ghPullRequestProc, error, e_6, error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    REPO_DIRECTORY = '/home/user/repo';
                    baseBranch = 'main';
                    randomLetters = Array.from({ length: 5 }, function () {
                        return String.fromCharCode(65 + Math.floor(Math.random() * 26));
                    }).join('');
                    newBranchName = "ai-developer-".concat(randomLetters);
                    title = args.title;
                    body = '';
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    console.log('Making a pull request', "from '".concat(newBranchName, "' to '").concat(baseBranch, "'"));
                    return [4 /*yield*/, sandbox.process.startAndWait("git -C ".concat(REPO_DIRECTORY, " checkout -b ").concat(newBranchName))];
                case 2:
                    gitCheckoutProc = _a.sent();
                    if (gitCheckoutProc.exitCode !== 0) {
                        error = "Error creating a new git branch ".concat(newBranchName, ": ").concat(gitCheckoutProc.stdout, "\n\t").concat(gitCheckoutProc.stderr);
                        console.error(error);
                        return [2 /*return*/, error];
                    }
                    return [4 /*yield*/, sandbox.process.startAndWait("git -C ".concat(REPO_DIRECTORY, " push -u origin ").concat(newBranchName))];
                case 3:
                    gitPushProc = _a.sent();
                    if (gitPushProc.exitCode !== 0) {
                        error = "Error pushing changes: ".concat(gitPushProc.stdout, "\n\t").concat(gitPushProc.stderr);
                        console.error(error);
                        return [2 /*return*/, error];
                    }
                    sandbox.cwd = REPO_DIRECTORY;
                    return [4 /*yield*/, sandbox.process.startAndWait("gh pr create --base \"".concat(baseBranch, "\" --head \"").concat(newBranchName, "\" --title \"").concat(title, "\" --body \"").concat(body.replace(/"/g, '\\"'), "\""))];
                case 4:
                    ghPullRequestProc = _a.sent();
                    if (ghPullRequestProc.exitCode !== 0) {
                        error = "Error creating pull request: ".concat(ghPullRequestProc.stdout, "\n\t").concat(ghPullRequestProc.stderr);
                        console.error(error);
                        return [2 /*return*/, error];
                    }
                    return [2 /*return*/, 'success'];
                case 5:
                    e_6 = _a.sent();
                    error = "Error: ".concat(e_6.message);
                    console.error(error);
                    return [2 /*return*/, error];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.makePullRequest = makePullRequest;
