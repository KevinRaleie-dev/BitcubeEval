import { isAuth } from "../middleware/isAuth";
import { Ctx, Query, Resolver, UseMiddleware } from "type-graphql";
import { AppContext } from "../utils/context";

@Resolver()
export class HelloResolver {

    @Query(() => String)
    @UseMiddleware(isAuth)
    hello(
        @Ctx() { payload }: AppContext
    ) {
        return `Hello Bitcube 👋🏼 im user: ${payload.id}` ;
    }
    
}