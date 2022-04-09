import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class AwsSimpleDto {

    @IsNotEmpty()
    @IsString()
    InstanceType: string

    @IsNotEmpty()
    @IsString()
    Memory: string

    @IsNotEmpty()
    @IsNumber()
    VCPUS: number

    @IsNotEmpty()
    @IsString()
    Storage: string

    @IsNotEmpty()
    @IsString()
    Network: string

    @IsNotEmpty()
    @IsNumber()
    Cost: number

    @IsNotEmpty()
    @IsNumber()
    MonthlyPrice: number

    @IsNotEmpty()
    @IsString()
    SpotPrice: string

}