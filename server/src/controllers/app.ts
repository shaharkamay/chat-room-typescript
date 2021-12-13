import { NextFunction, Request, Response, } from 'express';
import path from 'path';
// import { fileURLToPath } from 'url';
// const __dirname = path.dirname(fileURLToPath(import.meta.url));

const render = (req: Request, res: Response, next: NextFunction) => {
    try {
        res.sendFile(path.resolve("../client/build/index.html"));
    } catch (err) {
        next(err);
    }
};

export { render };