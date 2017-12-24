/******/ (function(modules) { // webpackBootstrap
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
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var matrixToolkit = {
    makeRow: function makeRow() {
        var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

        return new Array(9).fill(v);
    },
    makeMatrix: function makeMatrix() {
        var _this = this;

        var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

        return Array.from({
            length: 9
        }, function () {
            return _this.makeRow(v);
        });
    },


    /**
     * Fisher-Yates 洗牌算法
     */
    shuffle: function shuffle(array) {
        var endIndex = array.length - 2;
        for (var i = 0; i < endIndex; i++) {
            var j = i + Math.floor(Math.random() * (array.length - i));
            var _ref = [array[j], array[i]];
            array[i] = _ref[0];
            array[j] = _ref[1];
        }
        return array;
    },
    checkFillable: function checkFillable(matrix, n, rowIndex, colIndex) {
        var row = matrix[rowIndex];
        var col = this.makeRow().map(function (v, i) {
            return matrix[i][colIndex];
        });

        var _boxToolkit$convertTo = boxToolkit.convertToBoxIndex(rowIndex, colIndex),
            boxIndex = _boxToolkit$convertTo.boxIndex;

        var box = boxToolkit.getBoxCells(matrix, boxIndex);
        for (var i = 0; i < 9; i++) {
            if (row[i] === n || col[i] === n || box[i] === n) return false;
        }
        return true;
    }
};

var boxToolkit = {
    convertToBoxIndex: function convertToBoxIndex(rowIndex, colIndex) {
        return {
            boxIndex: Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3),
            cellIndex: rowIndex % 3 * 3 + colIndex % 3
        };
    },
    convertFromBoxIndex: function convertFromBoxIndex(boxIndex, cellIndex) {
        return {
            rowIndex: Math.floor(boxIndex / 3) * 3 + Math.floor(cellIndex / 3),
            colIndex: boxIndex % 3 * 3 + cellIndex % 3
        };
    },
    getBoxCells: function getBoxCells(matrix, boxIndex) {
        var startRowIndex = Math.floor(boxIndex / 3) * 3;
        var startColIndex = boxIndex % 3 * 3;
        var result = [];
        for (var cellIndex = 0; cellIndex < 9; cellIndex++) {
            var rowIndex = startRowIndex + Math.floor(cellIndex / 3);
            var colIndex = startColIndex + cellIndex % 3;
            result.push(matrix[rowIndex][colIndex]);
        }
        return result;
    }
};

module.exports = function () {
    function Toolkit() {
        _classCallCheck(this, Toolkit);
    }

    _createClass(Toolkit, null, [{
        key: "matrix",
        get: function get() {
            return matrixToolkit;
        }
    }, {
        key: "box",
        get: function get() {
            return boxToolkit;
        }
    }]);

    return Toolkit;
}();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Grid = __webpack_require__(2);
var PopupNumbers = __webpack_require__(6);

var grid = new Grid($('#container'));
grid.build();
grid.layout();

var popupNumbers = new PopupNumbers($('#popuNumbers'));
grid.bindPopup(popupNumbers);

$('#check').on('click', function (e) {
    grid.check();
});

$('#reset').on('click', function (e) {
    grid.reset();
});

$('#clear').on('click', function (e) {
    grid.clear();
});

$('#rebuild').on('click', function (e) {
    grid.rebuild();
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//生成九宫格
var Toolkit = __webpack_require__(0);
// const Generator = require('../core/generator')
var Sudoku = __webpack_require__(3);
var Checker = __webpack_require__(5);

var Grid = function () {
    function Grid(container) {
        _classCallCheck(this, Grid);

        this._$container = container;
    }

    _createClass(Grid, [{
        key: 'build',
        value: function build() {

            // const gen = new Generator()
            // gen.generator()
            // const matrix = gen.matrix  //Toolkit.matrix.makeMatrix()
            var sudoku = new Sudoku();
            sudoku.make();
            var matrix = sudoku.puzzleMatrix; //Toolkit.matrix.makeMatrix()

            var rowGroupClasses = ['row-g-top', 'row-g-midle', 'row-g-bottom'];
            var colGroupClasses = ['col-g-left', 'col-g-center', 'col-g-right'];

            var $cells = matrix.map(function (rowValue) {
                return rowValue.map(function (cellValue, colIndex) {
                    return $('<span>').addClass(colGroupClasses[colIndex % 3]).addClass(cellValue ? 'fixed' : 'empty').text(cellValue);
                });
            });

            var $divArray = $cells.map(function ($spanArray, rowIndex) {
                return $('<div>').addClass('row').addClass(rowGroupClasses[rowIndex % 3]).append($spanArray);
            });

            this._$container.append($divArray);
        }
    }, {
        key: 'layout',
        value: function layout() {
            var width = $('span:first', this._$container).width();
            $('span', this._$container).height(width).css({
                "line-height": width + 'px',
                "font-size": width < 32 ? width / 2 + 'px' : ''
            });
        }
    }, {
        key: 'rebuild',
        value: function rebuild() {
            this._$container.empty();
            this.build();
            this.layout();
        }
    }, {
        key: 'check',
        value: function check() {
            var $rows = this._$container.children();
            var data = $rows.map(function (rowIndex, div) {
                return $(div).children().map(function (colIndex, span) {
                    return parseInt($(span).text()) || 0;
                });
            }).toArray().map(function ($data) {
                return $data.toArray();
            });

            var checker = new Checker(data);
            if (checker.check()) return true;

            // 检查不成功，进行标记
            var marks = checker.matrixMarks;
            this._$container.children().each(function (rowIndex, div) {
                $(div).children().each(function (colIndex, span) {
                    var $span = $(span);
                    if ($span.is('.fixed') || marks[rowIndex][colIndex]) {
                        $span.removeClass('error');
                    } else {
                        $span.addClass('error');
                    }
                });
            });
        }
    }, {
        key: 'reset',
        value: function reset() {
            this._$container.find('span:not(.fixed)').removeClass('error mark1 mark2').addClass('empty').text(0);
        }

        // 清理错误标记

    }, {
        key: 'clear',
        value: function clear() {
            this._$container.find('span.error').removeClass('error');
        }
    }, {
        key: 'bindPopup',
        value: function bindPopup(popupNumbers) {
            this._$container.on('click', 'span', function (e) {
                var $cell = $(e.target);
                if ($cell.is('.fixed')) return;
                popupNumbers.popup($cell);
            });
        }
    }]);

    return Grid;
}();

module.exports = Grid;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// 生成数独游戏
// 1、生成完成的游戏
// 2、生成数独迷盘

var Generator = __webpack_require__(4);

module.exports = function () {
    function Sudoku() {
        _classCallCheck(this, Sudoku);

        var gen = new Generator();
        gen.generator();
        this.solutionMatrix = gen.matrix;
    }

    _createClass(Sudoku, [{
        key: 'make',
        value: function make() {
            var level = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 5;

            this.puzzleMatrix = this.solutionMatrix.map(function (row) {
                return row.map(function (cell) {
                    return Math.random() * 9 < level ? 0 : cell;
                });
            });
        }
    }]);

    return Sudoku;
}();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//生成数据解决方案
var Toolkit = __webpack_require__(0);

var Generator = function () {
    function Generator() {
        _classCallCheck(this, Generator);
    }

    _createClass(Generator, [{
        key: 'generator',
        value: function generator() {
            while (!this.internalGenerator()) {}
        }
    }, {
        key: 'internalGenerator',
        value: function internalGenerator() {
            this.matrix = Toolkit.matrix.makeMatrix();
            this.orders = Toolkit.matrix.makeMatrix().map(function (row) {
                return row.map(function (v, i) {
                    return i;
                });
            }).map(function (row) {
                return Toolkit.matrix.shuffle(row);
            });

            for (var n = 1; n <= 9; n++) {
                if (!this.fillNumber(n)) return false;
            }

            return true;
        }
    }, {
        key: 'fillNumber',
        value: function fillNumber(n) {
            return this.fillRow(n, 0);
        }
    }, {
        key: 'fillRow',
        value: function fillRow(n, rowIndex) {
            if (rowIndex > 8) return true;

            var row = this.matrix[rowIndex];
            var orders = this.orders[rowIndex];

            for (var i = 0; i < 9; i++) {
                var colIndex = orders[i];
                //当前单元格不为空
                if (row[colIndex]) continue;
                //当前行不能填写
                if (!Toolkit.matrix.checkFillable(this.matrix, n, rowIndex, colIndex)) continue;
                row[colIndex] = n;
                //去下一行填写，如果没填进去，继续寻找当前行下一个位置
                if (!this.fillRow(n, rowIndex + 1)) {
                    row[colIndex] = 0;
                    continue;
                }

                return true;
            }

            return false;
        }
    }]);

    return Generator;
}();

module.exports = Generator;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function checkArray(array) {
    var length = array.length;
    var marks = new Array(length).fill(true);

    for (var i = 0; i < length - 1; i++) {
        if (!marks[i]) continue;

        var v = array[i];
        //是否有 0
        if (!v) {
            marks[i] = false;
            continue;
        }
        //是否有重复
        for (var j = i + 1; j < length; j++) {
            if (v === array[j]) {
                marks[i] = marks[j] = false;
            }
        }
    }

    return marks;
}

var Toolkit = __webpack_require__(0);

var Checker = function () {
    function Checker(matrix) {
        _classCallCheck(this, Checker);

        this._matrix = matrix;
        this._matrixMarks = Toolkit.matrix.makeMatrix(true);
    }

    _createClass(Checker, [{
        key: 'check',
        value: function check() {
            this.checkRows();
            this.checkCols();
            this.checkBoxes();

            this._success = this._matrixMarks.every(function (row) {
                return row.every(function (mark) {
                    return mark;
                });
            });

            return this._success;
        }
    }, {
        key: 'checkRows',
        value: function checkRows() {
            for (var rowIndex = 0; rowIndex < 9; rowIndex++) {
                var row = this._matrix[rowIndex];
                var marks = checkArray(row);

                for (var colIndex = 0; colIndex < marks.length; colIndex++) {
                    if (!marks[colIndex]) {
                        this._matrixMarks[rowIndex][colIndex] = false;
                    }
                }
            }
        }
    }, {
        key: 'checkCols',
        value: function checkCols() {
            for (var colIndex = 0; colIndex < 9; colIndex++) {
                var cols = [];
                for (var rowIndex = 0; rowIndex < 9; rowIndex++) {
                    cols[rowIndex] = this._matrix[rowIndex][colIndex];
                }
                var marks = checkArray(cols);

                for (var _rowIndex = 0; _rowIndex < marks.length; _rowIndex++) {
                    if (!marks[_rowIndex]) {
                        this._matrixMarks[_rowIndex][colIndex] = false;
                    }
                }
            }
        }
    }, {
        key: 'checkBoxes',
        value: function checkBoxes() {
            for (var boxIndex = 0; boxIndex < 9; boxIndex++) {
                var boxes = Toolkit.box.getBoxCells(this._matrix, boxIndex);
                var marks = checkArray(boxes);

                for (var cellIndex = 0; cellIndex < 9; cellIndex++) {
                    if (!marks[cellIndex]) {
                        var _Toolkit$box$convertF = Toolkit.box.convertFromBoxIndex(boxIndex, cellIndex),
                            rowIndex = _Toolkit$box$convertF.rowIndex,
                            colIndex = _Toolkit$box$convertF.colIndex;

                        this._matrixMarks[rowIndex][colIndex] = false;
                    }
                }
            }
        }
    }, {
        key: 'matrixMarks',
        get: function get() {
            return this._matrixMarks;
        }
    }, {
        key: 'isSuccess',
        get: function get() {
            return this._success;
        }
    }]);

    return Checker;
}();

module.exports = Checker;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
    function PopupNumbers(elem) {
        var _this = this;

        _classCallCheck(this, PopupNumbers);

        this._$panel = elem.hide().removeClass('hidden');

        this._$panel.on('click', 'span', function (e) {
            var $cell = _this._$targetCell;
            var $span = $(e.target);
            if ($span.hasClass('mark1')) {
                if ($cell.hasClass('mark1')) {
                    $cell.removeClass('mark1');
                } else {
                    $cell.removeClass('mark2').addClass('mark1');
                }
            } else if ($span.hasClass('mark2')) {
                if ($cell.hasClass('mark2')) {
                    $cell.removeClass('mark2');
                } else {
                    $cell.removeClass('mark1').addClass('mark2');
                }
            } else if ($span.hasClass('empty')) {
                $cell.text(0).addClass('empty');
            } else {
                $cell.removeClass('empty').text($span.text());
            }

            _this._$panel.hide();
        });
    }

    _createClass(PopupNumbers, [{
        key: 'popup',
        value: function popup($cell) {
            this._$targetCell = $cell;

            var _$cell$position = $cell.position(),
                left = _$cell$position.left,
                top = _$cell$position.top;

            this._$panel.css({
                left: left + 'px',
                top: top + 'px'
            }).show();
        }
    }, {
        key: 'hide',
        value: function hide() {
            this._$panel.hide();
        }
    }]);

    return PopupNumbers;
}();

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map