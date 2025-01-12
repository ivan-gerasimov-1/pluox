#!/usr/bin/env node

import fsSync from 'node:fs';
import fs from 'node:fs/promises';
import path from 'node:path';

import { program } from 'commander';

program
	.name('generate-module')
	.description('Generate a new module with Clean Architecture structure')
	.argument('<name>', 'module name')
	.argument('<fileNamePrefix>', 'file name prefix')
	.option('-p, --path <path>', 'path to modules directory', '')
	.action(async (name, fileNamePrefix, options) => {
		let modulePath = options.path
			? path.resolve(process.cwd(), options.path, fileNamePrefix)
			: path.join(process.cwd(), '.generated', fileNamePrefix);

		let directories = [
			'application',
			'application/dto',
			`application/${fileNamePrefix}UseCase`,
			`application/${fileNamePrefix}QueryService`,

			'domain',
			`domain/${fileNamePrefix}Entity`,
			`domain/${fileNamePrefix}Repository`,

			'infrastructure',
			`infrastructure/${fileNamePrefix}DataSource`,
			`infrastructure/${fileNamePrefix}Mapper`,
			`infrastructure/${fileNamePrefix}Repository`,
		];

		for (let dir of directories) {
			const fullPath = path.join(modulePath, dir);

			if (!fsSync.existsSync(fullPath)) {
				await fs.mkdir(fullPath, {
					recursive: true,
				});
			}
		}

		await Promise.all([
			fs.writeFile(
				path.join(modulePath, 'application', 'dto', `${fileNamePrefix}DTO.ts`),
				entityDTO(name),
			),

			fs.writeFile(
				path.join(
					modulePath,
					'application',
					`${fileNamePrefix}UseCase`,
					'types.ts',
				),
				useCaseTypes(name),
			),

			fs.writeFile(
				path.join(
					modulePath,
					'application',
					`${fileNamePrefix}UseCase`,
					`${fileNamePrefix}UseCase.ts`,
				),
				useCase(name, fileNamePrefix),
			),

			fs.writeFile(
				path.join(
					modulePath,
					'application',
					`${fileNamePrefix}QueryService`,
					'types.ts',
				),
				queryServiceTypes(name),
			),

			fs.writeFile(
				path.join(
					modulePath,
					'application',
					`${fileNamePrefix}QueryService`,
					`${fileNamePrefix}QueryService.ts`,
				),
				queryService(name, fileNamePrefix),
			),

			fs.writeFile(
				path.join(modulePath, 'domain', `${fileNamePrefix}Entity`, 'types.ts'),
				entityType(name),
			),

			fs.writeFile(
				path.join(
					modulePath,
					'domain',
					`${fileNamePrefix}Entity`,
					`${fileNamePrefix}.ts`,
				),
				entity(name, fileNamePrefix),
			),

			fs.writeFile(
				path.join(
					modulePath,
					'domain',
					`${fileNamePrefix}Repository`,
					'types.ts',
				),
				repositoryTypes(name, fileNamePrefix),
			),

			fs.writeFile(
				path.join(
					modulePath,
					'infrastructure',
					`${fileNamePrefix}DataSource`,
					'types.ts',
				),
				dataSourceTypes(name, fileNamePrefix),
			),

			fs.writeFile(
				path.join(
					modulePath,
					'infrastructure',
					`${fileNamePrefix}DataSource`,
					`${fileNamePrefix}DataSource.ts`,
				),
				dataSource(name, fileNamePrefix),
			),

			fs.writeFile(
				path.join(
					modulePath,
					'infrastructure',
					`${fileNamePrefix}Mapper`,
					'types.ts',
				),
				mapperTypes(name, fileNamePrefix),
			),

			fs.writeFile(
				path.join(
					modulePath,
					'infrastructure',
					`${fileNamePrefix}Mapper`,
					`${fileNamePrefix}Mapper.ts`,
				),
				mapper(name, fileNamePrefix),
			),

			fs.writeFile(
				path.join(
					modulePath,
					'infrastructure',
					`${fileNamePrefix}Repository`,
					`${fileNamePrefix}Repository.ts`,
				),
				repository(name, fileNamePrefix),
			),
		]);

		console.log(`✨ Module ${name} generated successfully!`);
	});

program.parse();

function entityDTO(name) {
	return `import type { TISODateString } from '@root/core/domain/temporal/types';
import type { Id } from '@root/core/domain/types';

export type T${name}DTO = {
	id: Id;
	createdAt: TISODateString;
	modifiedAt: TISODateString;
};

export type T${name}CreateDTO = {};

export type T${name}UpdateDTO = {};
`;
}

function queryServiceTypes(name) {
	return `export interface I${name}QueryService {}
`;
}

function queryService(name, fileNamePrefix) {
	return `import type { I${name}QueryService } from '@root/core/modules/${fileNamePrefix}/application/${fileNamePrefix}QueryService/types';

export class ${name}QueryService implements I${name}QueryService {
	constructor() {}
}
`;
}

function useCaseTypes(name) {
	return `export interface I${name}UseCase {}
`;
}

