import { Request, Response, NextFunction } from "express";
import { ZodType, ZodError } from "zod";

interface ValidateSchemas {
    body?: ZodType<unknown>;
    params?: ZodType<unknown>;
    query?: ZodType<unknown>;
    headers?: ZodType<unknown>;
}

export function validate(schemas: ValidateSchemas) {
    return (req: Request, res: Response, next: NextFunction): void => {
        try {
            if (schemas.body) {
                req.body = schemas.body.parse(req.body);
            }

            if (schemas.params) {
                req.params = schemas.params.parse(req.params) as Request["params"];
            }

            if (schemas.query) {
                req.query = schemas.query.parse(req.query) as Request["query"];
            }
            if (schemas.headers) {
                schemas.headers.parse(req.headers);
             }

            next();
            } catch (err: unknown) {
                if (err instanceof ZodError) {
                    const flattened = err.flatten(issue => issue.message);
                    res.status(422).json({
                        error: {
                            code: "VALIDATION_ERROR",
                            message: "Invalid request data",
                            details: flattened,
                        },
                    });
                }
            next(err);
        }
    };
}

