import * as _ from './lodashMini';
export class Range {
    /**
     * 
     * @param _limits inclusive limits. All numbers outside of it are nor in nor out of the range
     * @param _range range inside of the limits. All ranges are inclusive.
     */
    constructor(private _limits: [number, number], private _range: Array<[number, number]>) {
        // blank
    }

    in(val: number): boolean {
        let index = _.sortedIndexBy(this._range, [val, val], item => item[1]);
        if (index >= this._range.length) {
            index = this._range.length - 1;
        }

        const range = this._range[index];
        return _.inRange(val, range[0], range[1] + 1);
    }

    out(val: number): boolean {
        if (_.inRange(val, this._limits[0], this._limits[1] + 1)) {
            return !this.in(val);
        } else {
            return false;
        }
    }

    invert(): Range {
        const inverted = [] as [number, number][];

        const length = this._range.length;
        for (let i = 0; i < length; i++) {
            if (i === 0) {
                if (this._limits[0] < this._range[i][0]) {
                    inverted.push([this._limits[0], this._range[i][0] - 1]);
                }
            } else {
                inverted.push([this._range[i - 1][1] + 1, this._range[i][0] - 1]);
            }
        }

        if (this._limits[1] > this._range[length - 1][1]) {
            inverted.push([this._range[length - 1][1] + 1, this._limits[1]]);
        }

        return new Range(this._limits, inverted);
    }
}
