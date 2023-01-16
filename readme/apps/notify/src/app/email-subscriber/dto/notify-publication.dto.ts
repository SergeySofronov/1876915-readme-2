import { Publication } from "@readme/shared-types";
import { IsArray } from "class-validator";

export class NotifyPublicationDto {

  @IsArray()
  public publications: Publication[];
}
