import Biscuit from './../products/Biscuit';
import { minBakingTemperature, maxBakingTemperature } from './components/Oven';

export const sec = 1000;
export class BiscuitMachine {

    constructor(build) {

        this.machineName = build.machineName;
        this.switch = build.switch;
        this.motor = build.motor;
        this.extruder = build.extruder;
        this.stamper = build.stamper;
        this.oven = build.oven;

        this.produceBiscuit = this.produceBiscuit.bind(this)
    }

    produceBiscuit(store) {
        const temperature = store.getState();
        if (temperature < minBakingTemperature || temperature > maxBakingTemperature) {
            throw ('Biscuit is not cooked well.Temperature is' + temperature)
        }
        else {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    var biscuit = new Biscuit(true);
                    console.log('New biscuit is produced!', biscuit);
                    store.dispatch(produceCookie(1))
                    resolve(biscuit)
                }, 0);
            });
        }
    }

    static get Builder() {
        class Builder {
            constructor(name) {
                this.machineName = name;
            }
            withSwitch(switchInstance) {
                this.switch = switchInstance;
                return this;
            }
            withMotor(motorInstance) {
                this.motor = motorInstance;
                return this;
            }
            withExtruder(extruderInstance) {
                this.extruder = extruderInstance;
                return this;
            }
            withStamper(stamperInstance) {
                this.stamper = stamperInstance;
                return this;
            }
            withOven(ovenInstance) {
                this.oven = ovenInstance;
                return this;
            }
            build() {
                return new BiscuitMachine(this);
            }
        }
        return Builder;
    }
}

export const produceCookie = () => ({ type: "PRODUCE_COOKIE" })