class Router {

    base_routs = {};

    setBaseRout(rout) {
        this.base_routs = rout;
    }

    getBaseRouter() {
        return this.base_routs;
    }
}

module.exports = Router;
