import { Model } from 'objection';

export class Log extends Model {
  static tableName = 'logs';

  id: number;
  userId: number;
  command: string;
  response: string;
  timestamp: string;

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['userId', 'command', 'response', 'timestamp'],
      properties: {
        id: { type: 'integer' },
        userId: { type: 'integer' },
        command: { type: 'string', maxLength: 255 },
        response: { type: 'string', maxLength: 500 },
        timestamp: { type: 'string', format: 'date-time' },
      },
    };
  }
}
