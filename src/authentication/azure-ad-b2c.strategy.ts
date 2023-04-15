import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-azure-ad';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AzureAdB2CStrategy extends PassportStrategy(
  Strategy,
  'azure-ad-b2c',
) {
  constructor(private readonly configService: ConfigService) {
    super({
      identityMetadata: configService.get('AZURE_AD_B2C_IDENTITY_METADATA'),
      clientID: configService.get('AZURE_AD_B2C_CLIENT_ID'),
      policyName: configService.get('AZURE_AD_B2C_POLICY_NAME'),
      isB2C: true,
      validateIssuer: false,
      loggingLevel: 'warn',
      passReqToCallback: false,
    });
  }

  async validate(profile: any): Promise<any> {
    return profile;
  }
}
