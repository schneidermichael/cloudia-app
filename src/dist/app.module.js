"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var auth_module_1 = require("./auth/auth.module");
var users_module_1 = require("./users/users.module");
var prisma_module_1 = require("./prisma/prisma.module");
var config_1 = require("@nestjs/config");
var aws_module_1 = require("./provider/aws/aws.module");
var azure_module_1 = require("./provider/azure/azure.module");
var google_module_1 = require("./provider/google/google.module");
var axios_1 = require("@nestjs/axios");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        common_1.Module({
            imports: [
                auth_module_1.AuthModule,
                config_1.ConfigModule.forRoot({
                    isGlobal: true
                }),
                users_module_1.UserModule,
                prisma_module_1.PrismaModule,
                aws_module_1.AwsModule,
                azure_module_1.AzureModule,
                google_module_1.GoogleModule,
                axios_1.HttpModule,
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
