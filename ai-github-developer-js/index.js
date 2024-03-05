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
require("dotenv/config");
var openai_1 = require("openai");
var sdk_1 = require("@e2b/sdk");
var actions_1 = require("./actions");
var ReadLine = require('readline-promises');
var node_fetch_1 = require("node-fetch");
var node_fetch_2 = require("node-fetch");
var rl = new ReadLine();
global.fetch = global.fetch || node_fetch_1.default;
global.Headers = global.Headers || node_fetch_2.Headers;
var openai = new openai_1.default();
var AI_ASSISTANT_ID = process.env.AI_ASSISTANT_ID;
function sleep(time) {
    return new Promise(function (resolve) { return setTimeout(resolve, time); });
}
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var sandbox, promptUserForAuth, setupGit, promptUserForGitHubRepo, promptUserForTask, cloneRepoInSandbox, main;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, sdk_1.Sandbox.create({
                    onStdout: console.log,
                    onStderr: console.error,
                })];
            case 1:
                sandbox = _a.sent();
                sandbox
                    .addAction(actions_1.createDirectory)
                    .addAction(actions_1.readFile)
                    .addAction(actions_1.saveContentToFile)
                    .addAction(actions_1.listFiles)
                    .addAction(actions_1.commit)
                    .addAction(actions_1.makePullRequest);
                return [4 /*yield*/, sandbox.keepAlive(2 * 60 * 1000)];
            case 2:
                _a.sent();
                promptUserForAuth = function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, rl.Question('Provide GitHub token with following permissions:\n\n\u2022 read:org\n\u2022 read:project\n\u2022 repo\n\nFind or create your token at https://github.com/settings/tokens\n\nToken:\n')];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    });
                }); };
                setupGit = function (userGitHubToken) { return __awaiter(void 0, void 0, void 0, function () {
                    var proc, gitProc;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                console.log('Logging into GitHub...');
                                // Identify AI developer in git
                                return [4 /*yield*/, sandbox.process.startAndWait("git config --global user.email 'ai-developer@email.com'")];
                            case 1:
                                // Identify AI developer in git
                                _a.sent();
                                return [4 /*yield*/, sandbox.process.startAndWait("git config --global user.name 'AI Developer'")];
                            case 2:
                                _a.sent();
                                return [4 /*yield*/, sandbox.process.startAndWait("echo ".concat(userGitHubToken, " | gh auth login --with-token"))];
                            case 3:
                                proc = _a.sent();
                                if (proc.exitCode !== 0) {
                                    console.error('[Sandbox] Error: Unable to log into GitHub');
                                    console.error(proc.stderr);
                                    console.error(proc.stdout);
                                    process.exit(1);
                                }
                                return [4 /*yield*/, sandbox.process.startAndWait('gh auth setup-git')];
                            case 4:
                                gitProc = _a.sent();
                                if (gitProc.exitCode !== 0) {
                                    console.error('[Sandbox] Error: Unable to set up Git auth with GitHub');
                                    console.error(gitProc.stderr);
                                    console.error(gitProc.stdout);
                                    process.exit(1);
                                }
                                else {
                                    console.log('\n✅ Logged in');
                                }
                                return [2 /*return*/];
                        }
                    });
                }); };
                promptUserForGitHubRepo = function () { return __awaiter(void 0, void 0, void 0, function () {
                    var userRepo;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, rl.Question('What GitHub repo do you want to work in? Specify it like this: your_username/your_repo_name\n')];
                            case 1:
                                userRepo = _a.sent();
                                console.log('\n🔄 Cloning the repo...');
                                return [2 /*return*/, "https://github.com/".concat(userRepo === null || userRepo === void 0 ? void 0 : userRepo.trim(), ".git")];
                        }
                    });
                }); };
                promptUserForTask = function (repoUrl) { return __awaiter(void 0, void 0, void 0, function () {
                    var userTaskSpecification, userTask;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, rl.Question('What do you want to do?\n')];
                            case 1:
                                userTaskSpecification = _a.sent();
                                userTask = "Please work with the codebase repo called ".concat(repoUrl, " that is cloned in the /home/user/repo directory. React on the following user's comment: ").concat(userTaskSpecification);
                                console.log('\n');
                                return [2 /*return*/, userTask];
                        }
                    });
                }); };
                cloneRepoInSandbox = function (sandbox, repoUrl) { return __awaiter(void 0, void 0, void 0, function () {
                    var gitCloneProc;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, sandbox.process.startAndWait("git clone ".concat(repoUrl, " ").concat(actions_1.REPO_DIRECTORY))];
                            case 1:
                                gitCloneProc = _a.sent();
                                if (gitCloneProc.exitCode !== 0) {
                                    console.log('[Sandbox] Error: Unable to clone the repo');
                                    process.exit(1);
                                }
                                return [2 /*return*/];
                        }
                    });
                }); };
                main = function () { return __awaiter(void 0, void 0, void 0, function () {
                    var userGitHubToken, repoUrl, userTask, thread, run, spinner, outputs, messages, textMessages;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                userGitHubToken = process.env.GITHUB_TOKEN;
                                if (!!userGitHubToken) return [3 /*break*/, 2];
                                return [4 /*yield*/, promptUserForAuth()];
                            case 1:
                                userGitHubToken = _a.sent();
                                return [3 /*break*/, 3];
                            case 2:
                                console.log('\n✅ GitHub token loaded\n');
                                _a.label = 3;
                            case 3: 
                            // Setup git right away so user knows immediately if they passed wrong token
                            return [4 /*yield*/, setupGit(userGitHubToken)];
                            case 4:
                                // Setup git right away so user knows immediately if they passed wrong token
                                _a.sent();
                                return [4 /*yield*/, promptUserForGitHubRepo()];
                            case 5:
                                repoUrl = _a.sent();
                                return [4 /*yield*/, cloneRepoInSandbox(sandbox, repoUrl)];
                            case 6:
                                _a.sent();
                                _a.label = 7;
                            case 7:
                                if (!true) return [3 /*break*/, 21];
                                return [4 /*yield*/, promptUserForTask(repoUrl)];
                            case 8:
                                userTask = _a.sent();
                                return [4 /*yield*/, openai.beta.threads.create({
                                        messages: [
                                            {
                                                role: 'user',
                                                content: "Carefully plan this task and start working on it: ".concat(userTask, " in the ").concat(repoUrl, " repo"),
                                            },
                                        ],
                                    })];
                            case 9:
                                thread = _a.sent();
                                return [4 /*yield*/, openai.beta.threads.runs.create(thread.id, { assistant_id: AI_ASSISTANT_ID })];
                            case 10:
                                run = _a.sent();
                                spinner = '';
                                _a.label = 11;
                            case 11:
                                if (!true) return [3 /*break*/, 20];
                                if (!(run.status === 'requires_action')) return [3 /*break*/, 15];
                                return [4 /*yield*/, sandbox.openai.actions.run(run)];
                            case 12:
                                outputs = _a.sent();
                                if (!(outputs.length > 0)) return [3 /*break*/, 14];
                                return [4 /*yield*/, openai.beta.threads.runs.submitToolOutputs(thread.id, run.id, { tool_outputs: outputs })];
                            case 13:
                                _a.sent();
                                _a.label = 14;
                            case 14: return [3 /*break*/, 18];
                            case 15:
                                if (!(run.status === 'completed')) return [3 /*break*/, 17];
                                console.log('\n✅ Run completed');
                                return [4 /*yield*/, openai.beta.threads.messages.list(thread.id)];
                            case 16:
                                messages = (_a.sent()).data[0].content;
                                textMessages = messages.filter(function (message) { return message.type === 'text'; });
                                // @ts-ignore
                                console.log('Thread finished:', textMessages[0].text.value);
                                return [3 /*break*/, 20];
                            case 17:
                                if (run.status === 'queued' || run.status === 'in_progress') {
                                    // Do nothing, wait for completion
                                }
                                else if (run.status === 'cancelled' ||
                                    run.status === 'cancelling' ||
                                    run.status === 'expired' ||
                                    run.status === 'failed') {
                                    return [3 /*break*/, 20];
                                }
                                _a.label = 18;
                            case 18: return [4 /*yield*/, openai.beta.threads.runs.retrieve(thread.id, run.id)];
                            case 19:
                                run = _a.sent();
                                sleep(500);
                                return [3 /*break*/, 11];
                            case 20: return [3 /*break*/, 7];
                            case 21: return [2 /*return*/];
                        }
                    });
                }); };
                return [4 /*yield*/, main()];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })();
