import { Server } from './presentation/server'

(async() => {

    function main() {
        const server = new Server();
        server.start();
    }

    main();
})();


