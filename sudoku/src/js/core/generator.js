//生成数据解决方案
const Toolkit = require('./toolkit')

class Generator {

    generator() {
        while(!this.internalGenerator()) {

        }
    }

    internalGenerator() {
        this.matrix = Toolkit.matrix.makeMatrix()
        this.orders = Toolkit.matrix.makeMatrix()
            .map(row => row.map((v, i) => i))
            .map(row => Toolkit.matrix.shuffle(row))

        for(let n = 1; n <= 9; n++) {
            if(!this.fillNumber(n)) return false
        }

        return true
    }

    fillNumber(n) {
        return this.fillRow(n, 0)
    }

    fillRow(n, rowIndex) {
        if(rowIndex > 8) return true

        const row = this.matrix[rowIndex]
        const orders = this.orders[rowIndex]

        for(let i = 0; i < 9; i++) {
            const colIndex = orders[i];
            //当前单元格不为空
            if(row[colIndex]) continue
            //当前行不能填写
            if(!Toolkit.matrix.checkFillable(this.matrix, n, rowIndex, colIndex)) continue
            row[colIndex] = n
            //去下一行填写，如果没填进去，继续寻找当前行下一个位置
            if(!this.fillRow(n, rowIndex + 1)) {
                row[colIndex] = 0
                continue
            }

            return true
        }

        return false
    }
}

module.exports = Generator