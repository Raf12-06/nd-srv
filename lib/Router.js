class Router {

    base_routs = {};

    setBaseRout(rout) {
        this.base_routs = rout;
    }

    getBaseRouter() {
        return this.base_routs;
    }

    getHandler(pathname) {
        const router = this.getBaseRouter();

        const listPathName = pathname.split('/').filter(s => s);

        let isSearch = true;
        let currentRouter = {};
        for (let i = 0; isSearch; i++) {
            const path = listPathName[i] ? `/${listPathName[i]}` : '';
            if (!path) {
                if (currentRouter && currentRouter['/']) {
                    currentRouter = currentRouter['/'];
                }
                isSearch = false;
                continue;
            }

            const curr = currentRouter[path] ? currentRouter[path] : router[path];

            if (curr) {
                if ('method' in curr) {
                    currentRouter = curr;
                    isSearch = false;
                    continue;
                } else {
                    const nextRouter = curr;
                    if ('router' in nextRouter) {
                        currentRouter = nextRouter?.router;
                        continue;
                    }
                }
            }
            isSearch = false;
        }

        return currentRouter;
    }
}

module.exports = Router;
