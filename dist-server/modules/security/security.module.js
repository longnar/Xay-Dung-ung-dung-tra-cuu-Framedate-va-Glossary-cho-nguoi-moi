"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const security_audit_log_entity_1 = require("../../entities/security-audit-log.entity");
const security_service_1 = require("./security.service");
const security_controller_1 = require("./security.controller");
const security_middleware_1 = require("./security.middleware");
let SecurityModule = class SecurityModule {
    configure(consumer) {
        consumer.apply(security_middleware_1.SecurityMiddleware).forRoutes('*');
    }
};
exports.SecurityModule = SecurityModule;
exports.SecurityModule = SecurityModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([security_audit_log_entity_1.SecurityAuditLog])],
        controllers: [security_controller_1.SecurityController],
        providers: [security_service_1.SecurityService],
        exports: [security_service_1.SecurityService],
    })
], SecurityModule);
//# sourceMappingURL=security.module.js.map