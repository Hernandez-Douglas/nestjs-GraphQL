import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

@InputType()
export class CreateTodoInput {

    @Field( () => String, { description: 'Que necesitas completar' })
    @IsString()
    @IsNotEmpty()
    @MaxLength(33)
    description: string
}