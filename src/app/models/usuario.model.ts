export class Usuario {
    constructor(
        public login?: string,
        public senha?: string,
        public isAdmin?: boolean,
        public token?: string
    ) {}
}