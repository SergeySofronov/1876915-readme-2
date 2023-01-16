import { IsDate, IsMongoId } from "class-validator";

export class NotifyPublicationsDto {
  @IsMongoId()
  public userId: string;

  @IsDate()
  public lastPublicationDate: Date;
}
