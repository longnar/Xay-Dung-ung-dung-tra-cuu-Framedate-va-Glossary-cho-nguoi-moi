"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const typeorm_1 = require("@nestjs/typeorm");
const glossary_service_1 = require("./glossary.service");
const glossary_entity_1 = require("../../entities/glossary.entity");
const storage_service_1 = require("../storage/storage.service");
const common_1 = require("@nestjs/common");
describe('GlossaryService', () => {
    let service;
    let repoMock;
    let storageServiceMock;
    const mockGlossary = {
        id: 1,
        term: 'Hitstun',
        definition: 'Thời gian nhân vật bị choáng sau khi trúng đòn.',
        level: 'basic',
        image_url: '/uploads/hitstun.png',
        video_url: null,
        created_at: new Date(),
        updated_at: new Date(),
    };
    beforeEach(async () => {
        repoMock = {
            find: jest.fn().mockResolvedValue([mockGlossary]),
            findOne: jest.fn().mockImplementation(({ where }) => {
                if (where?.id === 1)
                    return Promise.resolve(mockGlossary);
                if (where?.term === 'Hitstun')
                    return Promise.resolve(mockGlossary);
                return Promise.resolve(null);
            }),
            create: jest.fn().mockImplementation((dto) => ({ id: 2, ...dto })),
            save: jest.fn().mockImplementation((item) => Promise.resolve(item)),
            remove: jest.fn().mockResolvedValue(true),
        };
        storageServiceMock = {
            uploadFile: jest.fn().mockResolvedValue('/uploads/mock-image.png'),
            deleteFile: jest.fn().mockResolvedValue(undefined),
        };
        const module = await testing_1.Test.createTestingModule({
            providers: [
                glossary_service_1.GlossaryService,
                {
                    provide: (0, typeorm_1.getRepositoryToken)(glossary_entity_1.Glossary),
                    useValue: repoMock,
                },
                {
                    provide: storage_service_1.StorageService,
                    useValue: storageServiceMock,
                },
            ],
        }).compile();
        service = module.get(glossary_service_1.GlossaryService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    describe('getAllGlossaries', () => {
        it('should return all glossaries sorted by term ASC', async () => {
            const result = await service.getAllGlossaries();
            expect(result).toHaveLength(1);
            expect(result[0].term).toBe('Hitstun');
            expect(repoMock.find).toHaveBeenCalledWith({ order: { term: 'ASC' } });
        });
    });
    describe('deleteGlossary', () => {
        it('should delete glossary and delete associated file', async () => {
            const result = await service.deleteGlossary(1);
            expect(result.message).toBe('Glossary term deleted successfully.');
            expect(repoMock.remove).toHaveBeenCalled();
            expect(storageServiceMock.deleteFile).toHaveBeenCalledWith('/uploads/hitstun.png');
        });
        it('should throw NotFoundException if term does not exist', async () => {
            await expect(service.deleteGlossary(999)).rejects.toThrow(common_1.NotFoundException);
        });
    });
});
//# sourceMappingURL=glossary.service.spec.js.map