export default [
    {
      name: 'one',
      defaultTenant: {
        name: 'dev',
        // url: 'file:../config/db/prod.db',
      },
    },
    {
      name: 'two',
      // defaultTenant: {
      //   name: 'dev',
      // },
      openAPI: {
        enable: false,
      },
      // graphql: {
      //   enable: false,
      // },
      // nexusDir?: string;
      // prismaClientDir?: string;
    },
  ]
