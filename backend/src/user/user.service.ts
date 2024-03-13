import {
  BadRequestException,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { USER_MODEL } from 'src/auth/schema/user.schema';

@Injectable({})
export class UserService {
  constructor(
    @InjectModel(USER_MODEL)
    private usermodel,
  ) {}

  async getNotes(req) {
    try {
      const { user } = req.userExist;

      console.log(user._id);
      const userData = await this.usermodel.findById(user._id);

      return { status: 'SUCCESS', notes: userData['notes'] };
    } catch (error) {
      throw new ServiceUnavailableException();
    }
  }

  async editNotes(req, notesData) {
    try {
      const { user } = req.userExist;

      if (!notesData) {
        return { status: 'FAILED', message: 'Empty Fields' };
      }
      const updateNote = await this.usermodel.findOneAndUpdate(
        { _id: user._id },
        notesData,
        { new: true },
      );

      return { updateNote };
    } catch (error) {
      throw new ServiceUnavailableException();
    }
  }
}
