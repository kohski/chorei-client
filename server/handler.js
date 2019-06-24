'use strict'

const awsServerlessExpress = require('aws-serverless-express')
const { app } = require('./app')

const server = awsServerlessExpress.createServer(app)

module.exports.handler = (event, context, callback) => {
  awsServerlessExpress.proxy(server, event, context)
}