function useCase(name, fileNamePrefix) {
	return `import type { I${name}UseCase } from '@root/core/modules/${fileNamePrefix}/application/${fileNamePrefix}UseCase/types';

export class ${name}UseCase implements I${name}UseCase {
	constructor() {}
}
`;
}

function entityType(name) {
	return `import type { IEntity } from '@root/core/domain/entity/types';

export interface I${name} extends IEntity {}
`;
}

function entity(name, fileNamePrefix) {
	return `import { Entity } from '@root/core/domain/entity/entity';
import type { TISODateString } from '@root/core/domain/temporal/types';
import type { Id } from '@root/core/domain/types';
import type { I${name} } from '@root/core/modules/${fileNamePrefix}/domain/${fileNamePrefix}Entity/types';

export class ${name} extends Entity implements I${name} {
	constructor(id: Id, createdAt: TISODateString, modifiedAt?: TISODateString) {
		super(id, createdAt, modifiedAt);
	}
}
`;
}

function repositoryTypes(name, fileNamePrefix) {
	return `import type { IRepository } from '@root/core/domain/repository/types';
import type { Id } from '@root/core/domain/types';
import type { I${name} } from '@root/core/modules/${fileNamePrefix}/domain/${fileNamePrefix}Entity/types';

export interface I${name}Repository extends IRepository<I${name}, T${name}FindOptions> {}

export type T${name}FindOptions = {
	id?: Id;
};
`;
}

function dataSourceTypes(name, fileNamePrefix) {
	return `import type { IDataSource } from '@root/core/infrastructure/dataSource/types';
import type { T${name}DTO } from '@root/core/modules/${fileNamePrefix}/application/dto/${fileNamePrefix}DTO';

export interface I${name}DataSource extends IDataSource<T${name}DTO> {}
`;
}

function dataSource(name, fileNamePrefix) {
	return `import { LocalStorageDataSource } from '@root/core/infrastructure/dataSource/dataSource';
import type { T${name}DTO } from '@root/core/modules/${fileNamePrefix}/application/dto/${fileNamePrefix}DTO';
import type { I${name}DataSource } from '@root/core/modules/${fileNamePrefix}/infrastructure/${fileNamePrefix}DataSource/types';

export class ${name}LocalStorageDataSource extends LocalStorageDataSource<T${name}DTO> implements I${name}DataSource {

	static readonly #STORAGE_ID = '${fileNamePrefix}s';

	constructor() {
		super(${name}LocalStorageDataSource.#STORAGE_ID);
	}
}
`;
}

function mapperTypes(name, fileNamePrefix) {
	return `import type { IMapper } from '@root/core/infrastructure/mapper/types';
import type { T${name}DTO } from '@root/core/modules/${fileNamePrefix}/application/dto/${fileNamePrefix}DTO';
import type { I${name} } from '@root/core/modules/${fileNamePrefix}/domain/${fileNamePrefix}Entity/types';

export interface I${name}Mapper extends IMapper<T${name}DTO, I${name}> {}
`;
}

function mapper(name, fileNamePrefix) {
	return `import type { T${name}DTO } from '@root/core/modules/${fileNamePrefix}/application/dto/${fileNamePrefix}DTO';
import { ${name} } from '@root/core/modules/${fileNamePrefix}/domain/${fileNamePrefix}Entity/${fileNamePrefix}';
import type { I${name} } from '@root/core/modules/${fileNamePrefix}/domain/${fileNamePrefix}Entity/types';
import type { I${name}Mapper } from '@root/core/modules/${fileNamePrefix}/infrastructure/${fileNamePrefix}Mapper/types';

export class ${name}Mapper implements I${name}Mapper {
	constructor() {}

	public toDTO(entity: ${name}): T${name}DTO {
		return {
			id: entity.id,
			createdAt: entity.createdAt,
			modifiedAt: entity.modifiedAt,
		};
	}

	public toEntity(dto: T${name}DTO): I${name} {
		return new ${name}(dto.id, dto.createdAt, dto.modifiedAt);
	}
}
`;
}

function repository(name, fileNamePrefix) {
	return `import type {
	TFindManyOptions,
	TFindManyResult,
} from '@root/core/domain/repository/types';
import type { Id } from '@root/core/domain/types';
import type { I${name} } from '@root/core/modules/${fileNamePrefix}/domain/${fileNamePrefix}Entity/types';
import type {
	I${name}Repository,
	T${name}FindOptions,
} from '@root/core/modules/${fileNamePrefix}/domain/${fileNamePrefix}Repository/types';

export class ${name}Repository implements I${name}Repository {
	constructor() {}

	public save(entity: I${name}): I${name} {
		throw new Error('Not Implemented');
	}

	public findMany(options: TFindManyOptions<T${name}FindOptions>): TFindManyResult<I${name}> {
		throw new Error('Not Implemented');
	}

	public findOne(options: T${name}FindOptions): I${name} | null {
		throw new Error('Not Implemented');
	}

	public findById(id: Id): I${name} | null {
		throw new Error('Not Implemented');
	}

	public remove(id: Id): I${name} | null {
		throw new Error('Not Implemented');
	}
}
`;
}
