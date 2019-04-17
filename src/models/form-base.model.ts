import {Entity, model, property} from '@loopback/repository';

@model()
export class FormBase extends Entity {
  @property({
    type: 'string',
    id: true,
  })
  _id: string;

  @property({
    type: 'string',
  })
  title?: string;

  @property({
    type: 'string',
  })
  displayTitle?: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'string',
  })
  _formCategory?: string;

  @property({
    type: 'boolean',
  })
  required?: boolean;

  @property({
    type: 'boolean',
  })
  isCopyFromLast?: boolean;

  @property({
    type: 'boolean',
  })
  deleted?: boolean;

  @property({
    type: 'date',
  })
  created?: string;

  @property({
    type: 'date',
  })
  updated?: string;

  @property({
    type: 'string',
  })
  remindAtAddress?: string; // address,city,zipcode

  @property({
    type: 'string',
  })
  remindAtGeo?: string; // latitude,longitude

  constructor(data?: Partial<FormBase>) {
    super(data);
  }
}
