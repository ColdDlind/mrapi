import { queryType, stringArg, objectType, makeSchema } from "@nexus/schema";

const ServTimeOutputType = objectType({
  name: "ServTimeOutputType",
  definition(t) {
    t.string("time", { nullable: false, description: "time" });
  },
});

const Query = queryType({
  definition(t) {
    t.field("serv_time", {
      type: ServTimeOutputType,
      args: { type: stringArg() },
      async resolve(_, args, { execute }) {
        console.log(args, execute);
        const { data } = await execute(`
          query auth_users {
            auth_users(where: { id: { equals: "ckd5d4qpi00111i17jinkjswa" } }) {
              id: true,
              username: true,
            }
          }
        `);
        console.log(data);
        return { time: String(Date.now()) };
      },
    });
  },
});

export const servTimeSchema = makeSchema({
  types: [ServTimeOutputType, Query],
});
