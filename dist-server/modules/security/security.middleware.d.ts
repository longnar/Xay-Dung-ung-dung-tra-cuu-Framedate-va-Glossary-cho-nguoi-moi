import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { SecurityService } from './security.service';
export declare class SecurityMiddleware implements NestMiddleware {
    private readonly securityService;
    constructor(securityService: SecurityService);
    use(req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>>;
}
