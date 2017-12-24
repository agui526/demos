// 生成数独游戏
// 1、生成完成的游戏
// 2、生成数独迷盘

const Generator = require('./generator')

module.exports = class Sudoku {
    constructor() {
        const gen = new Generator()
        gen.generator()
        this.solutionMatrix = gen.matrix
    }

    make(level = 5) {
        this.puzzleMatrix = this.solutionMatrix.map(row => {
            return row.map(cell => Math.random() * 9 < level ? 0 : cell)
        })
    }



}