import * as _ from 'lodash';
export class Range {
    /**
     * 
     * @param _limits inclusive limits. All numbers outside of it are nor in nor out of the range
     * @param _range range inside of the limits. All ranges are inclusive.
     */
    constructor(private _limits: [number, number], private _range: Array<[number, number]>, private _inverted = false) {
        // blank
    }

    in(val: number): boolean {
        if (!this._checkLimits(val)) {
            return false;
        } else {
            let result = false;
            let index = _.sortedIndexBy(this._range, [val, val], item => item[1]);
            if (index !== this._range.length) {
                const range = this._range[index];
                result = _.inRange(val, range[0], range[1] + 1);
            } 
            return this._inverted ? !result : result;
        }
    }

    out(val: number): boolean {
        return !this.in(val);
    }

    invert(): Range {
        return new Range(this._limits, this._range, !this._inverted);
    }

    private _checkLimits(val: number): boolean {
        return _.inRange(val, this._limits[0], this._limits[1] + 1);
    }
}
