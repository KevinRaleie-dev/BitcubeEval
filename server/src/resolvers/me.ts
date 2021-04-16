import { Lecturer } from "../entity/Lecturer";
import { isAuth } from "../middleware/isAuth";
import { Ctx, Query, Resolver, UseMiddleware } from "type-graphql";
import { AppContext } from "src/utils/context";

@Resolver()
export class MeResolver {

    @Query(() => Lecturer, { nullable: true})
    @UseMiddleware(isAuth)
    async meQuery(
        @Ctx() {payload}: AppContext
    ): Promise<Lecturer | null> {
        const lecturer = await Lecturer.findOne({ where: {
            id: payload.id
        }});

        if (!lecturer) {
            return null;
        }

        return lecturer; //the signed in lecturer that is
    }
}