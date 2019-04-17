import {DefaultCrudRepository} from '@loopback/repository';
import {FormBase} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class FormBaseRepository extends DefaultCrudRepository<
  FormBase,
  typeof FormBase.prototype._id
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(FormBase, dataSource);
  }
}
