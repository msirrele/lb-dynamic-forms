import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {FormBase} from '../models';
import { FormBaseRepository } from '../repositories';
import {inject} from '@loopback/core';
import {GeocoderService} from '../services';

export class FormBaseController {
  constructor(
    @repository(FormBaseRepository) protected formBaseRepository: FormBaseRepository,
    @inject('services.GeocoderService') protected geoService: GeocoderService,
  ) {}

  @post('/form-bases', {
    responses: {
      '200': {
        description: 'FormBase model instance',
        content: {'application/json': {schema: {'x-ts-type': FormBase}}},
      },
    },
  })
  async create(@requestBody() formBase: FormBase): Promise<FormBase> {
    if (formBase.remindAtAddress) {
      // TODO handle address not found
      const geo = await this.geoService.geocode(formBase.remindAtAddress);
      formBase.remindAtGeo = `${geo[0].y}, ${geo[0].x}`;
    }
    return await this.formBaseRepository.create(formBase);
  }

  @get('/form-bases/count', {
    responses: {
      '200': {
        description: 'FormBase model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(FormBase)) where?: Where,
  ): Promise<Count> {
    return await this.formBaseRepository.count(where);
  }

  @get('/form-bases', {
    responses: {
      '200': {
        description: 'Array of FormBase model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': FormBase}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(FormBase)) filter?: Filter,
  ): Promise<FormBase[]> {
    return await this.formBaseRepository.find(filter);
  }

  @patch('/form-bases', {
    responses: {
      '200': {
        description: 'FormBase PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() formBase: FormBase,
    @param.query.object('where', getWhereSchemaFor(FormBase)) where?: Where,
  ): Promise<Count> {
    return await this.formBaseRepository.updateAll(formBase, where);
  }

  @get('/form-bases/{id}', {
    responses: {
      '200': {
        description: 'FormBase model instance',
        content: {'application/json': {schema: {'x-ts-type': FormBase}}},
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<FormBase> {
    return await this.formBaseRepository.findById(id);
  }

  @patch('/form-bases/{id}', {
    responses: {
      '204': {
        description: 'FormBase PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() formBase: FormBase,
  ): Promise<void> {
    await this.formBaseRepository.updateById(id, formBase);
  }

  @put('/form-bases/{id}', {
    responses: {
      '204': {
        description: 'FormBase PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() formBase: FormBase,
  ): Promise<void> {
    await this.formBaseRepository.replaceById(id, formBase);
  }

  @del('/form-bases/{id}', {
    responses: {
      '204': {
        description: 'FormBase DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.formBaseRepository.deleteById(id);
  }
}
