import dotenv from "dotenv";
dotenv.config();


function _validateEnvVar(variable: any, variableName: string) {
    if (!variable) throw new Error("Missing ENV Var: " + variableName);
    return variable as string;
}

const CUSTODIAN_PRIVATE_KEY: string = _validateEnvVar(process.env.CUSTODIAN_PRIVATE_KEY, "CUSTODIAN_PRIVATE_KEY");
const PORT: number = process.env.PORT ? Number(process.env.PORT) : 8080;
const WSS_URL: string = _validateEnvVar(process.env.WSS_URL, "WSS_URL");

export {
    CUSTODIAN_PRIVATE_KEY,
    PORT,
    WSS_URL
}