import dotenv from 'dotenv';

dotenv.config();

export function envChecks(envVariables: string[]) {
    envVariables.forEach((e: string) => {
        if (!process.env[e]) {
            throw new Error(`ENV NOT FOUND ${e}`);
        }
    });
}

export function getEnvVariable(name: string): string {
    return process.env[name]!;
}