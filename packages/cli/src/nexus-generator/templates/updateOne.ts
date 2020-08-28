export default (schema?: boolean) => `
#{import}

${
  schema
    ? `
export const #{Model}UpdateOneMutation = mutationField${staticData};
`
    : `
schema.extendType({
  type: 'Mutation',
  definition(t) {
    t.field${staticData};
  },
});
`
}
`

const staticData = `('updateOne#{Model}', {
  type: '#{Model}',
  nullable: false,
  args: {
    where: #{schema}arg({
      type: '#{Model}WhereUniqueInput',
      nullable: false,
    }),
    data: #{schema}arg({
      type: '#{Model}UpdateInput',
      nullable: false,
    }),
    select: '#{Model}Select',
    include: '#{Model}Include',
  },
  resolve(_parent, { data, where }, { prisma }) {
    return prisma.#{model}.update({
      where,
      data,
    }) as any
  },
})`
