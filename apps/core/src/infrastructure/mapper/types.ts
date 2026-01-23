export interface IMapper<TDto, TEntity> {
	toDTO(entity: TEntity): TDto;
	toEntity(dto: TDto): TEntity;
}
