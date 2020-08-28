import express from 'express'
import Recover from './Recover'
import assert from 'assert'
import dal from '../dal'
export default [
    //获取路由列表
    {
        method: 'GET',
        url: `/router/list`,
        handler: Recover(async (req: express.Request, res: express.Response) => {
            const routes = dal.server.app._router.stack
            let list = []
            for (let item of routes) {
                console.log(item.regexp.toString())
                list.push({
                    name: item.name,
                    path: item.path,
                    regexp: item.regexp.toString()
                })
            }
            return list
        })
    },
    {
        method: 'get',
        url: `/router/add/:name`,
        handler: Recover(async (req: express.Request, res: express.Response) => {
            console.log(req.params.name)
            assert(req.params.name,"params error")
            const name=req.params.name.split('.')[0]
            dal.addSchema(name)
          //  dal.server.addRoute(name)
            return "ok"
        })
    },
    {
        method: 'delete',
        url: `/router/remove/`,
        handler: Recover(async (req: express.Request, res: express.Response) => {
            console.log("ss---",req.query.name)
            const routes = dal.server.app._router.stack
             let isOk=false
            for (let item of routes) {
                console.log(item)
                if(item.regexp.toString()===req.query.name){
                    isOk=true
                    break
                }
            }

           return "ok"//dal.removeSchema(req.params.name)
        })
    },
]