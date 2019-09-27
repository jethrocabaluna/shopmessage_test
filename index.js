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
        while (_) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var puppeteer_1 = __importDefault(require("puppeteer"));
var minimist_1 = __importDefault(require("minimist"));
var argv = minimist_1.default(process.argv.slice(2));
function validateCredentials() {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(argv.username).toLowerCase()) && argv.password.length >= 8;
}
function login(page) {
    return __awaiter(this, void 0, void 0, function () {
        var emailHandle, passwordHandle, submitHandle;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, page.goto('https://dev2.shopmessage.me/shopmessage/login', { waitUntil: 'networkidle2' })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, page.waitForSelector('button[type="submit"]', {
                            visible: true,
                        })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, page.$('input[name="email"]')];
                case 3:
                    emailHandle = _a.sent();
                    return [4 /*yield*/, page.$('input[name="password"]')];
                case 4:
                    passwordHandle = _a.sent();
                    return [4 /*yield*/, page.$('button[type="submit"]')];
                case 5:
                    submitHandle = _a.sent();
                    if (emailHandle === null || passwordHandle === null || submitHandle === null)
                        return [2 /*return*/];
                    return [4 /*yield*/, emailHandle.type(argv.username)];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, passwordHandle.type(argv.password)];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, page.screenshot({ path: './screenshots/login.png' })];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, Promise.all([
                            submitHandle.click(),
                            page.waitForNavigation({ waitUntil: 'networkidle2' })
                        ])];
                case 9:
                    _a.sent();
                    return [4 /*yield*/, page.screenshot({ path: './screenshots/submit.png' })];
                case 10:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function goToDashboard(page, url, id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, page.goto(url, { waitUntil: 'networkidle2' })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, page.waitForSelector("a[href=\"/" + id + "/dashboard/overview/plugins\"] span", {
                            visible: true,
                        })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, page.screenshot({ path: './screenshots/dashboard.png' })];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function navigateGrowthPlugins(page, url, id) {
    return __awaiter(this, void 0, void 0, function () {
        var linkHandle;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, page.$("a[href=\"/" + id + "/dashboard/overview/plugins\"]")];
                case 1:
                    linkHandle = _a.sent();
                    if (linkHandle === null)
                        return [2 /*return*/];
                    return [4 /*yield*/, Promise.all([
                            linkHandle.click(),
                            page.waitForNavigation({ waitUntil: 'networkidle2' })
                        ])];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, page.waitForSelector('button.ant-btn.ant-btn-primary', {
                            visible: true,
                        })];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, page.screenshot({ path: './screenshots/growth_plugins.png' })];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, Promise.all([
                            page.click('button.ant-btn.ant-btn-primary'),
                            page.waitForNavigation({ waitUntil: 'networkidle2' })
                        ])];
                case 5:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function createModal(page) {
    return __awaiter(this, void 0, void 0, function () {
        var today, modalTitle;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, page.waitForSelector('strong.gp-card-title', {
                        visible: true,
                    })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, page.screenshot({ path: './screenshots/create_modal.png' })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, Promise.all([
                            page.click('.ant-card.gp-card.ant-card-bordered'),
                            page.waitForNavigation({ waitUntil: 'networkidle2' })
                        ])];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, page.waitForSelector('.ant-col-8:nth-child(2) .strategyTile.modal img', {
                            visible: true,
                        })];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, page.screenshot({ path: './screenshots/modal_selections.png' })];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, page.click('.ant-col-8:nth-child(2) .strategyTile.modal')];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, page.waitForSelector('.ant-form.ant-form-vertical.ant-form-hide-required-mark input', {
                            visible: true,
                        })];
                case 7:
                    _a.sent();
                    today = new Date();
                    modalTitle = " - " + today.getFullYear() + "." + (today.getMonth() + 1) + "." + today.getDate() + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                    return [4 /*yield*/, page.type('.ant-form.ant-form-vertical.ant-form-hide-required-mark input', modalTitle)];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, page.screenshot({ path: './screenshots/modal_naming.png' })];
                case 9:
                    _a.sent();
                    return [4 /*yield*/, Promise.all([
                            page.click('.ant-modal-content .ant-btn.ant-btn-primary'),
                            page.waitForNavigation({ waitUntil: 'networkidle2' })
                        ])];
                case 10:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function selectBlue(page) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, page.waitForSelector('#cta_button\\[color\\]', {
                        visible: true,
                    })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, page.$eval('#cta_button\\[color\\]', function (el) {
                            el.scrollIntoView();
                            window.scrollBy(0, -300);
                        })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, page.$eval('#cta_button\\[color\\] .ant-select-selection-selected-value', function (el) {
                            el.textContent = 'Blue';
                            el.setAttribute('title', 'Blue');
                        })];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, page.screenshot({ path: './screenshots/select_blue.png' })];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function changeBehavior(page) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.all([
                        page.click('.plugin-editor-tab .ant-tabs-tab:nth-child(2)'),
                        page.waitForNavigation({ waitUntil: 'networkidle2' })
                    ])];
                case 1:
                    _a.sent();
                    // .ant-tag.ant-tag-green.ant-dropdown-trigger.m-r-md.rule-options.rule-ctr
                    return [4 /*yield*/, page.click('.ant-tag.ant-tag-green.ant-dropdown-trigger.m-r-md.rule-options.rule-ctr')];
                case 2:
                    // .ant-tag.ant-tag-green.ant-dropdown-trigger.m-r-md.rule-options.rule-ctr
                    _a.sent();
                    return [4 /*yield*/, page.screenshot({ path: './screenshots/select_timing.png' })];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, page.click('.ant-dropdown.ant-dropdown-placement-bottomLeft:not([class*=hidden]) .ant-dropdown-menu-item:nth-child(3)')];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, page.screenshot({ path: './screenshots/changed_timing.png' })];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, page.click('.shopmsg-header.shopmsg-header-wide.shopmsg-header-inverted.ant-layout-header .ant-btn.ant-btn-primary')];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, page.waitForSelector('.ant-message-custom-content.ant-message-success', {
                            visible: true,
                        })];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, page.screenshot({ path: './screenshots/saved_modal.png' })];
                case 8:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function publish(page) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.all([
                        page.click('.shopmsg-header.shopmsg-header-wide.ant-layout-header .ant-btn.ant-btn-primary'),
                        page.waitForNavigation({ waitUntil: 'networkidle2' })
                    ])];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, page.click('.shopmsg-header.shopmsg-header-wide.ant-layout-header .ant-btn.ant-btn-primary')];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, page.waitForSelector('.ant-modal-content .ant-btn.ant-btn-primary', {
                            visible: true,
                        })];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, page.screenshot({ path: './screenshots/publish_modal.png' })];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, page.click('.ant-modal-content .ant-btn.ant-btn-primary')];
                case 5:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
if (!validateCredentials()) {
    throw new Error('Invalid Credentials');
}
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var browser, page, dashboardUrl, id;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, puppeteer_1.default.launch({ headless: false })];
            case 1:
                browser = _a.sent();
                return [4 /*yield*/, browser.newPage()];
            case 2:
                page = _a.sent();
                return [4 /*yield*/, login(page)];
            case 3:
                _a.sent();
                dashboardUrl = page.url().replace('app', 'dev2').replace('/wizard/connect', '/dashboard');
                id = dashboardUrl.split('/')[3];
                return [4 /*yield*/, goToDashboard(page, dashboardUrl, id)];
            case 4:
                _a.sent();
                return [4 /*yield*/, navigateGrowthPlugins(page, dashboardUrl, id)];
            case 5:
                _a.sent();
                return [4 /*yield*/, createModal(page)];
            case 6:
                _a.sent();
                return [4 /*yield*/, selectBlue(page)];
            case 7:
                _a.sent();
                return [4 /*yield*/, changeBehavior(page)];
            case 8:
                _a.sent();
                return [4 /*yield*/, publish(page)];
            case 9:
                _a.sent();
                return [4 /*yield*/, browser.close()];
            case 10:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })();
