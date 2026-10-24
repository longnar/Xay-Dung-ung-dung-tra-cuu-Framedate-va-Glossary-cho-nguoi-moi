"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const config_1 = require("@nestjs/config");
const storage_service_1 = require("./storage.service");
describe('StorageService', () => {
    let service;
    let configServiceMock;
    beforeEach(async () => {
        configServiceMock = {
            get: jest.fn().mockImplementation((key) => {
                if (key === 'CLOUDINARY_CLOUD_NAME')
                    return null;
                if (key === 'CLOUDINARY_API_KEY')
                    return null;
                if (key === 'CLOUDINARY_API_SECRET')
                    return null;
                if (key === 'CLOUDINARY_URL')
                    return null;
                return null;
            }),
        };
        const module = await testing_1.Test.createTestingModule({
            providers: [
                storage_service_1.StorageService,
                {
                    provide: config_1.ConfigService,
                    useValue: configServiceMock,
                },
            ],
        }).compile();
        service = module.get(storage_service_1.StorageService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    describe('uploadFile', () => {
        it('should return empty string if no file is provided', async () => {
            const result = await service.uploadFile(null);
            expect(result).toBe('');
        });
        it('should return local uploads path when Cloudinary is not configured', async () => {
            const mockFile = {
                filename: 'hitbox-12345.gif',
                path: '/tmp/hitbox-12345.gif',
            };
            const result = await service.uploadFile(mockFile, 'hitboxes');
            expect(result).toBe('/uploads/hitbox-12345.gif');
        });
    });
    describe('deleteFile', () => {
        it('should do nothing if null or empty url is passed', async () => {
            await expect(service.deleteFile(null)).resolves.not.toThrow();
            await expect(service.deleteFile('')).resolves.not.toThrow();
        });
    });
});
//# sourceMappingURL=storage.service.spec.js.map