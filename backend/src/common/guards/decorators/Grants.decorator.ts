import { SetMetadata } from "@nestjs/common";

export const Grants = (...grants: string[]) => SetMetadata('grants', grants)