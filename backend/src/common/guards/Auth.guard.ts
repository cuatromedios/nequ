import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | import("rxjs").Observable<boolean> {
        return this.hasEnoughGrants(context);
    }

    hasEnoughGrants(context: ExecutionContext): boolean {
        // There should be a user
        if (!this.existsUser(context)) {
            return false
        }

        let requiredGrants = this.getGrants(context)

        if (!requiredGrants) {
            // There is no special grants required
            return true;
        }

        let grants = this.getUserGrants(context)

        if (grants.grants.length == 0 && Object.entries(grants.entity_grants).length == 0) {
            // User without grants
            return false;
        }

        // The user is admin?
        if (grants.grants.find(g => g === 'admin')) {
            // Has all the privileges
            return true
        }

        let params = context.switchToHttp().getRequest().params

        // The user has any of the asked grants
        for (let i = 0; i < requiredGrants.length; i++) {
            let splitted = requiredGrants[i].split(':')
            let grant = splitted[0]
            let entityParam = splitted.length > 1 ? splitted[1] : undefined
            let entity
            let toSearchFor;

            if (entityParam) {
                // Look in the entities specific grants
                entity = params[entityParam]
                toSearchFor = grants.entity_grants[entity]
            } else {
                // Look in the global grants
                toSearchFor = grants.grants
            }

            if (!toSearchFor) { continue; }

            if (toSearchFor.find(item => item === grant)) {
                // the user has at least one of the required grants
                return true;
            }
        }

        // This user has no grants for this action
        return false
    }

    existsUser(context: ExecutionContext) {
        let request = context.switchToHttp().getRequest()
        return !!request.body.user
    }

    getUserGrants(context: ExecutionContext) {
        let request = context.switchToHttp().getRequest()
        let grants = { grants: request.body.user.grants || [], entity_grants: request.body.user.entity_grants || {} }
        return grants
    }

    getGrants(context: ExecutionContext) {
        const grants = this.reflector.get<string[]>('grants', context.getHandler());
        return grants
    }
}