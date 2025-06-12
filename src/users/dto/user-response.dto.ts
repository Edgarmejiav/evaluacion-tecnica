import { Expose, Transform } from 'class-transformer';

export class UserResponseDto {
  @Expose()
  @Transform(({ obj }) => obj._id.toString())
  _id: string;

  @Expose()
  username: string;

  @Expose()
  email: string;

  @Expose()
  fullName: string;
}
