import path from 'node:path';
import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Meeting } from './entities';
import { Repository } from 'typeorm';
import { handleServiceErrors } from 'src/utils';

@Injectable()
export class MeetingsService {
  constructor(
    @InjectRepository(Meeting) private meetingsRepository: Repository<Meeting>,
  ) {}

  async findById(id: string): Promise<Meeting | null> {
    return await this.meetingsRepository.findOneBy({ id });
  }

  async create(initiator: string): Promise<Meeting | null> {
    try {
      const clientBaseUrl =
        process.env.NODE_ENV === 'production'
          ? process.env.CLIENT_URL_PROD
          : process.env.CLIENT_URL_DEV;
      const newMeeting = this.meetingsRepository.create();
      newMeeting.id = uuidv4();
      newMeeting.link = new URL(path.join(clientBaseUrl, newMeeting.id)).href;
      newMeeting.initiator = initiator;

      await this.meetingsRepository.save(newMeeting);

      return newMeeting;
    } catch (err) {
      if (err.code === '23505') {
        return null;
      } else {
        handleServiceErrors(err);
      }
    }
  }
}
